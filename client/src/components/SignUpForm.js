import React from 'react'
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'
import * as actions from '../actions';

const SignUpForm = (props) => {
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
            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Repetir Contrasena'
                type='password'
            />

        <Button color='blue' fluid size='large' onClick={() => props.createUser({email:'test', password:'test'})}>
            Registrarse
        </Button>
        <br/>
        <Button color='google plus' fluid size='large' href="/auth/google">
            <Icon name='google' /> Continuar con Google
        </Button>
        </Segment>
    </Form>
    <Message>
        Ya tienes cuenta? <a href='#'>Ingresa aqui</a>
    </Message>
    </>
    )
}

export default connect(null, actions)(SignUpForm)