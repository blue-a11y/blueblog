import { useEffect, useMemo, useRef, type ComponentType, type RefObject } from "react";
import { Bodies, Body, Composite, Engine } from "matter-js";
import { homeFallingToolsConfig } from "@/pages/home/constants/background";

type IMatterVector = {
  x: number;
  y: number;
};

type IMatterBody = {
  position: IMatterVector;
  velocity?: IMatterVector;
  angle: number;
  speed: number;
  angularVelocity: number;
  bounds?: {
    min: IMatterVector;
    max: IMatterVector;
  };
};

type IMatterEngine = {
  world: object;
  gravity: {
    x: number;
    y: number;
    scale: number;
  };
};

type IDeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState>;
};

type IScreenOrientationWithAngle = ScreenOrientation & {
  angle?: number;
};

type ISeededTool = {
  id: string;
  label: string;
  accentClassName?: string;
  Icon: ComponentType<{ className?: string }>;
};

type IToolBody = {
  id: string;
  label: string;
  body: IMatterBody;
  size: number;
  accentClassName?: string;
  Icon: ComponentType<{ className?: string }>;
};

type IFallingToolsProps = {
  obstacleRef?: RefObject<HTMLElement | null>;
};

const MIN_SPAWN_X_PADDING = 32;
const MIN_SPAWN_Y_PADDING = 32;
const SPAWN_HEIGHT_RATIO = 0.36;
const INITIAL_X_VELOCITY = 2.6;
const INITIAL_ANGLE_RANGE = 0.2;
const WALL_THICKNESS = 140;
const DEVICE_ORIENTATION_PERMISSION_EVENTS = ["pointerdown", "touchstart", "keydown"] as const;

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const getScreenAngle = () => {
  const orientation = window.screen.orientation as IScreenOrientationWithAngle | undefined;

  return orientation?.angle ?? 0;
};

const hasDeviceTilt = (event: DeviceOrientationEvent) => {
  return event.beta !== null || event.gamma !== null;
};

const getViewportTilt = (event: DeviceOrientationEvent) => {
  const beta = event.beta ?? 0;
  const gamma = event.gamma ?? 0;
  const angle = (getScreenAngle() * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: gamma * cos + beta * sin,
    y: beta * cos - gamma * sin,
  };
};

const applyTiltGravity = (
  engine: IMatterEngine,
  event: DeviceOrientationEvent,
  gravity: number,
  tiltSensitivity: number,
) => {
  if (!hasDeviceTilt(event)) {
    return;
  }

  const viewportTilt = getViewportTilt(event);

  engine.gravity.x = clamp(viewportTilt.x / tiltSensitivity, -1, 1) * gravity;
  engine.gravity.y = clamp(viewportTilt.y / tiltSensitivity, -1, 1) * gravity;
};

const respawnBody = (body: IMatterBody, width: number, height: number) => {
  const x = MIN_SPAWN_X_PADDING + Math.random() * Math.max(width - MIN_SPAWN_X_PADDING * 2, 1);
  const y =
    MIN_SPAWN_Y_PADDING +
    Math.random() * Math.max(height * SPAWN_HEIGHT_RATIO - MIN_SPAWN_Y_PADDING, 1);

  Body.setPosition(body, { x, y });
  Body.setVelocity(body, {
    x: (Math.random() - 0.5) * INITIAL_X_VELOCITY,
    y: Math.random() * 0.6,
  });
  Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);
  Body.setAngle(body, (Math.random() - 0.5) * INITIAL_ANGLE_RANGE);
};

