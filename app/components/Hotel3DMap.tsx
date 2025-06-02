'use client';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useExperiencesStore } from '../store/useExperiencesStore';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export default function Hotel3DMap() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { setSelectedRoom } = useExperiencesStore();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 10, 20);
    controls.update();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(ambientLight, directionalLight);

    // Room cubes
    const rooms = [
      { name: 'Spa', x: -5 },
      { name: 'Gym', x: 0 },
      { name: 'Lobby', x: 5 }
    ];

    rooms.forEach((room) => {
      const geometry = new THREE.BoxGeometry(4, 2, 4);
      const material = new THREE.MeshStandardMaterial({ color: 0x0077be });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(room.x, 1, 0);
      cube.name = room.name;
      scene.add(cube);
    });

    // Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const bounds = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        const roomName = intersects[0].object.name;
        setSelectedRoom(roomName);
        alert(`You clicked on ${roomName}`);
      }
    };

    mount.addEventListener('click', onMouseClick);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      mount.removeChild(renderer.domElement);
      mount.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [setSelectedRoom]);

  return <div ref={mountRef} className="w-full h-full" />;
}
