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
  const hasTexture = Boolean(textureReady && texture);

  // Load screen image via a canvas texture for broader browser compatibility.
  // This avoids edge cases where direct JPEG texture decoding renders white.
  const defaultImage = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
  useEffect(() => {
    let cancelled = false;
    let loadedTexture: THREE.Texture | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    setTextureReady(false);
    setTexture(null);
    const src = imageUrl || defaultImage;
    const isExternalUrl = /^https?:\/\//.test(src);

    const img = new Image();
    img.decoding = 'async';
    if (isExternalUrl) {
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
    }

    const failLoad = (reason: string) => {
      if (cancelled) return;
      console.warn(`[LaptopModel] ${reason}: ${src}`);
      setTexture(null);
      setTextureReady(true);
    };

    img.onload = () => {
      if (cancelled) return;

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 1280;
      canvas.height = img.naturalHeight || 720;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        failLoad('Canvas context unavailable');
        return;
      }

      try {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      } catch (error) {
        console.error('[LaptopModel] Failed to draw image onto canvas', error);
        setTexture(null);
        setTextureReady(true);
        return;
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;

      loadedTexture = tex;
      setTexture(tex);
      setTextureReady(true);
    };

    img.onerror = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      failLoad('Image failed to load');
    };

    timeoutId = setTimeout(() => {
      img.src = '';
      failLoad('Image load timed out after 12s');
    }, 12000);

    img.src = src;

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      if (loadedTexture) loadedTexture.dispose();
      img.src = '';
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
          {/* key forces material recreation when texture loads, so Three.js
              recompiles the shader with texture-sampling support.            */}
          <meshBasicMaterial
            key={hasTexture ? 'tex' : 'no-tex'}
            color={hasTexture ? '#ffffff' : screenColor}
            map={hasTexture ? texture : null}
          />
        </mesh>
        {/* Screen content: code lines - hide if image is provided */}
        {!hasTexture && [0, 1, 2, 3, 4, 5].map(i => (
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
