import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from '../src/pages/main'
import {NavLink,withRouter,Router,Switch,Route,BrowserRouter,HashRouter} from 'react-router-dom';
import { renderRoutes} from 'react-router-config';
import routers from './router'


function App() {

   

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
    {/* <Main /> */}
    
    <HashRouter>
            <Switch>
            {
                routers.map(router=>{
                    return (
                        <Route
                            exact
                            path={router.path}
                            component = { router.component }
                        ></Route>
                    )
                })
            }
            </Switch>
        </HashRouter>
   
    </>
  );
}

export default App;
