import React from 'react';

const SbCard = (props) => {
  return (
    <div className="card card-profile mb-4">
      <div className="card-header" style={{backgroundImage: `url(${props.imageUrl})`}}></div>
      <div className="card-body text-center">
        <span>
          <img className="card-profile-img" src={props.imageUrl} />
        </span>
        <h6 className="card-title">
          <a className="text-inherit" href="#">{props.title}</a>
        </h6>
        <p className="mb-4">{props.description}</p>
      </div>
    </div>
  )
}

export default SbCard;
