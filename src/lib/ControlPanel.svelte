<script>
	import { cities } from './cities.js';

	let {
		fireGroups,
		fires,
		selectedGroupId = $bindable(),
		selectedFireId = $bindable(),
		selectedCityId = $bindable(),
		pickModeActive = $bindable(),
		areaHa = null,
		fireProps = null,
		noteMode = 'city'
	} = $props();

	function formatArea(ha) {
		if (ha == null) return '—';
		return ha.toLocaleString('es-ES', { maximumFractionDigits: 0 });
	}

	function formatDate(iso) {
		if (!iso) return '—';
		const [y, m, d] = iso.slice(0, 10).split('-');
		return `${d}/${m}/${y}`;
	}
</script>

<div class="panel">
	<div class="handle" aria-hidden="true"></div>

	<div class="controls">
		<div class="group-toggle" role="tablist" aria-label="Periodo de incendios">
			{#each fireGroups as g (g.id)}
				<button
					type="button"
					role="tab"
					aria-selected={selectedGroupId === g.id}
					class:active={selectedGroupId === g.id}
					onclick={() => (selectedGroupId = g.id)}
				>
					{g.label}
				</button>
			{/each}
		</div>

		<div class="field">
			<label for="sel-fire">Incendio</label>
			<div class="select-wrap">
				<svg class="select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 22c-4.4 0-8-3.2-8-7.3 0-3.1 2.1-5.2 3.2-7.2.4 1.7.9 2.6 1.8 2.6.4-2.6 0-4.8 1.8-7.4 1.8 1.8 3.6 4.4 3.6 7 .9-.4 1.3-1.3 1.3-2.6 1.8 1.8 3.5 4.2 3.5 7.4C19.2 18.8 16.4 22 12 22Z"/>
				</svg>
				<select id="sel-fire" bind:value={selectedFireId}>
					{#each fires as fire (fire.id)}
						<option value={fire.id}>{fire.name}</option>
					{/each}
				</select>
				<svg class="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
					<path d="m6 9 6 6 6-6"/>
				</svg>
			</div>
		</div>

		<div class="field">
			<label for="sel-city">Ciudad de referencia</label>
			<div class="select-wrap">
				<svg class="select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 21s7-6.6 7-11.2A7 7 0 0 0 5 9.8C5 14.4 12 21 12 21Z"/>
					<circle cx="12" cy="9.8" r="2.4"/>
				</svg>
				<select id="sel-city" bind:value={selectedCityId}>
					{#each cities as city (city.id)}
						<option value={city.id}>{city.name}</option>
					{/each}
				</select>
				<svg class="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
					<path d="m6 9 6 6 6-6"/>
				</svg>
			</div>

			<button
				type="button"
				class="pick-btn"
				class:active={pickModeActive}
				aria-pressed={pickModeActive}
				onclick={() => (pickModeActive = !pickModeActive)}
			>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="7.5"/>
					<circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>
					<path d="M12 2.5v3.2M12 18.3v3.2M21.5 12h-3.2M5.7 12H2.5"/>
				</svg>
				{pickModeActive
					? noteMode === 'click-set'
						? 'Punto elegido — clic para cambiarlo'
						: 'Haz clic en el mapa…'
					: 'Elige un punto en el mapa'}
			</button>
		</div>
	</div>

	<div class="hero">
		<span class="hero-value">{formatArea(areaHa)}<span class="hero-unit">ha</span></span>
		<span class="hero-label">Superficie quemada</span>
	</div>

	{#if fireProps}
		<div class="stats">
			<div class="stat">
				<span class="stat-val">{formatDate(fireProps.FIREDATE)}</span>
				<span class="stat-key">Inicio</span>
			</div>
			<div class="stat">
				<span class="stat-val">{fireProps.PROVINCE ?? '—'}</span>
				<span class="stat-key">Provincia</span>
			</div>
		</div>
	{/if}

	<p class="note">
		{#if noteMode === 'real'}
			Perímetro real del incendio, sin trasladar.
		{:else if noteMode === 'click-pending'}
			Haz clic en el mapa para elegir dónde superponer el incendio.
		{:else if noteMode === 'click-set'}
			El polígono conserva su forma y tamaño reales: se ha trasladado al punto elegido en
			el mapa.
		{:else}
			El polígono conserva su forma y tamaño reales: solo se traslada para superponerlo
			sobre la ciudad elegida.
		{/if}
	</p>
</div>

<style>
	.panel {
		position: absolute;
		top: 76px;
		left: 16px;
		z-index: 10;
		width: 300px;
		max-height: calc(100vh - 96px);
		overflow-y: auto;
		padding: 16px;
		border-radius: 12px;
		border: 1px solid var(--border);
		background: var(--card);
		box-shadow: var(--shadow);
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.handle {
		display: none;
	}

	/* ── Grupo de inputs ── */
	.controls {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 12px;
		border-radius: 10px;
		background: var(--card-2);
		border: 1px solid var(--border);
	}

	.group-toggle {
		display: flex;
		gap: 3px;
		padding: 3px;
		border-radius: 8px;
		background: var(--paper);
		border: 1px solid var(--border);
	}

	.group-toggle button {
		flex: 1;
		padding: 7px 8px;
		font-family: var(--font);
		font-size: 11.5px;
		font-weight: 700;
		letter-spacing: 0.02em;
		color: var(--ink-muted);
		background: transparent;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background 0.15s, color 0.15s, box-shadow 0.15s;
	}

	.group-toggle button:hover {
		color: var(--ink);
	}

	.group-toggle button.active {
		background: var(--card);
		color: var(--ink);
		box-shadow: var(--shadow);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	label {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--ink-muted);
		text-align: center;
	}

	.select-wrap {
		position: relative;
		display: flex;
		align-items: center;
	}

	.select-icon {
		position: absolute;
		left: 11px;
		width: 16px;
		height: 16px;
		color: var(--ink-muted);
		pointer-events: none;
	}

	.select-chevron {
		position: absolute;
		right: 10px;
		width: 15px;
		height: 15px;
		color: var(--ink-muted);
		pointer-events: none;
	}

	select {
		width: 100%;
		appearance: none;
		-webkit-appearance: none;
		padding: 10px 32px 10px 34px;
		font-size: 13.5px;
		font-family: var(--font);
		color: var(--ink);
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 8px;
		outline: none;
		transition: border-color 0.15s, background 0.15s;
	}

	select:hover {
		border-color: var(--teal-deep);
	}

	select:focus {
		border-color: var(--teal-deep);
		box-shadow: 0 0 0 3px rgba(1, 243, 179, 0.28);
	}

	.pick-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		width: 100%;
		padding: 9px 12px;
		font-family: var(--font);
		font-size: 12.5px;
		font-weight: 700;
		color: var(--ink-muted);
		background: var(--card);
		border: 1px dashed var(--border);
		border-radius: 8px;
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s, color 0.15s;
	}

	.pick-btn svg {
		width: 15px;
		height: 15px;
		flex-shrink: 0;
	}

	.pick-btn:hover {
		border-color: var(--teal-deep);
		color: var(--ink);
	}

	.pick-btn.active {
		border-style: solid;
		border-color: var(--teal-deep);
		background: rgba(1, 243, 179, 0.14);
		color: var(--ink);
	}

	/* ── Cifra principal ── */
	.hero {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 2px;
		padding: 14px 16px;
		border-radius: 10px;
		background: linear-gradient(150deg, rgba(255, 42, 1, 0.09), rgba(255, 42, 1, 0.02));
		border: 1px solid rgba(255, 42, 1, 0.16);
	}

.hero-value {
		font-family: var(--font-mono);
		font-size: 34px;
		font-weight: 600;
		line-height: 1;
		color: var(--fire);
	}

	.hero-unit {
		font-family: var(--font);
		font-size: 15px;
		font-weight: 700;
		margin-left: 5px;
		color: var(--ink-muted);
	}

	.hero-label {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--ink-muted);
	}

	.stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px 16px;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.stat-val {
		font-family: var(--font-mono);
		font-size: 15px;
		font-weight: 600;
		color: var(--ink);
	}

	.stat-key {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--ink-muted);
		margin-top: 2px;
	}

	.note {
		margin: 0;
		font-size: 11px;
		line-height: 1.45;
		text-align: center;
		color: var(--ink-muted);
	}

	@media (max-width: 640px) {
		.panel {
			top: auto;
			bottom: 0;
			left: 0;
			right: 0;
			width: auto;
			max-height: 62vh;
			border-radius: 16px 16px 0 0;
			padding: 8px 16px calc(16px + env(safe-area-inset-bottom));
			box-shadow: 0 -8px 24px rgba(22, 20, 14, 0.16);
		}

		.handle {
			display: block;
			width: 36px;
			height: 4px;
			border-radius: 2px;
			background: var(--card-2);
			border: 1px solid var(--border);
			margin: 2px auto 4px;
			flex-shrink: 0;
		}
	}
</style>
