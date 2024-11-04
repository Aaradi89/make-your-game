let lastFrameTime = performance.now();
let fpsDisplay = document.getElementById("fps");
let smoothedFPS = 60; // Initial guess for FPS
const smoothingFactor = 0.1; // Adjust between 0 (no smoothing) and 1 (very smooth)

// Function to update FPS using EMA
function updateFPS() {
    const currentFrameTime = performance.now();
    const delta = currentFrameTime - lastFrameTime;
    const fps = 1000 / delta;

    // Apply exponential moving average
    smoothedFPS = (fps * smoothingFactor) + (smoothedFPS * (1 - smoothingFactor));
    fpsDisplay.textContent = Math.round(smoothedFPS);

    // Update last frame time
    lastFrameTime = currentFrameTime;

    // Request the next animation frame
    requestAnimationFrame(updateFPS);
}

// Start the FPS calculation loop
requestAnimationFrame(updateFPS);
