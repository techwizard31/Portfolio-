import React from 'react';
import { useMemo,useRef,Suspense } from 'react';
import { Canvas,useFrame } from '@react-three/fiber';
import { Points,PointMaterial,Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props) => {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(5000),{ radius: 1.2})
  const positions = useMemo(() => {
  const result = [];
  for (let i = 0; i < sphere.length; i += 3) {
      result.push([sphere[i], sphere[i + 1], sphere[i + 2]]);
    }
    return result;
  }, [sphere]);
  useFrame((state,delta)=>{
    ref.current.rotation.x -= delta/10;
    ref.current.rotation.y -= delta/15;
  })
  return (
    <group rotation={[0,0,Math.PI/4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled {...props} />
      <PointMaterial transparent color="#f272c8" size={0.002} sizeAttenuation={true} depthWrite={false} />
    </group>
  )
}

const StarsCanvas = ()=>{
  return(
    <div className='w-full h-full absolute inset-0 z-[-1]'>
       <Canvas camera={{position:[0,0,1]}}>
         <Suspense fallback={null}>
           <Stars />
         </Suspense>
         <Preload all />
       </Canvas>
    </div>
  )
}

export default StarsCanvas;