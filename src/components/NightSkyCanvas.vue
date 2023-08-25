<script setup lang='ts'>
import { onMounted } from 'vue';
import { STAR_COLOR } from '../CONSTANTS';
import { MiniStar } from '../models/MiniStar';
import { Star } from '../models/Star';
import * as utils from '../utils';
import { createFloor, createMountains, resizeCanvas } from '../utils/canvas-utils';

const backgroundStarsArray: Star[] = []
const starsArray: Star[] = []
const miniStarsArray: MiniStar[] = []



function addBackgroundStars(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, numberOfStars: number = 150) {
    backgroundStarsArray.length = 0
    for (let i = 0; i < numberOfStars; i++) {
        const x = utils.getRandomNumberInRange(0, canvas.width)
        const y = utils.getRandomNumberInRange(0, canvas.height)
        const radius = Math.random() * 1.5
        const star = new Star(canvas, ctx, x, y, radius, '#F0F0F0', 0.15, 0, !true)

        star.update = function () {
            star.x += star.velocityX
            if (star.hasPassedRightSide()) {
                star.x = -star.radius
                star.y = utils.getRandomNumberInRange(0, canvas.height)
            }
            this.draw()
        }
        backgroundStarsArray.push(star)
    }
}

function addStar(num: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < num; i++) {
        const x = utils.getRandomNumberInRange(0, canvas.width)
        const y = -100
        const radius = utils.getRandomNumberInRange(8, 12)
        const velX = utils.getRandomNumberInRange(-4, 4)
        const velY = utils.getRandomNumberInRange(1, 4)
        const star = new Star(canvas, ctx, x, y, radius, STAR_COLOR, velX, velY, true)

        starsArray.push(star)
    }
}

function shatterStar(star: Star, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < 10; i++) {
        const velocity = {
            x: utils.getRandomNumberInRange(-5, 5),
            y: utils.getRandomNumberInRange(-15, 15)
        }

        const miniStar = new MiniStar(canvas, ctx, star.x, star.y, 1.25, velocity.x, velocity.y)
        miniStar.draw()
        miniStarsArray.push(miniStar)
    }
}


onMounted(() => {
    const canvas = document.querySelector('canvas')!
    const ctx = canvas.getContext('2d')!

    window.addEventListener('resize', function () {
        init()
    })

    function init() {
        resizeCanvas(canvas)
        starsArray.length = 0
        miniStarsArray.length = 0
        addStar(2, canvas, ctx)
        addBackgroundStars(canvas, ctx, 160)
    }


    const skyColor = (function () {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#040720');    // Top color
        gradient.addColorStop(0.5, '#0B0E2B');  // Mid-top color
        gradient.addColorStop(1, '#15214D');  // Mid-bottom color
        return gradient
    })()








    function addMoutainsAndFloor() {
        const tenPercentOfCanvasWidth = 0.1 * canvas.width
        const canvasHeight = canvas.height
        const canvasWidth = canvas.width

        createMountains(canvas, ctx, 1, -tenPercentOfCanvasWidth, canvasWidth + tenPercentOfCanvasWidth, canvasHeight / 2, '#07112A')
        createMountains(canvas, ctx, 2, -tenPercentOfCanvasWidth, canvasWidth + tenPercentOfCanvasWidth, canvasHeight / 3, '#151A38')
        createMountains(canvas, ctx, 3, -tenPercentOfCanvasWidth, canvasWidth + tenPercentOfCanvasWidth, canvasHeight / 4, '#121A32')


        createFloor(canvas, ctx)
    }

    function updateBackgroundStars() {
        backgroundStarsArray.forEach(star => {
            star.update()
        })
    }

    function updateFallingStars() {
        starsArray.forEach((star, index) => {
            star.update(() => shatterStar(star, canvas, ctx))

            if (star.radius <= 3) {
                starsArray.splice(index, 1)
            }
        })
    }

    function updateMiniStars() {
        miniStarsArray.forEach((star, index) => {
            star.update()

            if (star.ttl <= 0) {
                miniStarsArray.splice(index, 1)
            }
        })
    }



    let lastTime = performance.now()
    let frameCount = 0
    let fps = 0

    function animate() {


        ctx.fillStyle = skyColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)


        updateBackgroundStars()
        addMoutainsAndFloor()
        updateFallingStars()
        updateMiniStars()

        if (starsArray.length < 2) {
            // addStar(1, canvas, ctx)
        }

        frameCount++
        const currentTime = performance.now()
        const deltaTime = currentTime - lastTime

        if (deltaTime >= 1000) {
            lastTime = performance.now()
            fps = Math.round((frameCount * 1000 / deltaTime))
            frameCount = 0
        }

        ctx.fillStyle = 'white'
        ctx.font = "120px monospace";
        ctx.strokeStyle = 'white'
        ctx.strokeText(`FPS:${fps}`, 10, 120)
        // ctx.fillText(`FPS:${fps}`, 10, 120)

        requestAnimationFrame(animate)
    }


    init()

    animate()
})
</script>

<template>
    <div>
        <canvas></canvas>
    </div>
</template>

<style>
canvas {
    border: 1px solid black;
    background-color: black;
    filter: blur(1px);
}
</style>