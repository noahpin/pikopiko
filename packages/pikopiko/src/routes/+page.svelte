<script lang="ts">
    import { goto } from "$app/navigation";
    import Button from "$lib/components/Button.svelte";
    function generateID() {
      let length = 4;
      let chars = "abcdefghijklmnopqrstuvwxyz"
      let str = "";
      for(let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)]
      }
      return str.toUpperCase()
    }
    function hostGame() {
      console.log(generateID())
      goto("/" + generateID());
    }
    let code = $state("")
    function joinGame() {
      
      goto("/" + code.toUpperCase());
    }

    function keyDown(e: KeyboardEvent) {
      if(e.key === "Enter") {
        joinGame();
      }
    }
</script>

<div class="homepage-layout">
    <div class="hero-content">
        <h1>pikopiko</h1>
        <h2>a party game(s)</h2>
    </div>
    <div class="homepage-options">
        <Button looptext="host→" onclick={hostGame}>host game →</Button>
        <div class="input-button">
            
            <input onkeyup={keyDown } bind:value={code} placeholder="game code" type="text">
            <Button looptext="join→" onclick={joinGame}>join game →</Button>
        </div>
    </div>
</div>

<style>
    .homepage-layout {
        width: 90%;
        max-width: 970px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        align-content: center;
        margin: auto;
        flex-wrap: wrap;
        gap: 20px 140px;
        box-sizing: border-box;
    }
    .hero-content {
        filter: drop-shadow(5px 0 0 white) drop-shadow(-5px 0 0 white) drop-shadow( 0 5px 0 white) drop-shadow( 0 -5px 0 white);
        flex-shrink: 1;
    }
    .homepage-options {
        width: 100%;
        max-width: 600px;
        flex-basis: 350px;
        flex-grow: 1;
        height: 200px;
        filter: drop-shadow(5px 0 0 white) drop-shadow(-5px 0 0 white) drop-shadow( 0 5px 0 white) drop-shadow( 0 -5px 0 white);
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
    }
    input[type="text"] {
        text-transform: uppercase;
    }
    input[type="text"]::placeholder {
        text-transform: lowercase;
    }
</style>