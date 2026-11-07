import { useThree } from "@react-three/fiber";
import { ThreeCanvas } from "@remotion/three";
import type React from "react";
import { useLayoutEffect } from "react";
import { AdditiveBlending, DoubleSide, Vector3 } from "three";
import { random, useCurrentFrame, useVideoConfig } from "remotion";
import { FPS, phiAt, segmentAt } from "./timing";

/* Geometria do motor (unidades da cena) */
const CRANK_Y = -2.2; // eixo do virabrequim
const R = 0.55; // raio da manivela
const L = 1.9; // comprimento da biela
const HEAD_Y = 0.95; // teto da câmara de combustão
const BORE = 0.75; // raio do cilindro
const PISTON_H = 0.7;

const deg = (d: number) => (d * Math.PI) / 180;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

export type EngineFx = {
  hookSpark: number; // faísca do gancho, independente do ciclo
  plugGlow: number;
  rodGlow: number;
  crankGlow: number;
  wheel: number; // 0–1, transmissão e roda aparecendo
};

const kinematics = (phi: number) => {
  const th = deg(phi);
  const pinY = CRANK_Y + R * Math.cos(th);
  const pinZ = R * Math.sin(th);
  const pistonPinY = pinY + Math.sqrt(L * L - pinZ * pinZ);
  return { th, pinY, pinZ, pistonPinY, pistonTop: pistonPinY + PISTON_H / 2 };
};

const wrap = (phi: number) => ((phi % 720) + 720) % 720;

const valveLift = (phi: number) => {
  const m = wrap(phi);
  const i = m > 700 ? m - 720 : m;
  const e = m < 20 ? m + 720 : m;
  const intake = i > -10 && i < 190 ? Math.sin((Math.PI * (i + 10)) / 200) : 0;
  const exhaust = e > 530 && e < 730 ? Math.sin((Math.PI * (e - 530)) / 200) : 0;
  return { intake: intake * 0.22, exhaust: exhaust * 0.22 };
};

// Fase da combustão: 0 antes da faísca, sobe a 1 e decai até o escape.
const burnAt = (phi: number) => {
  const m = wrap(phi);
  if (m < 345 || m > 560) return 0;
  const t = (m - 345) / 215;
  return t < 0.08 ? t / 0.08 : (1 - t) ** 1.6;
};

const sparkAt = (phi: number) => {
  const m = wrap(phi);
  if (m < 336 || m > 358) return 0;
  return Math.sin((Math.PI * (m - 336)) / 22);
};

/* ------------------------------------------------------------------ */

const metal = { color: "#a7b0bd", metalness: 0.55, roughness: 0.32 };

const Glass: React.FC<{ opacity?: number }> = ({ opacity = 0.16 }) => (
  <meshStandardMaterial
    color="#9ec9ff"
    transparent
    opacity={opacity}
    roughness={0.1}
    metalness={0.1}
    side={DoubleSide}
    depthWrite={false}
  />
);

const Halo: React.FC<{ position: [number, number, number]; radius: number; color: string; opacity: number }> = ({
  position,
  radius,
  color,
  opacity,
}) =>
  opacity <= 0.001 ? null : (
    <mesh position={position}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} blending={AdditiveBlending} depthWrite={false} />
    </mesh>
  );

const Spark: React.FC<{ intensity: number }> = ({ intensity }) => {
  const frame = useCurrentFrame();
  if (intensity <= 0.01) return null;
  const tip: [number, number, number] = [0, HEAD_Y - 0.06, 0];
  return (
    <group>
      <pointLight position={tip} color="#a8dcff" intensity={7 * intensity} distance={3} />
      <Halo position={tip} radius={0.06 + 0.05 * intensity} color="#ffffff" opacity={intensity} />
      <Halo position={tip} radius={0.25 + 0.25 * intensity} color="#6fc3ff" opacity={0.3 * intensity} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2 + random(`sk${i}${Math.floor(frame / 2)}`) * 0.6;
        const len = 0.12 + random(`sl${i}${frame}`) * 0.25 * intensity;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * len * 0.6, tip[1] - 0.02 + Math.sin(a) * 0.05, Math.sin(a) * len * 0.6]}
            rotation={[0, -a, Math.PI / 2]}
          >
            <boxGeometry args={[0.012, len, 0.012]} />
            <meshBasicMaterial color="#d6f0ff" transparent opacity={intensity} blending={AdditiveBlending} />
          </mesh>
        );
      })}
    </group>
  );
};