const FallingTools = ({ obstacleRef }: IFallingToolsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<IMatterEngine | null>(null);
  const toolBodiesRef = useRef<IToolBody[]>([]);
  const wallsRef = useRef<IMatterBody[]>([]);
  const obstacleBodyRef = useRef<IMatterBody | null>(null);
  const obstacleSizeRef = useRef({ width: 0, height: 0 });
  const animationFrameRef = useRef(0);
  const startTimeoutRef = useRef(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const config = homeFallingToolsConfig;

  const seededTools = useMemo<ISeededTool[]>(() => {
    return Array.from({ length: config.count }, (_, index) => {
      const item = config.items[index % config.items.length];
      return {
        id: `${item?.label ?? "tool"}-${index}`,
        label: item?.label ?? "",
        Icon: item?.icon ?? config.items[0]!.icon,
        accentClassName: item?.accentClassName,
      };
    });
  }, [config.count, config.items]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const engine = Engine.create({
      gravity: { x: 0, y: config.gravity, scale: 0.001 },
    });
    engineRef.current = engine;
    let isDeviceOrientationStarted = false;

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      applyTiltGravity(engine, event, config.gravity, config.tiltSensitivity);
    };

    const startDeviceOrientation = () => {
      if (isDeviceOrientationStarted) {
        return;
      }

      isDeviceOrientationStarted = true;
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    };

    const requestDeviceOrientationPermission = () => {
      const DeviceOrientationEventWithPermission = window.DeviceOrientationEvent as
        | IDeviceOrientationEventWithPermission
        | undefined;

      DEVICE_ORIENTATION_PERMISSION_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, requestDeviceOrientationPermission);
      });

      if (!DeviceOrientationEventWithPermission?.requestPermission) {
        startDeviceOrientation();
        return;
      }

      void DeviceOrientationEventWithPermission.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            startDeviceOrientation();
          }
        })
        .catch(() => {
          engine.gravity.x = 0;
          engine.gravity.y = config.gravity;
        });
    };

    DEVICE_ORIENTATION_PERMISSION_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, requestDeviceOrientationPermission, { once: true });
    });
    startDeviceOrientation();

    const updateBounds = (width: number, height: number) => {
      if (wallsRef.current.length > 0) {
        Composite.remove(engine.world, wallsRef.current);
      }

      const thickness = WALL_THICKNESS;
      const ceiling = Bodies.rectangle(
        width / 2,
        -thickness / 2,
        width + thickness * 2,
        thickness,
        {
          isStatic: true,
          restitution: config.restitution,
          friction: 0.02,
        },
      );
      const floor = Bodies.rectangle(
        width / 2,
        height + thickness / 2,
        width + thickness * 2,
        thickness,
        {
          isStatic: true,
          restitution: config.restitution,
          friction: 0.02,
        },
      );
      const leftWall = Bodies.rectangle(
        -thickness / 2,
        height / 2,
        thickness,
        height + thickness * 2,
        {
          isStatic: true,
          restitution: config.restitution,
        },
      );
      const rightWall = Bodies.rectangle(
        width + thickness / 2,
        height / 2,
        thickness,
        height + thickness * 2,
        {
          isStatic: true,
          restitution: config.restitution,
        },
      );

      wallsRef.current = [ceiling, floor, leftWall, rightWall];
      Composite.add(engine.world, wallsRef.current);
    };

    const updateObstacle = () => {
      const obstacleElement = obstacleRef?.current;
      if (!obstacleElement) {
        if (obstacleBodyRef.current) {
          Composite.remove(engine.world, obstacleBodyRef.current);
          obstacleBodyRef.current = null;
        }
        return;
      }

      const rect = obstacleElement.getBoundingClientRect();
      const collisionPadding = config.collisionPadding;
      const width = Math.max(rect.width + collisionPadding * 2, 1);
      const height = Math.max(rect.height + collisionPadding * 2, 1);
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      if (!obstacleBodyRef.current) {
        obstacleBodyRef.current = Bodies.rectangle(x, y, width, height, {
          isStatic: true,
          restitution: 0.74,
          friction: 0.02,
          chamfer: { radius: 28 + collisionPadding * 0.2 },
        });
        obstacleSizeRef.current = { width, height };
        Composite.add(engine.world, obstacleBodyRef.current);
        return;
      }

      Body.setPosition(obstacleBodyRef.current, { x, y });

      const previousSize = obstacleSizeRef.current;
      if (
        Math.abs(previousSize.width - width) > 0.5 ||
        Math.abs(previousSize.height - height) > 0.5
      ) {
        Body.scale(
          obstacleBodyRef.current,
          width / Math.max(previousSize.width, 1),
          height / Math.max(previousSize.height, 1),
        );
        obstacleSizeRef.current = { width, height };
      }
    };

    const createToolBody = (index: number, width: number, height: number): IToolBody => {
      const seededTool = seededTools[index];
      const body = Bodies.rectangle(0, 0, config.itemSize, config.itemSize, {
        restitution: config.restitution,
        friction: 0.01,
        frictionAir: config.frictionAir,
        chamfer: { radius: 8 },
      });

      respawnBody(body, width, height);

      return {
        id: seededTool!.id,
        label: seededTool!.label,
        Icon: seededTool!.Icon,
        accentClassName: seededTool!.accentClassName,
        body,
        size: config.itemSize,
      };
    };

    const syncDomPositions = () => {
      toolBodiesRef.current.forEach((tool, index) => {
        const node = itemRefs.current[index];

        if (!node) {
          return;
        }

        node.style.transform = `translate(${tool.body.position.x - tool.size / 2}px, ${
          tool.body.position.y - tool.size / 2
        }px) rotate(${tool.body.angle}rad)`;
      });
    };

    const setScene = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      Composite.clear(engine.world, false);
      obstacleBodyRef.current = null;
      obstacleSizeRef.current = { width: 0, height: 0 };
      updateBounds(width, height);
      updateObstacle();

      toolBodiesRef.current = seededTools.map((_, index) => {
        return createToolBody(index, width, height);
      });

      Composite.add(
        engine.world,
        toolBodiesRef.current.map(({ body }) => {
          return body;
        }),
      );
      syncDomPositions();
    };

    setScene();

    const resizeObserver = new ResizeObserver(() => {
      setScene();
    });
    resizeObserver.observe(container);
    if (obstacleRef?.current) {
      resizeObserver.observe(obstacleRef.current);
    }

    let lastTime = performance.now();
    const tick = (time: number) => {
      const delta = Math.min(time - lastTime, 32);
      lastTime = time;
      updateObstacle();
      Engine.update(engine, delta);
      syncDomPositions();

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    startTimeoutRef.current = window.setTimeout(() => {
      animationFrameRef.current = window.requestAnimationFrame(tick);
    }, config.startDelayMs);

    return () => {
      window.clearTimeout(startTimeoutRef.current);
      window.cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      DEVICE_ORIENTATION_PERMISSION_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, requestDeviceOrientationPermission);
      });
      resizeObserver.disconnect();
      Composite.clear(engine.world, false);
      engineRef.current = null;
      toolBodiesRef.current = [];
      wallsRef.current = [];
      obstacleBodyRef.current = null;
    };
  }, [
    config.count,
    config.frictionAir,
    config.gravity,
    config.tiltSensitivity,
    config.itemSize,
    config.items,
    config.startDelayMs,
    config.collisionPadding,
    config.restitution,
    obstacleRef,
    seededTools,
  ]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {seededTools.map(({ id, label, Icon, accentClassName }, index) => {
        return (
          <div
            key={id}
            className="absolute"
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            style={{
              width: config.itemSize,
              height: config.itemSize,
              transform: "translate(-9999px, -9999px)",
              willChange: "transform",
            }}
          >
            <div className="flex h-full w-full items-center justify-center rounded-xl border border-white/10 bg-[#0b1020]/34 shadow-[0_12px_28px_rgba(0,0,0,0.22)] backdrop-blur-[3px]">
              <Icon className={`size-5 ${accentClassName ?? "text-slate-200/80"}`} />
              <span className="sr-only">{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { FallingTools };
