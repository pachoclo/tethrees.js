export function Help() {
  // TODO: use CSS grid to improve alignment/readability

  return (
    <section className="help-controls">
      <p>🕹 Controls</p>
      <p>
        <span className="arrow">→</span> Move right
      </p>
      <p>
        <span className="arrow">←</span> Move left
      </p>
      <p>
        <span className="arrow">↑</span> Rotate
      </p>
      <p>
        <span className="arrow">↓</span> Drop to bottom
      </p>
      <p>
        <span>Enter</span> Start Game
      </p>
      <p>
        <span>P</span> Pause / unpause
      </p>
      <p>
        <span>R</span> Restart level
      </p>
      <p>
        <span>H</span> Show / hide help
      </p>
      <p>
        <span>Mouse</span> Camera (click+drag)
      </p>
    </section>
  )
}
