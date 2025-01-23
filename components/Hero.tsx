'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

const Node = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.x = Math.sin(state.clock.elapsedTime) * 0.2 + 1
      meshRef.current.scale.y = Math.sin(state.clock.elapsedTime) * 0.2 + 1
      meshRef.current.scale.z = Math.sin(state.clock.elapsedTime) * 0.2 + 1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="#0066FF" />
    </mesh>
  )
}

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {Array.from({ length: 50 }).map((_, i) => (
          <Node key={i} position={[Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5]} />
        ))}
      </Canvas>
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-4 font-space-grotesk"
        >
          Elevating GMP Compliance Through Advanced Data Integrity Solutions
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-full font-semibold text-lg mt-8"
        >
          Transform Your Compliance Strategy
        </motion.button>
      </div>
    </section>
  )
}

export default Hero

