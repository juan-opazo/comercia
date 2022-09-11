import React from 'react';
import { Icon } from 'semantic-ui-react';

const NumberOfComments = (props) => {
    return (
        <div className='flex-container horizontal center padding-0'>
            <Icon color='black' name='comment' /> 
            <h3 className='margin-top-0_5'>{props.value}</h3>
        </div>
    )
    
}

export default NumberOfComments;