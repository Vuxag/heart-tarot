import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Text, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useAudio } from '../contexts/AudioContext'

export default function TarotCard3D({ card, position, isSelected, onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const { nodes, materials } = useGLTF('/models/card.glb')
  const { playSound } = useAudio()

  // Animation for floating effect
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      if (isSelected) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.2
      }
    }
  })

  const handleClick = () => {
    playSound('cardSelect')
    onClick()
  }

  const handlePointerOver = () => {
    setHovered(true)
    playSound('hover', { volume: 0.3 })
  }

  const handlePointerOut = () => {
    setHovered(false)
  }

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group
        ref={meshRef}
        position={position}
        scale={isSelected ? 1.2 : 1}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Card base */}
        <mesh
          geometry={nodes.Card.geometry}
          material={materials.CardMaterial}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={hovered ? '#ff6b6b' : '#ffffff'}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>

        {/* Card front */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.4, 2.4]} />
          <meshStandardMaterial
            map={new THREE.TextureLoader().load(`/images/cards/${card.id}.jpg`)}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Card back */}
        <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.4, 2.4]} />
          <meshStandardMaterial
            map={new THREE.TextureLoader().load('/images/card-back.jpg')}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Card name */}
        <Text
          position={[0, 1.1, 0.02]}
          fontSize={0.1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {card.vietnameseName}
        </Text>
      </group>
    </Float>
  )
} 