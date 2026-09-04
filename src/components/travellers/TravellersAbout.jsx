import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, PerspectiveCamera, ContactShadows, Environment } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

function EmiratesAirplane() {
  return (
    <group rotation={[0, -0.45, 0.12]} position={[0, -0.08, 0]} scale={1.15}>
      {/* Fuselage — white with Emirates red cheatline */}
      <group>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 2.6, 32]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.15} roughness={0.28} />
        </mesh>
        {/* Nose */}
        <mesh position={[1.32, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <sphereGeometry args={[0.26, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.15} roughness={0.28} />
        </mesh>
        {/* Tail cone */}
        <mesh position={[-1.32, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.08, 0.7, 24]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.15} roughness={0.28} />
        </mesh>
        {/* Red cheatline */}
        <mesh position={[0.15, -0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.265, 0.265, 1.9, 32, 1, true]} />
          <meshStandardMaterial color="#dc2626" metalness={0.1} roughness={0.5} side={2} />
        </mesh>
        {/* Emirates lettering — gold */}
        <mesh position={[0.25, 0.08, 0.27]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.9, 0.13]} />
          <meshStandardMaterial color="#d4af37" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>

      {/* Cockpit windows */}
      <group position={[1.28, 0.09, 0]}>
        <mesh>
          <capsuleGeometry args={[0.045, 0.22, 4, 8]} />
          <meshStandardMaterial color="#0ea5e9" metalness={0.1} roughness={0.1} transparent opacity={0.9} />
        </mesh>
        {/* Window frames */}
        <mesh position={[0.02, 0, 0]}>
          <planeGeometry args={[0.18, 0.02]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Main wings — swept */}
      <group position={[0.08, -0.04, 0]}>
        <mesh>
          <boxGeometry args={[1.05, 0.035, 1.9]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.12} roughness={0.35} />
        </mesh>
        {/* Wing tips — winglets */}
        <mesh position={[0.1, 0.04, 0.92]} rotation={[0, 0, 0.35]}>
          <boxGeometry args={[0.18, 0.22, 0.02]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <mesh position={[0.1, 0.04, -0.92]} rotation={[0, 0, -0.35]}>
          <boxGeometry args={[0.18, 0.22, 0.02]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        {/* Flaps detail */}
        <mesh position={[-0.35, -0.02, 0.45]}>
          <boxGeometry args={[0.32, 0.015, 0.55]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh position={[-0.35, -0.02, -0.45]}>
          <boxGeometry args={[0.32, 0.015, 0.55]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
      </group>

      {/* Horizontal stabilizers */}
      <mesh position={[-1.15, 0.06, 0]}>
        <boxGeometry args={[0.42, 0.025, 0.9]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>

      {/* Vertical tail — Emirates: red top, green bottom, black stripe, gold logo */}
      <group position={[-1.18, 0.32, 0]}>
        <mesh>
          <boxGeometry args={[0.38, 0.55, 0.04]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0, -0.12, 0.015]}>
          <boxGeometry args={[0.36, 0.22, 0.02]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
        <mesh position={[0, -0.02, 0.02]}>
          <boxGeometry args={[0.36, 0.04, 0.02]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        {/* Gold Emirates logo simplified */}
        <mesh position={[0.02, 0.08, 0.03]}>
          <circleGeometry args={[0.09, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>

      {/* Engines — 4 for A380, 2 for 777 — we do 4 for Emirates A380 */}
      {[0.45, -0.45, 0.78, -0.78].map((z, i) => (
        <group key={i} position={[0.18, -0.14, z]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.11, 0.11, 0.32, 20]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.45} roughness={0.25} />
          </mesh>
          <mesh position={[0.16, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.09, 0.095, 0.02, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.1} />
          </mesh>
          {/* Fan */}
          <mesh position={[0.17, 0, 0]} rotation={[0, 0, 0]}>
            <circleGeometry args={[0.075, 8]} />
            <meshStandardMaterial color="#020617" metalness={0.3} roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Landing gear — front */}
      <mesh position={[0.85, -0.26, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.22, 8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0.85, -0.38, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 12]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Main gear */}
      <mesh position={[-0.15, -0.24, 0.35]}>
        <boxGeometry args={[0.04, 0.18, 0.04]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-0.15, -0.24, -0.35]}>
        <boxGeometry args={[0.04, 0.18, 0.04]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}

export default function TravellersAbout() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="relative w-full overflow-hidden bg-[#f8fafc] px-6 py-16 sm:px-10 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        {/* Left — About text */}
        <div className="w-full max-w-[560px] lg:w-[48%]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-black/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0f7a4a] animate-pulse" />
            About Us — Egypt Security Experts
          </motion.div>

          <h2 className="mt-4 text-[32px] font-semibold leading-[0.9] tracking-[-0.03em] text-black sm:text-[38px] lg:text-[46px]" style={{ fontFamily: '"Instrument Sans", sans-serif' }}>
            {["We", "Make", "Your", "Journey", "Possible."].map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 16 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.12 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="mr-[0.2em] inline-block"
              >
                {w}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-[14px] leading-[1.7] text-black/60 sm:text-[15px]"
            style={{ fontFamily: "'Outfit Variable', sans-serif" }}
          >
            We are a Cairo-based agency specializing in Egypt security approvals — trusted by travelers, businesses and families worldwide. With direct follow-ups and deep local expertise, we turn complex clearance into a smooth, fast and transparent experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 grid grid-cols-3 gap-4 border-t border-black/5 pt-6"
          >
            {[
              { k: "5k+", v: "Approvals" },
              { k: "98%", v: "Success Rate" },
              { k: "24h", v: "Avg. Response" },
            ].map((s) => (
              <div key={s.k} className="text-left">
                <div className="text-[20px] font-semibold tracking-[-0.02em] text-black sm:text-[22px]" style={{ fontFamily: '"Instrument Sans", sans-serif' }}>
                  {s.k}
                </div>
                <div className="text-[11px] uppercase tracking-[0.08em] text-black/40">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Three.js Airplay */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[320px] w-full overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-900 via-[#0f172a] to-black shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:h-[380px] lg:h-[440px] lg:w-[52%]"
        >
          <Canvas camera={{ position: [2.4, 1.6, 3.0], fov: 42 }} dpr={[1, 1.5]} shadows>
            <color attach="background" args={["#020617"]} />
            <ambientLight intensity={1.4} />
            <directionalLight position={[4, 6, 3]} intensity={1.8} castShadow />
            <directionalLight position={[-3, -2, -4]} intensity={0.7} />
            <Environment preset="city" />
            <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.5}>
              <EmiratesAirplane />
            </Float>
            <ContactShadows position={[0, -0.55, 0]} opacity={0.35} scale={6} blur={2.2} far={2} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2.2} />
            <PerspectiveCamera makeDefault position={[2.4, 1.6, 3.0]} />
          </Canvas>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
          <div className="absolute bottom-3 left-3 rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium tracking-[0.08em] text-white backdrop-blur">
            Drag to rotate • Airplay
          </div>
        </motion.div>
      </div>
    </section>
  );
}
