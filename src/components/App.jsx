import React from "react";
import './app.less';
import Main from "./main/Main";
import {BrowserRouter , Switch , Route , Redirect} from "react-router-dom";
import Card from "./card/card";

const App = () => {

    return (
        <BrowserRouter>
            <div className={'container'}>
                <Switch>
                    <Route
                        exact
                        path={'/'}
                        component={Main}
                    />
                    <Route
                        path={'/card/:username/:reponame'}
                        component={Card}
                    />
                    <Redirect to={'/'} />
                </Switch>
            </div>
        </BrowserRouter>

    )
}

export default App