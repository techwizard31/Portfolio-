import React from 'react';
import { useEffect,useState,Suspense } from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls,Preload,useGLTF} from '@react-three/drei';
import CanvasLoader from '../Loader';


const Computers = ({isMoblile}) => {
  const computer = useGLTF('./desktop_pc/scene.gltf');
  return (
    <group>
      <hemisphereLight intensity={0.75} groundColor='black'/>
      <pointLight intensity={8}/>
      <spotLight position={[-20,50,10]} intensity={100} angle={0.12} penumbra={1} castShadow shadow-mapSize={1024}/> 
      <primitive object={computer.scene} scale={ isMoblile ? 0.65 : 0.75} position={isMoblile ? [0,-3,-2.2] :[0,-3.55,-1.5]} rotation={[-0.01,-0.2,-0.1]} />
    </group>
  )
}

export const ComputerCanvas = ()=>{
  const [isMoblile,setIsMobile]=useState(false);
  useEffect(()=>{
    const mediaQuery = window.matchMedia('(max-width:550px)')
    setIsMobile(mediaQuery.matches)
    console.log(isMoblile)
    const handleMediaQueryChange = (event)=>{
      setIsMobile(event.matches)
    }
    mediaQuery.addEventListener('change',handleMediaQueryChange)
    return ()=>{
    mediaQuery.removeEventListener('change',handleMediaQueryChange)
    }
  },[])
  return(
    <Canvas frameloop='demand' shadows camera={{position:[20,3,5],fov:25}} gl={{preserveDrawingBuffer:true}}>
         <Suspense fallback={<CanvasLoader/>}>
           <OrbitControls enableZoom={false} maxPolarAngle={Math.PI /2} minPolarAngle={Math.PI /2} />
           <Computers isMoblile={isMoblile}/>
         </Suspense>
         <Preload all/>
    </Canvas>
  )}

export default Computers;