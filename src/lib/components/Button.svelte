<script lang="ts">
    import chroma from "chroma-js";
    let {children, onclick = ()=>{}}: {children: any, onclick?: any} = $props();
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

<button onclick={onclick} style:--bg={bgCol} style:--text={textCol} class:hover={hover} onmouseover={over} onmouseout={out} onfocus={()=>{}} onblur={()=>{}}>
    {@render children()}
</button>

<style>
    button.hover {
        background: var(--bg);
        color: var(--text)
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