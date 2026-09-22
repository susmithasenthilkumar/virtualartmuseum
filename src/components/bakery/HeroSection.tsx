import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowDown, Sparkles, Heart, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeFlavor, setActiveFlavor] = useState<'vanilla' | 'chocolate' | 'berry'>('vanilla');

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 6.2);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Warm natural studio bakery lighting
    const ambientLight = new THREE.AmbientLight(0xfff6ee, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff1e0, 2.8);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd9a87d, 2.0);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Artisan Pedestal Stand (Dark Espresso Oak & Brass)
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x24150e,
      roughness: 0.35,
      metalness: 0.2,
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.85,
    });

    const plate = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.2, 0.14, 64), standMat);
    plate.position.y = -0.7;
    rootGroup.add(plate);

    const brassRim = new THREE.Mesh(new THREE.TorusGeometry(2.26, 0.035, 16, 64), brassMat);
    brassRim.rotation.x = Math.PI / 2;
    brassRim.position.y = -0.63;
    rootGroup.add(brassRim);

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 0.6, 32), standMat);
    stem.position.y = -1.05;
    rootGroup.add(stem);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.7, 0.25, 48), standMat);
    base.position.y = -1.35;
    rootGroup.add(base);

    // Dynamic Cake Mesh Materials
    const cakeMaterials = {
      vanilla: new THREE.MeshStandardMaterial({ color: 0xfdf7ee, roughness: 0.32 }),
      chocolate: new THREE.MeshStandardMaterial({ color: 0x3d2217, roughness: 0.28 }),
      berry: new THREE.MeshStandardMaterial({ color: 0xf3d2d7, roughness: 0.35 }),
    };

    // Bottom Cake Tier
    const tierBottom = new THREE.Mesh(
      new THREE.CylinderGeometry(1.9, 1.9, 1.0, 64),
      cakeMaterials[activeFlavor]
    );
    tierBottom.position.y = -0.15;
    rootGroup.add(tierBottom);

    // Top Cake Tier
    const tierTop = new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 1.3, 0.9, 64),
      cakeMaterials[activeFlavor]
    );
    tierTop.position.y = 0.8;
    rootGroup.add(tierTop);

    // Rosettes on Top Tier
    const rosetteMat = new THREE.MeshStandardMaterial({ color: 0xfffcf7, roughness: 0.4 });
    const rosetteGroup = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const rosette = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.06, 16, 24), rosetteMat);
      rosette.rotation.x = Math.PI / 2;
      rosette.position.set(Math.cos(angle) * 1.18, 1.28, Math.sin(angle) * 1.18);
      rosetteGroup.add(rosette);
    }
    rootGroup.add(rosetteGroup);

    // Glazed Wild Strawberries & Raspberries Crown
    const berryMat = new THREE.MeshStandardMaterial({ color: 0xbe3a4a, roughness: 0.2, metalness: 0.1 });
    const berryGroup = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const berry = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.3, 16), berryMat);
      berry.rotation.x = Math.PI;
      berry.position.set(Math.cos(angle) * 0.6, 1.4, Math.sin(angle) * 0.6);
      berryGroup.add(berry);
    }
    rootGroup.add(berryGroup);

    // Ambient floating golden flour / sugar dust particles
    const particleCount = 80;
    const pGeom = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 5;
      pPositions[i + 1] = Math.random() * 3.5 - 1;
      pPositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xc59b6d,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    // Animation Loop with interactive mouse rotation
    let animId: number;
    let clock = new THREE.Clock();
    let mouseX = 0;
    let targetRotationX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      mouseX = x * 0.8;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      
      // Smooth ambient rotation + subtle mouse parallax
      targetRotationX += (mouseX - targetRotationX) * 0.05;
      rootGroup.rotation.y = elapsed * 0.28 + targetRotationX;
      particles.rotation.y = elapsed * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeFlavor]);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-28 pb-16 bg-cream-grain overflow-hidden">
      
      {/* Decorative Subtle Floating Bakery Elements Background */}
      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-[#be3a4a]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#c59b6d]/8 blur-3xl pointer-events-none" />

      {/* Floating Graphic Pills & Bakery Icons */}
      <div className="hidden xl:block absolute top-36 left-12 p-3 rounded-2xl glass-cream shadow-sm border border-[#2c1810]/5 animate-pulse">
        <div className="flex items-center gap-2 text-xs font-serif italic text-[#2c1810]/80">
          <span>🌾 Organic Stoneground Flour</span>
        </div>
      </div>

      <div className="hidden xl:block absolute bottom-32 left-20 p-3 rounded-2xl glass-cream shadow-sm border border-[#2c1810]/5">
        <div className="flex items-center gap-2 text-xs font-serif italic text-[#2c1810]/80">
          <span>🧈 84% Cultured French Butter</span>
        </div>
      </div>

      <div className="hidden xl:block absolute top-48 right-16 p-3 rounded-2xl glass-cream shadow-sm border border-[#2c1810]/5">
        <div className="flex items-center gap-2 text-xs font-serif italic text-[#2c1810]/80">
          <span>🍓 Hand-Picked Summer Berries</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story & Heading */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#be3a4a]/8 border border-[#be3a4a]/15 text-xs font-sans font-medium text-[#be3a4a] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>San Francisco’s Premier Artisan Patisserie</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#2c1810] leading-[1.12]">
              BAKED WITH PASSION.<br />
              <span className="italic font-display font-normal text-[#be3a4a]">Crafted with Love.</span>
            </h1>

            <p className="text-base sm:text-xl text-[#2c1810]/75 font-sans font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover handcrafted cakes, pastries and breads made with carefully selected ingredients and a little bit of magic. Baked fresh every dawn.
            </p>

            {/* Navigation Buttons (Scroll only — STRICTLY NO E-COMMERCE) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#story"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2c1810] hover:bg-[#3d2317] text-[#faf6f0] text-xs font-sans font-semibold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-[#2c1810]/15 hover:shadow-xl hover:-translate-y-0.5 text-center"
              >
                EXPLORE OUR STORY
              </a>
              <a
                href="#specialties"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/80 hover:bg-white text-[#2c1810] hover:text-[#be3a4a] border border-[#2c1810]/15 text-xs font-sans font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow text-center"
              >
                VIEW OUR SPECIALTIES
              </a>
            </div>

            {/* Bakery Brand Trust Indicators */}
            <div className="pt-6 border-t border-[#2c1810]/10 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-xs font-sans text-[#2c1810]/70">
              <div>
                <span className="font-serif font-bold text-lg text-[#2c1810] block">100% Handcrafted</span>
                <span>Small batch preparation</span>
              </div>
              <div className="w-[1px] h-8 bg-[#2c1810]/10" />
              <div>
                <span className="font-serif font-bold text-lg text-[#2c1810] block">Daily Dawn Bake</span>
                <span>Fresh from the hearth</span>
              </div>
              <div className="w-[1px] h-8 bg-[#2c1810]/10" />
              <div>
                <span className="font-serif font-bold text-lg text-[#2c1810] block">Pure Provenance</span>
                <span>Zero artificial additives</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Handcrafted Cake Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full aspect-square max-w-[440px] rounded-3xl glass-cream p-4 border border-[#2c1810]/10 shadow-2xl flex flex-col items-center justify-between">
              
              {/* Header Label */}
              <div className="w-full flex items-center justify-between px-3 pt-2 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#2c1810]/60">
                <span>The Centerpiece Gallery</span>
                <span className="text-[#be3a4a]">Interactive 3D</span>
              </div>

              {/* Three.js Canvas Container */}
              <div ref={canvasRef} className="w-full h-[310px] cursor-grab active:cursor-grabbing" />

              {/* Flavor Preset Controls (Pure educational visual preview) */}
              <div className="w-full pt-3 pb-1 border-t border-[#2c1810]/10 flex items-center justify-between px-2">
                <span className="text-[11px] font-sans text-[#2c1810]/60">Tasting Palette:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveFlavor('vanilla')}
                    className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all ${
                      activeFlavor === 'vanilla'
                        ? 'bg-[#2c1810] text-[#faf6f0]'
                        : 'bg-white/60 text-[#2c1810]/70 hover:bg-white'
                    }`}
                  >
                    Vanilla
                  </button>
                  <button
                    onClick={() => setActiveFlavor('chocolate')}
                    className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all ${
                      activeFlavor === 'chocolate'
                        ? 'bg-[#2c1810] text-[#faf6f0]'
                        : 'bg-white/60 text-[#2c1810]/70 hover:bg-white'
                    }`}
                  >
                    Dark Ganache
                  </button>
                  <button
                    onClick={() => setActiveFlavor('berry')}
                    className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all ${
                      activeFlavor === 'berry'
                        ? 'bg-[#2c1810] text-[#faf6f0]'
                        : 'bg-white/60 text-[#2c1810]/70 hover:bg-white'
                    }`}
                  >
                    Wild Rose
                  </button>
                </div>
              </div>

            </div>

            <div className="mt-3 text-[11px] font-sans text-[#2c1810]/50 tracking-wider flex items-center gap-1.5">
              <span>Drag to rotate centerpiece • Ambient daylight rendering</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
