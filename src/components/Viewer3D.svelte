<script>
	import { onMount } from "svelte";

	export let viewerId;
	export let isAnimating;
	export let containerId;
	export let modelUrl;

	function loadScript(src, onLoadCallback) {
		const script = document.createElement("script");
		script.src = src;
		script.onload = onLoadCallback;
		document.head.appendChild(script);
	}

	function initialize3DViewer() {
		if (typeof window.initDimensions === 'undefined') {
			console.error('Dimensions viewer not loaded');
			return;
		}

		window.initDimensions({
			cloudName: "numen-games",
			viewers: ["3D"],
			threeDViewer: {
				htmlElement: `#${containerId}`,
				model: modelUrl,
				backgroundColor: "#171717",
				autoRotate: true,
				rotationSpeed: 2,
				showZoomControl: false,
				showRotateControl: false,
				showFullscreenControl: false,
			}
		});
	}

	onMount(async () => {
		try {
			await loadScripts();
			const container = document.getElementById(containerId);
			
			// Asegurarse de que el contenedor tenga dimensiones
			if (container && container.offsetWidth > 0 && container.offsetHeight > 0) {
				initialize3DViewer();
			} else {
				console.error('Container dimensions are not valid');
			}
		} catch (error) {
			console.error('Error initializing 3D viewer:', error);
		}
	});
</script>

<div
	class={`viewer-3d ${isAnimating ? "flex" : "hidden"} aspect-[16/9] cursor-pointer`}
	id={`three-d-viewer-${viewerId}`}
	data-d8s-type="3d"
	data-d8s-id={viewerId}>
</div>
