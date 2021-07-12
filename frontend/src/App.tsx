import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import GlobalStyle from './globalStyle'
import Home from './views/Home'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
