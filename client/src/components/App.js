import 'semantic-ui-css/semantic.min.css';

import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={() => <div>App</div>}/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;