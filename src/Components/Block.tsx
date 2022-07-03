import { MeshProps } from '@react-three/fiber'
import { Constants } from '../constants'

export type BlockProps = {
  color?: string
} & MeshProps

export function Block({ color = '#049ef4', ...props }: BlockProps) {
  const unit = 1 - Constants.blockGap

  return (
    <mesh {...props}>
      <boxGeometry args={[unit, unit, unit]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
