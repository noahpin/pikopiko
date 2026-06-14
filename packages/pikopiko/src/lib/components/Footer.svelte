<script>
    import Marquee from "./Marquee.svelte";

</script>
<div class="footer">
    <Marquee></Marquee>
    <p>a party game(s) by <a href="https://noahp.xyz">noah p</a></p>
</div>
<style>
    .footer {
        background: black;
        box-sizing: border-box;
        position: relative;
        padding-bottom: 20px;
    }
    p {
        color: white;
        margin: auto;
        width: fit-content;
    }
    a {
        color: white;
        text-decoration: underline;
    }
    a:hover {
        text-decoration-style: wavy;
    }
</style>