// Catálogo de incendios disponibles.
// Cada entrada apunta a un GeoJSON en /public/data servido como estático.
// Generado automáticamente por extract_data.py — no editar a mano.

// Grupos en los que se organiza el selector de incendios.
// El primero es el que se muestra por defecto.
export const fireGroups = [
	{ id: 'season', label: 'Temporada 2026' },
	{ id: 'historic', label: 'Histórico (2016-2026)' }
];

export const fires = [
	{
		id: 'navaluenga-season',
		name: 'Navaluenga — 46.139 ha (Ávila, 2026)',
		file: 'data/NAVALUENGA.geojson',
		group: 'season'
	},
	{
		id: 'lamierla-season',
		name: 'La Mierla — 33.022 ha (Guadalajara, 2026)',
		file: 'data/LAMIERLA.geojson',
		group: 'season'
	},
	{
		id: 'sanmartindevaldeiglesias-season',
		name: 'San Martín de Valdeiglesias — 16.648 ha (Madrid, 2026)',
		file: 'data/SANMARTINDEVALDEIGLESIAS.geojson',
		group: 'season'
	},
	{
		id: 'luesia-season',
		name: 'Luesia — 15.045 ha (Zaragoza, 2026)',
		file: 'data/LUESIA.geojson',
		group: 'season'
	},
	{
		id: 'nules-season',
		name: 'Nules — 10.046 ha (Castellón/Castelló, 2026)',
		file: 'data/NULES.geojson',
		group: 'season'
	},
	{
		id: 'losgallardos-season',
		name: 'Los Gallardos — 5.400 ha (Almería, 2026)',
		file: 'data/LOSGALLARDOS.geojson',
		group: 'season'
	},
	{
		id: 'sanbartolomedelatorre-season',
		name: 'San Bartolomé de la Torre — 4.595 ha (Huelva, 2026)',
		file: 'data/SANBARTOLOMEDELATORRE.geojson',
		group: 'season'
	},
	{
		id: 'alcampell-season',
		name: 'Alcampell — 4.376 ha (Huesca, 2026)',
		file: 'data/ALCAMPELL.geojson',
		group: 'season'
	},
	{
		id: 'villadelprado-season',
		name: 'Villa del Prado — 3.673 ha (Madrid, 2026)',
		file: 'data/VILLADELPRADO.geojson',
		group: 'season'
	},
	{
		id: 'pelayosdelarroyo-season',
		name: 'Pelayos del Arroyo — 3.495 ha (Segovia, 2026)',
		file: 'data/PELAYOSDELARROYO.geojson',
		group: 'season'
	},
	{
		id: 'navaluenga-historic',
		name: 'Navaluenga — 46.139 ha (Ávila, 2026)',
		file: 'data/NAVALUENGA.geojson',
		group: 'historic'
	},
	{
		id: 'unadequintana-historic',
		name: 'Uña de Quintana — 40.081 ha (Zamora, 2025)',
		file: 'data/UNADEQUINTANA.geojson',
		group: 'historic'
	},
	{
		id: 'arua-historic',
		name: 'A Rúa — 37.179 ha (Ourense, 2025)',
		file: 'data/ARUA.geojson',
		group: 'historic'
	},
	{
		id: 'lamierla-historic',
		name: 'La Mierla — 33.022 ha (Guadalajara, 2026)',
		file: 'data/LAMIERLA.geojson',
		group: 'historic'
	},
	{
		id: 'tabara-historic',
		name: 'Tábara — 32.528 ha (Zamora, 2022)',
		file: 'data/TABARA.geojson',
		group: 'historic'
	},
	{
		id: 'ferrerasdearriba-historic',
		name: 'Ferreras de Arriba — 28.046 ha (Zamora, 2022)',
		file: 'data/FERRERASDEARRIBA.geojson',
		group: 'historic'
	},
	{
		id: 'benuza-historic',
		name: 'Benuza — 26.241 ha (León, 2025)',
		file: 'data/BENUZA.geojson',
		group: 'historic'
	},
	{
		id: 'aveiga-historic',
		name: 'A Veiga — 25.953 ha (Ourense, 2025)',
		file: 'data/AVEIGA.geojson',
		group: 'historic'
	},
	{
		id: 'manzaneda-historic',
		name: 'Manzaneda — 24.583 ha (Ourense, 2025)',
		file: 'data/MANZANEDA.geojson',
		group: 'historic'
	},
	{
		id: 'oimbra-historic',
		name: 'Oímbra — 24.471 ha (Ourense, 2025)',
		file: 'data/OIMBRA.geojson',
		group: 'historic'
	},
	{
		id: 'navalacruz-historic',
		name: 'Navalacruz — 23.078 ha (Ávila, 2021)',
		file: 'data/NAVALACRUZ.geojson',
		group: 'historic'
	},
	{
		id: 'bejis-historic',
		name: 'Bejís — 19.362 ha (Castellón/Castelló, 2022)',
		file: 'data/BEJIS.geojson',
		group: 'historic'
	},
	{
		id: 'buron-historic',
		name: 'Burón — 19.112 ha (León, 2025)',
		file: 'data/BURON.geojson',
		group: 'historic'
	},
	{
		id: 'navaconcejo-historic',
		name: 'Navaconcejo — 17.317 ha (Cáceres, 2025)',
		file: 'data/NAVACONCEJO.geojson',
		group: 'historic'
	},
	{
		id: 'almonasterlareal-historic',
		name: 'Almonaster la Real — 16.758 ha (Huelva, 2020)',
		file: 'data/ALMONASTERLAREAL.geojson',
		group: 'historic'
	}
];
