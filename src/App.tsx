import { calcPosFromAngles, OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Level } from './Components/Level'
import { ScoreCard } from './Components/ScoreCard'
import { useLevelStore } from './Store/store'

function App() {
  let camera = useLevelStore((state) => state.camera)

  return (
    <>
      <Canvas camera={camera} orthographic={camera.orthographic}>
        <ambientLight intensity={0.3} />
        <directionalLight color="silver" position={[2, -20, 50]} />
        <directionalLight color="gray" position={[-2, 20, 20]} />
        <Level />
        <OrbitControls makeDefault />
        {import.meta.env.DEV && <Stats />}
      </Canvas>
      <ScoreCard />
    </>
  )
}

export default App
