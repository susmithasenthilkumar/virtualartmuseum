import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Layers, Palette, RotateCw } from 'lucide-react';

interface Hero3DCakeProps {
  onLayerExplodeChange?: (exploded: boolean) => void;
}

export const Hero3DCake: React.FC<Hero3DCakeProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isExploded, setIsExploded] = useState(false);
  const [cakeColorPreset, setCakeColorPreset] = useState<'vanilla' | 'chocolate' | 'strawberry' | 'matcha'>('vanilla');
  const [autoRotate, setAutoRotate] = useState(true);

  // References to 3D objects for dynamic updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cakeGroupRef = useRef<THREE.Group | null>(null);
  const layersRef = useRef<THREE.Mesh[]>([]);
  const frostingMeshesRef = useRef<THREE.Mesh[]>([]);
  const isInteracting = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  const colorPalettes = {
    vanilla: {
      frosting: 0xfbf6ec,
      sponge: 0xf5dfb3,
      filling: 0xffeedb,
      topping: 0xd93848,
    },
    chocolate: {
      frosting: 0x331c14,
      sponge: 0x48291a,
      filling: 0x24140e,
      topping: 0xbc2b38,
    },
    strawberry: {
      frosting: 0xf7cad0,
      sponge: 0xffe5ec,
      filling: 0xd90429,
      topping: 0x9b2226,
    },
    matcha: {
      frosting: 0xdde5b6,
      sponge: 0xa98467,
      filling: 0xadc178,
      topping: 0xd93848,
    },
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7.5);
    camera.lookAt(0, 0.4, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // LIGHTING: Cinematic Bakery Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 2.5);
    keyLight.position.set(4, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const warmRimLight = new THREE.DirectionalLight(0xd97736, 1.8);
    warmRimLight.position.set(-5, 4, -4);
    scene.add(warmRimLight);

    const bottomGlow = new THREE.PointLight(0xffaa5e, 0.8, 8);
    bottomGlow.position.set(0, -1.2, 1);
    scene.add(bottomGlow);

    // CAKE GROUP
    const cakeGroup = new THREE.Group();
    cakeGroupRef.current = cakeGroup;
    scene.add(cakeGroup);

    // PEDESTAL / CAKE STAND
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x2a201a,
      roughness: 0.3,
      metalness: 0.8,
    });

    const standBaseGeom = new THREE.CylinderGeometry(2.2, 2.5, 0.2, 48);
    const standBase = new THREE.Mesh(standBaseGeom, standMat);
    standBase.position.y = -1.3;
    standBase.receiveShadow = true;
    cakeGroup.add(standBase);

    const standPillarGeom = new THREE.CylinderGeometry(0.5, 0.8, 1.0, 32);
    const standPillar = new THREE.Mesh(standPillarGeom, standMat);
    standPillar.position.y = -0.7;
    cakeGroup.add(standPillar);

    const plateGeom = new THREE.CylinderGeometry(2.8, 2.7, 0.15, 64);
    const plate = new THREE.Mesh(plateGeom, standMat);
    plate.position.y = -0.15;
    plate.receiveShadow = true;
    cakeGroup.add(plate);

    // BUILD MULTI-LAYER CAKE SPONGES & FILLING
    const palette = colorPalettes[cakeColorPreset];
    const layers: THREE.Mesh[] = [];
    const frostingMeshes: THREE.Mesh[] = [];

    const spongeMaterial = new THREE.MeshStandardMaterial({
      color: palette.sponge,
      roughness: 0.85,
      metalness: 0.05,
    });

    const fillingMaterial = new THREE.MeshStandardMaterial({
      color: palette.filling,
      roughness: 0.4,
      metalness: 0.1,
    });

    const outerFrostingMaterial = new THREE.MeshStandardMaterial({
      color: palette.frosting,
      roughness: 0.35,
      metalness: 0.08,
    });

    // Tier 1 (Bottom Tier: 3 sponge layers + 2 filling layers)
    const layerRadii = 2.2;
    const layerHeight = 0.35;
    const numLayers = 3;

    for (let i = 0; i < numLayers; i++) {
      const spongeGeom = new THREE.CylinderGeometry(layerRadii, layerRadii, layerHeight, 48);
      const spongeMesh = new THREE.Mesh(spongeGeom, spongeMaterial.clone());
      spongeMesh.position.y = i * (layerHeight + 0.1) + 0.2;
      spongeMesh.castShadow = true;
      spongeMesh.receiveShadow = true;
      spongeMesh.userData = { originalY: spongeMesh.position.y, layerIndex: i };
      cakeGroup.add(spongeMesh);
      layers.push(spongeMesh);

      // Cream filling between layers
      if (i < numLayers - 1) {
        const fillingGeom = new THREE.CylinderGeometry(layerRadii - 0.02, layerRadii - 0.02, 0.08, 48);
        const fillingMesh = new THREE.Mesh(fillingGeom, fillingMaterial.clone());
        fillingMesh.position.y = spongeMesh.position.y + layerHeight / 2 + 0.04;
        fillingMesh.userData = { originalY: fillingMesh.position.y, layerIndex: i + 0.5 };
        cakeGroup.add(fillingMesh);
        layers.push(fillingMesh);
      }
    }

    // Outer smooth frosting coat covering the sides
    const outerCylinderGeom = new THREE.CylinderGeometry(layerRadii + 0.05, layerRadii + 0.05, 1.45, 64);
    const outerFrosting = new THREE.Mesh(outerCylinderGeom, outerFrostingMaterial);
    outerFrosting.position.y = 0.72;
    outerFrosting.castShadow = true;
    outerFrosting.receiveShadow = true;
    cakeGroup.add(outerFrosting);
    frostingMeshes.push(outerFrosting);

    // TOP FROSTING SWIRLS & ROSETTES
    const rosetteRadius = 2.0;
    const numRosettes = 12;
    for (let i = 0; i < numRosettes; i++) {
      const angle = (i / numRosettes) * Math.PI * 2;
      const x = Math.cos(angle) * rosetteRadius;
      const z = Math.sin(angle) * rosetteRadius;

      const rosetteGeom = new THREE.TorusGeometry(0.16, 0.08, 16, 32);
      const rosette = new THREE.Mesh(rosetteGeom, outerFrostingMaterial);
      rosette.rotation.x = Math.PI / 2;
      rosette.position.set(x, 1.47, z);
      cakeGroup.add(rosette);
      frostingMeshes.push(rosette);
    }

    // GARNISH: Glazed Strawberries and Berries on Crown
    const berryMaterial = new THREE.MeshStandardMaterial({
      color: palette.topping,
      roughness: 0.25,
      metalness: 0.1,
    });

    const blueberryMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1f38,
      roughness: 0.35,
      metalness: 0.1,
    });

    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x386641,
      roughness: 0.5,
    });

    // 5 strawberries placed in artistic cluster on top
    const berryPositions = [
      { x: 0, z: 0, scale: 1.1 },
      { x: 0.8, z: 0.5, scale: 0.9 },
      { x: -0.7, z: 0.6, scale: 0.95 },
      { x: 0.6, z: -0.8, scale: 0.85 },
      { x: -0.8, z: -0.5, scale: 0.9 },
    ];

    berryPositions.forEach((pos) => {
      const berryGroup = new THREE.Group();

      const strawberryGeom = new THREE.ConeGeometry(0.24 * pos.scale, 0.45 * pos.scale, 24);
      const strawberry = new THREE.Mesh(strawberryGeom, berryMaterial);
      strawberry.rotation.x = Math.PI;
      strawberry.castShadow = true;
      berryGroup.add(strawberry);

      // tiny green calyx/leaf
      const leafGeom = new THREE.CylinderGeometry(0.12 * pos.scale, 0.02, 0.04, 6);
      const leaf = new THREE.Mesh(leafGeom, leafMaterial);
      leaf.position.y = 0.22 * pos.scale;
      berryGroup.add(leaf);

      berryGroup.position.set(pos.x, 1.6, pos.z);
      cakeGroup.add(berryGroup);
    });

    // Blueberries scattered around strawberries
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + 0.3;
      const dist = 1.25 + Math.sin(i * 3) * 0.25;
      const sphereGeom = new THREE.SphereGeometry(0.1, 16, 16);
      const blueberry = new THREE.Mesh(sphereGeom, blueberryMaterial);
      blueberry.position.set(Math.cos(angle) * dist, 1.5, Math.sin(angle) * dist);
      blueberry.castShadow = true;
      cakeGroup.add(blueberry);
    }

    // GOLD DUST SPARKLE PARTICLES
    const particleCount = 80;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5;
      particlePositions[i + 1] = Math.random() * 3.5 - 0.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf4a261,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    layersRef.current = layers;
    frostingMeshesRef.current = frostingMeshes;

    // MOUSE INTERACTION
    const onMouseDown = (e: MouseEvent) => {
      isInteracting.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isInteracting.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      cakeGroup.rotation.y += deltaX * 0.008;
      cakeGroup.rotation.x = Math.max(-0.3, Math.min(0.5, cakeGroup.rotation.x + deltaY * 0.005));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isInteracting.current = false;
    };

    // Touch interaction for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isInteracting.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isInteracting.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      cakeGroup.rotation.y += deltaX * 0.01;
      cakeGroup.rotation.x = Math.max(-0.3, Math.min(0.5, cakeGroup.rotation.x + deltaY * 0.007));

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isInteracting.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating and auto-rotation
      if (autoRotate && !isInteracting.current) {
        cakeGroup.rotation.y += 0.004;
      }

      // Floating particles
      particles.rotation.y = elapsedTime * 0.03;
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particlePositions.length; i += 3) {
        positions[i] += Math.sin(elapsedTime + i) * 0.001;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update cake color theme dynamically
  useEffect(() => {
    const palette = colorPalettes[cakeColorPreset];
    if (!cakeGroupRef.current) return;

    layersRef.current.forEach((mesh) => {
      if (mesh.userData && typeof mesh.userData.layerIndex === 'number') {
        const isFilling = mesh.userData.layerIndex % 1 !== 0;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.setHex(isFilling ? palette.filling : palette.sponge);
      }
    });

    frostingMeshesRef.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.color.setHex(palette.frosting);
    });
  }, [cakeColorPreset]);

  // Handle Layer Explode / Anatomy inspection
  useEffect(() => {
    if (!cakeGroupRef.current) return;
    const outerCoat = frostingMeshesRef.current[0];

    if (isExploded) {
      // Hide outer side frosting to reveal internal sponge & cream layers
      if (outerCoat) outerCoat.visible = false;

      layersRef.current.forEach((mesh) => {
        const index = mesh.userData.layerIndex || 0;
        const originalY = mesh.userData.originalY || 0;
        // spread upward smoothly
        const targetY = originalY + index * 0.45;
        mesh.position.y = targetY;
      });
    } else {
      if (outerCoat) outerCoat.visible = true;

      layersRef.current.forEach((mesh) => {
        mesh.position.y = mesh.userData.originalY || mesh.position.y;
      });
    }
  }, [isExploded]);

  return (
    <div className="relative w-full h-[460px] md:h-[580px] lg:h-[640px] flex items-center justify-center">
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate the cake in 3D"
      />

      {/* Floating 3D Interaction Control Hub */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 px-3 py-2 rounded-full glass-panel border border-[#f7efe6]/15 shadow-2xl backdrop-blur-md max-w-[95%]">
        {/* Layer Explode Toggle */}
        <button
          onClick={() => setIsExploded(!isExploded)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            isExploded
              ? 'bg-[#d97736] text-white shadow-lg shadow-[#d97736]/30'
              : 'text-[#f7efe6]/80 hover:text-white hover:bg-white/10'
          }`}
          title="Inspect interior sponge and cream layers"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isExploded ? 'Close Layers' : 'Inspect Anatomy'}</span>
        </button>

        {/* Auto Rotate Toggle */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            autoRotate
              ? 'bg-white/15 text-[#f7efe6]'
              : 'text-[#f7efe6]/60 hover:text-white hover:bg-white/10'
          }`}
          title="Toggle 3D auto rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
        </button>

        <div className="h-4 w-[1px] bg-white/15 hidden sm:block" />

        {/* Color Presets */}
        <div className="flex items-center gap-1.5">
          <Palette className="w-3 h-3 text-[#f7efe6]/50 mr-0.5 hidden sm:inline" />
          {(['vanilla', 'chocolate', 'strawberry', 'matcha'] as const).map((preset) => (
            <button
              key={preset}
              onClick={() => setCakeColorPreset(preset)}
              className={`w-5 h-5 rounded-full border transition-all transform hover:scale-110 ${
                cakeColorPreset === preset
                  ? 'border-white ring-2 ring-[#d97736]'
                  : 'border-white/30 opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor:
                  preset === 'vanilla'
                    ? '#fbf6ec'
                    : preset === 'chocolate'
                    ? '#331c14'
                    : preset === 'strawberry'
                    ? '#f7cad0'
                    : '#adc178',
              }}
              title={`${preset.charAt(0).toUpperCase() + preset.slice(1)} Frosting`}
            />
          ))}
        </div>
      </div>

      {/* Subtle Hint */}
      <div className="absolute top-4 right-4 pointer-events-none hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] text-[#f7efe6]/60 glass-panel-light">
        <Eye className="w-3 h-3 text-[#d97736]" />
        <span>Drag to rotate • 3D Real-time canvas</span>
      </div>
    </div>
  );
};
