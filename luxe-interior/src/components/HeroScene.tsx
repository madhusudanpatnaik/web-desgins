import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, ContactShadows, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

function Sculpture() {
  const group = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.12
    if (group.current) {
      // pointer parallax — gentle lean toward the cursor
      const px = state.pointer.x * 0.35
      const py = state.pointer.y * 0.25
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, px, 0.05)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -py, 0.05)
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.7}>
        <group ref={spin}>
          {/* Primary brass form */}
          <mesh castShadow>
            <icosahedronGeometry args={[1.28, 12]} />
            <meshStandardMaterial
              color={'#b08b5e'}
              metalness={1}
              roughness={0.22}
              envMapIntensity={1.15}
            />
          </mesh>

          {/* Slim encircling ring */}
          <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
            <torusGeometry args={[1.92, 0.02, 24, 200]} />
            <meshStandardMaterial color={'#cdb188'} metalness={1} roughness={0.3} envMapIntensity={1.2} />
          </mesh>
        </group>

        {/* Matte stone accent sphere, offset for depth */}
        <mesh position={[1.75, 1.45, -0.8]}>
          <sphereGeometry args={[0.4, 64, 64]} />
          <meshStandardMaterial color={'#e7ded0'} metalness={0} roughness={1} />
        </mesh>

        {/* Small dark accent for contrast */}
        <mesh position={[-1.95, -1.55, 0.4]}>
          <sphereGeometry args={[0.24, 64, 64]} />
          <meshStandardMaterial color={'#2a241b'} metalness={0.2} roughness={0.6} />
        </mesh>
      </Float>

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.32}
        scale={11}
        blur={2.6}
        far={4.5}
        color="#3a2f22"
      />
    </group>
  )
}

/** Self-contained studio lighting — softbox Lightformers, no external HDRI download. */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#1a1610']} />
      <Lightformer intensity={2.4} position={[0, 3, 2]} scale={[6, 6, 1]} color="#fff4e2" />
      <Lightformer intensity={1.1} position={[-4, 1, -2]} scale={[4, 8, 1]} color="#d8c3a0" />
      <Lightformer intensity={1.4} position={[4, -1, 1]} scale={[5, 5, 1]} color="#ffffff" />
      <Lightformer intensity={0.8} position={[0, -3, 2]} scale={[8, 3, 1]} color="#caa978" />
    </Environment>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      camera={{ position: [0, 0, 6.4], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} color="#fff2dd" />
        <pointLight position={[-5, -2, -4]} intensity={20} color="#a9885e" />
        <Sculpture />
        <Studio />
      </Suspense>
    </Canvas>
  )
}
