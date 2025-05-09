import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import { useLanguage } from '../contexts/LanguageContext'
import * as THREE from 'three'

const TarotCard3D = ({ card, isRevealed }) => {
  const { language } = useLanguage()
  const meshRef = useRef()
  const { nodes, materials } = useGLTF('/models/tarot_card.glb')
  const cardTexture = useTexture(card.image)

  useEffect(() => {
    if (meshRef.current) {
      // Create a new material with the card texture
      const material = new THREE.MeshStandardMaterial({
        map: cardTexture,
        roughness: 0.5,
        metalness: 0.2,
        envMapIntensity: 1,
      })

      // Apply the material to the card mesh
      meshRef.current.material = material
    }
  }, [cardTexture])

  useFrame((state) => {
    if (meshRef.current) {
      // Add subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      
      // Add gentle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={nodes.Card.geometry}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1.5, 0.1]}
      >
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.5}
          metalness={0.2}
          envMapIntensity={1}
        />
      </mesh>

      {/* Card border */}
      <mesh
        geometry={nodes.Border.geometry}
        position={[0, 0, 0.06]}
        rotation={[0, 0, 0]}
        scale={[1.02, 1.52, 0.02]}
      >
        <meshStandardMaterial
          color="#c0a080"
          roughness={0.3}
          metalness={0.8}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Card name */}
      <mesh
        position={[0, 0.6, 0.07]}
        rotation={[0, 0, 0]}
        scale={[0.8, 0.2, 0.01]}
      >
        <planeGeometry />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Card meaning */}
      {isRevealed && (
        <mesh
          position={[0, -0.6, 0.07]}
          rotation={[0, 0, 0]}
          scale={[0.8, 0.3, 0.01]}
        >
          <planeGeometry />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
          />
        </mesh>
      )}
    </group>
  )
}

export default TarotCard3D 