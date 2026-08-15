<script>
	import Button from '../ui/button/button.svelte';
	import {
		NavigationMenuItem,
		NavigationMenuLink,
		NavigationMenuList,
		NavigationMenuRoot
	} from '../ui/navigation-menu';

	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'Distros', href: '/distros' }
	];
</script>

<header class="flex items-center justify-between p-4">
	<div>
		<h1 class="text-2xl font-bold">Distro Board</h1>
	</div>
	<div>
		<NavigationMenuRoot>
			<NavigationMenuList>
				{#each navItems as item (item.href)}
					<NavigationMenuItem>
						<NavigationMenuLink href={item.href}>{item.name}</NavigationMenuLink>
					</NavigationMenuItem>
				{/each}
			</NavigationMenuList>
		</NavigationMenuRoot>
	</div>
	<div>
		<Button variant="default" href="/login">Login</Button>
	</div>
</header>
