import 'semantic-ui-css/semantic.min.css';
import '../App.css';

import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import ProductList from './ProductList';
import SearchBar from './SearchBar';
import FilterBox from './FilterBox';
import comercia from '../apis/comercia';
import NavBar from './Footer';
import ResponsiveContainer from './ResponsiveContainer';
import Footer from './Footer';
import ProductDetail from './ProductDetail';

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
            loading: false,
            filters: {},
            productSelectedId: null,
            sections: [{ key: 'Inicio', content: 'Inicio', link: false }]
        }
    }

    getComerciaUsers = async () => {
        const response = await comercia.get('/products');
        console.log(response);
    };

    onSelectProduct = value => {
        this.setState({ 
            productSelectedId: value, 
            sections: [
                { key: 'Inicio', content: 'Inicio', link: true }, 
                { key: 'Producto', content: 'Producto', link: false }
            ] 
        });
    }

    onFilterByRating = value => {
        const filters = this.state.filters;
        filters.rating = value;
        this.setState({ filters });
    }

    onSearchSubmit = value => {
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
                image: "https://react.semantic-ui.com/images/avatar/large/daniel.jpg",
                comments: [
                    {
                        owner: {
                            id: '1',
                            profile_pic: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
                            name: 'Matt'
                        },
                        date: '2022-6-27',
                        content: 'Buen producto!',
                        replies: [
                            {
                                owner: {
                                    id: '1',
                                    profile_pic: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
                                    name: 'Matt'
                                },
                                date: '2022-6-27',
                                content: 'Creanme pe',
                                replies: [
                                    {
                                        owner: {
                                            id: '2',
                                            profile_pic: 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
                                            name: 'Paul'
                                        },
                                        date: '2022-6-28',
                                        content: 'No te quiero creer pe loco',
                                        replies: [
                                            {
                                                owner: {
                                                    id: '1',
                                                    profile_pic: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
                                                    name: 'Matt'
                                                },
                                                date: '2022-6-28',
                                                content: 'Que te den entonces!!!',
                                                replies: [
                                                    
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        owner: {
                            id: '2',
                            profile_pic: 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
                            name: 'Paul'
                        },
                        date: '2022-6-28',
                        content: 'Haganle caso al pata de arriba gaaa',
                        replies: []
                    }

                ]
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
                image: "https://react.semantic-ui.com/images/avatar/large/elliot.jpg",
                comments: []
            },
        ];
        this.setState({ products: response, loading: false })
    }

    searchProducts = () => {
        if(this.state.productSelectedId === null) {
            return (
                <ResponsiveContainer>
                    <SearchBar loading={this.state.loading} value={this.state.searchBarValue} onSearchSubmit={this.onSearchSubmit} />
                    <FilterBox onFilterByRating={this.onFilterByRating} />
                    <ProductList products={this.state.products} filters={this.state.filters} onSelectProduct={this.onSelectProduct} />
                    <Footer />

                    {this.state.sections}
                </ResponsiveContainer>
            )
        } else {
            const productSelected = this.state.products.find(product => product.id === this.state.productSelectedId);
            return (
                <ResponsiveContainer>
                    <ProductDetail product={productSelected}/>
                    <Footer />

                    {this.state.sections}
                </ResponsiveContainer>
            )
        }
        
    }

    render() {
        this.getComerciaUsers();
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={this.searchProducts}/>
                </div>
            </BrowserRouter>
        );
    }
    
}

export default App;