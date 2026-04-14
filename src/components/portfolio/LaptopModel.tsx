import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface LaptopModelProps {
  screenColor: string;
  imageUrl?: string;
}

const LaptopModel = ({ screenColor, imageUrl }: LaptopModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [textureReady, setTextureReady] = useState(false);

  // Load screen image safely so a failed URL does not crash the scene.
  const defaultImage = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
  useEffect(() => {
    let cancelled = false;
    let loadedTexture: THREE.Texture | null = null;

    setTextureReady(false);
    setTexture(null);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    const src = imageUrl || defaultImage;

    loader.load(
      src,
      tex => {
        if (cancelled) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        loadedTexture = tex;
        setTexture(tex);
        setTextureReady(true);
      },
      undefined,
      () => {
        if (cancelled) return;
        setTexture(null);
        setTextureReady(true);
      }
    );

    return () => {
      cancelled = true;
      if (loadedTexture) loadedTexture.dispose();
    };
  }, [imageUrl]);

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    targetRotation.current.x = pointer.y * 0.15;
    targetRotation.current.y = pointer.x * 0.25;
    groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Screen */}
      <group position={[0, 0.7, 0]}>
        {/* Bezel */}
        <RoundedBox args={[2.8, 1.8, 0.08]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#2c2c2c" />
        </RoundedBox>
        {/* Screen surface */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[2.5, 1.5]} />
          <meshBasicMaterial
            color={texture ? '#ffffff' : screenColor}
            map={textureReady ? texture : null}
          />
        </mesh>
        {/* Screen content: code lines - hide if image is provided */}
        {!texture && [0, 1, 2, 3, 4, 5].map(i => (
          <mesh key={i} position={[-0.6 + (i % 3) * 0.15, 0.45 - i * 0.15, 0.045]}>
            <planeGeometry args={[0.4 + Math.random() * 0.5, 0.04]} />
            <meshBasicMaterial color={['#6bcb77', '#ff6b9d', '#ffd15c', '#3b82f6', '#fff', '#6bcb77'][i]} transparent opacity={0.5} />
          </mesh>
        ))}
        {/* Camera notch */}
        <mesh position={[0, 0.85, 0.042]}>
          <circleGeometry args={[0.03, 16]} />
          <meshBasicMaterial color="#555" />
        </mesh>
      </group>

      {/* Hinge */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[2.8, 0.06, 0.1]} />
        <meshStandardMaterial color="#888" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Base / keyboard */}
      <group position={[0, -0.23, 0.7]} rotation={[-Math.PI / 2 + 0.1, 0, 0]}>
        <RoundedBox args={[3, 2, 0.06]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#d4d4d4" />
        </RoundedBox>
        {/* Keyboard rows */}
        {[0, 1, 2].map(row => (
          <group key={row} position={[0, 0.4 - row * 0.35, 0.032]}>
            {Array.from({ length: 10 }).map((_, col) => (
              <mesh key={col} position={[-1.1 + col * 0.24, 0, 0]}>
                <boxGeometry args={[0.18, 0.18, 0.015]} />
                <meshStandardMaterial color="#bbb" />
              </mesh>
            ))}
          </group>
        ))}
        {/* Trackpad */}
        <mesh position={[0, -0.6, 0.032]}>
          <planeGeometry args={[0.8, 0.5]} />
          <meshStandardMaterial color="#c0c0c0" />
        </mesh>
      </group>
    </group>
  );
};

export default LaptopModel;
