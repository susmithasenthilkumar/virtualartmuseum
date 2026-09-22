import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PhoneFinish } from '../../types/nova';
import { RotateCw, Maximize2, Sparkles } from 'lucide-react';

interface NovaPhone3DProps {
  finish: PhoneFinish;
  autoRotate?: boolean;
  interactive?: boolean;
  targetAngle?: { rotX: number; rotY: number; zoom?: number } | null;
  onAngleChange?: (rotY: number) => void;
  className?: string;
  showControls?: boolean;
}

export const NovaPhone3D: React.FC<NovaPhone3DProps> = ({
  finish,
  autoRotate = true,
  interactive = true,
  targetAngle = null,
  onAngleChange,
  className = '',
  showControls = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [isDragging, setIsDragging] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  // References to keep Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const phoneGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<{
    backMat: THREE.MeshStandardMaterial;
    frameMat: THREE.MeshStandardMaterial;
    cameraIslandMat: THREE.MeshStandardMaterial;
  } | null>(null);

  const rotationRef = useRef({ x: 0.15, y: 0.35 });
  const mouseRef = useRef({ prevX: 0, prevY: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  // Helper to draw realistic NOVA OS screen texture
  const createScreenTexture = (accentColor: string): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Dark deep space background
      const grad = ctx.createLinearGradient(0, 0, 1024, 2048);
      grad.addColorStop(0, '#06070a');
      grad.addColorStop(0.35, '#0b0f19');
      grad.addColorStop(0.7, '#131126');
      grad.addColorStop(1, '#050608');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 2048);

      // Glowing abstract celestial nebula
      const nebula = ctx.createRadialGradient(512, 900, 50, 512, 900, 700);
      nebula.addColorStop(0, accentColor);
      nebula.addColorStop(0.3, 'rgba(56, 189, 248, 0.45)');
      nebula.addColorStop(0.65, 'rgba(168, 85, 247, 0.2)');
      nebula.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, 1024, 2048);

      // Top Status Bar
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 42px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('09:41', 90, 105);

      // Status icons: 5G & Battery
      ctx.textAlign = 'right';
      ctx.font = '500 36px "Space Grotesk", monospace';
      ctx.fillText('5G • 100%', 940, 105);

      // Top Dynamic Pill / Punch-hole
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.roundRect(432, 50, 160, 52, 26);
      ctx.fill();
      // Glowing camera sensor dot
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath();
      ctx.arc(470, 76, 9, 0, Math.PI * 2);
      ctx.fill();

      // Futuristic Central Clock & Date
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '500 48px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('TUESDAY, SEPTEMBER 22', 512, 420);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 180px "Space Grotesk", sans-serif';
      ctx.fillText('09:41', 512, 590);

      // Brand Monogram
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.font = '700 32px "Space Grotesk", sans-serif';
      ctx.letterSpacing = '12px';
      ctx.fillText('NOVA OS 4.0', 512, 670);

      // Sleek Glass Widget 1: N1 Ultra Neural Engine
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(80, 780, 864, 280, 48);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 34px "Space Grotesk", sans-serif';
      ctx.fillText('N1 ULTRA SILICON • ON-DEVICE ACTIVE', 130, 860);

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 52px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('45 TOPS Matrix Engine', 130, 940);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '400 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Zero-Cloud Sovereignty • Sub-3ms Neural Latency', 130, 1010);

      // Sleek Glass Widget 2: Pro Camera Horizon
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.roundRect(80, 1100, 864, 280, 48);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#a855f7';
      ctx.font = '700 34px "Space Grotesk", sans-serif';
      ctx.fillText('TRIPLE OPTIC SENSOR ARRAY', 130, 1180);

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 52px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('200MP Master • 10x Periscope', 130, 1260);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '400 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('12,000 OIS Stabilizations/sec Ready', 130, 1330);

      // Quick Action Dock at bottom
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.roundRect(140, 1720, 744, 180, 90);
      ctx.fill();

      // Dock App Icons
      const dockIcons = ['⚡', '📷', '🧠', '🌐'];
      dockIcons.forEach((icon, idx) => {
        const x = 230 + idx * 190;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(x, 1810, 56, 0, Math.PI * 2);
        ctx.fill();

        ctx.textAlign = 'center';
        ctx.font = '46px sans-serif';
        ctx.fillText(icon, x, 1826);
      });

      // Bottom Home Bar indicator
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.roundRect(362, 1980, 300, 12, 6);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
  };

  // Build the 3D phone model
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    fillLight.position.set(-5, 2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 2.4);
    rimLight.position.set(0, -5, -4);
    scene.add(rimLight);

    const topRimLight = new THREE.DirectionalLight(0xffffff, 1.6);
    topRimLight.position.set(0, 6, -3);
    scene.add(topRimLight);

    // Root Group
    const phoneGroup = new THREE.Group();
    scene.add(phoneGroup);
    phoneGroupRef.current = phoneGroup;

    // Materials
    const frameMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(finish.frameHex),
      metalness: 0.95,
      roughness: 0.24,
    });

    const backMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(finish.hex),
      metalness: 0.45,
      roughness: 0.32,
    });

    const cameraIslandMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(finish.hex),
      metalness: 0.8,
      roughness: 0.2,
    });

    materialsRef.current = { backMat, frameMat, cameraIslandMat };

    // 1. Phone Body Frame (Rounded Box)
    // Geometry dimensions: W: 2.1, H: 4.4, D: 0.22, Corner Radius: 0.24
    const phoneWidth = 2.1;
    const phoneHeight = 4.4;
    const phoneDepth = 0.22;
    const cornerRadius = 0.26;

    const shape = new THREE.Shape();
    const x = -phoneWidth / 2;
    const y = -phoneHeight / 2;
    const w = phoneWidth;
    const h = phoneHeight;
    const r = cornerRadius;

    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: phoneDepth,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.035,
    };

    const frameGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    frameGeometry.center();
    const frameMesh = new THREE.Mesh(frameGeometry, frameMat);
    phoneGroup.add(frameMesh);

    // 2. Back Ceramic / Glass Plate
    const backPlateGeom = new THREE.PlaneGeometry(phoneWidth - 0.04, phoneHeight - 0.04);
    const backPlate = new THREE.Mesh(backPlateGeom, backMat);
    backPlate.position.z = -phoneDepth / 2 - 0.038;
    backPlate.rotation.y = Math.PI;
    phoneGroup.add(backPlate);

    // 3. Front Display Screen
    const screenTexture = createScreenTexture(finish.accentHex);
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTexture,
      roughness: 0.08,
      metalness: 0.1,
      emissive: new THREE.Color(finish.glowHex),
      emissiveIntensity: 0.15,
      emissiveMap: screenTexture,
    });

    const screenGeom = new THREE.PlaneGeometry(phoneWidth - 0.08, phoneHeight - 0.08);
    const screenMesh = new THREE.Mesh(screenGeom, screenMat);
    screenMesh.position.z = phoneDepth / 2 + 0.038;
    phoneGroup.add(screenMesh);

    // 4. Camera Island (Pro Triple Optics module) on Back Plate
    const cameraIslandGroup = new THREE.Group();
    cameraIslandGroup.position.set(-0.45, 1.25, -phoneDepth / 2 - 0.08);
    cameraIslandGroup.rotation.y = Math.PI;
    phoneGroup.add(cameraIslandGroup);

    // Island base
    const islandBaseGeom = new THREE.BoxGeometry(0.9, 1.15, 0.08);
    const islandBase = new THREE.Mesh(islandBaseGeom, cameraIslandMat);
    cameraIslandGroup.add(islandBase);

    // Camera Lenses
    const lensPositions = [
      { x: -0.22, y: 0.28 }, // Main lens
      { x: -0.22, y: -0.28 }, // Telephoto
      { x: 0.22, y: 0.0 }, // Ultra-wide
    ];

    const lensOuterRingMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.95,
      roughness: 0.15,
    });

    const lensGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050814,
      metalness: 0.8,
      roughness: 0.05,
      transmission: 0.25,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    const lensInnerRingMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
    });

    lensPositions.forEach((pos, idx) => {
      const lensGroup = new THREE.Group();
      lensGroup.position.set(pos.x, pos.y, 0.05);

      // Outer bezel ring
      const ringGeom = new THREE.CylinderGeometry(0.19, 0.20, 0.07, 32);
      ringGeom.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeom, lensOuterRingMat);
      lensGroup.add(ringMesh);

      // Inner optic glass
      const glassGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.08, 32);
      glassGeom.rotateX(Math.PI / 2);
      const glassMesh = new THREE.Mesh(glassGeom, lensGlassMat);
      lensGroup.add(glassMesh);

      // Aperture Iris ring
      const irisGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.085, 32);
      irisGeom.rotateX(Math.PI / 2);
      const irisMesh = new THREE.Mesh(irisGeom, lensInnerRingMat);
      lensGroup.add(irisMesh);

      cameraIslandGroup.add(lensGroup);
    });

    // Dual-Tone Flash
    const flashGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.04, 24);
    flashGeom.rotateX(Math.PI / 2);
    const flashMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfef08a,
      emissiveIntensity: 0.4,
      roughness: 0.4,
    });
    const flashMesh = new THREE.Mesh(flashGeom, flashMat);
    flashMesh.position.set(0.22, 0.36, 0.05);
    cameraIslandGroup.add(flashMesh);

    // LiDAR Scanner Dot
    const lidarGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.04, 24);
    lidarGeom.rotateX(Math.PI / 2);
    const lidarMat = new THREE.MeshStandardMaterial({
      color: 0x090a0f,
      metalness: 0.9,
      roughness: 0.1,
    });
    const lidarMesh = new THREE.Mesh(lidarGeom, lidarMat);
    lidarMesh.position.set(0.22, -0.36, 0.05);
    cameraIslandGroup.add(lidarMesh);

    // 5. Side Buttons
    const buttonMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(finish.frameHex),
      metalness: 0.9,
      roughness: 0.2,
    });

    // Action button (Left side, top)
    const actionBtn = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.28, 0.08), buttonMat);
    actionBtn.position.set(-phoneWidth / 2 - 0.04, 1.0, 0);
    phoneGroup.add(actionBtn);

    // Volume buttons (Left side)
    const volUp = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.42, 0.08), buttonMat);
    volUp.position.set(-phoneWidth / 2 - 0.04, 0.45, 0);
    phoneGroup.add(volUp);

    const volDown = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.42, 0.08), buttonMat);
    volDown.position.set(-phoneWidth / 2 - 0.04, -0.1, 0);
    phoneGroup.add(volDown);

    // Power Key (Right side)
    const powerBtn = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.65, 0.08), buttonMat);
    powerBtn.position.set(phoneWidth / 2 + 0.04, 0.4, 0);
    phoneGroup.add(powerBtn);

    // 6. USB-C Port & Speaker Grilles (Bottom)
    const usbcPort = new THREE.Mesh(
      new THREE.BoxGeometry(0.26, 0.04, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x05070a, metalness: 0.8, roughness: 0.2 })
    );
    usbcPort.position.set(0, -phoneHeight / 2 - 0.04, 0);
    phoneGroup.add(usbcPort);

    // Stereo speaker holes
    for (let i = -3; i <= 3; i++) {
      if (Math.abs(i) < 2) continue; // Leave center space for USB-C
      const dot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.04, 12),
        new THREE.MeshStandardMaterial({ color: 0x020305 })
      );
      dot.position.set(i * 0.12, -phoneHeight / 2 - 0.038, 0);
      phoneGroup.add(dot);
    }

    setCanvasReady(true);

    // Animation Loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!phoneGroupRef.current) return;

      // Smooth lerp to target angle if specified
      if (targetAngle) {
        rotationRef.current.x += (targetAngle.rotX - rotationRef.current.x) * 0.08;
        rotationRef.current.y += (targetAngle.rotY - rotationRef.current.y) * 0.08;
        if (targetAngle.zoom && cameraRef.current) {
          cameraRef.current.position.z += (targetAngle.zoom - cameraRef.current.position.z) * 0.08;
        }
      } else if (isRotating && !isDragging) {
        rotationRef.current.y += 0.45 * delta;
      }

      phoneGroupRef.current.rotation.x = rotationRef.current.x;
      phoneGroupRef.current.rotation.y = rotationRef.current.y;

      if (onAngleChange) {
        onAngleChange(rotationRef.current.y);
      }

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newW / newH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH);
        }
      }
    });

    resizeObserver.observe(container);

    // Cleanup
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      renderer.dispose();
      frameGeometry.dispose();
      screenGeom.dispose();
      backPlateGeom.dispose();
      screenTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update materials when finish color changes
  useEffect(() => {
    if (materialsRef.current) {
      materialsRef.current.frameMat.color.set(finish.frameHex);
      materialsRef.current.backMat.color.set(finish.hex);
      materialsRef.current.cameraIslandMat.color.set(finish.hex);
    }
  }, [finish]);

  // Touch and Mouse Interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    mouseRef.current = { prevX: e.clientX, prevY: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!interactive || !isDragging) return;
    const deltaX = e.clientX - mouseRef.current.prevX;
    const deltaY = e.clientY - mouseRef.current.prevY;
    mouseRef.current = { prevX: e.clientX, prevY: e.clientY };

    rotationRef.current.y += deltaX * 0.01;
    rotationRef.current.x = Math.max(-0.8, Math.min(0.8, rotationRef.current.x + deltaY * 0.01));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    rotationRef.current = { x: 0.15, y: 0.35 };
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 5.2);
    }
  };

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`w-full h-full relative cursor-grab active:cursor-grabbing transition-opacity duration-500 ${
          canvasReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating Micro Controls */}
      {showControls && (
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none z-10 px-2">
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`p-2 rounded-full border border-white/10 backdrop-blur-md text-xs transition-all ${
                isRotating
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  : 'bg-black/40 text-slate-400 hover:text-white'
              }`}
              title={isRotating ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            </button>
            <button
              onClick={resetView}
              className="p-2 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 text-slate-400 hover:text-white backdrop-blur-md transition-all"
              title="Reset View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-[11px] text-slate-400 font-tech pointer-events-auto">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>DRAG TO ROTATE 360°</span>
          </div>
        </div>
      )}
    </div>
  );
};
