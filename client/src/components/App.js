import 'semantic-ui-css/semantic.min.css';

import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import ProductList from './ProductList';

const App = () => {
    return (
        <Container>
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={() => <ProductList/>}/>
                </div>
            </BrowserRouter>
        </Container>
    );
}

export default App;