import React from 'react';
import SortComments from './SortComments';
import SortLikes from './SortLikes';

const SortBox = (props) => {
    return (
        <div className='flex-container horizontal around'>
            <SortLikes value={props.sorters.numOfLikes} updateSortingByLikes={props.updateSortingByLikes}/>
            <SortComments value={props.sorters.numOfComments} updateSortingByComments={props.updateSortingByComments}/>
        </div>
    )
}

export default SortBox;