// Mistura dentro da câmara: partículas que se espremem quando o pistão sobe.
const Gas: React.FC<{ phi: number; pistonTop: number }> = ({ phi, pistonTop }) => {
  const frame = useCurrentFrame();
  const m = wrap(phi);
  const burn = burnAt(phi);
  const lift = valveLift(phi);
  const height = HEAD_Y - pistonTop;
  const exhaustPhase = m >= 540;
  const intakeFill = m < 180 ? clamp01(m / 150) : 1;

  const particles = Array.from({ length: 110 }, (_, i) => {
    const r = Math.sqrt(random(`gr${i}`)) * (BORE - 0.1);
    const a = random(`ga${i}`) * Math.PI * 2 + frame * 0.01 * (1 + burn * 4);
    const h = random(`gh${i}`);
    const fuel = random(`gf${i}`) < 0.3;
    const visible = exhaustPhase ? random(`ge${i}`) > clamp01((m - 540) / 180) : random(`gi${i}`) < intakeFill;
    let color = fuel ? "#ffb04a" : "#5fb8ff";
    if (burn > 0.02) color = burn > 0.6 ? "#fff2b0" : burn > 0.25 ? "#ff9a2e" : "#c4421a";
    else if (exhaustPhase || (m > 540 && m < 720)) color = "#7f8792";
    const jitter = 0.03 + burn * 0.06;
    return {
      key: i,
      visible,
      color,
      pos: [
        Math.cos(a) * r + Math.sin(frame * 0.3 + i) * jitter,
        pistonTop + 0.04 + h * (height - 0.08),
        Math.sin(a) * r + Math.cos(frame * 0.27 + i) * jitter,
      ] as [number, number, number],
      size: fuel ? 0.035 : 0.028,
    };
  });

  const stream = (from: Vector3, via: Vector3, to: Vector3, on: number, color: string, seed: string, reverse: boolean) =>
    on < 0.04
      ? null
      : Array.from({ length: 26 }, (_, i) => {
          let t = (frame * 0.045 + i / 26) % 1;
          if (reverse) t = 1 - t;
          const p = t < 0.5 ? from.clone().lerp(via, t * 2) : via.clone().lerp(to, (t - 0.5) * 2);
          p.x += (random(`${seed}x${i}`) - 0.5) * 0.18;
          p.z += (random(`${seed}z${i}`) - 0.5) * 0.18;
          return (
            <mesh key={`${seed}${i}`} position={p}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color={color} transparent opacity={clamp01(on * 6)} />
            </mesh>
          );
        });

  return (
    <group>
      {particles.map((p) =>
        p.visible ? (
          <mesh key={p.key} position={p.pos}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshBasicMaterial color={p.color} />
          </mesh>
        ) : null,
      )}
      {burn > 0.02 && (
        <>
          <pointLight position={[0, pistonTop + height / 2, 0]} color="#ff8a2a" intensity={40 * burn} distance={6} />
          <mesh position={[0, pistonTop + height / 2, 0]}>
            <cylinderGeometry args={[BORE - 0.03, BORE - 0.03, height, 32, 1, true]} />
            <meshBasicMaterial color="#ff7a1f" transparent opacity={0.35 * burn} blending={AdditiveBlending} side={DoubleSide} depthWrite={false} />
          </mesh>
        </>
      )}
      {stream(new Vector3(-1.55, 2.0, 0), new Vector3(-0.35, HEAD_Y + 0.05, 0), new Vector3(-0.2, pistonTop + 0.3, 0), lift.intake, "#5fb8ff", "in", false)}
      {stream(new Vector3(0.2, pistonTop + 0.3, 0), new Vector3(0.35, HEAD_Y + 0.05, 0), new Vector3(1.55, 2.0, 0), lift.exhaust, "#8c949f", "ex", false)}
    </group>
  );
};

