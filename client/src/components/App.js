import 'semantic-ui-css/semantic.min.css';
import '../App.css';

import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import ProductList from './ProductList';
import SearchBar from './SearchBar';

const products = [
    {
        id: '123',
        price: 12.4,
        name: "Huevos Metro la Marina",
        brand: "Marca A",
        store: "Metro",
        description: "Hay promocion de docena de huevos en el metro de...",
        rating: 3,
        location: "https://www.google.com/maps/place/Metro/@-9.1198307,-78.5364452,16.34z/data=!4m12!1m6!3m5!1s0x91ab85cc856189c1:0xcfd7f8fa99fa7d1d!2splazaVea+Nuevo+Chimbote!8m2!3d-9.1264688!4d-78.5353347!3m4!1s0x0:0x35f6e1610439fe19!8m2!3d-9.1206335!4d-78.5352747",
        image: "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
    },
    {
        id: '1234',
        price: 20.5,
        name: "Huevos Plaza Vea",
        brand: "Marca B",
        store: "Plaza Vea",
        description: "Hay promocion de docena de huevos en plaza vea !!!!",
        rating: 2,
        location: "https://www.google.com/maps/place/plazaVea+Nuevo+Chimbote/@-9.1331244,-78.5376101,14.44z/data=!4m5!3m4!1s0x91ab85cc856189c1:0xcfd7f8fa99fa7d1d!8m2!3d-9.1264688!4d-78.5353347",
        image: "https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
    },
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: false
        }
    }

    onSearchSubmit = term => {
        // this.setState({ searchBarValue : e.target.value })
        this.setState({ loading: true })
        // llamar a endpoint para recibir lista de productos
        let response = [
            {
                id: '123',
                price: 12.4,
                name: "Huevos Metro la Marina",
                brand: "Marca A",
                store: "Metro",
                description: "Hay promocion de docena de huevos en el metro de...",
                rating: 3,
                location: "https://www.google.com/maps/place/Metro/@-9.1198307,-78.5364452,16.34z/data=!4m12!1m6!3m5!1s0x91ab85cc856189c1:0xcfd7f8fa99fa7d1d!2splazaVea+Nuevo+Chimbote!8m2!3d-9.1264688!4d-78.5353347!3m4!1s0x0:0x35f6e1610439fe19!8m2!3d-9.1206335!4d-78.5352747",
                image: "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
            },
            {
                id: '1234',
                price: 20.5,
                name: "Huevos Plaza Vea",
                brand: "Marca B",
                store: "Plaza Vea",
                description: "Hay promocion de docena de huevos en plaza vea !!!!",
                rating: 2,
                location: "https://www.google.com/maps/place/plazaVea+Nuevo+Chimbote/@-9.1331244,-78.5376101,14.44z/data=!4m5!3m4!1s0x91ab85cc856189c1:0xcfd7f8fa99fa7d1d!8m2!3d-9.1264688!4d-78.5353347",
                image: "https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
            },
        ];
        this.setState({ products: response, loading: false })
    }

    searchProducts = () => {
        return (
            <>
                <SearchBar loading={this.state.loading} value={this.state.searchBarValue} onSearchSubmit={this.onSearchSubmit}/>
                <ProductList products={this.state.products}/>
            </>
        )
    }

    render() {
        return (
            <Container>
                <BrowserRouter>
                    <div>
                        <Route path="/" exact component={this.searchProducts}/>
                    </div>
                </BrowserRouter>
            </Container>
        );
    }
    
}

export default App;