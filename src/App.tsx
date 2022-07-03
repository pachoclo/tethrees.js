import { OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Help } from './Components/Help'
import { Level } from './Components/Level'
import { ScoreCard } from './Components/ScoreCard'
import { cameras } from './constants'

function App() {
  return (
    <>
      <Canvas camera={cameras.one} orthographic={false}>
        <ambientLight intensity={0.3} />
        <directionalLight color="silver" position={[2, -20, 50]} />
        <directionalLight color="gray" position={[-2, 20, 20]} />
        <Level />
        <OrbitControls makeDefault />
        {import.meta.env.DEV && <Stats showPanel={0} />}
      </Canvas>
      <Help />
      <ScoreCard />
    </>
  )
}

export default App
