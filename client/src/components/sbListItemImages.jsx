import React from 'react';
import reader from './../../../libs/reader'
import SbListItemImage from './sbListItemImage.jsx';

const SbListItemImages = (props) => {

  return (
		<div className="media-body-inline-grid" data-grid="images">
			{reader.getImages(props.text).map((image) => 
				<SbListItemImage image={image} key={image.src}/>
			)}		
		</div>
  )
}

export default SbListItemImages;
