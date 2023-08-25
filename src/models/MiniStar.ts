import { STAR_COLOR } from "../CONSTANTS";
import { Particle } from "./Particle";

const gravity = 0.2;
// const friction = 0.99

export class MiniStar extends Particle {
  ttl = 100;
  opacity = 1;
  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    velocityX: number,
    velocityY: number
  ) {
    const color = STAR_COLOR;

    super(canvas, ctx, x, y, radius, color, velocityX, velocityY, true);

    // this.ttl = utils.getRandomNumberInRange(100, 250)
  }

  update() {
    this.ttl--;

    if (this.isTouchingSide()) {
      this.velocityX *= -1;
    }

    if (this.isTouchingBottom()) {
      this.velocityY *= -1;
    } else {
      this.velocityY += gravity;
    }

    this.x += this.velocityX;
    this.y += this.velocityY;

    this.adjustOpacityAndColorAccordingToTTL();

    this.draw();
  }

  adjustOpacityAndColorAccordingToTTL() {
    this.opacity = this.opacity - 1 / this.ttl;

    super.color = `rgba(255, 255, 240, ${this.opacity})`;
  }
}
