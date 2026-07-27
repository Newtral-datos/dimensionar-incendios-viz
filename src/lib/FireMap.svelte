<script>
	import { onMount, onDestroy } from 'svelte';
	import { Map as MapLibreMap, NavigationControl, setWorkerUrl } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { boundsOf } from './geo.js';

	// maplibre-gl-worker.mjs importa por ruta relativa fija a
	// "./maplibre-gl-shared.mjs", así que no puede pasar por el pipeline de
	// hashing de Vite (`?url` solo copiaría el primero y rompería esa
	// import). Ambos ficheros se copian tal cual a public/ en cada
	// `npm install` (ver scripts/copy-maplibre-worker.mjs) y se sirven aquí
	// como estáticos, con el `base` de Vite aplicado a mano.
	setWorkerUrl(`${import.meta.env.BASE_URL}maplibre-gl-worker.mjs`);

	const FIRE_COLOR = '#FF2A01';

	let { geojson, center, zoom = 10, pickMode = false, onPick = null } = $props();

	let mapContainer;
	let map;
	let mapReady = $state(false);

	const SOURCE_ID = 'fire';
	const FILL_LAYER_ID = 'fire-fill';
	const LINE_LAYER_ID = 'fire-line';

	onMount(() => {
		map = new MapLibreMap({
			container: mapContainer,
			style: {
				version: 8,
				sources: {
					osm: {
						type: 'raster',
						tiles: [
							'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
							'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
							'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
						],
						tileSize: 256,
						attribution:
							'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
					}
				},
				layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
			},
			center,
			zoom
		});

		map.addControl(new NavigationControl(), 'top-right');

		map.on('load', () => {
			mapReady = true;
		});

		map.on('click', (e) => {
			if (!pickMode) return;
			onPick?.([e.lngLat.lng, e.lngLat.lat]);
		});

		return () => map.remove();
	});

	$effect(() => {
		if (!map || !mapReady) return;
		map.getCanvas().style.cursor = pickMode ? 'crosshair' : '';
	});

	function syncFireLayer() {
		if (!map || !mapReady || !geojson) return;

		const source = map.getSource(SOURCE_ID);
		if (source) {
			source.setData(geojson);
		} else {
			map.addSource(SOURCE_ID, { type: 'geojson', data: geojson });
			map.addLayer({
				id: FILL_LAYER_ID,
				type: 'fill',
				source: SOURCE_ID,
				paint: { 'fill-color': FIRE_COLOR, 'fill-opacity': 0.5 }
			});
			map.addLayer({
				id: LINE_LAYER_ID,
				type: 'line',
				source: SOURCE_ID,
				paint: { 'line-color': FIRE_COLOR, 'line-width': 2 }
			});
		}

		const [minX, minY, maxX, maxY] = boundsOf(geojson);
		const isMobile = window.matchMedia('(max-width: 640px)').matches;
		const padding = isMobile
			? { top: 70, bottom: window.innerHeight * 0.62 + 24, left: 32, right: 32 }
			: { top: 96, bottom: 48, left: 340, right: 64 };

		map.fitBounds(
			[
				[minX, minY],
				[maxX, maxY]
			],
			{ padding, duration: 800 }
		);
	}

	$effect(() => {
		geojson;
		mapReady;
		syncFireLayer();
	});

	onDestroy(() => {
		if (map) map.remove();
	});
</script>

<div class="map" bind:this={mapContainer}></div>

<style>
	.map {
		position: absolute;
		inset: 0;
	}
</style>
