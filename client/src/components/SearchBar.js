import React from 'react';
import { Search } from 'semantic-ui-react'

const SearchBar = (props) => {
    const [term, setTerm] = React.useState('');

    const onFormSubmit = (event) => {
        event.preventDefault();
        setTerm(event.target.value);
        props.onSearchSubmit(event.target.value);
    }

    return (
        <div className='flex-container small-padding'>
            <Search
                loading={false}
                placeholder='Buscar producto...'
                onSearchChange={e => onFormSubmit(e)}
                value={term}
                showNoResults={false}
            />
        </div>
    );
}

export default SearchBar;