import React from 'react'
import { Rating, Card, Icon, Image, Container } from 'semantic-ui-react'

const showProducts = products => {
  return products.map(product => 
    <Card key={product.id}>
      <Image src={product.image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>S/ {product.price}</Card.Header>
        <Card.Meta>{product.name} - {product.brand}</Card.Meta>
        <Card.Description> {product.description} </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='card-extra-container'>
          <Rating icon='star' defaultRating={product.rating} maxRating={3} />
          <a href={product.location}>
            <Icon name='map' />
          </a>
        </div>
      </Card.Content>
    </Card>
  )
}

const ProductList = props => {
  return (
  <Container textAlign='center'>
    <div className='flex-container'>
      {showProducts(props.products)}
    </div>
  </Container>
  );
}

export default ProductList