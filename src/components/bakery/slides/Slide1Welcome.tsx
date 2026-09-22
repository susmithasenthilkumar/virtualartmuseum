import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BakeryTheme } from '../../../theme/bakeryThemes';

interface Slide1WelcomeProps {
  theme: BakeryTheme;
  onNextSlide: () => void;
  onGoToSlide: (index: number) => void;
}

export const Slide1Welcome: React.FC<Slide1WelcomeProps> = ({ theme, onNextSlide, onGoToSlide }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeFlavor, setActiveFlavor] = useState<'vanilla' | 'chocolate' | 'berry'>('vanilla');

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 2.0, 5.8);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xfff6ee, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff1e0, 2.6);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd9a87d, 1.8);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Cake Pedestal Stand
    const standColor = theme.isDark ? 0x221a20 : 0x24150e;
    const standMat = new THREE.MeshStandardMaterial({
      color: standColor,
      roughness: 0.35,
      metalness: 0.2,
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.85,
    });

    const plate = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.0, 0.12, 48), standMat);
    plate.position.y = -0.7;
    rootGroup.add(plate);

    const brassRim = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.03, 16, 48), brassMat);
    brassRim.rotation.x = Math.PI / 2;
    brassRim.position.y = -0.65;
    rootGroup.add(brassRim);

    // Materials by flavor
    const materials = {
      vanilla: {
        cake: new THREE.MeshStandardMaterial({ color: 0xfcf6ed, roughness: 0.55 }),
        piping: new THREE.MeshStandardMaterial({ color: 0xfffcf7, roughness: 0.35 }),
        accent: new THREE.MeshStandardMaterial({ color: 0xc83e4d, roughness: 0.25 }),
      },
      chocolate: {
        cake: new THREE.MeshStandardMaterial({ color: 0x3d2014, roughness: 0.4 }),
        piping: new THREE.MeshStandardMaterial({ color: 0x25120a, roughness: 0.25 }),
        accent: new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.2, metalness: 0.6 }),
      },
      berry: {
        cake: new THREE.MeshStandardMaterial({ color: 0xfde8ed, roughness: 0.5 }),
        piping: new THREE.MeshStandardMaterial({ color: 0xffe4eb, roughness: 0.35 }),
        accent: new THREE.MeshStandardMaterial({ color: 0x931f3b, roughness: 0.2 }),
      },
    };

    const currentMat = materials[activeFlavor];

    // Bottom Tier
    const tier1 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 1.0, 48), currentMat.cake);
    tier1.position.y = -0.15;
    rootGroup.add(tier1);

    // Bottom decorative pearl ring
    const pearlsBottom = new THREE.Group();
    const pearlCount = 32;
    const pearlGeo = new THREE.SphereGeometry(0.045, 12, 12);
    for (let i = 0; i < pearlCount; i++) {
      const angle = (i / pearlCount) * Math.PI * 2;
      const pearl = new THREE.Mesh(pearlGeo, currentMat.piping);
      pearl.position.set(Math.cos(angle) * 1.62, -0.6, Math.sin(angle) * 1.62);
      pearlsBottom.add(pearl);
    }
    rootGroup.add(pearlsBottom);

    // Top Tier
    const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.85, 48), currentMat.cake);
    tier2.position.y = 0.75;
    rootGroup.add(tier2);

    // Mid tier pearl ring
    const pearlsMid = new THREE.Group();
    const pearlCountMid = 24;
    for (let i = 0; i < pearlCountMid; i++) {
      const angle = (i / pearlCountMid) * Math.PI * 2;
      const pearl = new THREE.Mesh(pearlGeo, currentMat.piping);
      pearl.position.set(Math.cos(angle) * 1.08, 0.35, Math.sin(angle) * 1.08);
      pearlsMid.add(pearl);
    }
    rootGroup.add(pearlsMid);

    // Top Piping Swirls and Crown Toppings
    const crownGroup = new THREE.Group();
    const rosettes = 8;
    const rosetteGeo = new THREE.SphereGeometry(0.12, 16, 16);
    rosetteGeo.scale(1.0, 1.3, 1.0);

    for (let i = 0; i < rosettes; i++) {
      const angle = (i / rosettes) * Math.PI * 2;
      const rosette = new THREE.Mesh(rosetteGeo, currentMat.piping);
      rosette.position.set(Math.cos(angle) * 0.8, 1.22, Math.sin(angle) * 0.8);
      crownGroup.add(rosette);

      // Berry / Gold leaf on top
      const berryGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const berry = new THREE.Mesh(berryGeo, currentMat.accent);
      berry.position.set(Math.cos(angle) * 0.8, 1.36, Math.sin(angle) * 0.8);
      crownGroup.add(berry);
    }

    // Center Macaron Topper
    const macaronTop = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.14, 24), currentMat.accent);
    macaronTop.position.set(0, 1.3, 0);
    crownGroup.add(macaronTop);

    rootGroup.add(crownGroup);

    // Gentle Auto-Rotation & Interaction
    let animationFrameId: number;
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotationY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - prevMouseX;
      targetRotationY += delta * 0.01;
      prevMouseX = e.clientX;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isDragging) {
        rootGroup.rotation.y += 0.005;
      } else {
        rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.1;
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeFlavor, theme]);

  return (
    <div className="h-full w-full flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-6 sm:py-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: theme.glow1Hex }}
      />
      <div 
        className="absolute bottom-10 left-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: theme.glow2Hex }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Brand Statement */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${theme.subtleBgClass} border ${theme.borderClass} text-xs font-sans font-semibold tracking-widest ${theme.accentClass} uppercase`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Slide 01 • Brand Essence & Welcome</span>
          </div>

          <div className="space-y-3">
            <h1 className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight ${theme.textPrimaryClass} leading-[1.08]`}>
              BAKED WITH PASSION.{' '}
              <span className={`block ${theme.accentClass} italic font-normal`}>
                CRAFTED WITH LOVE.
              </span>
            </h1>

            <p className={`text-base sm:text-xl ${theme.textSecondaryClass} font-sans font-light leading-relaxed max-w-2xl`}>
              Welcome to <strong className={`font-semibold ${theme.textPrimaryClass}`}>The Velvet Whisk</strong>, an artisanal patisserie and hearth bakery honoring traditional European slow fermentation, pure uncompromised ingredients, and modern botanical cake artistry.
            </p>
          </div>

          {/* Quick Craft Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className={`p-3 rounded-2xl ${theme.cardBgClass} border ${theme.borderClass} shadow-sm backdrop-blur-sm`}>
              <span className={`text-[10px] font-sans font-bold uppercase ${theme.accentClass} block tracking-wider`}>
                100% Handcrafted
              </span>
              <span className={`text-xs ${theme.textSecondaryClass} font-sans`}>
                Baked fresh every dawn
              </span>
            </div>
            <div className={`p-3 rounded-2xl ${theme.cardBgClass} border ${theme.borderClass} shadow-sm backdrop-blur-sm`}>
              <span className={`text-[10px] font-sans font-bold uppercase ${theme.goldClass} block tracking-wider`}>
                Single-Origin
              </span>
              <span className={`text-xs ${theme.textSecondaryClass} font-sans`}>
                Valrhona & Normandy butter
              </span>
            </div>
            <div className={`p-3 rounded-2xl ${theme.cardBgClass} border ${theme.borderClass} shadow-sm col-span-2 sm:col-span-1 backdrop-blur-sm`}>
              <span className={`text-[10px] font-sans font-bold uppercase ${theme.accentClass} block tracking-wider`}>
                Natural Ferment
              </span>
              <span className={`text-xs ${theme.textSecondaryClass} font-sans`}>
                48-hour cold fermentation
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onNextSlide}
              className={`px-7 py-3.5 rounded-full ${theme.accentBgClass} ${theme.accentHoverBgClass} text-white text-xs font-sans font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-2.5 cursor-pointer group`}
            >
              <span>Explore The 6 Slides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onGoToSlide(2)} // jump to slide 3: Specialties
              className={`px-6 py-3.5 rounded-full border ${theme.borderClass} ${theme.cardBgClass} hover:opacity-90 ${theme.textPrimaryClass} text-xs font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-sm`}
            >
              View What We Bake
            </button>
          </div>

        </div>

        {/* Right Column: Interactive 3D Cake Centerpiece */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className={`w-full max-w-[380px] sm:max-w-[420px] aspect-square relative rounded-3xl ${theme.cardBgClass} border ${theme.borderClass} shadow-2xl p-4 flex flex-col items-center justify-between backdrop-blur-md`}>
            
            {/* 3D Canvas Container */}
            <div ref={canvasRef} className="w-full h-full relative cursor-grab active:cursor-grabbing" />

            {/* Flavor Interactive Preset Buttons */}
            <div className={`absolute bottom-4 inset-x-4 flex items-center justify-center gap-2 p-1.5 rounded-2xl ${theme.subtleBgClass} backdrop-blur-md border ${theme.borderClass} shadow-md`}>
              <span className={`text-[10px] font-sans font-bold uppercase tracking-wider ${theme.textMutedClass} pl-2`}>
                Flavor:
              </span>
              <button
                onClick={() => setActiveFlavor('vanilla')}
                className={`px-3 py-1 rounded-xl text-[11px] font-sans font-semibold transition-all ${
                  activeFlavor === 'vanilla'
                    ? `${theme.accentBgClass} text-white shadow-sm`
                    : `${theme.textSecondaryClass} hover:${theme.textPrimaryClass}`
                }`}
              >
                Bourbon Vanilla
              </button>
              <button
                onClick={() => setActiveFlavor('chocolate')}
                className={`px-3 py-1 rounded-xl text-[11px] font-sans font-semibold transition-all ${
                  activeFlavor === 'chocolate'
                    ? `${theme.goldBgClass} text-white shadow-sm`
                    : `${theme.textSecondaryClass} hover:${theme.textPrimaryClass}`
                }`}
              >
                Dark Ganache
              </button>
              <button
                onClick={() => setActiveFlavor('berry')}
                className={`px-3 py-1 rounded-xl text-[11px] font-sans font-semibold transition-all ${
                  activeFlavor === 'berry'
                    ? 'bg-[#be3a4a] text-white shadow-sm'
                    : `${theme.textSecondaryClass} hover:${theme.textPrimaryClass}`
                }`}
              >
                Wild Berry
              </button>
            </div>

          </div>

          <span className={`text-[11px] font-sans ${theme.textMutedClass} italic mt-3 text-center`}>
            Interactive centerpiece • Tap flavors or rotate 3D view
          </span>
        </div>

      </div>
    </div>
  );
};
