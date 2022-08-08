import 'semantic-ui-css/semantic.min.css';
import '../App.css';

import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import ProductList from './ProductList';
import SearchBar from './SearchBar';
import FilterBox from './FilterBox';
import comercia from '../apis/comercia';
import ResponsiveContainer from './ResponsiveContainer';
import Footer from './Footer';
import ProductDetail from './ProductDetail';
import MyProducts from './MyProducts';

const HOME = 'Inicio';
const PRODUCT = 'Producto';
const MY_PRODUCTS = 'Mis Productos';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            myProducts: [],
            loading: false,
            filters: {},
            productSelectedId: null,
            sections: [{ key: HOME, content: HOME, link: false }],
            tabActive: HOME,
            isAuthenticated: false,
            userPosition: {
                latitude: null,
                longitude: null,
                address: null, 
                city: null, 
                state: null, 
                country: null
            },
            
        }
    }

    componentDidMount() {
        // get current path to set tab Active property
        console.log(window.location.pathname);
        if (window.location.pathname.includes('product')) this.state.tabActive = MY_PRODUCTS;
        // get user location
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(position => {
                this.setState({
                    userPosition: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                });
            })
        }
        // get user products from backend
        const myProducts = [
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
        // this.state.myProducts = myProducts;
        this.setState({ myProducts });
    }

    getComerciaUsers = async () => {
        const response = await comercia.get('/products');
    };

    updateSections = e => {
        if(e.target.textContent == HOME) {
            this.setState({ 
                sections: [{ key: HOME, content: HOME, link: false }],
                productSelectedId: null
            })
        }
        // falta revisar para los demas tabs
    }

    onNavBarItem = e => {
        switch (e.target.textContent) {
            case HOME:
                this.setState({ 
                    sections: [{ key: HOME, content: HOME, link: false }],
                    productSelectedId: null,
                    tabActive: HOME
                });
                break;
            case MY_PRODUCTS:
                this.setState({
                    tabActive: MY_PRODUCTS
                });
            default:
                break;
        }
    }

    onSelectProduct = value => {
        this.setState({ 
            productSelectedId: value, 
            sections: [
                { key: HOME, content: HOME, link: true }, 
                { key: PRODUCT, content: PRODUCT, link: false }
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

    myProducts = () => {
        const utils = {
            sections: this.state.sections,
            tabActive: this.state.tabActive,
            isAuthenticated: this.state.isAuthenticated,
            updateSections: this.updateSections,
            onNavBarItem: this.onNavBarItem,
        }
        return (
            <ResponsiveContainer>
                    <MyProducts products={this.state.myProducts} userPosition={this.state.userPosition}/>
                    <Footer />

                    {utils}
                    
                </ResponsiveContainer>
        )
    }

    searchProducts = () => {
        const utils = {
            sections: this.state.sections,
            tabActive: this.state.tabActive,
            isAuthenticated: this.state.isAuthenticated,
            updateSections: this.updateSections,
            onNavBarItem: this.onNavBarItem
        }
        if(this.state.productSelectedId === null) {
            return (
                <ResponsiveContainer>
                    <SearchBar loading={this.state.loading} value={this.state.searchBarValue} onSearchSubmit={this.onSearchSubmit} />
                    {/* <GoogleAuth/> */}
                    <FilterBox onFilterByRating={this.onFilterByRating} />
                    <ProductList products={this.state.products} filters={this.state.filters} onSelectProduct={this.onSelectProduct} />
                    <Footer />

                    {utils}
                    
                </ResponsiveContainer>
            )
        } else {
            const productSelected = this.state.products.find(product => product.id === this.state.productSelectedId);
            return (
                <ResponsiveContainer>
                    <ProductDetail product={productSelected}/>
                    <Footer />

                    {utils}
                    
                </ResponsiveContainer>
            )
        }
        
    }

    notFound = () => {
        const utils = {
            sections: this.state.sections,
            tabActive: this.state.tabActive,
            isAuthenticated: this.state.isAuthenticated,
            updateSections: this.updateSections,
            onNavBarItem: this.onNavBarItem
        }
        return (
            <ResponsiveContainer>
                <div><h1><strong>ERROR 404 - NOT FOUND</strong></h1></div>
                <Footer />

                {utils}
                
            </ResponsiveContainer>
        )

    }

    render() {
        // this.getComerciaUsers();
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" exact component={this.searchProducts}/>
                        <Route path="/mis-productos" exact component={this.myProducts}/>
                        <Route path="/404" exact component={this.notFound} />
                        <Redirect to="/404"/>
                    </Switch>
                    
                </div>
            </BrowserRouter>
        );
    }
    
}

export default App;