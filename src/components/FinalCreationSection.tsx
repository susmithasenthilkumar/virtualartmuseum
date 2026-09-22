import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles, Quote, Compass } from 'lucide-react';

export const FinalCreationSection: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 6.8);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Warm cinematic documentary lighting
    const ambientLight = new THREE.AmbientLight(0xfff5eb, 1.2);
    scene.add(ambientLight);

    const warmKey = new THREE.DirectionalLight(0xffeedb, 2.8);
    warmKey.position.set(5, 7, 5);
    scene.add(warmKey);

    const rimLight = new THREE.DirectionalLight(0xd97736, 2.2);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    // Cake Group
    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    // Pedestal Stand
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x1f1712,
      roughness: 0.25,
      metalness: 0.85,
    });
    const standPlate = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.3, 0.15, 64), standMat);
    standPlate.position.y = -0.8;
    cakeGroup.add(standPlate);

    const standBase = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.8, 0.3, 48), standMat);
    standBase.position.y = -1.4;
    cakeGroup.add(standBase);

    const standStem = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 0.6, 32), standMat);
    standStem.position.y = -1.1;
    cakeGroup.add(standStem);

    // Master Tier: Pristine Velvet Porcelain Cake with Gold Rim
    const cakeMat = new THREE.MeshStandardMaterial({
      color: 0xfcf8f2,
      roughness: 0.28,
      metalness: 0.05,
    });

    const tierGeom = new THREE.CylinderGeometry(2.0, 2.0, 1.8, 64);
    const tierMesh = new THREE.Mesh(tierGeom, cakeMat);
    tierMesh.position.y = 0.1;
    cakeGroup.add(tierMesh);

    // Gold leaf ribbons along perimeter
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf4a261,
      roughness: 0.2,
      metalness: 0.9,
    });
    const goldRibbon = new THREE.Mesh(new THREE.TorusGeometry(2.01, 0.03, 16, 64), goldMat);
    goldRibbon.rotation.x = Math.PI / 2;
    goldRibbon.position.y = -0.6;
    cakeGroup.add(goldRibbon);

    // Crown Rosettes
    const rosetteMat = new THREE.MeshStandardMaterial({
      color: 0xfdf6ed,
      roughness: 0.35,
    });
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const r = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.07, 16, 24), rosetteMat);
      r.rotation.x = Math.PI / 2;
      r.position.set(Math.cos(angle) * 1.85, 1.02, Math.sin(angle) * 1.85);
      cakeGroup.add(r);
    }

    // Fresh glazed berries and figs
    const berryMat = new THREE.MeshStandardMaterial({
      color: 0xd90429,
      roughness: 0.2,
      metalness: 0.1,
    });
    const figMat = new THREE.MeshStandardMaterial({
      color: 0x590d22,
      roughness: 0.4,
    });

    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const b = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.38, 16), berryMat);
      b.rotation.x = Math.PI;
      b.position.set(Math.cos(angle) * 0.9, 1.15, Math.sin(angle) * 0.9);
      cakeGroup.add(b);
    }

    // Center Fig cluster
    const centerFig = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 16), figMat);
    centerFig.position.set(0, 1.15, 0);
    cakeGroup.add(centerFig);

    // Ambient floating golden particle dust
    const dustCount = 100;
    const dustGeom = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 6;
      dustPositions[i + 1] = Math.random() * 4 - 1;
      dustPositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xf5dfb3,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
    });
    const dust = new THREE.Points(dustGeom, dustMat);
    scene.add(dust);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      cakeGroup.rotation.y = t * 0.25; // slow graceful cinematic 3D rotation
      dust.rotation.y = t * 0.05;
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
      ro.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section id="section-final-creation" className="py-28 relative bg-[#0e0a08] text-[#f7efe6] overflow-hidden">
      {/* Cinematic Golden Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d97736]/8 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-light text-xs font-mono text-[#d97736] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chapter 09 • The Climax</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#fbf6ec]">
            THE FINAL CREATION
          </h2>

          <p className="font-serif italic text-2xl sm:text-3xl text-[#d4b996] font-light">
            “Every cake has a story.”
          </p>
        </div>

        {/* 3D Cinematic Rotating Cake Centerpiece */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 4 Pillars of Cake Making */}
          <div className="lg:col-span-4 space-y-4 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-6">
              <div className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#d97736]/40 transition-colors">
                <span className="text-xs font-mono text-[#d97736] uppercase tracking-wider block mb-1">Pillar 01</span>
                <h4 className="font-serif text-2xl font-bold text-[#fbf6ec]">Ingredients</h4>
                <p className="text-xs text-[#f7efe6]/70 mt-1 font-light leading-relaxed">
                  The raw materials of nature—wheat, eggs, butter, and sucrose—assembled with biochemical balance.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#d97736]/40 transition-colors">
                <span className="text-xs font-mono text-[#d97736] uppercase tracking-wider block mb-1">Pillar 02</span>
                <h4 className="font-serif text-2xl font-bold text-[#fbf6ec]">Science</h4>
                <p className="text-xs text-[#f7efe6]/70 mt-1 font-light leading-relaxed">
                  Emulsification, leavening kinetics, starch swelling, and protein coagulation orchestrated at exact temperatures.
                </p>
              </div>
            </div>
          </div>

          {/* Middle: 3D Rotating Masterpiece */}
          <div className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center">
              <div ref={canvasRef} className="w-full h-full" />
              <div className="absolute bottom-2 text-[11px] font-mono text-[#f5dfb3]/70 tracking-widest uppercase">
                Continuous 3D Ambient Rotation
              </div>
            </div>
          </div>

          {/* Right Column: Patience & Creativity */}
          <div className="lg:col-span-4 space-y-4 text-center lg:text-left order-3">
            <div className="space-y-6">
              <div className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#d97736]/40 transition-colors">
                <span className="text-xs font-mono text-[#d97736] uppercase tracking-wider block mb-1">Pillar 03</span>
                <h4 className="font-serif text-2xl font-bold text-[#fbf6ec]">Patience</h4>
                <p className="text-xs text-[#f7efe6]/70 mt-1 font-light leading-relaxed">
                  Allowing thermal stabilization on wire racks and chilled crumb coats before razor-sharp decorative piping.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#d97736]/40 transition-colors">
                <span className="text-xs font-mono text-[#d97736] uppercase tracking-wider block mb-1">Pillar 04</span>
                <h4 className="font-serif text-2xl font-bold text-[#fbf6ec]">Creativity</h4>
                <p className="text-xs text-[#f7efe6]/70 mt-1 font-light leading-relaxed">
                  Edible sculpture, botanical florals, chocolate ribbons, and sensory memories that outlast the final crumb.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Poetic Statement Banner */}
        <div className="mt-20 max-w-2xl mx-auto text-center p-8 rounded-3xl glass-panel border border-[#d97736]/30 shadow-2xl relative">
          <Quote className="w-8 h-8 text-[#d97736]/40 mx-auto mb-3" />
          <p className="font-serif text-xl sm:text-2xl text-[#f5dfb3] font-light italic leading-relaxed">
            “A cake is edible poetry. It celebrates our most joyous human milestones with the quiet perfection of physics and flavor.”
          </p>
        </div>

      </div>
    </section>
  );
};
