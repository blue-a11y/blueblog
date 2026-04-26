import type { ComponentType } from "react";
import type { GrainientProps } from "@/components/ui/grainient";

type IFallingTool = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  accentClassName?: string;
};

type IFallingToolsConfig = {
  items: readonly IFallingTool[];
  count: number;
  itemSize: number;
  startDelayMs: number;
  gravity: number;
  restitution: number;
  frictionAir: number;
  collisionPadding: number;
};

export type { GrainientProps, IFallingTool, IFallingToolsConfig };
