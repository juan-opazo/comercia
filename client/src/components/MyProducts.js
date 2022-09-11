import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux';
import { Label, Image, Transition, Icon, Button } from 'semantic-ui-react'
import NewProductForm from './NewProductForm'
import NumberOfComments from './NumberOfComments'
import ProductCard from './ProductCard'
import Rating from './Rating'

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

const showProducts = (products, onSelectProduct) => {
    if (!products) return
    return products.map(product => 
        <div className='flex-container center width-30 min-width-300 margin-1 ' key={product._id} >
            <ProductCard product={product} onSelectProduct={onSelectProduct}/>
        </div>
    )
}

const MyProducts = ({ products, auth, userPosition, onSelectProduct, syncProducts }) => {
    if (!products || !auth) return <></>
    products = products.filter(product => product.created_by === auth._id)
    return (
        <div className='flex-container wrap center padding-1'>
            <Transition.Group animation={'fly up'} duration={500}>
                {true && (
                    <>
                        {showProducts(products, onSelectProduct)}
                        <div className='flex-container center width-80'>
                            <NewProductForm userPosition={userPosition} syncProducts={syncProducts}/>
                        </div>
                    </>
                )}
            </Transition.Group>
                
        </div>
        
    );
}

const mapStateToProps = ({ auth, products }) => {
    return { auth, products };
  }

export default connect(mapStateToProps)(MyProducts);