import * as React from "react";
import { google } from "./config/firebase";
import AuthProvider, { RequireAuth, useAuth } from "./config/AuthProvider";
import { CartProvider, useCart } from "react-use-cart";

import { Routes, Route, Link, Outlet, BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import {Divider,Menu,Pressable,NativeBaseProvider,Avatar,HamburgerIcon, HStack, VStack, Badge} from "native-base";
import "./App.css";

import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";
import SimpleMap from "./screens/SimpleMap";
import CartScreen from "./screens/CartScreen";
import DetailScreen from "./screens/DetailScreen";
import logout from "./assets/logout.png";

export default function App() {
  //console.log(process.env)
  return(
    React.createElement(BrowserRouter,{forceRefresh:true},
    React.createElement(AuthProvider,null,
    React.createElement(CartProvider,null,
    React.createElement(Routes,null,
    React.createElement(Route,{element:<Layout/>},
    React.createElement(Route,{path:"/",exact:true,element:<HomeScreen/>}),
    React.createElement(Route,{path:"/details/:id",exact:true,element:<DetailScreen/>}),
    React.createElement(Route,{path:"/login",exact:true,element:<AuthScreen/>}),
    React.createElement(Route,{path:"/checkout",exact:true,element:<CartScreen/>}),
    React.createElement(Route,{path:"/profile",exact:true,element:<RequireAuth children={<SimpleMap/>}/>}))))))
  )
}


function Layout() {
  const {onChange} = useAuth();
  const [input, setInput] = React.useState('');
  const {pathname} = useLocation();
  const search=(e)=>{setInput(e.target.value)};
  React.useEffect(()=>onChange(input));
  React.useEffect(()=>{(pathname !== "/")&&setInput('')},[pathname]);

  const Links = ({ name, to, icon })=>(
    React.createElement("li",null,
    React.createElement(Link,{to: to},
    React.createElement("span",{className: "nav__link"},
    React.createElement("i",{className: `bx bx-${icon} nav__icon`}),
    React.createElement("span",{className: "nav__name"}, name))))
  );

  return React.createElement(NativeBaseProvider,null,
    React.createElement("header",{className: "header"},
    React.createElement("nav",{className: "nav container" },
    React.createElement("p", {className: "nav__logo"}, "Loja"),
    pathname==="/"&&React.createElement('input',{className:'search',value:input,onChange:search}),
    React.createElement("div",{className: "nav__menu"},
    React.createElement("ul",{className: "nav__list"},
    React.createElement(Links, {name: "Home", to:"/", icon: "home" }),
    React.createElement(Links, {name: "Pedidos",to:"/profile",icon: "briefcase-alt"}),
    React.createElement(Links, {name: "Perfil",to:"/profile",icon: "user"}))),
    React.createElement(Logo,{cart:'checkout'}))),
    React.createElement("section",null,<Outlet />)
  );
}
function Logo(props) {
  const {totalItems}= useCart();
  const auth = useAuth();
  const navigate = useNavigate();
  return (!auth.user)?(<Avatar onClick={()=>navigate('/login')} size="sm" bg="indigo.500" source={{ uri: logout }}>Login</Avatar>):(
    React.createElement(HStack,{alignItems:"center"},
    React.createElement(VStack,{mr:5},
    React.createElement(Badge,{colorScheme:'danger',rounded:"full",mb:-4,mr:-4,zIndex:1,variant:"solid",alignSelf:"flex-end",_text:{fontSize: 8}},totalItems),
    React.createElement(Link,{to:props.cart,className:'bx bx-cart',style:{fontSize:28}})),
    React.createElement(Menu,{placement:"top",w:"190",trigger:(data) => (
    React.createElement(Pressable,{...data},
    React.createElement(HamburgerIcon,{m:2})))},
    React.createElement(Menu.Item,null,"Meu Perfil"),
    React.createElement(Menu.Item,null,"Configurações"),
    React.createElement(Divider,{mt:3,w:"100%"}),
    React.createElement(Menu.Item,{onPress:()=>auth.signout(google.logout)},"Sair")))
  )
}

