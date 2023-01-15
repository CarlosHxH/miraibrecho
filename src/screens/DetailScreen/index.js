import React from "react";
import { useCart } from "react-use-cart";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import data from "../../data/products";
import Ratings from "../../component/Ratings";
import "./styles.css";
import { google } from "../../config/firebase";

function Detail({data}) {
  const {removeItem,updateItemQuantity,addItem,getItem,inCart} = useCart();
  let navigate = useNavigate();
  return(
    <div className="product">
        <div className="product-img">
            <img src={data.thumbnail} alt=""/>
            <span className="tag">new</span>
        </div>
        <div className="product-listing">
            <div className="content">
                <h1 className="name">{data.title}</h1>
                <p className="info">{data.description}</p>
                <p className="price">R$ {data.price.toFixed(2)}</p>
                <div className="btn-and-rating-box">
                    <div className="rating"><Ratings star={data.rating}/></div>
                    {inCart(data.id)?
                      <div>
                        <button className="btn" onClick={() =>{
                          getItem(data.id).quantity > 0 && updateItemQuantity(data.id, getItem(data.id).quantity - 1)
                        }}>-</button>
                        <span className="btn">{getItem(data.id).quantity}</span>
                        <button className="btn" onClick={() =>{
                          getItem(data.id).quantity > 0 && updateItemQuantity(data.id, getItem(data.id).quantity + 1)
                        }}>+</button>
                        <button className="btn-danger" onClick={() =>removeItem(data.id)}>&times;</button>
                      </div>:
                      <button className="btn" onClick={()=>{
                        google.check(res=>res===null?navigate('/login'):addItem(data));
                      }}>Adicionar</button>
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default function DetailScreen() {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?location.state:data.products.find(item=>item.id === Number(id));

  return (
    React.createElement('div',{className:"details-body"},
    React.createElement(Detail,{data:product}))
  );
}
