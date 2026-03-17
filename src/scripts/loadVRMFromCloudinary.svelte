<script>
	import { onMount } from "svelte";

	onMount(() => {
		const script1 = document.createElement("script");
		script1.src = "https://dimensions-3d-viewer.cloudinary.com/latest/all.js";

		script1.onload = () => {
			const script2 = document.createElement("script");
			script2.src = "https://dimensions-tag.cloudinary.com/latest/all.js";

			script2.onload = () => {
				window.initDimensions({
					account: "d8s-usv8ev",
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
			};

			document.head.appendChild(script2);
		};

		document.head.appendChild(script1);
	});
</script>
