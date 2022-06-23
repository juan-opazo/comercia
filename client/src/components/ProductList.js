import React from 'react'
import { Header, Table, Rating, Card, Icon, Image, Container } from 'semantic-ui-react'

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
  console.log(props.products);
  return (
  <Container textAlign='center'>
    <div  className='flex-container'>
      {showProducts(props.products)}
      {/* <Card>
        <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
        <Card.Content>
          <Card.Header>S/ 12.4</Card.Header>
          <Card.Meta>Huevos Metro la Marina - Marca A</Card.Meta>
          <Card.Description>
          Hay promocion de docena de huevos en el metro de ...
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='card-extra-container'>
            <Rating icon='star' defaultRating={3} maxRating={3} />
            <a href='https://www.google.com/maps'>
              <Icon name='map' />
            </a>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
        <Card.Content>
          <Card.Header>S/ 20.5</Card.Header>
          <Card.Meta>Huevos Plaza Vea - Marca B</Card.Meta>
          <Card.Description>
          HLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum...
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='card-extra-container'>
            <Rating icon='star' defaultRating={2} maxRating={3} />
            <a href='https://www.google.com/maps'>
              <Icon name='map' />
            </a>
          </div>
        </Card.Content>
      </Card> */}

    {/* <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>
            Huevos Metro la Marina
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>Marca A</Table.Cell>
        <Table.Cell>
          <Rating icon='star' defaultRating={3} maxRating={3} />
        </Table.Cell>
        <Table.Cell textAlign='right'>
          S/12.40 <br />
          <a href='https://www.google.com/maps'>ubicacion</a>
        </Table.Cell>
        <Table.Cell>
          Hay promocion de docena de huevos en el metro de ...
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>
            Huevos Plaza Vea
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>Marca A</Table.Cell>
        <Table.Cell>
          <Rating icon='star' defaultRating={2} maxRating={3} />
        </Table.Cell>
        <Table.Cell textAlign='right'>
          S/18.40 <br />
          <a href='https://www.google.com/maps'>ubicacion</a>
        </Table.Cell>
        <Table.Cell>
          gaaaa ...
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>
            Huevos - La Calera
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>La Calera</Table.Cell>
        <Table.Cell>
          <Rating icon='star' defaultRating={1} maxRating={3} />
        </Table.Cell>
        <Table.Cell textAlign='right'>
          S/22.0 <br />
          <a href='https://www.google.com/maps'>ubicacion</a>
        </Table.Cell>
        <Table.Cell>
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum...
        </Table.Cell>
      </Table.Row>
    </Table.Body> */}
    </div>
  </Container>
  );
}

export default ProductList