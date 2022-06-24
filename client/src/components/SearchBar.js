import React from 'react';
import { Search } from 'semantic-ui-react'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSearchSubmit(this.state.term);
    }

    render() {
        return (
            <div className='flex-container small-padding'>
                <form onSubmit={this.onFormSubmit}>
                    <Search
                        loading={this.props.loading}
                        placeholder='Buscar producto...'
                        onSearchChange={e => this.setState({ term: e.target.value })}
                        value={this.state.term}
                        showNoResults={false}
                    />
                </form>
                
            </div>
        );
    }
    
}

export default SearchBar;