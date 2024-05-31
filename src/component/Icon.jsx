import React from "react";

export default ({src, toggleIcon}) => {
    return (
        <button type="submit" className="btn rounded-circle b-0 home-icon" onClick={toggleIcon}><img style={{height:24, width:24}} src={src}/></button>
    );
}