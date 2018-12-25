import React from 'react';
import { ListGroup } from 'reactstrap';
import SbListItem from './sbListItem.jsx'

const SbList = (props) => {
  return (
    <ListGroup>
      {
        props.items.map((item) => 
          <SbListItem item={item} key={item.title}/>
        )
      }
    </ListGroup>
  )
}

export default SbList;