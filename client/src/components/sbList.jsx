import React from 'react';
import SbListItem from './sbListItem.jsx'

const SbList = (props) => {
  return (
    <ul className="list-group media-list media-list-stream mb-4">
      {
        props.items.map((item) => 
          <SbListItem item={item} key={item.title}/>
        )
      }
    </ul>
  )
}

export default SbList;