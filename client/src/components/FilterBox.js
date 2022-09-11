import React from 'react'
import { Accordion, Container, Icon, Rating, Label } from 'semantic-ui-react'

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
        <div className='flex-container small-padding'>
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
                        
                    </Container>
                    
                </Accordion.Content>
        </Accordion>
        </div>
      
    )
  }
}

export default FilterBox;