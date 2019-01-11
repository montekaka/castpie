import React from 'react';
import SbListItemImage from './sbListItemImage.jsx';

const SbListItemImages = (props) => {

  return (
		<div className="media-body-inline-grid" data-grid="images">
			{props.images.map((image) => 
				<SbListItemImage image={image} key={image.src}/>
			)}		
		</div>
  )
}

export default SbListItemImages;
