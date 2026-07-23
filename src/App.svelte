<script>
	import FireMap from './lib/FireMap.svelte';
	import ControlPanel from './lib/ControlPanel.svelte';
	import { fires, fireGroups } from './lib/fires.js';
	import { cities } from './lib/cities.js';
	import { recenterGeoJSON, areaHectares, realCenter } from './lib/geo.js';

	// Rutas a /public/*: hay que anteponer el base path (vacío en dev, el
	// subpath del repo en el build de GitHub Pages, ver vite.config.js).
	const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

	let selectedGroupId = $state(fireGroups[0].id);
	let selectedFireId = $state(
		fires.find((f) => f.group === fireGroups[0].id)?.id ?? fires[0].id
	);
	let selectedCityId = $state(cities.find((c) => c.real)?.id ?? cities[0].id);

	// Modo "Elige un punto en el mapa": independiente del desplegable de
	// ciudad, se activa con su propio botón.
	let pickModeActive = $state(false);
	let clickedPoint = $state(null);

	// Elegir una ciudad del desplegable sale del modo de selección por clic.
	$effect(() => {
		selectedCityId;
		pickModeActive = false;
	});

	let rawGeojson = $state(null);
	let loadedFireId = $state(null);

	const firesInGroup = $derived(fires.filter((f) => f.group === selectedGroupId));

	// Si se cambia de grupo y el incendio elegido no pertenece a él, selecciona
	// el primero (el más grande) del nuevo grupo.
	$effect(() => {
		if (firesInGroup.length && !firesInGroup.some((f) => f.id === selectedFireId)) {
			selectedFireId = firesInGroup[0].id;
		}
	});

	const selectedFire = $derived(fires.find((f) => f.id === selectedFireId));
	const selectedCity = $derived(cities.find((c) => c.id === selectedCityId));

	$effect(() => {
		const fire = selectedFire;
		if (!fire) return;
		fetch(asset(fire.file))
			.then((res) => res.json())
			.then((data) => {
				rawGeojson = data;
				loadedFireId = fire.id;
			});
	});

	const fireLoaded = $derived(rawGeojson && loadedFireId === selectedFireId);

	// En modo "elige un punto" sin clic todavía, o en "ubicación real", el
	// incendio se muestra sin trasladar.
	const usesRealPosition = $derived(
		pickModeActive ? !clickedPoint : !!selectedCity?.real
	);
	const targetCenter = $derived(
		pickModeActive ? clickedPoint : (selectedCity?.center ?? null)
	);

	const displayGeojson = $derived(
		fireLoaded && selectedCity
			? usesRealPosition
				? rawGeojson
				: recenterGeoJSON(rawGeojson, targetCenter)
			: null
	);

	const mapCenter = $derived(
		fireLoaded && selectedCity
			? usesRealPosition
				? realCenter(rawGeojson)
				: targetCenter
			: [-3.7, 40.4]
	);

	const areaHa = $derived(displayGeojson ? areaHectares(displayGeojson) : null);
	const fireProps = $derived(rawGeojson?.features?.[0]?.properties ?? null);

	const noteMode = $derived(
		pickModeActive
			? clickedPoint
				? 'click-set'
				: 'click-pending'
			: selectedCity?.real
				? 'real'
				: 'city'
	);

	function handleMapClick(lngLat) {
		if (pickModeActive) clickedPoint = lngLat;
	}
</script>

<main>
	<FireMap
		geojson={displayGeojson}
		center={mapCenter}
		zoom={selectedCity?.zoom ?? 10}
		pickMode={pickModeActive}
		onPick={handleMapClick}
	/>

	<header>
		<span class="eyebrow">Dimensiona los incendios en las grandes ciudades</span>
		<img class="logo" src={asset('logo_newtral.png')} alt="Newtral" />
	</header>

	<ControlPanel
		bind:selectedGroupId
		bind:selectedFireId
		bind:selectedCityId
		bind:pickModeActive
		{fireGroups}
		fires={firesInGroup}
		{areaHa}
		{fireProps}
		{noteMode}
	/>
</main>

<style>
	main {
		position: fixed;
		inset: 0;
	}

	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 14px 20px;
		padding-top: calc(14px + env(safe-area-inset-top));
		background: var(--card);
		border-bottom: 1px solid var(--border);
		box-shadow: 0 1px 0 rgba(22, 20, 14, 0.05);
	}

	.eyebrow {
		font-size: 14px;
		font-weight: 800;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: var(--ink);
	}

	.logo {
		height: 20px;
		width: auto;
		flex-shrink: 0;
		display: block;
	}

	@media (max-width: 640px) {
		.eyebrow {
			font-size: 12px;
		}

		.logo {
			height: 16px;
		}
	}
</style>
