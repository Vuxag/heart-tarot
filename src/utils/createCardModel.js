import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

export function createCardModel() {
  return new Promise((resolve, reject) => {
    try {
      // Create card geometry
      const geometry = new THREE.BoxGeometry(1.4, 2.4, 0.05);
      
      // Create materials
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.5,
        roughness: 0.2,
      });

      // Create mesh
      const card = new THREE.Mesh(geometry, material);
      
      // Add rounded corners
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x000000 })
      );
      card.add(line);

      // Create scene
      const scene = new THREE.Scene();
      scene.add(card);

      // Export to GLB
      const exporter = new GLTFExporter();
      exporter.parse(
        scene,
        (gltf) => {
          try {
            const blob = new Blob([gltf], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'card.glb';
            link.click();
            URL.revokeObjectURL(url);
            resolve();
          } catch (err) {
            reject(err);
          }
        },
        (error) => {
          reject(error);
        },
        { binary: true }
      );
    } catch (err) {
      reject(err);
    }
  });
} 