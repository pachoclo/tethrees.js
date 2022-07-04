import { OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Help } from './Components/Help'
import { Level } from './Components/Level'
import { MobileControls } from './Components/MobileControls'
import { ScoreCard } from './Components/ScoreCard'
import { cameras } from './constants'
import { useLevelStore } from './store/store'
import { isMobile } from 'react-device-detect'

function App() {
  let showHelp = useLevelStore((store) => store.help)

  return (
    <>
      <Canvas camera={cameras.one} orthographic={false}>
        <ambientLight intensity={0.3} />
        <directionalLight color="silver" position={[2, -20, 50]} />
        <directionalLight color="gray" position={[-2, 20, 20]} />
        <Level />
        <OrbitControls makeDefault />
        {import.meta.env.DEV && !showHelp && <Stats showPanel={0} />}
      </Canvas>
      {!isMobile && showHelp && <Help />}
      {isMobile && (
        <>
          <MobileControls />
        </>
      )}
      {!isMobile && <ScoreCard />}
    </>
  )
}

export default App
