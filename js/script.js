document.addEventListener('DOMContentLoaded', () => {
    // Anime.js Text Animation for Hero
    var textWrapper = document.querySelector('.ml11 .letters');
    if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

        // Wait for fonts to load to ensure correct width calculation
        document.fonts.ready.then(function () {
            anime.timeline({ loop: false })
                .add({
                    targets: '.ml11 .line',
                    scaleY: [0, 1],
                    opacity: [0.5, 1],
                    easing: "easeOutExpo",
                    duration: 900
                })
                .add({
                    targets: '.ml11 .line',
                    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 20],
                    easing: "easeOutExpo",
                    duration: 900,
                    delay: 100
                })
                .add({
                    targets: '.ml11 .letter',
                    opacity: [0, 1],
                    easing: "easeOutExpo",
                    duration: 800,
                    offset: '-=875',
                    delay: (el, i) => 40 * (i + 1)
                })
                .add({
                    targets: '.line',
                    opacity: 0,
                    duration: 1000,
                    easing: "easeOutExpo",
                    delay: 1500
                });
        });

        anime({
            targets: '.fade-in',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: 2500,
            duration: 1200,
            easing: 'easeOutCubic'
        });
    }

    // Three.js Hero Animation - Detailed Architectural Wireframe
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xfcfcfc);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasContainer.appendChild(renderer.domElement);

        // Group to hold the entire structure
        const structure = new THREE.Group();
        scene.add(structure);

        // Materials
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x1a1a1a, transparent: true, opacity: 0.15 });
        const accentLineMaterial = new THREE.LineBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.4 });

        // 1. Foundation Grid
        const gridHelper = new THREE.GridHelper(40, 40, 0xe5e5e5, 0xf5f5f5);
        scene.add(gridHelper);

        // Helper function to create wireframe boxes
        function createWireframeBox(w, h, d, x, y, z, mat) {
            const geo = new THREE.BoxGeometry(w, h, d);
            const edges = new THREE.EdgesGeometry(geo);
            const line = new THREE.LineSegments(edges, mat);
            line.position.set(x, y, z);
            return line;
        }

        // 2. Main Building Body
        const mainBuilding = createWireframeBox(10, 6, 8, 0, 3, 0, lineMaterial);
        structure.add(mainBuilding);

        // 3. Roof (Pyramid/Prism shape)
        const roofGeo = new THREE.ConeGeometry(8, 4, 4); // 4 sides pyramid
        const roofEdges = new THREE.EdgesGeometry(roofGeo);
        const roof = new THREE.LineSegments(roofEdges, accentLineMaterial);
        roof.position.set(0, 7.5, 0);
        roof.rotation.y = Math.PI / 4; // Align with box
        // Scale to match rectangular footprint roughly
        roof.scale.set(1, 1, 0.8);
        structure.add(roof);

        // 4. Entrance Column Part
        const entrance = createWireframeBox(3, 4, 2, 0, 2, 4.5, lineMaterial);
        structure.add(entrance);

        // Entrance Roof
        const entryRoofGeo = new THREE.ConeGeometry(2.5, 2, 4);
        const entryRoofEdges = new THREE.EdgesGeometry(entryRoofGeo);
        const entryRoof = new THREE.LineSegments(entryRoofEdges, accentLineMaterial);
        entryRoof.position.set(0, 5, 4.5);
        entryRoof.rotation.y = Math.PI / 4;
        structure.add(entryRoof);

        // 5. Side Wing (Asymmetry)
        const wing = createWireframeBox(5, 5, 6, 6, 2.5, -1, lineMaterial);
        structure.add(wing);

        // 6. Architectural Details (Vertical elements)
        const col1 = createWireframeBox(0.5, 6, 0.5, -4.5, 3, 3.8, accentLineMaterial);
        const col2 = createWireframeBox(0.5, 6, 0.5, 4.5, 3, 3.8, accentLineMaterial);
        structure.add(col1);
        structure.add(col2);

        // Camera Positioning
        camera.position.z = 22;
        camera.position.y = 8;
        camera.lookAt(0, 3, 0);

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);

            // Smooth rotation
            structure.rotation.y += 0.0015;

            // Subtle floating effect
            structure.position.y = Math.sin(Date.now() * 0.0005) * 0.5;

            renderer.render(scene, camera);
        }
        animate();

        // Handle Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
});
