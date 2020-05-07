import React, {useEffect} from 'react'
import '../mock'
import './App.css'


console.log({
    ENV: process.env.NODE_ENV
})

function App() {
  useEffect( () => {
      const getInitData = async () => {
          try {
              console.log('before fetch')
              await fetch('/mock/list')
                  .then(resp=> resp.json())
                  .then(res => {
                      console.log({res, result: res.result}, 'toDoList')
                  })

              await fetch('/article')
                  .then(resp=> resp.json())
                  .then(res => {
                      console.log({res, result: res.result}, 'article')
                  })

              await fetch('/api/v3/nanooss/HBKY/organization/alias')
                  .then(resp=> resp.json())
                  .then(res => {
                      console.log({res, result: res.result}, 'alias')
                  })
        } catch (e) {
            console.log({error: e.message})
        }
      }

      getInitData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}

      </header>
    </div>
  );
}

export default App;
