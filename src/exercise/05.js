// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  const tiltRef = React.useRef()
  
  React.useEffect( () =>{
    const tiltNode = tiltRef.current  // Captura da div externa via uma ref
    // const tiltNode = document.getElementsByClassName('tilt-root')[0] // JS puro

    VanillaTilt.init(tiltNode, {
      max: 50,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })
    // Opcionalmente o useEffect pode retornar uma função de "limpeza",
    // que remove quaisquer elementos que foram adicionados ao DOM pelo próprio useEffect().
    return () => tiltNode.vanillaTilt.destroy()
  }, [/* Sem dependências */])


  return (
    <div className="tilt-root" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