const Valve: React.FC<{ x: number; lift: number; color: string }> = ({ x, lift, color }) => (
  <group position={[x, HEAD_Y - lift, 0]}>
    <mesh position={[0, -0.02, 0]}>
      <cylinderGeometry args={[0.2, 0.24, 0.05, 32]} />
      <meshStandardMaterial {...metal} color={color} />
    </mesh>
    <mesh position={[0, 0.5, 0]}>
      <cylinderGeometry args={[0.03, 0.03, 1, 12]} />
      <meshStandardMaterial {...metal} />
    </mesh>
    <mesh position={[0, 0.85, 0]}>
      <cylinderGeometry args={[0.1, 0.1, 0.25, 16, 6, true]} />
      <meshStandardMaterial color="#d9a441" metalness={0.4} roughness={0.5} wireframe />
    </mesh>
  </group>
);

const Port: React.FC<{ side: -1 | 1 }> = ({ side }) => {
  const from = new Vector3(side * 0.35, HEAD_Y + 0.15, 0);
  const to = new Vector3(side * 1.6, 2.05, 0);
  const mid = from.clone().add(to).multiplyScalar(0.5);
  const len = from.distanceTo(to);
  const ang = Math.atan2(to.x - from.x, to.y - from.y);
  return (
    <mesh position={mid} rotation={[0, 0, -ang]}>
      <cylinderGeometry args={[0.2, 0.2, len, 24, 1, true]} />
      <Glass opacity={0.22} />
    </mesh>
  );
};

const Crankshaft: React.FC<{ th: number; glow: number; extend: number }> = ({ th, glow, extend }) => {
  const emissive = "#ffb02e";
  const mat = { ...metal, emissive, emissiveIntensity: glow * 0.9 };
  return (
    <group position={[0, CRANK_Y, 0]} rotation={[th, 0, 0]}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.2, 0, 0]}>
          <mesh position={[0, R / 2 - 0.05, 0]}>
            <boxGeometry args={[0.13, R + 0.35, 0.45]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[0, -0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.45, 0.45, 0.13, 32, 1, false, Math.PI / 2, Math.PI]} />
            <meshStandardMaterial {...mat} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, R, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.42, 24]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      <mesh position={[-0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.14, 0.14, 1.2, 24]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      <mesh position={[(0.27 + 0.27 + 3.2 * extend + 0.6) / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.14, 0.14, 0.6 + 3.2 * extend, 24]} />
        <meshStandardMaterial {...mat} />
      </mesh>
    </group>
  );
};

