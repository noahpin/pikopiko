<script lang="ts">
    import chroma from "chroma-js";
    let {children, looptext="", onclick = ()=>{}}: {children: any, looptext?: string, onclick?: any} = $props();
    let hover = $state(false);
    let bgCol = $state("#000")
    let textCol = $state("#fff")
    let colors = [
      "#A6FF00", "#FFC800","#FF6600", "#FF0037", "#FF00EA", "#BB00FF", "#5500FF", "#00A6FF"
    ]
    function over() {
      hover = true;
      let i = Math.floor(Math.random() * colors.length);
      bgCol = colors[i];
      let bC = chroma.contrast(bgCol, "black")
      let wC = chroma.contrast(bgCol, "white")
      textCol = bC > wC ? "black" : "white"
    }
    function out() {
      hover = false;
    }
</script>

<button class:loop-hover={looptext != ""} onclick={()=>{over(); onclick();}} style:--bg={bgCol} style:--text={textCol} class:hover={hover} onmouseover={over} onmouseout={out} onfocus={()=>{}} onblur={()=>{}}>
    <div class="looptext">{#each new Array(20) as _}{looptext}{/each}</div>
    {@render children()}
</button>

<style>
    button {
        position: relative;
        overflow: hidden;
    }
    button.hover {
        background: var(--bg);
        color: var(--text)
    }
    .loop-hover.hover {
        color: transparent;
    }
    .hover .looptext {
        opacity: 1;
    }
    .looptext {
        position: absolute;
        animation: 1s linear infinite running infin;
        color: var(--text);
        pointer-events: none;
        opacity: 0;
        line-height: 0;
        top: 50%;
    }
    @keyframes infin {
        0% {
            transform: translateX(-15%);
        }
        100% {
            transform: translateX(-5%);
        }
    }

    
    @keyframes solidRainbow {
        0% {
            background-color: #FFEC1F;
        } 
        24% {
            background-color: #ff8f07;
        } 
        43% {
            background-color: #ff0053ff;
        }
        60% {
            background-color: #bb33ff;
        } 
        79% {
            background-color: #0000ff;
        } 
        100% {
            background-color: #00e1ff;
        }
    }

</style>