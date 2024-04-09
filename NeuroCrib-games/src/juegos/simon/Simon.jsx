import Board from './components/Board'

function App() {
  return (
    <div className="bg-neutral-800 flex flex-col justify-center items-center h-screen p-6 select-none">
      <h1 className="text-white text-4xl font-bold">Sequence Memory Game</h1>
      <Board />
    </div>
  )
}

export default App
