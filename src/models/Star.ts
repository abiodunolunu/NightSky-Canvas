import { Particle } from "./Particle"

const gravity = 1
const friction = 0.9


export class Star extends Particle {
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, velocityX: number, velocityY: number, hasShadow: boolean = false) {
        super(canvas, ctx, x, y, radius, color, velocityX, velocityY, hasShadow)
    }

    public update(callback?: () => void): void {
        if (this.isTouchingBottom()) {
            this.velocityY *= -friction
            this.reduceRadius()


            if (callback) {
                callback()
            }
        } else {
            this.velocityY += gravity
        }

        if (this.isTouchingSide()) {
            this.reduceRadius()
            this.velocityX *= -friction

            if (callback) {
                callback()
            }
        }

        this.x += this.velocityX
        this.y += this.velocityY
        this.draw()
    }


}