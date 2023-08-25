import { FLOOR_HEIGHT } from "../CONSTANTS"

export class Particle {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    radius: number
    velocityX: number
    velocityY: number
    color: string
    hasShadow: boolean
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, velocityX: number, velocityY: number, hasShadow: boolean = false) {
        this.canvas = canvas
        this.ctx = ctx
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocityX = velocityX
        this.velocityY = velocityY
        this.hasShadow = hasShadow
    }

    draw() {
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = this.color

        if (this.hasShadow) {
            this.ctx.shadowColor = this.color
            this.ctx.shadowBlur = 4
        }
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.restore()
    }

    isTouchingBottom() {
        return this.y + this.velocityY + this.radius >= this.canvas.height - FLOOR_HEIGHT
    }
    isTouchingLeftBorder() {
        return this.x - this.radius + this.velocityX <= 0
    }
    isTouchingRightBorder() {
        return this.x + this.velocityX + this.radius >= this.canvas.width
    }

    isTouchingSide() {
        return this.isTouchingLeftBorder() || this.isTouchingRightBorder()
    }

    hasPassedRightSide() {
        return this.x >= this.canvas.width
    }

    reduceRadius() {
        if (this.radius >= 3) {
            this.radius -= 2
        }
    }
}