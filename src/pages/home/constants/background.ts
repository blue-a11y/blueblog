import { fallingToolItems } from "@/pages/home/constants/falling-tools";
import type { GrainientProps, IFallingToolsConfig } from "@/pages/home/types/background";

// Grainient parameters for the full-page backdrop. Tune these values to adjust
// palette, motion speed, warp, and grain without editing the background view.
const homeBackgroundConfig: GrainientProps = {
  color1: "#4b4b82",
  color2: "#392a7a",
  color3: "#7d92b5",
  timeSpeed: 1.15,
  colorBalance: 0,
  warpStrength: 1,
  warpFrequency: 5,
  warpSpeed: 2,
  warpAmplitude: 50,
  blendAngle: 0,
  blendSoftness: 0.05,
  rotationAmount: 500,
  noiseScale: 2,
  grainAmount: 0.1,
  grainScale: 2,
  grainAnimated: false,
  contrast: 1.5,
  gamma: 1,
  saturation: 1,
  centerX: 0,
  centerY: 0,
  zoom: 0.9,
};

// Physics config for the background icon layer. Adjust count, gravity, and
// bounce here to tune the motion without editing the rendering component.
const homeFallingToolsConfig: IFallingToolsConfig = {
  items: fallingToolItems,
  count: 14,
  itemSize: 46,
  startDelayMs: 1000,
  gravity: 0.72,
  tiltSensitivity: 55,
  restitution: 0.82,
  frictionAir: 0.012,
  collisionPadding: 0,
};

export { homeBackgroundConfig, homeFallingToolsConfig };
