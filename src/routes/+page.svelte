<script>
    import {dev} from "$app/environment";
    import Button from "$lib/components/Button.svelte";
    import PartySocket from "partysocket";

    const ws = new PartySocket({
      host: dev ? "localhost:1999" : "pikopiko.noahp.partykit.dev",
      room: "roomba",
    })

</script>

<div class="homepage-layout">
    <div class="hero-content">
        <h1>pikopiko</h1>
        <h2>a party game(s)</h2>
    </div>
    <div class="homepage-options">
        <Button>host game</Button>
        <div class="input-button">
            
            <input placeholder="game code" type="text">
            <Button>join game</Button>
        </div>
    </div>
</div>

<style>
    .homepage-layout {
        width: 90%;
        max-width: 1000px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        align-content: center;
        margin: auto;
        flex-wrap: wrap;
        gap: 20px 150px;
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
</style>