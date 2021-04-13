import * as React from 'react'
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

function PokemonInfo({ pokemonName }) {

  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [status, setStatus] = React.useState('idle')

  React.useEffect(() => {

    if (!pokemonName) return   // Nome vazio, retorna sem fazer nada

    // Resetar o estado do pokemon
    setPokemon(null)
    setError(null)

    /*
    // Essa abordagem não funciona porque o JS trabalha de forma ASSÍNCRONA
    const pokemonData = fetchPokemon(pokemonName)   // Chamada da API
     // Atualizar o estado com os dados retornados da API
    setPokemon(pokemonData)    
    */
    // Callback é um função que será executada pela função assíncrona 
    // assim que ela tiver terminado de fazer sua tarefa.

    // Tecnicamente, quando uma função assíncrona retorna um objeto
    // em forma de Promise (promessa)
    // Uma Promise suporta 2 callback, uma quando a execução assíncrona dá certo
    // e outra para o caso de erro
    /*
    fetchPokemon(pokemonName)
      .then(     // Callback de quando dá certo
          pokemonData => setPokemon(pokemonData)
      )
      .catch(    // Callback de quando dá errado
          erro => alert(erro.message)
      )
    */
    // Método 2 com async...await
    async function getPokemonFromServer() {
      try { // tenta fazer a chamada ao servidor remoto da API 
        setStatus('pending')
        const pokemonData = await fetchPokemon(pokemonName)
        setPokemon(pokemonData)
        setStatus('resolved')
      }
      catch (erro) { // Em caso de erro no bloco try, caímos no bloco catch()
        setError(erro)
        setStatus('rejected')
      }
    }
    // Chama da função
    getPokemonFromServer()
  }, [pokemonName])

  switch (status) {
    case 'idle':
      return 'Submit a pokemon'
    case 'rejected':
      return (
        <div role="alert">
          There was an error: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
        </div>
      )
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    default:
      return <PokemonDataView pokemon={pokemon} />
  }
  /*
  if(! pokemonName) return 'Submit a pokemon'
  else if(error) return (
    <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
  else if(pokemonName && !pokemon) return <PokemonInfoFallback name={pokemonName} />
  else return <PokemonDataView pokemon={pokemon} />
  */
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
