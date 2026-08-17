import { useEffect, useRef, useState, memo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Rotate3d } from 'lucide-react';

// Generates a rich, procedural Kashmir Red Delicious apple skin texture with golden blush streaks
function createAppleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base Crimson & Deep Ruby Red gradient
  const baseGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  baseGrad.addColorStop(0.0, '#5a080e'); // Deep stem cavity
  baseGrad.addColorStop(0.08, '#881318'); // Shoulder top
  baseGrad.addColorStop(0.2, '#c51624'); // Bright crown
  baseGrad.addColorStop(0.5, '#b5121e'); // Mid body
  baseGrad.addColorStop(0.85, '#940f1a'); // Lower body
  baseGrad.addColorStop(1.0, '#4a080d'); // Calyx bottom
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Vertical Golden-Yellow Streaks (characteristic of Royal Delicious apples)
  const numStreaks = 48;
  for (let i = 0; i < numStreaks; i++) {
    const x = (i / numStreaks) * 1024 + (Math.random() - 0.5) * 20;
    const width = 4 + Math.random() * 12;
    const streakGrad = ctx.createLinearGradient(x, 40, x, 850);
    streakGrad.addColorStop(0.0, 'rgba(234, 179, 8, 0)');
    streakGrad.addColorStop(0.12, 'rgba(245, 158, 11, 0.45)');
    streakGrad.addColorStop(0.35, 'rgba(251, 191, 36, 0.35)');
    streakGrad.addColorStop(0.65, 'rgba(245, 158, 11, 0.18)');
    streakGrad.addColorStop(1.0, 'rgba(234, 179, 8, 0)');

    ctx.fillStyle = streakGrad;
    ctx.beginPath();
    ctx.moveTo(x, 40);
    ctx.lineTo(x + width, 40);
    ctx.lineTo(x + width * 0.7 + (Math.random() - 0.5) * 8, 850);
    ctx.lineTo(x + (Math.random() - 0.5) * 8, 850);
    ctx.closePath();
    ctx.fill();
  }

  // Golden-green blush in the stem cavity
  const stemGlow = ctx.createRadialGradient(512, 40, 10, 512, 40, 180);
  stemGlow.addColorStop(0.0, 'rgba(132, 204, 22, 0.55)');
  stemGlow.addColorStop(0.5, 'rgba(163, 230, 53, 0.25)');
  stemGlow.addColorStop(1.0, 'rgba(132, 204, 22, 0)');
  ctx.fillStyle = stemGlow;
  ctx.fillRect(0, 0, 1024, 240);

  // Tiny natural skin speckles (lenticels)
  ctx.fillStyle = 'rgba(254, 243, 199, 0.35)';
  for (let i = 0; i < 400; i++) {
    const px = Math.random() * 1024;
    const py = 80 + Math.random() * 850;
    const pSize = 0.8 + Math.random() * 1.5;
    ctx.beginPath();
    ctx.arc(px, py, pSize, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Generates an organic botanical leaf texture with delicate vein structure
function createLeafTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base Emerald Gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0.0, '#1c472a');
  grad.addColorStop(0.5, '#15803d');
  grad.addColorStop(1.0, '#0f5132');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Main Central Vein
  ctx.strokeStyle = '#86efac';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(256, 0);
  ctx.quadraticCurveTo(260, 256, 256, 512);
  ctx.stroke();

  // Secondary Branching Veins
  ctx.strokeStyle = 'rgba(134, 239, 172, 0.35)';
  ctx.lineWidth = 2.5;
  for (let y = 60; y < 460; y += 45) {
    // Left branch
    ctx.beginPath();
    ctx.moveTo(256, y);
    ctx.quadraticCurveTo(160, y - 25, 40, y - 55);
    ctx.stroke();

    // Right branch
    ctx.beginPath();
    ctx.moveTo(256, y);
    ctx.quadraticCurveTo(352, y - 25, 472, y - 55);
    ctx.stroke();
  }

  return new THREE.CanvasTexture(canvas);
}

