import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface EarthCanvasProps {
  interactive?: boolean;
  activeCategory?: string;
  showSatellite?: boolean;
  className?: string;
  cameraDistance?: number;
}

export const EarthCanvas: React.FC<EarthCanvasProps> = ({
  interactive = true,
  activeCategory = 'ALL',
  showSatellite = true,
  className = 'w-full h-full min-h-[480px]',
  cameraDistance = 3.6,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
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
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = cameraDistance;
    camera.position.y = 0.4;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Starfield Generator
    const starCount = 1200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 25 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const isCyanStar = Math.random() > 0.85;
      starColors[i * 3] = isCyanStar ? 0.3 : 0.8 + Math.random() * 0.2;
      starColors[i * 3 + 1] = isCyanStar ? 0.8 : 0.8 + Math.random() * 0.2;
      starColors[i * 3 + 2] = isCyanStar ? 1.0 : 0.9 + Math.random() * 0.1;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 3. Procedural High-Detail Earth Texture Generation via Canvas
    const createEarthTexture = () => {
      const texCanvas = document.createElement('canvas');
      texCanvas.width = 2048;
      texCanvas.height = 1024;
      const ctx = texCanvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      // Deep space ocean base
      const grad = ctx.createLinearGradient(0, 0, 0, texCanvas.height);
      grad.addColorStop(0, '#040b19');
      grad.addColorStop(0.5, '#071633');
      grad.addColorStop(1, '#020712');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, texCanvas.width, texCanvas.height);

      // Continent landmass shapes (procedural stylized Earth geometry)
      ctx.fillStyle = '#0f2b3e';
      const continents = [
        // North America
        { x: 380, y: 320, rx: 220, ry: 160 },
        { x: 480, y: 220, rx: 160, ry: 90 },
        // South America
        { x: 580, y: 640, rx: 130, ry: 210 },
        // Europe & UK
        { x: 1040, y: 270, rx: 130, ry: 100 },
        { x: 980, y: 240, rx: 40, ry: 50 },
        // Africa
        { x: 1080, y: 550, rx: 180, ry: 220 },
        // Asia
        { x: 1380, y: 320, rx: 320, ry: 200 },
        { x: 1580, y: 440, rx: 160, ry: 120 },
        // Australia
        { x: 1680, y: 720, rx: 140, ry: 110 },
      ];

      continents.forEach(({ x, y, rx, ry }) => {
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();

        // Land interior elevation hue
        ctx.fillStyle = '#163c56';
        ctx.beginPath();
        ctx.ellipse(x, y, rx * 0.7, ry * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f2b3e';
      });

      // City lights on night side (glowing golden-cyan dots)
      ctx.fillStyle = '#00f0ff';
      for (let i = 0; i < 400; i++) {
        const cx = 300 + Math.random() * 1400;
        const cy = 200 + Math.random() * 600;
        const size = Math.random() * 1.8 + 0.5;
        ctx.globalAlpha = Math.random() * 0.7 + 0.3;
        ctx.fillRect(cx, cy, size, size);
      }
      ctx.globalAlpha = 1.0;

      // Latitudinal grid lines (technical aerospace HUD lines on globe)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let lat = 100; lat < texCanvas.height; lat += 120) {
        ctx.beginPath();
        ctx.moveTo(0, lat);
        ctx.lineTo(texCanvas.width, lat);
        ctx.stroke();
      }
      for (let lon = 0; lon < texCanvas.width; lon += 180) {
        ctx.beginPath();
        ctx.moveTo(lon, 0);
        ctx.lineTo(lon, texCanvas.height);
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(texCanvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    const earthTexture = createEarthTexture();

    // 4. Earth Mesh
    const earthRadius = 1.4;
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.15,
      emissive: new THREE.Color('#031226'),
      emissiveIntensity: 0.4,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // 5. Atmospheric Glow Shell
    const atmoGeometry = new THREE.SphereGeometry(earthRadius * 1.035, 64, 64);
    const atmoMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00f0ff'),
      transparent: true,
      opacity: 0.16,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmoGeometry, atmoMaterial);
    scene.add(atmosphere);

    // Outer faint exosphere ring
    const outerHaloGeo = new THREE.SphereGeometry(earthRadius * 1.15, 48, 48);
    const outerHaloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#0284c7'),
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const outerHalo = new THREE.Mesh(outerHaloGeo, outerHaloMat);
    scene.add(outerHalo);

    // 6. Orbital Trajectory Ellipse
    const orbitCurve = new THREE.EllipseCurve(
      0, 0,
      earthRadius * 1.6, earthRadius * 1.45,
      0, 2 * Math.PI,
      false,
      0
    );
    const orbitPoints = orbitCurve.getPoints(120);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
      orbitPoints.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45,
    });
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    orbitLine.rotation.x = Math.PI / 3.2;
    orbitLine.rotation.z = Math.PI / 6;
    scene.add(orbitLine);

    // Second polar orbit for high-latitude coverage
    const polarOrbitCurve = new THREE.EllipseCurve(
      0, 0,
      earthRadius * 1.7, earthRadius * 1.65,
      0, 2 * Math.PI,
      false,
      0
    );
    const polarPoints = polarOrbitCurve.getPoints(100);
    const polarOrbitGeo = new THREE.BufferGeometry().setFromPoints(
      polarPoints.map((p) => new THREE.Vector3(p.x, p.y, 0))
    );
    const polarOrbitLine = new THREE.Line(
      polarOrbitGeo,
      new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.25 })
    );
    polarOrbitLine.rotation.y = Math.PI / 4;
    scene.add(polarOrbitLine);

    // 7. Satellite Representation
    const satelliteGroup = new THREE.Group();

    if (showSatellite) {
      // Satellite main bus
      const satBusGeo = new THREE.BoxGeometry(0.08, 0.08, 0.12);
      const satBusMat = new THREE.MeshStandardMaterial({
        color: 0xd4d4d8,
        metalness: 0.9,
        roughness: 0.2,
      });
      const satBus = new THREE.Mesh(satBusGeo, satBusMat);
      satelliteGroup.add(satBus);

      // Satellite Solar Panels
      const wingGeo = new THREE.BoxGeometry(0.32, 0.01, 0.09);
      const wingMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: 0x003366,
        roughness: 0.3,
        metalness: 0.8,
      });
      const wingLeft = new THREE.Mesh(wingGeo, wingMat);
      wingLeft.position.x = -0.22;
      satelliteGroup.add(wingLeft);

      const wingRight = new THREE.Mesh(wingGeo, wingMat);
      wingRight.position.x = 0.22;
      satelliteGroup.add(wingRight);

      // Glowing communication beacon
      const beaconGeo = new THREE.SphereGeometry(0.02, 12, 12);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.y = 0.06;
      satelliteGroup.add(beacon);

      scene.add(satelliteGroup);
    }

    // 8. Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x0a1628, 1.2);
    scene.add(ambientLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 1.8);
    cyanRimLight.position.set(-6, -2, -4);
    scene.add(cyanRimLight);

    // 9. Interactive mouse rotation / drag
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let currentRotationX = 0.2;
    let currentRotationY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMousePos = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !interactive) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMousePos.x;
      const deltaY = clientY - prevMousePos.y;

      targetRotationY += deltaX * 0.006;
      targetRotationX += deltaY * 0.006;
      targetRotationX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, targetRotationX));

      prevMousePos = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    // 10. Responsive resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    setIsLoading(false);

    // 11. Animation Loop
    let satAngle = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Continuous Earth rotation
      if (!isDragging) {
        targetRotationY += 0.0018;
      }

      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      earth.rotation.x = currentRotationX;
      earth.rotation.y = currentRotationY;
      atmosphere.rotation.x = currentRotationX;
      atmosphere.rotation.y = currentRotationY;

      // Rotate stars very slowly
      stars.rotation.y += 0.00015;

      // Animate satellite along ellipse
      if (showSatellite && satelliteGroup) {
        satAngle += 0.012;
        const pt = orbitCurve.getPoint(satAngle % 1);
        const satPos = new THREE.Vector3(pt.x, 0, pt.y);
        satPos.applyEuler(orbitLine.rotation);
        satelliteGroup.position.copy(satPos);
        satelliteGroup.rotation.y = satAngle * 2;
      }

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

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, [cameraDistance, interactive, showSatellite, activeCategory]);

  return (
    <div className={`relative ${className} flex items-center justify-center`} ref={containerRef}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#02040a]/80 z-10 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#00f0ff] border-t-transparent animate-spin" />
            <span className="font-mono text-xs tracking-widest text-[#00f0ff] uppercase">
              Initializing Orbital Sphere...
            </span>
          </div>
        </div>
      )}

      {!webglSupported && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050d1a] border border-[#00f0ff]/20 p-8 rounded-xl text-center">
          <div className="max-w-md">
            <div className="w-24 h-24 rounded-full border-2 border-[#00f0ff]/60 mx-auto mb-4 flex items-center justify-center bg-[#00f0ff]/10">
              <div className="w-16 h-16 rounded-full bg-[#0284c7]/30 border border-[#00f0ff]" />
            </div>
            <h4 className="font-heading font-bold text-lg text-white mb-2 uppercase tracking-wider">
              Earth Orbital Visualization (Simulated Fallback)
            </h4>
            <p className="text-xs font-mono text-slate-400 leading-relaxed mb-4">
              WebGL hardware acceleration is restricted or in fallback mode. Procedural high-resolution planetary rendering is active.
            </p>
            <div className="inline-block px-3 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[10px] font-mono tracking-widest uppercase rounded">
              ORBIT: 542 KM • SUN-SYNCHRONOUS
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
