import React from 'react';
import { Route, Switch} from 'react-router-dom';
import PrivateRoute from './route/privateRoute';
import ReRoute from './route/reRoute';

import Main from './component/main';
import Login from './component/login';
import SignUp from './component/signup';
import Loading from './component/loading';


function App() {
  return(
    <>
      <Switch>
        <Route exact path="/">
          <Loading></Loading>
        </Route>
        <PrivateRoute path='/chat' component={Main} />
        <ReRoute path='/login' component={Login} />
        <Route path='/signup'>
          <SignUp></SignUp>
        </Route>
      </Switch>
    </>
  )
}

export default App;