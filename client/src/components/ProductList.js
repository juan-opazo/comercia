import React from 'react'
import { Header, Table, Rating } from 'semantic-ui-react'

const ProductList = () => (
  <Table celled padded>
    {/* <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine>Evidence Rating</Table.HeaderCell>
        <Table.HeaderCell>Effect</Table.HeaderCell>
        <Table.HeaderCell>Efficacy</Table.HeaderCell>
        <Table.HeaderCell>Consensus</Table.HeaderCell>
        <Table.HeaderCell>Comments</Table.HeaderCell>
      </Table.Row>
    </Table.Header> */}

    <Table.Body>
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
    </Table.Body>
  </Table>
)

export default ProductList