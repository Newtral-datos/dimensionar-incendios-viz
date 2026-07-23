// Ciudades de referencia sobre las que superponer el incendio.
// center: [lon, lat] del punto que se usará como centro de comparación.
export const cities = [
	// Sin `center`: no se traslada el polígono, se muestra en su posición
	// geográfica real (ver App.svelte / geo.js#realCenter).
	{ id: 'real', name: 'Ubicación real', real: true, zoom: 10 },
	{ id: 'madrid', name: 'Madrid', center: [-3.70379, 40.41678], zoom: 10 },
	{ id: 'barcelona', name: 'Barcelona', center: [2.17743, 41.38879], zoom: 10 },
	{ id: 'valencia', name: 'Valencia', center: [-0.37545, 39.46975], zoom: 10 },
	{ id: 'sevilla', name: 'Sevilla', center: [-5.99263, 37.38863], zoom: 10 },
	{ id: 'zaragoza', name: 'Zaragoza', center: [-0.87734, 41.65606], zoom: 10 },
	{ id: 'bilbao', name: 'Bilbao', center: [-2.92528, 43.26301], zoom: 10 },
	{ id: 'malaga', name: 'Málaga', center: [-4.42134, 36.72161], zoom: 10 }
];
