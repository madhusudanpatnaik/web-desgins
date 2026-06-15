import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function LuxurySculpture() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  // Mouse interaction for subtle tilt
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Base rotation
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.x = time * 0.05;

    // Subtle mouse parallax
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.02;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.02;
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <torusKnotGeometry args={[3, 0.8, 128, 32, 2, 3]} /> {/* Halved segments for massive performance gain */}
      <meshPhysicalMaterial
        ref={materialRef}
        color="#051014"
        metalness={1.0}
        roughness={0.15}
        envMapIntensity={2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        // Removed heavy transmission (refraction) pass, switching to polished onyx/metal
      />
    </mesh>
  );
}
