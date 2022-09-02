import React from 'react'

import './App.css'

const numbers= [...new Array(20000).keys()]

function App() {
  const [query, setQuery] = React.useState('')
  const [text, setText] = React.useState('')
  const [isPending, startTransition] = React.useTransition()

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    startTransition(() => {
      setQuery(e.target.value)
    })
  }, [])

  const list = React.useMemo(() => {
    return numbers.map((i, index) => {
      return query
          ? i.toString().startsWith(query)
          && <p key={index}>{i}</p>
          : <p key={index}>{i}</p>
    })
  }, [query])

  return (
    <div className="app">
      <header className="app-header">
        <input type="text" onChange={handleInputChange} value={text} />
        <div>
          {isPending ? <p style={{ marginTop: 15 }}>Loading...</p> : list}
        </div>
      </header>
    </div>
  );
}

export default App;
