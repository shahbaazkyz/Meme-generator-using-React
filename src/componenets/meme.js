import React from 'react';

const Meme = (props) => {
    const { img, onClick } = props;

    return (
      <img
        width={"300px"}
        src={img.url}
        alt={img.name}
        key={img.id}
        onClick={onClick}
        className ="w-30 shadow-1-strong rounded mb-4"
      />
    );
}
 
export default Meme;