let scene, camera, renderer, controls, model;
const modelContainer = document.getElementById('model-container');
const loadingText = document.querySelector('.loading-text');
const mainWrapper = document.querySelector('.main-wrapper');

let isAnimating = false;

// Default positions and rotations
const defaultRotation = {
    x: 0,
    y: 0,
    z: 0
};

const defaultCamera = {
    position: { x: 0, y: 0, z: 5 },
    rotation: { x: 0, y: 0, z: 0 }
};

function init() {
    // Check for WebGL support
    if (!THREE.WEBGL.isWebGLAvailable()) {
        const warning = THREE.WEBGL.getWebGLErrorMessage();
        modelContainer.appendChild(warning);
        loadingText.style.display = 'none';
        console.error('WebGL is not available');
        return;
    }

    try {
        // Create scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Create camera with wider initial FOV
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = defaultCamera.position.z;

        // Create renderer with error handling
        try {
            renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            modelContainer.appendChild(renderer.domElement);
        } catch (e) {
            console.error('Error creating WebGL renderer:', e);
            loadingText.textContent = 'Error: Could not initialize 3D viewer';
            return;
        }

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Add controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 3;
        controls.maxDistance = 10;

        // Handle when user stops interacting with model
        let resetTimeout;
        controls.addEventListener('start', () => {
            // Clear any pending reset when user starts interacting
            if (resetTimeout) {
                clearTimeout(resetTimeout);
            }
        });

        controls.addEventListener('end', () => {
            // Wait a short moment to ensure user has finished interaction
            if (!isAnimating) {
                resetTimeout = setTimeout(() => {
                    startAnimationSequence();
                }, 500); // Half second delay to ensure user is done
            }
        });

        // Load 3D model
        const loader = new THREE.GLTFLoader();
        loader.load(
            'models/tablet.glb',
            function (gltf) {
                model = gltf.scene;
                scene.add(model);
                
                // Center the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);
                
                // Hide loading text and show success
                loadingText.style.display = 'none';
                console.log('Model loaded successfully');
            },
            function (xhr) {
                const percent = (xhr.loaded / xhr.total * 100);
                loadingText.textContent = `Loading 3D Model... ${Math.round(percent)}%`;
                console.log(percent + '% loaded');
            },
            function (error) {
                console.error('An error occurred loading the model:', error);
                loadingText.textContent = 'Error: Failed to load 3D model';
            }
        );

        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);
    } catch (e) {
        console.error('Error in init():', e);
        loadingText.textContent = 'Error: Failed to initialize 3D viewer';
    }
}

function startAnimationSequence() {
    isAnimating = true;
    controls.enabled = false;

    // Create master timeline
    const masterTimeline = gsap.timeline();

    // First: Reset both model and camera to default positions
    masterTimeline.to(model.rotation, {
        duration: 1.5,
        x: defaultRotation.x,
        y: defaultRotation.y,
        z: defaultRotation.z,
        ease: "power2.inOut"
    }, 0);

    masterTimeline.to(camera.position, {
        duration: 1.5,
        x: defaultCamera.position.x,
        y: defaultCamera.position.y,
        z: defaultCamera.position.z,
        ease: "power2.inOut"
    }, 0);

    masterTimeline.to(controls.target, {
        duration: 1.5,
        x: 0,
        y: 0,
        z: 0,
        ease: "power2.inOut",
        onComplete: () => {
            // Reset camera rotation
            camera.lookAt(0, 0, 0);
        }
    }, 0);

    // Then: Move the model forward past the camera
    masterTimeline.to(model.position, {
        duration: 2,
        z: 10, // Move model forward past the camera
        ease: "power2.in",
        onComplete: () => {
            isAnimating = false;
            modelContainer.style.display = 'none';
            mainWrapper.style.display = 'flex';
            mainWrapper.classList.add('visible');
            
            // Reset all nav items and content boxes
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.about-box, .services-box, .text-box, .image-box').forEach(box => {
                box.style.display = 'none';
                box.classList.remove('visible');
            });
        }
    }, ">=0");
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Hide main content initially
mainWrapper.style.display = 'none';

// Initialize the 3D viewer
init();
animate(); 
