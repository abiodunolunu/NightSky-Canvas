import { FLOOR_HEIGHT } from "../CONSTANTS";

export function resizeCanvas(canvas: HTMLCanvasElement) {
  canvas.width = innerWidth - 2;
  canvas.height = innerHeight - 8;
}

export function createFloor(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.beginPath();
  ctx.rect(0, canvas.height, canvas.width, -FLOOR_HEIGHT);
  ctx.fillStyle = "#07112A";
  ctx.fill();
  ctx.closePath();
}

export function createMountains(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  numberOfMountains: number,
  offsetX: number,
  endX: number,
  height: number,
  color: string | CanvasGradient
) {
  const bottom = canvas.height;
  const peakOfMountain = bottom - height;
  const widthOfAMountain = (endX - offsetX) / numberOfMountains;

  ctx.beginPath();
  ctx.moveTo(offsetX, bottom);

  for (let i = 0; i < numberOfMountains; i++) {
    const startX = widthOfAMountain * i + offsetX;
    const midX = startX + widthOfAMountain / 2;
    const endX = startX + widthOfAMountain;
    ctx.lineTo(startX, bottom);
    ctx.lineTo(midX, peakOfMountain);
    ctx.lineTo(endX, bottom);
  }

  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