const Rod: React.FC<{ pinY: number; pinZ: number; pistonPinY: number; glow: number }> = ({
  pinY,
  pinZ,
  pistonPinY,
  glow,
}) => {
  const dy = pistonPinY - pinY;
  const dz = -pinZ;
  const len = Math.hypot(dy, dz);
  const beta = Math.atan2(dz, dy);
  const mat = { ...metal, color: glow > 0 ? "#bfeaff" : metal.color, emissive: "#38c6ff", emissiveIntensity: glow * 1.1 };
  return (
    <group>
      <mesh position={[0, (pinY + pistonPinY) / 2, (pinZ + 0) / 2]} rotation={[beta, 0, 0]}>
        <boxGeometry args={[0.12, len - 0.2, 0.2]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      <mesh position={[0, pinY, pinZ]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.17, 0.06, 12, 32]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      <mesh position={[0, pistonPinY, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.1, 0.045, 12, 32]} />
        <meshStandardMaterial {...mat} />
      </mesh>
    </group>
  );
};

const Piston: React.FC<{ top: number }> = ({ top }) => (
  <group position={[0, top - PISTON_H / 2, 0]}>
    <mesh>
      <cylinderGeometry args={[BORE - 0.03, BORE - 0.03, PISTON_H, 48]} />
      <meshStandardMaterial {...metal} color="#c3cad3" />
    </mesh>
    {[0.22, 0.12, 0.02].map((y) => (
      <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[BORE - 0.03, 0.018, 8, 48]} />
        <meshStandardMaterial color="#3d434b" metalness={0.6} roughness={0.4} />
      </mesh>
    ))}
  </group>
);

const SparkPlug: React.FC<{ glow: number }> = ({ glow }) => (
  <group>
    <mesh position={[0, HEAD_Y + 0.75, 0]}>
      <cylinderGeometry args={[0.1, 0.1, 0.9, 24]} />
      <meshStandardMaterial color="#cfd3d6" roughness={0.45} emissive="#7fd0ff" emissiveIntensity={glow * 0.5} />
    </mesh>
    <mesh position={[0, HEAD_Y + 0.25, 0]}>
      <cylinderGeometry args={[0.14, 0.14, 0.18, 6]} />
      <meshStandardMaterial {...metal} />
    </mesh>
    <mesh position={[0, HEAD_Y - 0.01, 0]}>
      <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
      <meshStandardMaterial {...metal} color="#e0e4e8" />
    </mesh>
  </group>
);

