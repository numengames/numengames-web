export interface RotationController {
	start: () => void;
	stop: () => void;
	handleButtonClick: (index: number) => void;
}

export function setupRotation(contentCount: number, rotationInterval: number, onContentChange: (index: number) => void): RotationController {
	let timeoutId: ReturnType<typeof setTimeout>;
	let activeIndex: number = 0;
	let nextRotationTime: number = Date.now() + rotationInterval;

	function getNextIndex(currentIndex: number, count: number): number {
		return (currentIndex + 1) % count;
	}

	function rotateContent(): void {
		activeIndex = getNextIndex(activeIndex, contentCount);
		onContentChange(activeIndex);
		scheduleNextRotation();
	}

	function scheduleNextRotation(): void {
		nextRotationTime = Date.now() + rotationInterval;
		timeoutId = setTimeout(rotateContent, rotationInterval);
	}

	function handleButtonClick(index: number): void {
		activeIndex = index;
		clearTimeout(timeoutId);
		onContentChange(activeIndex);
		scheduleNextRotation();
	}

	function handleVisibilityChange(): void {
		if (document.visibilityState === "visible") {
			const remaining = nextRotationTime - Date.now();
			if (remaining <= 0) {
				rotateContent();
			} else {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(rotateContent, remaining);
			}
		}
	}

	function start(): void {
		scheduleNextRotation();
		document.addEventListener("visibilitychange", handleVisibilityChange);
	}

	function stop(): void {
		clearTimeout(timeoutId);
		document.removeEventListener("visibilitychange", handleVisibilityChange);
	}

	return { start, stop, handleButtonClick };
}
