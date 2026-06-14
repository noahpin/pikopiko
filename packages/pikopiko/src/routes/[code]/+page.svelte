<script lang="ts">
	import { dev } from '$app/environment';
	import PartySocket from 'partysocket';
	import { page } from '$app/state';
	import { onDestroy, onMount } from 'svelte';
	import { beforeNavigate, goto } from '$app/navigation';
	import type { BroadcastMessage, BroadcastData, PlayerConfig } from '@pikopiko/piko-types';
	import PikoPal from '$lib/components/PikoPal.svelte';
	import Button from '$lib/components/Button.svelte';
	let roomCode = $derived(page.params['code']);
	$inspect(page);

	let ws: PartySocket;
	let playerId = $state('');
	let playerIds: string[] = $state([]);
	let activeIds: string[] = $state([]);
	let hostId: string = $state('');
	let playerConfigs: PlayerConfig[] = $state([]);

	let selfName = $state('');
	let avatarHash = $derived(playerId);

	onMount(() => {
		if (roomCode == null) return;
		let id = localStorage.getItem(roomCode);
		if (!id) {
			let genId = crypto.randomUUID();
			id = genId;
			localStorage.setItem(roomCode, genId);
		}
		playerId = id;

		ws = new PartySocket({
			host: dev ? 'localhost:8787' : 'party.pikopiko.xyz',
			room: roomCode,
			party: 'piko-server',
			id: id
		});
		ws.onmessage = onMessage;
	});
	function onMessage(m: MessageEvent) {
		console.log(m);
		let _d: BroadcastMessage = JSON.parse(m.data);

		switch (_d.broadcast_code) {
			case 'PLAYER_LIST': {
				const data: BroadcastData<'PLAYER_LIST'> = _d.data as BroadcastData<'PLAYER_LIST'>;
				playerIds = data.player_ids;
				activeIds = data.active_ids;
				break;
			}
			case 'PLAYER_MESSAGE': {
				const data: BroadcastData<'PLAYER_MESSAGE'> = _d.data as BroadcastData<'PLAYER_MESSAGE'>;

				console.log(`Message from ${data.playerId}: ${data.message}`);
				break;
			}
			case 'HOST_IDENTIFIER': {
				const data: BroadcastData<'HOST_IDENTIFIER'> = _d.data as BroadcastData<'HOST_IDENTIFIER'>;
				hostId = data.hostId;
				break;
			}
			case 'PLAYER_CONFIG_LIST': {
				const data: BroadcastData<'PLAYER_CONFIG_LIST'> =
					_d.data as BroadcastData<'PLAYER_CONFIG_LIST'>;
				console.log(data);
				playerConfigs = data.playerConfigs;
				let self = playerConfigs.find((c) => c.playerId == playerId);
				if (self != null) {
					if (selfName == '') {
						selfName = self.name;
					}
				}
				break;
			}
			default: {
				break;
			}
		}
	}
	let playerDebounceTimeout: NodeJS.Timeout;
	function updatePlayerName(e: InputEvent) {
		if (!ws) return;
		clearTimeout(playerDebounceTimeout);
		playerDebounceTimeout = setTimeout(() => {
			let message: BroadcastMessage<'PLAYER_CONFIG_SET'> = {
				broadcast_code: 'PLAYER_CONFIG_SET',
				data: {
					playerId: playerId,
					name: selfName,
					avatarHash: avatarHash
				}
			};
			ws.send(JSON.stringify(message));
		}, 200);
	}
	function rerollGuy() {
		if (!ws) return;
		avatarHash = crypto.randomUUID();
		let message: BroadcastMessage<'PLAYER_CONFIG_SET'> = {
			broadcast_code: 'PLAYER_CONFIG_SET',
			data: {
				playerId: playerId,
				name: selfName,
				avatarHash: avatarHash
			}
		};
		ws.send(JSON.stringify(message));
	}
	beforeNavigate(() => {
		if (ws) ws.close();
	});
</script>

<div class="lobby-layout">
	<div class="player-list">
		{#each playerIds as id}
			{@const playerConfig = playerConfigs.find((c) => c.playerId == id)}
			<div class="player" class:loading={playerConfig == null}>
				{#if playerConfig}
					{#key playerConfig.avatarHash}
						<PikoPal seed={playerConfig.avatarHash}></PikoPal>
					{/key}
					{playerConfig.name != '' ? playerConfig.name : 'Player'}
				{:else}
				    Player
				{/if}
			</div>
		{/each}
	</div>

	<div class="lobby-options">
		<input
			maxlength="10"
			bind:value={selfName}
			oninput={updatePlayerName as any}
			type="text"
			placeholder="name"
		/>
		<Button looptext="reroll★" onclick={rerollGuy}>reroll guy</Button>
	</div>
</div>

<style>
	.player-list {
		display: flex;
	}
	.player {
	display: flex;
	flex-direction: column;
	font-size: 24px;
	align-items: center;
	gap: 12px;
	filter: drop-shadow(5px 0 0 white) drop-shadow(-5px 0 0 white) drop-shadow( 0 5px 0 white) drop-shadow( 0 -5px 0 white);
	}

	.lobby-options {
		width: 100%;
		max-width: 600px;
		flex-basis: 350px;
		flex-grow: 1;
		height: 200px;
		filter: drop-shadow(5px 0 0 white) drop-shadow(-5px 0 0 white) drop-shadow(0 5px 0 white)
			drop-shadow(0 -5px 0 white);
		display: flex;
		justify-content: center;
		flex-direction: column;
		gap: 20px;
	}

	.lobby-layout {
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
</style>
