# Dimensionar incendios

Visualización interactiva que superpone el perímetro real de un incendio
sobre una ciudad conocida, para entender su verdadera escala. El usuario
elige un incendio real y una ciudad de referencia (o ve el incendio en su
ubicación real) y el mapa traslada el polígono conservando su forma y
tamaño exactos.

## Stack

- [Svelte 5](https://svelte.dev/) + [Vite](https://vitejs.dev/)
- [MapLibre GL](https://maplibre.org/) para el mapa, con tiles CartoDB
  Positron (basados en datos de OpenStreetMap)
- [Turf.js](https://turfjs.org/) para el traslado geodésico del polígono

## Desarrollo

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # sirve el build de producción
```

## Estructura

```
app/
├── public/
│   ├── data/            # un GeoJSON por incendio (generado por extract_data.py)
│   └── logo_newtral.png
├── src/
│   ├── App.svelte        # orquesta selección de incendio/ciudad y el mapa
│   ├── app.css            # tokens de diseño (color, tipografía) y estilos base
│   └── lib/
│       ├── FireMap.svelte     # mapa MapLibre + capa del incendio
│       ├── ControlPanel.svelte # panel de controles y estadísticas
│       ├── fires.js            # catálogo de incendios (generado, no editar a mano)
│       ├── cities.js           # ciudades de referencia y sus coordenadas
│       └── geo.js              # traslado geodésico, área, bounds
└── vite.config.js
```

## Cómo funciona el traslado

`geo.js#recenterGeoJSON` traslada cada vértice del polígono conservando su
distancia y rumbo reales respecto al centroide original, y los recalcula
desde el nuevo centro con cálculo geodésico (`turf.destination`). Esto
mantiene la forma y el área exactas del incendio; solo cambia su posición.
No se usa `turf.transformTranslate` porque, al aplicar la misma
distancia/rumbo a todos los vértices, desplaza el centroide varios
kilómetros del objetivo en traslados largos (rumbo constante ≠ traslación
rígida sobre una esfera).

La opción **"Ubicación real"** no traslada nada: muestra el polígono en su
posición geográfica original.

## Añadir una ciudad de referencia

Editar `src/lib/cities.js`: cada entrada necesita `id`, `name`, `center`
(`[lon, lat]`) y `zoom`. La entrada con `real: true` es la opción
"Ubicación real" y no debe tener `center` propio (se calcula del incendio
seleccionado).
