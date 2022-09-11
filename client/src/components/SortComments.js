import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
const icons = ['minus', 'arrow up', 'arrow down'];
const colors = ['grey', 'green', 'red'];
const SortComments = (props) => {
    const handleClick = () => {
        props.updateSortingByComments(props.value===2? 0 : props.value + 1)
    }
    return (
        <Label color={colors[props.value]} className='clickable' onClick={handleClick}>
            <Icon name='comment' /><Icon name={icons[props.value]} />
        </Label>
    )
}

export default SortComments;