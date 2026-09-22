import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { HotspotId } from '../../types/orbita';
import { SPACECRAFT_HOTSPOTS } from '../../data/orbitaData';

interface SpacecraftCanvasProps {
  selectedHotspotId: HotspotId | null;
  onSelectHotspot: (id: HotspotId) => void;
  autoRotate: boolean;
  wireframe: boolean;
  explodedView: boolean;
  className?: string;
  onResetTrigger?: number;
}

export const SpacecraftCanvas: React.FC<SpacecraftCanvasProps> = ({
  selectedHotspotId,
  onSelectHotspot,
  autoRotate,
  wireframe,
  explodedView,
  className = 'w-full h-full min-h-[500px]',
  onResetTrigger = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // References to dynamic components for animations
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const spacecraftGroupRef = useRef<THREE.Group | null>(null);

  // Subsystem meshes for highlighting
  const subsystemMeshesRef = useRef<Record<string, THREE.Object3D[]>>({});
  const hotspotMarkersRef = useRef<{ id: HotspotId; position: THREE.Vector3; mesh: THREE.Mesh }[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        setIsLoading(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      setIsLoading(false);
      return;
    }

    let animationFrameId: number;
    const width = container.clientWidth || 700;
    const height = container.clientHeight || 550;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Aerospace Sun & Orbital Radiance)
    const keySun = new THREE.DirectionalLight(0xffffff, 2.5);
    keySun.position.set(5, 8, 4);
    scene.add(keySun);

    const fillBlue = new THREE.DirectionalLight(0x00f0ff, 1.4);
    fillBlue.position.set(-6, -2, -3);
    scene.add(fillBlue);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 1.2);
    rimLight.position.set(0, -6, 4);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x0c1933, 1.2);
    scene.add(ambientLight);

    // 3. Background Starfield
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 600;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 60;
      starPos[i + 1] = (Math.random() - 0.5) * 60;
      starPos[i + 2] = -15 - Math.random() * 40;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.6,
    });
    scene.add(new THREE.Points(starsGeo, starMat));

    // 4. Procedural High-End Spacecraft Assembly
    const spacecraft = new THREE.Group();
    spacecraftGroupRef.current = spacecraft;
    scene.add(spacecraft);

    const meshesBySubsystem: Record<string, THREE.Object3D[]> = {
      'solar-arrays': [],
      'propulsion': [],
      'antenna': [],
      'ai-compute': [],
      'navigation': [],
      'sensors': [],
      'thermal': [],
    };

    // A. Central Core Bus (Hexagonal Prism)
    const coreGeo = new THREE.CylinderGeometry(0.75, 0.75, 1.8, 6);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    spacecraft.add(coreMesh);

    // Gold Multi-Layer Insulation (MLI) panels on sides
    const mliMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0x451a03,
      metalness: 0.95,
      roughness: 0.2,
      wireframe: false,
    });
    for (let i = 0; i < 6; i++) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.68, 1.4, 0.04), mliMat);
      panel.position.set(
        Math.sin((i * Math.PI) / 3) * 0.76,
        0,
        Math.cos((i * Math.PI) / 3) * 0.76
      );
      panel.rotation.y = (i * Math.PI) / 3;
      spacecraft.add(panel);
    }

    // B. Solar Arrays (Left & Right articulated wings)
    const solarWingMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x002244,
      metalness: 0.8,
      roughness: 0.15,
      wireframe: false,
    });
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.3,
    });

    const createSolarWing = (isLeft: boolean) => {
      const wingGroup = new THREE.Group();
      const dir = isLeft ? -1 : 1;

      // Boom arm
      const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8), frameMat);
      boom.rotation.z = Math.PI / 2;
      boom.position.x = dir * 1.05;
      wingGroup.add(boom);

      // Panel panels (3 segmented articulated panels per side)
      for (let p = 0; p < 3; p++) {
        const panelBox = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.25, 0.025), solarWingMat);
        panelBox.position.x = dir * (1.55 + p * 0.76);
        wingGroup.add(panelBox);

        // Gold grid truss borders
        const truss = new THREE.Mesh(new THREE.BoxGeometry(0.74, 1.27, 0.02), frameMat);
        truss.position.copy(panelBox.position);
        wingGroup.add(truss);

        meshesBySubsystem['solar-arrays'].push(panelBox);
      }

      return wingGroup;
    };

    const leftWing = createSolarWing(true);
    const rightWing = createSolarWing(false);
    spacecraft.add(leftWing);
    spacecraft.add(rightWing);

    // C. Propulsion Bay (Ion Thrusters & Xenon tank at base)
    const propGroup = new THREE.Group();
    propGroup.position.y = -0.95;

    // Base thrust puck
    const thrustPuck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 0.55, 0.35, 12),
      frameMat
    );
    propGroup.add(thrustPuck);

    // Dual Hall-effect Ion Thruster Nozzles with glowing cyan plasma rings
    const nozzleMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.95,
      roughness: 0.2,
    });
    const plasmaMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: false,
    });

    [-0.26, 0.26].forEach((xPos) => {
      const nozzle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.12, 0.25, 16, 1, true),
        nozzleMat
      );
      nozzle.position.set(xPos, -0.22, 0);
      propGroup.add(nozzle);

      // Cyan plasma core
      const plasma = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 12, 24), plasmaMat);
      plasma.rotation.x = Math.PI / 2;
      plasma.position.set(xPos, -0.32, 0);
      propGroup.add(plasma);

      meshesBySubsystem['propulsion'].push(nozzle, plasma);
    });

    spacecraft.add(propGroup);

    // D. Communication Antenna & Laser Terminal (Zenith top deck)
    const commGroup = new THREE.Group();
    commGroup.position.set(0, 0.95, 0);

    // Mast
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.5, 8), frameMat);
    mast.position.y = 0.25;
    commGroup.add(mast);

    // Steerable Ka-band Parabolic Dish
    const dishMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.9,
      roughness: 0.15,
      side: THREE.DoubleSide,
    });
    const dish = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.4),
      dishMat
    );
    dish.position.set(0.15, 0.65, 0.15);
    dish.rotation.x = Math.PI * 0.75;
    dish.rotation.z = Math.PI * 0.15;
    commGroup.add(dish);

    // Optical Laser Turret
    const laserBox = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.24), frameMat);
    laserBox.position.set(-0.25, 0.55, -0.15);
    const laserLens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.06, 16),
      new THREE.MeshBasicMaterial({ color: 0x818cf8 })
    );
    laserLens.rotation.x = Math.PI / 2;
    laserLens.position.set(-0.25, 0.55, -0.01);
    commGroup.add(laserBox, laserLens);

    meshesBySubsystem['antenna'].push(dish, laserBox, laserLens);
    spacecraft.add(commGroup);

    // E. AI Compute Module (Cybernetic Rad-Hard NPU bay)
    const computeGroup = new THREE.Group();
    computeGroup.position.set(0.48, 0.15, 0.55);
    const aiChassis = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.52, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.3 })
    );
    computeGroup.add(aiChassis);

    // Glowing cyan heat fin array
    for (let f = -2; f <= 2; f++) {
      const fin = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.02, 0.08),
        new THREE.MeshBasicMaterial({ color: 0x00f0ff })
      );
      fin.position.set(0, f * 0.08, 0.1);
      computeGroup.add(fin);
      meshesBySubsystem['ai-compute'].push(fin);
    }
    meshesBySubsystem['ai-compute'].push(aiChassis);
    spacecraft.add(computeGroup);

    // F. Navigation System (Star Tracker Benches)
    const navGroup = new THREE.Group();
    navGroup.position.set(-0.52, 0.5, -0.45);
    for (let st = 0; st < 3; st++) {
      const angle = (st * Math.PI) / 3;
      const trackerBaffle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.055, 0.22, 12),
        new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.8 })
      );
      trackerBaffle.rotation.x = 0.5 + st * 0.1;
      trackerBaffle.rotation.y = angle;
      trackerBaffle.position.set(Math.sin(angle) * 0.15, st * 0.08, Math.cos(angle) * 0.15);
      navGroup.add(trackerBaffle);

      const trackerLens = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      trackerLens.position.copy(trackerBaffle.position);
      navGroup.add(trackerLens);

      meshesBySubsystem['navigation'].push(trackerBaffle, trackerLens);
    }
    spacecraft.add(navGroup);

    // G. Earth Observation Sensor Array (Nadir Instrument Bay)
    const sensorGroup = new THREE.Group();
    sensorGroup.position.set(0, -0.45, 0.72);

    // Multispectral Optics Barrel
    const lensBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.28, 0.45, 24),
      new THREE.MeshStandardMaterial({ color: 0x090d16, metalness: 0.95, roughness: 0.1 })
    );
    lensBarrel.rotation.x = Math.PI / 2;
    sensorGroup.add(lensBarrel);

    // Glass Aperture Element
    const glassLens = new THREE.Mesh(
      new THREE.CircleGeometry(0.22, 24),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.7 })
    );
    glassLens.position.set(0, 0, 0.23);
    sensorGroup.add(glassLens);

    meshesBySubsystem['sensors'].push(lensBarrel, glassLens);
    spacecraft.add(sensorGroup);

    // H. Thermal Control Radiator Panels (Ammonia loops)
    const thermalGroup = new THREE.Group();
    thermalGroup.position.set(0.68, -0.2, -0.55);

    const radPanel = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.85, 0.7),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.1,
        metalness: 0.4,
      })
    );
    thermalGroup.add(radPanel);

    // Heat pipe loop tubing
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 });
    for (let p = -2; p <= 2; p++) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.65, 8), pipeMat);
      pipe.rotation.x = Math.PI / 2;
      pipe.position.set(0.03, p * 0.15, 0);
      thermalGroup.add(pipe);
    }
    meshesBySubsystem['thermal'].push(radPanel);
    spacecraft.add(thermalGroup);

    subsystemMeshesRef.current = meshesBySubsystem;

    // 5. Create 3D Hotspot Anchor Markers
    const markers: { id: HotspotId; position: THREE.Vector3; mesh: THREE.Mesh }[] = [];
    SPACECRAFT_HOTSPOTS.forEach((spot) => {
      const pos = new THREE.Vector3(...spot.position3D);
      const markerGroup = new THREE.Group();
      markerGroup.position.copy(pos);

      // Glowing dot
      const dotGeo = new THREE.SphereGeometry(0.07, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(spot.color),
        transparent: true,
        opacity: 0.9,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);

      // Pulse ring
      const ringGeo = new THREE.RingGeometry(0.09, 0.13, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(spot.color),
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);

      markerGroup.add(dot, ring);
      spacecraft.add(markerGroup);

      markers.push({ id: spot.id, position: pos, mesh: dot });
    });
    hotspotMarkersRef.current = markers;

    // 6. Interactive Mouse & Drag Rotation
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotX = 0.25;
    let rotY = -0.4;
    let targetRotX = 0.25;
    let targetRotY = -0.4;
    let targetZoom = 5.2;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      isDragging = true;
      prevMouse = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - prevMouse.x;
      const dy = clientY - prevMouse.y;

      targetRotY += dx * 0.007;
      targetRotX += dy * 0.007;
      targetRotX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, targetRotX));

      prevMouse = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom += e.deltaY * 0.003;
      targetZoom = Math.max(3.2, Math.min(7.5, targetZoom));
    };

    // Raycast on click for 3D Hotspot selection
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const markerMeshes = markers.map((m) => m.mesh);
      const intersects = raycaster.intersectObjects(markerMeshes, true);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const matched = markers.find((m) => m.mesh === hitMesh);
        if (matched) {
          onSelectHotspot(matched.id);
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
    domEl.addEventListener('wheel', onWheel, { passive: false });
    domEl.addEventListener('click', onClick);

    // Responsive resize
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    setIsLoading(false);

    // 7. Render Animation Loop
    let clockTime = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clockTime += 0.02;

      // Auto rotation
      if (autoRotate && !isDragging) {
        targetRotY += 0.003;
      }

      // Smooth interpolation
      rotX += (targetRotX - rotX) * 0.07;
      rotY += (targetRotY - rotY) * 0.07;
      camera.position.z += (targetZoom - camera.position.z) * 0.08;

      spacecraft.rotation.x = rotX;
      spacecraft.rotation.y = rotY;

      // Gently float/oscillate spacecraft
      spacecraft.position.y = Math.sin(clockTime * 0.8) * 0.08;

      // Make hotspot rings face camera and pulse
      markers.forEach(({ mesh }) => {
        mesh.quaternion.copy(camera.quaternion);
        mesh.scale.setScalar(1 + Math.sin(clockTime * 3) * 0.12);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domEl.removeEventListener('mousedown', onPointerDown);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      domEl.removeEventListener('wheel', onWheel);
      domEl.removeEventListener('click', onClick);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectHotspot]);

  // Update wireframe state dynamically
  useEffect(() => {
    if (!spacecraftGroupRef.current) return;
    spacecraftGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => {
            if ('wireframe' in m) m.wireframe = wireframe;
          });
        } else if ('wireframe' in child.material) {
          child.material.wireframe = wireframe;
        }
      }
    });
  }, [wireframe]);

  // Update exploded view state dynamically
  useEffect(() => {
    if (!subsystemMeshesRef.current) return;
    const mult = explodedView ? 1.6 : 1.0;

    // Expand wings outward
    const solarWingMeshes = subsystemMeshesRef.current['solar-arrays'] || [];
    solarWingMeshes.forEach((mesh) => {
      if (mesh.parent) {
        mesh.parent.position.x = mesh.parent.position.x > 0 ? (explodedView ? 0.6 : 0) : (explodedView ? -0.6 : 0);
      }
    });

    // Expand antenna upward
    const antennaMeshes = subsystemMeshesRef.current['antenna'] || [];
    antennaMeshes.forEach((mesh) => {
      if (mesh.parent) {
        mesh.parent.position.y = explodedView ? 1.45 : 0.95;
      }
    });

    // Expand propulsion downward
    const propMeshes = subsystemMeshesRef.current['propulsion'] || [];
    propMeshes.forEach((mesh) => {
      if (mesh.parent) {
        mesh.parent.position.y = explodedView ? -1.45 : -0.95;
      }
    });
  }, [explodedView]);

  // Highlight selected hotspot subsystem in 3D
  useEffect(() => {
    if (!subsystemMeshesRef.current) return;

    Object.entries(subsystemMeshesRef.current).forEach(([key, meshes]) => {
      const isSelected = key === selectedHotspotId;
      meshes.forEach((mesh) => {
        if (mesh instanceof THREE.Mesh && mesh.material) {
          const mat = mesh.material;
          if ('emissive' in mat) {
            if (isSelected) {
              mat.emissive = new THREE.Color('#00f0ff');
              mat.emissiveIntensity = 0.8;
            } else {
              mat.emissive = new THREE.Color(key === 'solar-arrays' ? '#002244' : '#000000');
              mat.emissiveIntensity = 0.2;
            }
          }
        }
      });
    });
  }, [selectedHotspotId]);

  // Handle Reset View trigger from parent
  useEffect(() => {
    if (onResetTrigger > 0 && cameraRef.current && spacecraftGroupRef.current) {
      cameraRef.current.position.set(0, 1.2, 5.2);
      spacecraftGroupRef.current.rotation.set(0.25, -0.4, 0);
    }
  }, [onResetTrigger]);

  return (
    <div className={`relative ${className} flex items-center justify-center select-none`} ref={containerRef}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#02040a]/80 z-10 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#00f0ff] border-t-transparent animate-spin" />
            <span className="font-mono text-xs tracking-widest text-[#00f0ff] uppercase">
              Rendering 3D Spacecraft Bus...
            </span>
          </div>
        </div>
      )}

      {/* Fallback card if WebGL is unavailable */}
      {!webglSupported && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050d1a] border border-[#00f0ff]/20 p-8 rounded-2xl text-center">
          <div className="max-w-lg">
            <div className="w-20 h-20 rounded-xl border border-[#00f0ff]/40 bg-[#00f0ff]/10 mx-auto mb-4 flex items-center justify-center">
              <span className="font-mono text-2xl text-[#00f0ff]">ORBITA</span>
            </div>
            <h4 className="font-heading font-bold text-xl text-white mb-2 uppercase tracking-wider">
              ORBITA Spacecraft Schematic (Hardware Fallback)
            </h4>
            <p className="text-xs font-mono text-slate-400 leading-relaxed mb-6">
              WebGL 3D graphics hardware acceleration unavailable. Spacecraft subsystems remain fully accessible via the telemetry panel below.
            </p>
            <div className="grid grid-cols-2 gap-2 text-left">
              {SPACECRAFT_HOTSPOTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSelectHotspot(s.id)}
                  className={`p-2 rounded border text-xs font-mono transition-colors ${
                    selectedHotspotId === s.id
                      ? 'border-[#00f0ff] bg-[#00f0ff]/20 text-[#00f0ff]'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subtle 3D Viewport HUD Overlay Markers */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
        <span className="font-mono text-[10px] text-[#00f0ff] tracking-widest uppercase">
          3D MODEL: ACTIVE • ROTATE & ZOOM ENABLED
        </span>
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-none hidden sm:block">
        <span className="font-mono text-[10px] text-slate-500 tracking-wider">
          CLICK ANY GLOWING NODE TO INSPECT SUBSYSTEM
        </span>
      </div>
    </div>
  );
};
