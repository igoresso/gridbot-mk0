<script lang="ts">
	import { onMount } from 'svelte';
	import { Controls } from '$lib/components';
	import '../app.postcss';

	let innerWidth: number;
	let isModalOpen = false;

	onMount(() => {
		isModalOpen = innerWidth < 1024;
	});

	const toggleModal = (open: boolean): void => {
		isModalOpen = open;
	};
</script>

<svelte:window bind:innerWidth />

<header class="mb-4">
	<h1 class="text-center text-3xl font-bold text-gray-800 sm:text-5xl">
		<a href="https://github.com/igoresso/gridbot-mk0" target="_blank" rel="noopener noreferrer">
			🤖 GridBot-MK0
		</a>
	</h1>
</header>

<main class="relative grid place-content-center">
	<slot />
</main>

<footer class="mt-2">
	<p class="text-center text-gray-600">
		Made with <span class="text-accent">♥ </span> by
		<a href="https://github.com/igoresso" target="_blank" rel="noopener noreferrer">@igoresso</a>
	</p>
</footer>

<dialog id="modal" class="modal" class:modal-open={isModalOpen}>
	<div class="modal-box w-auto">
		<button
			class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
			on:click={() => toggleModal(false)}
			aria-label="Close modal"
		>
			✕
		</button>
		<Controls />
	</div>
	<div class="modal-backdrop">
		<button on:click={() => toggleModal(false)}>Close modal</button>
	</div>
</dialog>
