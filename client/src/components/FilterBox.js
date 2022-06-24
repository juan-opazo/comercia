import React from 'react'
import { Accordion, Container, Icon, Rating } from 'semantic-ui-react'

class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeIndex: 0,
            rating: 0
        }
    }
  
    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    handleRate = (e, { rating }) => {
        this.setState(
            { rating },
            this.props.onFilterByRating(rating)
        )
    }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Filtros
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
            <Container textAlign='center'>
                <Rating icon='heart' defaultRating={this.state.rating} maxRating={3} onRate={this.handleRate} size="massive" clearable/>
            </Container>
            
        </Accordion.Content>
      </Accordion>
    )
  }
}

export default FilterBox;