const Transmission: React.FC<{ th: number; show: number }> = ({ th, show }) => {
  if (show <= 0.001) return null;
  const s = easeInOut(show);
  return (
    <group position={[0, CRANK_Y, 0]}>
      <group position={[1.1, 0, 0]} rotation={[th, 0, 0]} scale={s}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.85, 0.85, 0.12, 48]} />
          <meshStandardMaterial {...metal} color="#8e98a6" />
        </mesh>
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return (
            <mesh key={i} position={[0, Math.cos(a) * 0.9, Math.sin(a) * 0.9]} rotation={[a, 0, 0]}>
              <boxGeometry args={[0.12, 0.1, 0.08]} />
              <meshStandardMaterial {...metal} color="#8e98a6" />
            </mesh>
          );
        })}
      </group>
      <mesh position={[2.2, 0, 0]} scale={s}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color="#4a6a8a" metalness={0.4} roughness={0.4} transparent opacity={0.6} />
      </mesh>
      <group position={[3.9, 0, 0]} rotation={[th / 3, 0, 0]} scale={s}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.05, 0.34, 24, 64]} />
          <meshStandardMaterial color="#1b1d21" roughness={0.85} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.78, 0.78, 0.3, 48]} />
          <meshStandardMaterial {...metal} color="#cfd5dc" />
        </mesh>
        {Array.from({ length: 5 }, (_, i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} position={[0.17, Math.cos(a) * 0.4, Math.sin(a) * 0.4]} rotation={[a, 0, 0]}>
              <boxGeometry args={[0.06, 0.62, 0.14]} />
              <meshStandardMaterial color="#5b6370" metalness={0.5} roughness={0.4} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

/* Câmera: uma posição por trecho, com transição suave entre eles */
type Cam = { pos: [number, number, number]; target: [number, number, number] };
const CAMS: Cam[] = [
  { pos: [1.1, 0.55, 2.3], target: [0, HEAD_Y - 0.15, 0] }, // gancho: a faísca
  { pos: [3.4, 0.6, 7.8], target: [0, -0.6, 0] }, // olha aqui dentro
  { pos: [2.6, 1.0, 5.6], target: [0, 0.1, 0] }, // admissão
  { pos: [-2.4, 0.9, 5.4], target: [0, 0.2, 0] }, // compressão
  { pos: [1.7, 1.1, 3.8], target: [0, HEAD_Y - 0.2, 0] }, // faísca
  { pos: [2.8, 0.4, 5.6], target: [0, -0.1, 0] }, // explosão
  { pos: [-2.8, 1.2, 5.4], target: [0, 0.3, 0] }, // escape
  { pos: [3.4, -0.9, 4.6], target: [0, -1.4, 0] }, // biela
  { pos: [3.8, -1.2, 3.6], target: [0, -2.1, 0] }, // virabrequim
  { pos: [9.5, 2.0, 8.5], target: [2.0, -1.3, 0] }, // rodas
];

const CameraRig: React.FC = () => {
  const frame = useCurrentFrame();
  const { camera } = useThree();
  const { index, segment } = segmentAt(frame);
  const prev = CAMS[Math.max(0, index - 1)];
  const cur = CAMS[index];
  const blendFrames = Math.min(segment.duration * 0.6, FPS * 0.9);
  const t = index === 0 ? 1 : easeInOut(clamp01((frame - segment.from) / blendFrames));
  const local = frame - segment.from;
  const pos = cur.pos.map((v, i) => mix(prev.pos[i], v, t)) as [number, number, number];
  const target = cur.target.map((v, i) => mix(prev.target[i], v, t)) as [number, number, number];
  // Leve aproximação contínua para a cena nunca ficar parada.
  const dolly = 1 - Math.min(0.08, local * 0.0012);
  const drift = Math.sin(frame / 70) * 0.25;
  useLayoutEffect(() => {
    camera.position.set(
      target[0] + (pos[0] - target[0]) * dolly + drift,
      target[1] + (pos[1] - target[1]) * dolly,
      target[2] + (pos[2] - target[2]) * dolly,
    );
    camera.lookAt(target[0], target[1], target[2]);
    camera.updateProjectionMatrix();
  });
  return null;
};

export const Engine3D: React.FC<{ fx: EngineFx }> = ({ fx }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const phi = phiAt(frame);
  const k = kinematics(phi);
  const lift = valveLift(phi);
  const spark = Math.max(sparkAt(phi), fx.hookSpark);
  return (
    <ThreeCanvas width={width} height={height} camera={{ fov: 42, near: 0.05, far: 100, position: [3, 1, 7] }}>
      <CameraRig />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <directionalLight position={[-5, 2, -3]} intensity={0.9} color="#5aa8ff" />
      <pointLight position={[0, -4, 3]} intensity={6} color="#ff9a4a" distance={10} />

      {/* Cilindro e cabeçote (transparentes para ver por dentro) */}
      <mesh position={[0, (HEAD_Y - 1.35) / 2, 0]}>
        <cylinderGeometry args={[BORE, BORE, HEAD_Y + 1.35, 48, 1, true]} />
        <Glass />
      </mesh>
      <mesh position={[0, HEAD_Y + 0.25, 0]}>
        <boxGeometry args={[2.1, 0.5, 1.7]} />
        <Glass opacity={0.12} />
      </mesh>
      <Port side={-1} />
      <Port side={1} />
      <Valve x={-0.35} lift={lift.intake} color="#4aa8ff" />
      <Valve x={0.35} lift={lift.exhaust} color="#c9cdd3" />
      <SparkPlug glow={fx.plugGlow} />

      <Piston top={k.pistonTop} />
      <Gas phi={phi} pistonTop={k.pistonTop} />
      <Spark intensity={spark} />
      <Rod pinY={k.pinY} pinZ={k.pinZ} pistonPinY={k.pistonPinY} glow={fx.rodGlow} />
      <Crankshaft th={k.th} glow={fx.crankGlow} extend={fx.wheel} />
      <Transmission th={k.th} show={fx.wheel} />

    </ThreeCanvas>
  );
};
