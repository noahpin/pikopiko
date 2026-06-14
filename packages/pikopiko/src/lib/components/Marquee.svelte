<div class="marquee">
    <div class="a">
        pikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopikopiko
    </div>
</div>

<style>
    @keyframes infin {
        0% {
            transform: translateX(-5%);
        }
        100% {
            transform: translateX(-15%);
        }
    }
    .a {
        width: fit-content;
        animation: 3s linear infinite running infin;
        font-size: 40px;
        user-select: none;
        color: white;
        margin: 0;
        font-family: "Getai";
        font-style: normal;
    }
    .marquee {
        background: black;
        width: 100%;
        overflow: hidden;
        padding: 10px;
        padding-top: 12px;
        box-sizing: border-box;
        position:relative;
        z-index: 5;
    }
</style>
