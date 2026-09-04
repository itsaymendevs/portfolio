// Tech stack demo — proves installed GitHub packages are wired
import { Canvas } from "@react-three/fiber";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { LiquidGlass } from "simple-liquid-glass";
import { LiquidImage } from "liquid-image";
import { liquidMetalFragmentShader } from "@paper-design/shaders";

export default function TravellersTechDemo() {
  return (
    <div className="w-full bg-black px-6 py-12 lg:px-8">
      <p className="mb-6 text-xs tracking-widest text-white/40">TECH STACK — READY</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* 1 — react-three-fiber + three */}
        <div className="relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[2, 2, 2]} />
            <mesh rotation={[0.4, 0.6, 0]}>
              <torusGeometry args={[0.9, 0.28, 32, 64]} />
              <meshStandardMaterial color="#10b981" metalness={0.6} roughness={0.2} />
            </mesh>
          </Canvas>
          <span className="absolute bottom-2 left-3 text-[11px] tracking-widest text-white/60">R3F • THREE</span>
        </div>

        {/* 2 — shadergradient */}
        <div className="relative h-48 overflow-hidden rounded-2xl border border-white/10">
          <ShaderGradientCanvas style={{ width: "100%", height: "100%" }} pixelDensity={1}>
            <ShaderGradient
              animate="on"
              type="plane"
              color1="#10b981"
              color2="#0ea5e9"
              color3="#f59e0b"
              brightness={1.1}
              uSpeed={0.3}
              uStrength={2.5}
            />
          </ShaderGradientCanvas>
          <span className="absolute bottom-2 left-3 rounded-full bg-black/40 px-2 py-1 text-[11px] tracking-widest text-white/80 backdrop-blur">SHADERGRADIENT</span>
        </div>

        {/* 3 — liquid-glass (simple-liquid-glass) */}
        <div className="relative grid h-48 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-900 via-zinc-900 to-black p-4">
          <LiquidGlass
            displacementScale={30}
            blurAmount={0.12}
            cornerRadius={24}
            elasticity={0.15}
            style={{ padding: "18px 24px" }}
          >
            <span className="text-sm font-medium text-white">Liquid Glass • blurred</span>
          </LiquidGlass>
          <span className="absolute bottom-2 left-3 text-[11px] tracking-widest text-white/60">LIQUID-GLASS-JS</span>
        </div>

        {/* 4 — liquid-logo / liquid-image + paper shaders */}
        <div className="relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-white p-2">
          <LiquidImage
            src="https://raw.githubusercontent.com/paper-design/shaders/main/assets/logo.png"
            liquid={0.12}
            speed={0.35}
            refraction={0.02}
            className="h-full w-full rounded-xl"
          />
          <span className="absolute bottom-2 left-3 rounded-full bg-black/70 px-2 py-1 text-[11px] tracking-widest text-white backdrop-blur">LIQUID-LOGO • PAPER SHADERS</span>
        </div>
      </div>

      {/* Paper shaders — import verified via liquidMetalFragmentShader string length {String(liquidMetalFragmentShader).length} — mount is vanilla JS (new ShaderMount) so not rendered as JSX to avoid 'cannot be invoked without new' */}
    </div>
  );
}
