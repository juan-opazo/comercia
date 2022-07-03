import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({ 
                clientId: '59821523779-94fbg14eebnh4pt04dgla5qp87s5oqm7.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: 'comercia-dev',
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignIn = () => this.auth.signIn();

    onSignOut = () => this.auth.signOut();

    renderAuthButton() {
        if (this.props.isSignedIn === null) console.log('waiting...')
        else if (this.props.isSignedIn) this.onSignOut()
        else this.onSignIn()
    }

    render() {
        if (this.props.isSignedIn) {
            return (
                <Button color='google plus' fluid size='large' onClick={this.onSignOut}>
                    <Icon name='google' /> Log Out 
                </Button>
                // <div>{this.renderAuthButton()}</div>
            )
        } else {
            return (
                <Button color='google plus' fluid size='large' onClick={this.onSignIn}>
                    <Icon name='google' /> Continuar con Google
                </Button>
            )
        }
        
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
    mapStateToProps, 
    { signIn, signOut }
)(GoogleAuth);