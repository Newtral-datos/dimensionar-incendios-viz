import { centroid, distance, bearing, destination, coordEach, area, bbox } from '@turf/turf';

// Traslada un GeoJSON (Feature o FeatureCollection) de polígonos para que su
// centroide coincida exactamente con `targetCenter` ([lon, lat]), conservando
// forma y tamaño reales (solo se traslada, nunca se reescala ni se rota).
//
// Cada vértice conserva su distancia y rumbo reales respecto al centroide
// original, y se recalcula desde el nuevo centro con destination() (cálculo
// geodésico). Usar transformTranslate en su lugar (misma distancia/rumbo
// para todos los vértices) desplaza el centroide varios km del objetivo en
// traslados largos, porque una traslación por rumbo constante no es una
// traslación rígida sobre una esfera.
export function recenterGeoJSON(geojson, targetCenter) {
	const from = centroid(geojson).geometry.coordinates;

	if (from[0] === targetCenter[0] && from[1] === targetCenter[1]) return geojson;

	const clone = JSON.parse(JSON.stringify(geojson));
	coordEach(clone, (coord) => {
		const d = distance(from, coord, { units: 'kilometers' });
		const b = bearing(from, coord);
		const [lon, lat] = destination(targetCenter, d, b, { units: 'kilometers' }).geometry
			.coordinates;
		coord[0] = lon;
		coord[1] = lat;
	});

	return clone;
}

export function areaHectares(geojson) {
	return area(geojson) / 10000;
}

export function boundsOf(geojson) {
	return bbox(geojson);
}

// Centro real del incendio, tomado de las propiedades del feature si existen
// (LATITUD/LONGITUD), o si no del centroide geométrico del polígono.
export function realCenter(geojson) {
	const props = geojson?.features?.[0]?.properties;
	if (props?.LONGITUD != null && props?.LATITUD != null) {
		return [props.LONGITUD, props.LATITUD];
	}
	return centroid(geojson).geometry.coordinates;
}
