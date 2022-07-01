import React from 'react'
import { Rating, Card, Icon, Image, Container, Transition } from 'semantic-ui-react'

const showProducts = ({ products, filters, onSelectProduct }) => {
  if(filters.rating !== undefined) {
    products = products.filter(product => product.rating >= filters.rating);
  }
  
  return products.map(product => 
    <Card key={product.id} onClick={() => onSelectProduct(product.id)}>
      <Image src={product.image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>S/ {product.price}</Card.Header>
        <Card.Meta>{product.name} - {product.brand}</Card.Meta>
        <Card.Description> {product.description} </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='card-extra-container'>
          <Rating icon='heart' defaultRating={product.rating} maxRating={3} disabled/>
        </div>
      </Card.Content>
    </Card>
  )
}

const ProductList = props => {
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

export default ProductList