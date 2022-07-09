import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'

const LoginForm = () => {
    const [open, setOpen] = React.useState(false);
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
        <Button color='google plus' fluid size='large'>
            <Icon name='google' /> Continuar con Google
        </Button>
        </Segment>
    </Form>
    <Message>
        Aun no tienes cuenta? <a href='#'>Crealo aqui</a>
    </Message>
    </>
    )
}

export default LoginForm