function OrchardScene3D() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight || 380;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.3, 4.3);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- Main 3D Group ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const isDark = theme === 'dark';

    // 1. Procedural 3D Kashmir Apple Geometry (True Anatomical Morphology)
    const appleGeo = new THREE.SphereGeometry(1.0, 96, 64);
    const posAttr = appleGeo.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      v.fromBufferAttribute(posAttr, i);

      // Polar angle theta: 0 (top pole) to PI (bottom pole)
      const theta = Math.acos(Math.max(-1, Math.min(1, v.y)));
      // Azimuth angle phi: -PI to PI
      const phi = Math.atan2(v.z, v.x);
      const y = v.y; // -1 to +1

      // A. Apple Cross-Section Profile (Broad shoulder, gentle taper to base)
      let r = Math.sin(theta);
      const shoulderBulge = 1.12 + 0.28 * y - 0.22 * y * y - 0.08 * y * y * y;
      r *= shoulderBulge;

      // B. 5-Lobed Crown Base (Pentamerous harmonic of Delicious apples)
      const baseWeight = Math.max(0, -y);
      const fiveLobe = 1.0 + 0.055 * Math.cos(5 * phi) * Math.pow(baseWeight, 1.4);
      r *= fiveLobe;

      // C. Deep Stem Cavity Depression at Apex (where stem is inserted)
      const topRadial = Math.hypot(v.x, v.z);
      const stemDip = 0.42 * Math.exp(-6.5 * topRadial * topRadial);

      // D. Bottom Calyx Basin Depression at Base
      const calyxDip = 0.22 * Math.exp(-8.0 * topRadial * topRadial);

      // Transformed coordinates
      let newX = Math.cos(phi) * r;
      let newZ = Math.sin(phi) * r;
      let newY = (y * 0.95) - stemDip + calyxDip;

      // Subtle organic asymmetry
      const naturalAsymmetry = 1.0 + 0.015 * Math.sin(newX * 4 + newY * 3) * Math.cos(newZ * 4);
      newX *= naturalAsymmetry;
      newZ *= naturalAsymmetry;

      posAttr.setXYZ(i, newX, newY, newZ);
    }
    appleGeo.computeVertexNormals();

    const appleTexture = createAppleTexture();

    const appleMat = new THREE.MeshPhysicalMaterial({
      map: appleTexture,
      color: isDark ? 0xff4d4d : 0xffffff,
      roughness: 0.24,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
      sheen: 0.35,
      sheenColor: new THREE.Color(isDark ? 0xff8080 : 0xffd1d1)
    });
    const appleMesh = new THREE.Mesh(appleGeo, appleMat);
    appleMesh.rotation.z = 0.08;
    appleMesh.rotation.x = 0.05;
    mainGroup.add(appleMesh);

    // 2. Realistic Curved Woody Stem (Arches up from deep within the top cavity)
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.0, 0.42, 0.0),      // Root deep in stem bowl
      new THREE.Vector3(0.02, 0.68, 0.01),
      new THREE.Vector3(0.08, 0.96, -0.04),
      new THREE.Vector3(0.14, 1.15, -0.08)    // Curved woody tip
    ]);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 24, 0.032, 12, false);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x3d2314,
      roughness: 0.85,
      metalness: 0.05
    });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    mainGroup.add(stemMesh);

    // 3. Double-Curved 3D Emerald Protection Leaf with Realistic Veins
    const leafGeo = new THREE.PlaneGeometry(0.55, 0.95, 24, 24);
    const leafPos = leafGeo.attributes.position;
    for (let i = 0; i < leafPos.count; i++) {
      const lx = leafPos.getX(i);
      const ly = leafPos.getY(i);
      // Curl leaf along central midrib and arch along length
      const midribCrease = Math.abs(lx) * 0.45;
      const lengthArch = -Math.sin((ly + 0.47) * 2.8) * 0.18;
      leafPos.setZ(i, -midribCrease + lengthArch);
    }
    leafGeo.computeVertexNormals();

    const leafTexture = createLeafTexture();
    const leafMat = new THREE.MeshStandardMaterial({
      map: leafTexture,
      color: isDark ? 0x6ee7b7 : 0xffffff,
      roughness: 0.32,
      metalness: 0.08,
      side: THREE.DoubleSide
    });
    const leafMesh = new THREE.Mesh(leafGeo, leafMat);
    leafMesh.position.set(0.09, 0.85, 0.03);
    leafMesh.rotation.set(0.65, 0.5, -0.75);
    mainGroup.add(leafMesh);

    // 4. Glossy Micro Water Beads on Apple Shoulder
    const dropGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const dropMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.333,
      thickness: 0.2
    });

    const dropPositions = [
      [0.45, 0.55, 0.65],
      [-0.52, 0.48, 0.58],
      [0.2, 0.68, 0.72],
      [-0.15, 0.72, -0.68]
    ];
    dropPositions.forEach(([dx, dy, dz]) => {
      const drop = new THREE.Mesh(dropGeo, dropMat);
      drop.position.set(dx, dy, dz);
      drop.scale.set(1.0, 0.6, 1.0);
      mainGroup.add(drop);
    });

    // 5. Orbiting Bio-Shield Protective Rings (Delicate Systemic Barriers)
    const ringGeo1 = new THREE.TorusGeometry(1.48, 0.016, 16, 120);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: isDark ? 0x34d399 : 0x5d2a1a,
      emissive: isDark ? 0x064e3b : 0x1f0b05,
      roughness: 0.25,
      metalness: 0.85
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3.2;
    ringMesh1.rotation.y = Math.PI / 5.5;
    mainGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(1.65, 0.014, 16, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: isDark ? 0x6ee7b7 : 0x1c472a,
      emissive: isDark ? 0x022c22 : 0x081d0f,
      roughness: 0.2,
      metalness: 0.9
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 3.8;
    ringMesh2.rotation.y = Math.PI / 3.2;
    mainGroup.add(ringMesh2);

    // 6. Bio-Active Orbiting Nodes
    const nodeGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.055, 20, 20);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x6ee7b7 : 0xfbe1d1,
      emissive: isDark ? 0x059669 : 0x8c442a,
      roughness: 0.15,
      metalness: 0.5
    });

    const numNodes = 5;
    const nodeMeshes = [];
    for (let i = 0; i < numNodes; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      nodeGroup.add(node);
      nodeMeshes.push({
        mesh: node,
        speed: 0.7 + (i % 2) * 0.35,
        offset: (i * Math.PI * 2) / numNodes,
        radius: 1.48 + (i % 2) * 0.18
      });
    }
    mainGroup.add(nodeGroup);

    // 7. Ambient Micro-Spray Particles
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = [];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 4.2;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 3.8;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 3.0;
      particleSpeeds.push({
        x: (Math.random() - 0.5) * 0.003,
        y: 0.003 + Math.random() * 0.005,
        z: (Math.random() - 0.5) * 0.003
      });
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0x6ee7b7 : 0x10b981,
      size: 0.04,
      transparent: true,
      opacity: isDark ? 0.8 : 0.65,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- Studio Lighting for High-Gloss Apple Speculars ---
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0xffffff : 0xfff8f2,
      isDark ? 0.9 : 1.35
    );
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, isDark ? 2.4 : 2.8);
    mainLight.position.set(4, 5, 4.5);
    scene.add(mainLight);

    const softFill = new THREE.DirectionalLight(
      isDark ? 0x34d399 : 0xfbe1d1,
      isDark ? 1.3 : 1.1
    );
    softFill.position.set(-4, -2, 2.5);
    scene.add(softFill);

    const rimSpecular = new THREE.PointLight(0xffffff, isDark ? 2.2 : 1.4, 8);
    rimSpecular.position.set(0, 3.5, -2.5);
    scene.add(rimSpecular);

    // --- Initial Entrance Animation with GSAP ---
    mainGroup.scale.set(0.001, 0.001, 0.001);
    mainGroup.rotation.y = -Math.PI * 0.8;

    gsap.to(mainGroup.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.6,
      ease: 'elastic.out(1, 0.8)',
      delay: 0.15
    });

    gsap.to(mainGroup.rotation, {
      y: 0.35,
      duration: 1.8,
      ease: 'power3.out',
      delay: 0.15
    });

    // --- Cursor & Touch Physics ---
    let targetRotationX = 0;
    let targetRotationY = 0.35;
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (!isMouseDown) {
        targetRotationY = 0.35 + x * 0.65;
        targetRotationX = -y * 0.45;
      } else {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const handleMouseDown = (e) => {
      isMouseDown = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      setIsInteracting(false);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = 0.35 + x * 0.75;
        targetRotationX = -y * 0.45;
      }
    };

    const handleClickPulse = () => {
      gsap.to(mainGroup.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.22,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      });
      gsap.to(ringMesh1.rotation, {
        z: ringMesh1.rotation.z + Math.PI * 0.8,
        duration: 1.2,
        ease: 'power3.out'
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('click', handleClickPulse);

    // --- Animation Loop ---
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth GSAP damping toward cursor target
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.06;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.06;

      // Orbiting Bio-Shield Rings
      ringMesh1.rotation.z = elapsedTime * 0.38;
      ringMesh2.rotation.z = -elapsedTime * 0.32;

      // Orbiting Nodes
      nodeMeshes.forEach((n) => {
        const angle = elapsedTime * n.speed + n.offset;
        n.mesh.position.x = Math.cos(angle) * n.radius;
        n.mesh.position.y = Math.sin(angle * 1.2) * 0.5;
        n.mesh.position.z = Math.sin(angle) * n.radius;
      });

      // Micronized Mist Particle Drift
      const pPositions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pPositions[i3 + 1] += particleSpeeds[i].y;
        pPositions[i3] += particleSpeeds[i].x;

        if (pPositions[i3 + 1] > 2.2) {
          pPositions[i3 + 1] = -2.0;
          pPositions[i3] = (Math.random() - 0.5) * 4.0;
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleSystem.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 380;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('click', handleClickPulse);

      appleGeo.dispose();
      appleMat.dispose();
      appleTexture.dispose();
      stemGeo.dispose();
      stemMat.dispose();
      leafGeo.dispose();
      leafMat.dispose();
      leafTexture.dispose();
      dropGeo.dispose();
      dropMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div className="orchard-3d-showcase-card">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="orchard-3d-canvas"
        style={{ cursor: isInteracting ? 'grabbing' : 'grab' }}
        title="Click or drag to inspect 3D Kashmir Royal Delicious Apple"
      />

      {/* Floating HUD Meta Tag Overlay */}
      <div className="orchard-3d-overlay">
        <div className="orchard-3d-badge">
          <Sparkles size={13} color="var(--color-pine-green)" />
          <span>Kashmir Royal Delicious • 3D</span>
        </div>
        <div className="orchard-3d-hint">
          <Rotate3d size={13} />
          <span>Drag to inspect • Click to pulse</span>
        </div>
      </div>
    </div>
  );
}

export default memo(OrchardScene3D);
