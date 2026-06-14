<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/main.css'
	import Marquee from "$lib/components/Marquee.svelte";
    import DotBackground from '$lib/components/DotBackground.svelte';
    import Footer from '$lib/components/Footer.svelte';
	
	let { children } = $props();

	
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<!-- <DotBackground></DotBackground> -->
<main>
    {@render children()}
</main>
<Footer></Footer>

<style>
    main {
        width:100vw;
        height: 100vh;
        box-sizing: border-box;
        z-index: 5;
        position: relative;
        
        overscroll-behavior-x: none;
        background-position-x: center;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect x='19' y='19' width='2' height='2'/%3E%3C/svg%3E");

    }
</style>