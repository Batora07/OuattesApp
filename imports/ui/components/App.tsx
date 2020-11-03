import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../theme/NormalTheme';

import Login from './Login';
import Main from './Main';

const App = (props:any):JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" Component={Login} />
          <Route path="/chats" Component={Main} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
