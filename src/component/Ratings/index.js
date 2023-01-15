import React from "react";

const Ratings = ({ star })=>(
    <>
        {[...Array(5).keys()].map((value,index)=>(
            React.createElement('span',{key:index,className:`material-symbols-outlined ${star>=value?'fill':'outline'}`},'star')
        ))}
    </>
)
export default Ratings;