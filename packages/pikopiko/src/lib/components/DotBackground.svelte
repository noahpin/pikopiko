<script lang="ts">
    import { onMount } from "svelte";
    import chroma from "chroma-js";

    let gap = 25;
    let baseSize = 1;
    let fullSize = 10;
    let windowWidth = 0;
    let windowHeight = 0;
    let xInstances = 0;
    let yInstances = 0;
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    let allowRender = true;
    console.log(noise);
    let scroll = 0;
    let mouseX = 0;
    let mouseY = 0;
    let radius = 250;
    onMount(() => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        xInstances = Math.ceil(windowWidth / gap);
        yInstances = Math.ceil(windowHeight / gap);

        canvas.height = yInstances * gap;
        canvas.width = xInstances * gap;
        ctx = canvas.getContext("2d");

        render();
    });
    function lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    function render() {
        if (ctx == null) {
            requestAnimationFrame(render);
            return;
        }
        scroll += 0.01;
        ctx.clearRect(0, 0, xInstances * gap, yInstances * gap);
        for (let x = 0; x <= xInstances; x++) {
            for (let y = 0; y <= yInstances; y++) {
                let grayColor = chroma({ h: 0, s: 0, v: 1 / 2 + 0.5 }).hex();
                let rainbowColor = chroma({
                    h: (1 / 2 + 0.5) * 360,
                    s: 0.75,
                    v: 1,
                });
                ctx.fillStyle = rainbowColor.hex();
                let xPos = x * gap - gap / 2;
                let yPos = y * gap - gap / 2;
                let distance = Math.sqrt(
                    Math.pow(xPos - mouseX, 2) + Math.pow(yPos - mouseY, 2),
                );
                let t = Math.max(1 - distance / radius, 0);
                let size = lerp(baseSize, fullSize, t);
                ctx.fillRect(xPos - size / 2, yPos - size / 2, size, size);
            }
        }
        if (!allowRender) return;
        requestAnimationFrame(render);
    }
</script>

<svelte:window
    onpointermove={(e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }}
/>
<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }
</style>
