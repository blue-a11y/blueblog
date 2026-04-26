import type { RefObject } from "react";
import { Grainient } from "@/components/ui/grainient";
import { homeBackgroundConfig } from "@/pages/home/constants/background";
import { FallingTools } from "@/pages/home/views/falling-tools";

type IBackgroundProps = {
  obstacleRef?: RefObject<HTMLElement | null>;
};

const Background = ({ obstacleRef }: IBackgroundProps) => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#070810]" />
      <Grainient className="absolute inset-0" {...homeBackgroundConfig} />
      <FallingTools obstacleRef={obstacleRef} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(6,8,12,0.1)_58%,rgba(2,3,7,0.5)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015)_0%,transparent_18%,transparent_82%,rgba(0,0,0,0.16)_100%)]" />
    </div>
  );
};

export { Background };
