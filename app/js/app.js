import * as THREE from "../../node_modules/three/build/three.module.js";
import { InteractionManager } from 'three.interactive';

const scene = new THREE.Scene();
const textureSpace = new THREE.TextureLoader().load("img/space.jpg");
scene.background = textureSpace;
scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const interactionManager2 = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);
console.log(interactionManager2);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0);

document.body.appendChild(renderer.domElement);

//освещение
const SpotLight = new THREE.SpotLight( 0xffffff );
SpotLight.position.set( -1000, -400, 1000 );
SpotLight.SpotLightShadow = true;
SpotLight.shadow.mapSize.width = 1024;
SpotLight.shadow.mapSize.height = 1024;
SpotLight.shadow.camera.near = 500;
SpotLight.shadow.camera.far = 1000;
SpotLight.shadow.camera.fov = 30;
scene.add(SpotLight);

const textureMoon = new THREE.TextureLoader().load('img/moon.png');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 30, 30),
  new THREE.MeshStandardMaterial({ map: textureMoon})
);
moon.position.z = -2;
scene.add(moon);

const textureEart = new THREE.TextureLoader().load("img/01-3.jpg");
const eart = new THREE.Mesh(
  new THREE.SphereGeometry(1, 100, 100),
  new THREE.MeshStandardMaterial({ map: textureEart })
);
eart.position.z = -5;
eart.addEventListener('mouseover', (e) => console.log(e));
scene.add(eart);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 15, 15);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(90));
  star.position.set(x, y, z);
  scene.add(star);
};  

Array(200).fill().forEach(addStar)

function animate() {
  requestAnimationFrame(animate);
  eart.rotation.y += 0.003;
	eart.rotation.x += 0.002;
	eart.rotation.z += 0.002;

  render();
}

animate();

function onPointerMove( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

renderer.domElement.addEventListener("click", onclick, true);

function render() {
  renderer.render(scene, camera);

};
function onclick() {
  console.log(1);
}

document.body.onscroll = handlerScroll;
function handlerScroll() {

  const t = document.body.getBoundingClientRect().top;
  const pos = t/1000;
  
  moon.position.x = -pos;
  eart.position.x = pos;

  if(camera.position.z < -0.6) {
    eart.position.x += 0.001;
    if(eart.position.x < -1.75) eart.position.x = -1.75;
  } else {
    eart.position.x -= 0.01;
  }

  camera.position.z = t * 0.001;
}
