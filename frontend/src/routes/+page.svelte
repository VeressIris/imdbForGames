<script>
	import '../style.css';
	import { authClient } from '$lib/auth-client';
	const session = authClient.useSession();
</script>

<div class="flex flex-col justify-center items-center">
	{#if $session.data}
		<h1 class="text-2xl font-bold mb-4">Welcome, {$session.data.user.name}</h1>
	{:else}
		<form>
			<input
				type="text"
				placeholder="Enter your name"
				class="input input-bordered w-full max-w-xs mb-4"
			/>
			<input
				type="text"
				placeholder="Enter your email"
				class="input input-bordered w-full max-w-xs mb-4"
			/>
			<input
				type="password"
				placeholder="Enter your password"
				class="input input-bordered w-full max-w-xs mb-4"
			/>
			<br />
			<button
				class="btn"
				on:click={async () => {
					await authClient.signUp.email({
						email: 'test1@example2.com',
						password: 'password1234',
						name: 'testtt',
						description: 'this is a description'
					});
				}}>signUp</button
			>
		</form>
	{/if}
</div>
