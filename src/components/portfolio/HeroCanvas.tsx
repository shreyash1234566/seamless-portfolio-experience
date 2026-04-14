import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WireframeSphere = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
      ref.current.rotation.x += 0.001;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.5, 2]} />
      <meshBasicMaterial wireframe transparent opacity={0.15} color="#1c1c1c" />
    </mesh>
  );
};

const FloatingShape = ({ geo, color, position, speed }: { geo: THREE.BufferGeometry; color: string; position: [number, number, number]; speed: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += speed;
      ref.current.rotation.y += speed;
    }
  });
  return (
    <mesh ref={ref} position={position} geometry={geo}>
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
};

const Scraps = () => {
  const meshes = useMemo(() => {
    return Array.from({ length: 30 }, () => ({
      pos: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10 - 2] as [number, number, number],
      rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      rx: Math.random() * 0.02 - 0.01,
      ry: Math.random() * 0.02 - 0.01,
    }));
  }, []);

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.x += meshes[i].rx;
      mesh.rotation.y += meshes[i].ry;
      mesh.position.y += Math.sin(clock.elapsedTime + mesh.position.x) * 0.002;
    });
  });

  return (
    <>
      {meshes.map((m, i) => (
        <mesh key={i} ref={el => { refs.current[i] = el; }} position={m.pos} rotation={m.rot}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial color="#1c1c1c" side={THREE.DoubleSide} transparent opacity={0.2} />
        </mesh>
      ))}
    </>
  );
};

const Scene = () => {
  const geos = useMemo(() => ({
    tetra: new THREE.TetrahedronGeometry(0.6),
    octa: new THREE.OctahedronGeometry(0.5),
    box: new THREE.BoxGeometry(0.8, 0.8, 0.8),
    cone: new THREE.ConeGeometry(0.5, 1, 4),
  }), []);

  return (
    <>
      <fog attach="fog" args={['#f7f5ef', 5, 25]} />
      <WireframeSphere />
      <FloatingShape geo={geos.tetra} color="#ffd15c" position={[3, 2, 1]} speed={0.012} />
      <FloatingShape geo={geos.octa} color="#ff6b9d" position={[-3, -2, 2]} speed={0.008} />
      <FloatingShape geo={geos.box} color="#ffd15c" position={[-4, 2, -1]} speed={0.015} />
      <FloatingShape geo={geos.cone} color="#ff6b9d" position={[4, -1.5, 0]} speed={0.01} />
      <Scraps />
    </>
  );
};

const HeroCanvas = () => (
  <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.8 }}>
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <Scene />
    </Canvas>
  </div>
);

export default HeroCanvas;
