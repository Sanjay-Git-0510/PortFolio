import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type TokenColors = { paper: string; ink: string; vermilion: string; acid: string };
type Point = [number, number, number];

const nodePoints: Array<{ label: string; detail: string; point: Point; accent?: "vermilion" | "acid" }> = [
  { label: "Client", detail: "request", point: [-1.8, 2.6, 0] },
  { label: "API edge", detail: "route", point: [1.8, 1.55, 0] },
  { label: "Auth", detail: "JWT", point: [-1.8, 0.5, 0], accent: "vermilion" },
  { label: "Node service", detail: "logic", point: [1.8, -0.55, 0] },
  { label: "PostgreSQL", detail: "persist", point: [-1.8, -1.6, 0], accent: "acid" },
  { label: "Redis", detail: "cache", point: [1.8, -2.65, 0] },
];

function useTokenColors() {
  const [colors, setColors] = useState<TokenColors | null>(null);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    setColors({
      paper: styles.getPropertyValue("--paper").trim(),
      ink: styles.getPropertyValue("--ink").trim(),
      vermilion: styles.getPropertyValue("--vermilion").trim(),
      acid: styles.getPropertyValue("--acid").trim(),
    });
  }, []);

  return colors;
}

function Packet({ from, to, color, offset }: { from: Point; to: Point; color: string; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const progress = (clock.getElapsedTime() / 3.4 + offset) % 1;
    ref.current.position.lerpVectors(new THREE.Vector3(...from), new THREE.Vector3(...to), progress);
    ref.current.scale.setScalar(0.72 + Math.sin(progress * Math.PI) * 0.45);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.085, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function SystemScene({ colors }: { colors: TokenColors }) {
  const group = useRef<THREE.Group>(null);
  const connectors = useMemo(() => nodePoints.slice(0, -1).map((node, index) => [node.point, nodePoints[index + 1].point] as [Point, Point]), []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (!group.current) return;
      group.current.rotation.y = ((event.clientX / window.innerWidth) * 2 - 1) * 0.12;
      group.current.rotation.x = ((event.clientY / window.innerHeight) * 2 - 1) * -0.08;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.55) * 0.04;
  });

  return (
    <group ref={group}>
      {connectors.map(([from, to], index) => (
        <Line key={`${from[0]}-${to[1]}`} points={[from, to]} color={colors.ink} lineWidth={0.65} dashed dashSize={0.08} gapSize={0.08} transparent opacity={0.36} />
      ))}
      {nodePoints.map((node) => {
        const nodeColor = node.accent === "vermilion" ? colors.vermilion : node.accent === "acid" ? colors.acid : colors.ink;
        return (
          <group key={node.label} position={node.point}>
            <mesh rotation={[0.35, 0.45, 0.1]}>
              <boxGeometry args={[0.38, 0.38, 0.38]} />
              <meshStandardMaterial color={colors.paper} emissive={nodeColor} emissiveIntensity={0.12} roughness={0.58} metalness={0.08} />
            </mesh>
            <mesh scale={0.62}>
              <boxGeometry args={[0.38, 0.38, 0.38]} />
              <meshBasicMaterial color={nodeColor} wireframe transparent opacity={0.7} />
            </mesh>
            <Html center distanceFactor={7} position={[0.58, 0, 0]}>
              <div className="pointer-events-none whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] text-ink">
                <span className={node.accent === "vermilion" ? "text-vermilion" : node.accent === "acid" ? "text-acid" : "text-ink-soft"}>{node.label}</span>
                <span className="ml-2 text-ink-faint">{node.detail}</span>
              </div>
            </Html>
          </group>
        );
      })}
      <Packet from={nodePoints[0].point} to={nodePoints[1].point} color={colors.vermilion} offset={0} />
      <Packet from={nodePoints[2].point} to={nodePoints[3].point} color={colors.acid} offset={0.34} />
      <Packet from={nodePoints[4].point} to={nodePoints[5].point} color={colors.vermilion} offset={0.68} />
    </group>
  );
}

export function BackendSystemCanvas() {
  const colors = useTokenColors();

  if (!colors) return <div className="h-[390px] w-full" aria-hidden="true" />;

  return (
    <Canvas camera={{ position: [0, 0, 8.8], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.6} color={colors.paper} />
      <directionalLight position={[4, 5, 5]} intensity={2.1} color={colors.paper} />
      <pointLight position={[-3, -2, 3]} intensity={4} distance={12} color={colors.vermilion} />
      <SystemScene colors={colors} />
    </Canvas>
  );
}