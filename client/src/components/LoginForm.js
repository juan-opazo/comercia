import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'
import GoogleAuth from './GoogleAuth';

const LoginForm = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    if (isAuthenticated) return <></>
    return (
        <>
        <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png'/> 
        </Header>
        <Form size='large'>
            <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Correo Electronico' />
            <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Contrasena'
            type='password'
        />

        <Button color='blue' fluid size='large'>
            Iniciar
        </Button>
        <br/>
        
        <GoogleAuth setIsAuthenticated={setIsAuthenticated}/>
        </Segment>
    </Form>
    <Message>
        Aun no tienes cuenta? <a href='#'>Crealo aqui</a>
    </Message>
    </>
    )
}

export default LoginForm