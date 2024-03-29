/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Breadcrumb,
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Modal,
} from 'semantic-ui-react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Imagine-a-Company'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  componentDidMount() {
    const utils = this.props.children[this.props.children.length - 1];
    this.setState({ 
      activeItem: utils.tabActive,
      openLogin: false,
      openSignUp: false,
      dimmer: undefined
    })
  }

  renderUserSection(fixed, auth) {
    if (auth === null) {
      return 
    }
    if (auth) {
      return (
        <div>
          <Image src={auth.photos[0].value} alt={auth.name.givenName} avatar/>
          <a href="/api/logout"><Icon name='log out' size='small' className='padding-1'/></a>
        </div>
      )
    }
    return (
      <>
      <Button as='a' inverted={!fixed} href="/auth/google">
        Ingresar
      </Button>
        {/* <Modal
          onClose={() => this.setState({ openLogin: false, dimmer: undefined })}
          onOpen={() => this.setState({ openLogin: true, dimmer: 'blurring' })}
          open={this.state.openLogin}
          trigger={
            <Button as='a' inverted={!fixed} >
              Ingresar
            </Button>
          }
          dimmer={this.state.dimmer}
        >
          <Modal.Content image>
            <div className='flex-container horizontal around max-width'>
              <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
              <Modal.Description>
                  <LoginForm />
              </Modal.Description>
            </div>
            
          </Modal.Content>
        </Modal> */}
        <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} href="/auth/google">
          Registrarse
        </Button>
        {/* <Modal
          onClose={() => this.setState({ openSignUp: false, dimmer: undefined })}
          onOpen={() => this.setState({ openSignUp: true, dimmer: 'blurring' })}
          open={this.state.openSignUp}
          trigger={
            <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
              Registrarse
            </Button>
          }
          dimmer={this.state.dimmer}
        >
          <Modal.Content image>
            <div className='flex-container horizontal around max-width'>
              <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
              <Modal.Description>
                  <SignUpForm />
              </Modal.Description>
            </div>
            
          </Modal.Content>
        </Modal> */}
      </>
    )
  }

  render() {
    const children = [...this.props.children.slice(0, this.props.children.length - 1)];
    const { fixed } = this.state
    const utils = this.props.children[this.props.children.length - 1];
    const updateSections = utils.updateSections;
    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 50, padding: '1em 0em', margin: '0 0 1em 0' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Link to={'/'}>
                  <Menu.Item 
                    name='Inicio' 
                    active={utils.tabActive === 'Inicio'} 
                    onClick={e => {utils.onNavBarItem(e); this.setState({ activeItem: 'Inicio' }); updateSections(e)}}>
                    Inicio
                  </Menu.Item>
                </Link>
                <Link to={'/mis-productos'}>
                  <Menu.Item 
                    name='Mis Productos' 
                    active={utils.tabActive === 'Mis Productos'} 
                    onClick={e => {utils.onNavBarItem(e); this.setState({ activeItem: 'Mis Productos' }); updateSections(e)}}>
                    Mis Productos
                  </Menu.Item>
                </Link>
                {/* <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item> */}
                {/* <Link to={'/tendencias'}>
                  <Menu.Item 
                    name='Tendencias' 
                    active={utils.tabActive === 'Tendencias'} 
                    onClick={e => {utils.onNavBarItem(e); this.setState({ activeItem: 'Tendencias' })}}>
                    Tendencias
                  </Menu.Item>
                </Link> */}
                <Menu.Item position='right'>
                  {/* <Button as='a' inverted={!fixed}>
                    Ingresar
                  </Button> */}
                  {this.renderUserSection(fixed, utils.auth)}
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  componentDidMount() {
    const utils = this.props.children[this.props.children.length - 1];
    this.setState({ 
      activeItem: utils.tabActive,
      open: false,
      dimmer: undefined
    })
  }

  renderUserSection(auth) {
    if (auth === null) {
      return 
    }
    if (auth) {
      return (
        <div>
          <Image src={auth.photos[0].value} alt={auth.name.givenName} avatar/>
          <a href="/api/logout"><Icon name='log out' size='small' className='padding-1'/></a>
        </div>
      )
    }
    return (
      <>
        <Button as='a' inverted href="/auth/google">
          Ingresar
        </Button>
        {/* <Modal
          onClose={() => this.setState({ openLogin: false, dimmer: undefined })}
          onOpen={() => this.setState({ openLogin: true, dimmer: 'blurring' })}
          open={this.state.openLogin}
          trigger={
            <Button as='a' inverted >
              Ingresar
            </Button>
          }
          dimmer={this.state.dimmer}
        >
          <Modal.Content image>
            <div className='flex-container horizontal max-width'>
              <Modal.Description>
                  <LoginForm />
              </Modal.Description>
            </div>
            
          </Modal.Content>
        </Modal> */}
        
        <Button as='a' inverted style={{ marginLeft: '0.5em' }} href="/auth/google">
          Registrarse
        </Button>

        {/* <Modal
          onClose={() => this.setState({ openSignUp: false, dimmer: undefined })}
          onOpen={() => this.setState({ openSignUp: true, dimmer: 'blurring' })}
          open={this.state.openSignUp}
          trigger={
            <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
              Registrarse
            </Button>
          }
          dimmer={this.state.dimmer}
        >
          <Modal.Content image>
            <div className='flex-container horizontal max-width'>
              <Modal.Description>
                  <SignUpForm />
              </Modal.Description>
            </div>
            
          </Modal.Content>
        </Modal> */}
      </>
    )
  }

  render() {
    const children = [...this.props.children.slice(0, this.props.children.length - 1)];
    const { sidebarOpened } = this.state;
    const utils = this.props.children[this.props.children.length - 1];
    const sections = utils.sections;
    const updateSections = utils.updateSections;
    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Link to={'/'}>
              <Menu.Item 
                name='Inicio' 
                active={utils.tabActive === 'Inicio'} 
                onClick={e => {utils.onNavBarItem(e); this.setState({ activeItem: 'Inicio' }); updateSections(e)}}>
                Inicio
              </Menu.Item>
            </Link>
            <Link to={'/mis-productos'}>
              <Menu.Item 
                name='Mis Productos' 
                active={utils.tabActive === 'Mis Productos'} 
                onClick={e => {utils.onNavBarItem(e); this.setState({ activeItem: 'Mis Productos' }); updateSections(e)}}>
                Mis Productos
              </Menu.Item>
            </Link>
            {/* <Link to={'/tendencias'}>
              <Menu.Item 
                name='Tendencias' 
                active={utils.tabActive === 'Tendencias'} 
                onClick={e => {utils.onNavBarItem(e); this.setState({ activeItem: 'Tendencias' })}}>
                Tendencias
              </Menu.Item>
            </Link> */}
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 30, padding: '1em 0em', margin: '0 0 1em 0' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle} style={{ alignSelf: 'center' }}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    {this.renderUserSection(utils.auth)}
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>

            <Breadcrumb icon='right angle' sections={sections} onClick={e => updateSections(e)}/>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

export default ResponsiveContainer