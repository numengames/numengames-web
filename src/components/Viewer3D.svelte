<script>
	import { onMount } from "svelte";

	export let viewerId;
	export let isAnimating;

	function loadScript(src, onLoadCallback) {
		const script = document.createElement("script");
		script.src = src;
		script.onload = onLoadCallback;
		document.head.appendChild(script);
	}

	function initialize3DViewer() {
		window.initDimensions({
			account: "d8s-q7pxeu",
			viewers: ["3D"],
			threeDViewer: {
				viewer: {
					showLoadingProgress: false,
					controls: {
						enabled: false,
						mouseZoom: false,
					},
				},
			},
		});
	}

	onMount(() => {
		loadScript(
			"https://dimensions-3d-viewer.cloudinary.com/latest/all.js",
			() => {
				loadScript(
					"https://dimensions-tag.cloudinary.com/latest/all.js",
					initialize3DViewer,
				);
			},
		);
	});
</script>

<div
	class={`viewer-3d ${isAnimating ? "flex" : "hidden"} aspect-[16/9] cursor-pointer`}
	id={`three-d-viewer-${viewerId}`}
	data-d8s-type="3d"
	data-d8s-id={viewerId}>
</div>
