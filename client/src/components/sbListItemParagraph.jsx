import React from 'react';
import reader from './../../../libs/reader'

const SbListItemParagraph = (props) => {

  return (
    <p>{reader.getBuckets(props.text)[0]}...</p>
  )

}

export default SbListItemParagraph;
