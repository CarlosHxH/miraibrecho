import React from "react";
import "./style.css";
import FilterResults from 'react-filter-search';
import data from "../../data/products";
import { Link } from "react-router-dom";
import { useAuth } from "../../config/AuthProvider";

function Cards() {
  const {search} = useAuth();
  const Skeleton=()=>{
    return(
      React.createElement('div',{className:"card"},
      React.createElement('div',{className:"card-img skeleton"}),
      React.createElement('div',{className:"card-body"},
      React.createElement('h2',{className:"card-title skeleton"}),
      React.createElement('p',{className:"card-intro skeleton"})))
    )
  }

  (false) && <Skeleton/>;

  const Item=({data})=>{
    var img = new Image();
    img.src = data.thumbnail;
    !img.onload && <Skeleton/>;
    return(
      React.createElement(Link,{to:'/details/'+data.id,state:data},
      React.createElement('div',{className:"card"},
      React.createElement('div',{className:"card-img"},
      React.createElement('img',{src:data.thumbnail,alt:''})),
      React.createElement('div',{className:'card-body'},
      React.createElement('h2',{className:'card-title hideText'},data.title),
      React.createElement('p',{className:'card-intro'},'R$'+data.price.toFixed(2)))))
    )
  }

  return (
    React.createElement('div',{className:'card-container mt'},
      React.createElement(FilterResults,{
        value:search,data:data.products,
        renderResults:results =>results.map((item,index) =><Item key={index} data={item}/>)
      })
    )
  )
}
export default Cards;