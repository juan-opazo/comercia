import React from 'react'
import { connect } from 'react-redux';
import { Container, Transition } from 'semantic-ui-react'
import ProductCard from './ProductCard';

const ProductList = props => {
  const [sorters, setSorters] = React.useState(props.sorters);
  // const [filteredProducts, setFilteredProducts] = React.useState(props.products);
  // if (!filteredProducts) return <></>
  
  // console.log(filteredProducts);
  const showProducts = ({ products, sorters, filters, onSelectProduct, searchByName }) => {
    let filteredProducts = products;
    // if(filters.rating !== undefined) {
    //   products = products.filter(product => product.rating >= filters.rating);
    // }
    if (searchByName) {
      filteredProducts = filteredProducts.filter(product => product.name.includes(searchByName))
    }
    if (!filteredProducts) return <></>
    
    let sortedProducts = filteredProducts;
    
    if (sorters.numOfLikes === 1) sortedProducts.sort((a, b) => a.rating.length - b.rating.length);
    else if (sorters.numOfLikes === 2) sortedProducts.sort((a, b) => b.rating.length - a.rating.length);

    if (sorters.numOfComments === 1) sortedProducts.sort((a, b) => a.comments.length - b.comments.length);
    else if (sorters.numOfComments === 2) sortedProducts.sort((a, b) => b.comments.length - a.comments.length);
    return sortedProducts.map(product => 
      <ProductCard key={product._id} product={product} onSelectProduct={onSelectProduct} />
    )
  }

  return (
    <Container textAlign='center'>
      <div className='flex-container'>
      <Transition.Group animation={'fly up'} duration={500}>
        {true && (
          showProducts(props)
        )}
      </Transition.Group>
      
    </div>
  </Container>
  );
}

const mapStateToProps = ({ auth, products }) => {
  return { auth, products };
}

export default connect(mapStateToProps)(ProductList);