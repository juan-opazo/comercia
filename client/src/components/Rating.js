import React from 'react';
import { Icon } from 'semantic-ui-react';

const Rating = (props) => {
    return (
        <div className='flex-container horizontal center padding-0'>
            <Icon color='red' name='heart' /> <h3 className='margin-top-0_5'>{props.value}</h3>
        </div>
    )
    
}

export default Rating;