import 'semantic-ui-css/semantic.min.css';
import '../App.css';

import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ProductList from './ProductList';
import SearchBar from './SearchBar';
import FilterBox from './FilterBox';
import comercia from '../apis/comercia';
import ResponsiveContainer from './ResponsiveContainer';
import Footer from './Footer';
import ProductDetail from './ProductDetail';
import MyProducts from './MyProducts';
import ProductEdit from './ProductEdit';
import SortBox from './SortBox';

const HOME = 'Inicio';
const PRODUCT = 'Producto';
const MY_PRODUCTS = 'Mis Productos';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // products: [],
            searchBarValue: '',
            loading: false,
            filters: {},
            sorters: {numOfLikes: 0, numOfComments: 0},
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
        this.props.fetchUser();
        this.syncProducts();
        // this.props.fetchProducts().then(() => {
        //     const products = [...this.props.products];
        //     const myProducts = products.filter(product => product.created_by === this.props.auth._id);
        //     this.setState({ products, myProducts });
        // });
        // get current path to set tab Active property
        
        if (window.location.pathname.includes('product')) {
            console.log(window.location.pathname);
            this.state.tabActive = MY_PRODUCTS;
            console.log(this.state.tabActive);
        }
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
        // myProducts = [
        //     ...myProducts,
        //     {
        //         id: '123',
        //         price: 12.4,
        //         name: "Huevos Metro la Marina",
        //         brand: "Marca A",
        //         store: "Metro",
        //         description: "Hay promocion de docena de huevos en el metro de...",
        //         rating: 3,
        //         location: "https://www.google.com/maps/place/Metro/@-9.1198307,-78.5364452,16.34z/data=!4m12!1m6!3m5!1s0x91ab85cc856189c1:0xcfd7f8fa99fa7d1d!2splazaVea+Nuevo+Chimbote!8m2!3d-9.1264688!4d-78.5353347!3m4!1s0x0:0x35f6e1610439fe19!8m2!3d-9.1206335!4d-78.5352747",
        //         image: "https://react.semantic-ui.com/images/avatar/large/daniel.jpg",
        //         comments: [
        //             {
        //                 owner: {
        //                     id: '1',
        //                     profile_pic: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
        //                     name: 'Matt'
        //                 },
        //                 date: '2022-6-27',
        //                 content: 'Buen producto!',
        //                 replies: [
        //                     {
        //                         owner: {
        //                             id: '1',
        //                             profile_pic: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
        //                             name: 'Matt'
        //                         },
        //                         date: '2022-6-27',
        //                         content: 'Creanme pe',
        //                         replies: [
        //                             {
        //                                 owner: {
        //                                     id: '2',
        //                                     profile_pic: 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
        //                                     name: 'Paul'
        //                                 },
        //                                 date: '2022-6-28',
        //                                 content: 'No te quiero creer pe loco',
        //                                 replies: [
        //                                     {
        //                                         owner: {
        //                                             id: '1',
        //                                             profile_pic: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
        //                                             name: 'Matt'
        //                                         },
        //                                         date: '2022-6-28',
        //                                         content: 'Que te den entonces!!!',
        //                                         replies: [
                                                    
        //                                         ]
        //                                     }
        //                                 ]
        //                             }
        //                         ]
        //                     }
        //                 ]
        //             },
        //             {
        //                 owner: {
        //                     id: '2',
        //                     profile_pic: 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
        //                     name: 'Paul'
        //                 },
        //                 date: '2022-6-28',
        //                 content: 'Haganle caso al pata de arriba gaaa',
        //                 replies: []
        //             }

        //         ]
        //     },
        //     {
        //         id: '1234',
        //         price: 20.5,
        //         name: "Huevos Plaza Vea",
        //         brand: "Marca B",
        //         store: "Plaza Vea",
        //         description: "Hay promocion de docena de huevos en plaza vea !!!!",
        //         rating: 2,
        //         location: "https://www.google.com/maps/place/plazaVea+Nuevo+Chimbote/@-9.1331244,-78.5376101,14.44z/data=!4m5!3m4!1s0x91ab85cc856189c1:0xcfd7f8fa99fa7d1d!8m2!3d-9.1264688!4d-78.5353347",
        //         image: "https://react.semantic-ui.com/images/avatar/large/elliot.jpg",
        //         comments: []
        //     },
        // ];
        // this.state.myProducts = myProducts;
        
    }

    getComerciaUsers = async () => {
        const response = await comercia.get('/products');
    };

    syncProducts = () => {
        this.props.fetchProducts()
        //     .then(() => {
        //     const products = [...this.props.products];
        //     const myProducts = products.filter(product => product.created_by === this.props.auth._id);
        //     this.setState({ products, myProducts });
        // });
    }

    updateSortingByLikes = value => {
        const sorters = { ...this.state.sorters };
        sorters.numOfLikes = value;
        this.setState({ sorters })
    }

    updateSortingByComments = value => {
        const sorters = { ...this.state.sorters };
        sorters.numOfComments = value;
        this.setState({ sorters });
    }

    updateSections = e => {
        if(e.target.textContent == HOME) {
            this.setState({ 
                sections: [{ key: HOME, content: HOME, link: false }],
                productSelectedId: null,
                searchBarValue: null,
            })
        } else if(e.target.textContent == MY_PRODUCTS) {
            this.setState({ 
                sections: [{ key: MY_PRODUCTS, content: MY_PRODUCTS, link: false }],
                productSelectedId: null,
                searchBarValue: null,
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
        console.log('id ', value);
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
        // console.log(value);
        this.setState({ searchBarValue : value });
    }

    editProduct = () => {
        const utils = {
            sections: this.state.sections,
            tabActive: this.state.tabActive,
            isAuthenticated: this.state.isAuthenticated,
            updateSections: this.updateSections,
            onNavBarItem: this.onNavBarItem,
            auth: this.props.auth,
        }
        if (this.props.auth) {
            return (
                <ResponsiveContainer>
                        <ProductEdit />
                        <Footer />
                        {utils}
                    </ResponsiveContainer>
            )
        }

        return (
            <ResponsiveContainer>
                    {/* show info about my products tab for non users */}
                    <Footer />
                    {utils}
                </ResponsiveContainer>
        )
    }

    myProducts = () => {
        // this.setState({productSelectedId : null});
        const utils = {
            sections: this.state.sections,
            tabActive: this.state.tabActive,
            isAuthenticated: this.state.isAuthenticated,
            updateSections: this.updateSections,
            onNavBarItem: this.onNavBarItem,
            auth: this.props.auth,
        }
        if (this.props.auth) {
            if(this.state.productSelectedId === null) {
                return (
                    <ResponsiveContainer>
                        <MyProducts userPosition={this.state.userPosition} onSelectProduct={this.onSelectProduct} syncProducts={this.syncProducts}/>
                        <Footer />
    
                        {utils}
                        
                    </ResponsiveContainer>
                )
            } else {
                const productSelected = this.props.products.find(product => product._id === this.state.productSelectedId);

                return (
                    <ResponsiveContainer>
                        <ProductDetail product={productSelected} userPosition={this.state.userPosition} syncProducts={this.syncProducts}/>
                        <Footer />
    
                        {utils}
                        
                    </ResponsiveContainer>
                )
            }
        }

        return (
            <ResponsiveContainer>
                    {/* show info about my products tab for non users */}
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
            onNavBarItem: this.onNavBarItem,
            auth: this.props.auth,
        }
        if (this.props.auth) {
            if(this.state.productSelectedId === null) {
                return (
                    <ResponsiveContainer>
                        <SearchBar loading={this.state.loading} value={this.state.searchBarValue} onSearchSubmit={e => this.onSearchSubmit(e)} />
                        {/* <FilterBox onFilterByRating={this.onFilterByRating} /> */}
                        <SortBox sorters={this.state.sorters} updateSortingByLikes={this.updateSortingByLikes} updateSortingByComments={this.updateSortingByComments} />
                        <ProductList sorters={this.state.sorters} filters={this.state.filters} userPosition={this.state.userPosition} onSelectProduct={this.onSelectProduct} searchByName={this.state.searchBarValue} />
                        <Footer />
                        {utils}
                    </ResponsiveContainer>
                )
            } else {
                const productSelected = this.props.products.find(product => product._id === this.state.productSelectedId);
                return (
                    <ResponsiveContainer>
                        <ProductDetail product={productSelected} syncProducts={this.syncProducts}/>
                        <Footer />

                        {utils}
                        
                    </ResponsiveContainer>
                )
            }
        }

        return (
            <ResponsiveContainer>
                    {/* show info about my products tab for non users */}
                    <Footer />
                    {utils} 
                </ResponsiveContainer>
        )
    }

    notFound = () => {
        const utils = {
            sections: this.state.sections,
            tabActive: this.state.tabActive,
            isAuthenticated: this.state.isAuthenticated,
            updateSections: this.updateSections,
            onNavBarItem: this.onNavBarItem,
            auth: this.props.auth,
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
                        <Route path="/mis-productos/:id" exact component={this.editProduct}/>
                        <Route path="/404" exact component={this.notFound} />
                        <Redirect to="/404"/>
                    </Switch>
                    
                </div>
            </BrowserRouter>
        );
    }
    
};

const mapStateToProps = ({ auth, products }) => {
    return { auth, products };
}

export default connect(mapStateToProps, actions)(App);