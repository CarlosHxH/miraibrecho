import React from "react";
import { CartProvider, useCart } from "react-use-cart";
import {Button,Box,Heading,VStack,HStack,Text,Center,NativeBaseProvider, Radio, Input} from "native-base";
import SimpleMap from "../SimpleMap";
import ReactWhatsapp from "react-whatsapp";

const styles ={
  hideText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 200,
    fontSize: '1em',
  }
}


export default function CartScreen() {
  const [display,setDisplay]=React.useState(0);
  const { items, removeItem, updateItemQuantity, getItem, cartTotal } = useCart();
  const [delivery,setDelivery]=React.useState(0);
  const [payment,setPayment] = React.useState(0);
  const next = ()=>display<3&&setDisplay(display+1);
  const prev = ()=>display>0&&setDisplay(display-1);

  const Cart = ()=>{
    return(
      <Box p={2}>
        {items.map((item, index) => (
          <Box key={index} shadow={1} p={2}>
            <HStack mb={2} alignItems="center" justifyContent="space-between">
              <HStack w={'60%'} alignItems="center" justifyContent="start">
                <img style={{ height: 48, width: 48 }} src={item.thumbnail} alt=""/>
                <Text className={styles.hideText} _text={{fontSize: 8}} isTruncated={true} mx={2} fontWeight="medium">{item.title}</Text>
              </HStack>
              <HStack w={'40%'} alignItems="end" justifyContent="end">
              <VStack alignItems="end" justifyContent="end">
                <Text color="blueGray.400">{getItem(item.id).quantity} x R${item.price}</Text>
                  <Button.Group isAttached colorScheme="blue" size="xs">
                    <Button onPress={() =>updateItemQuantity(item.id,getItem(item.id).quantity - 1)}>-</Button>
                    <Button variant="outline">{getItem(item.id).quantity}</Button>
                    <Button onPress={() =>updateItemQuantity(item.id,getItem(item.id).quantity + 1)}>+</Button>
                    <Button colorScheme="secondary" onPress={() => removeItem(item.id)}>&times;</Button>
                  </Button.Group>
                </VStack>
              </HStack>
            </HStack>
          </Box>
        ))}
      </Box>
    )
  }

  const Delivery = ()=>{
    return(
      React.createElement(Box,{shadow:1,p:2},
      React.createElement(VStack,{mb:2,alignItems:"center"},
      React.createElement(Text,{fontWeight:"medium",_text:{fontSize:18}},"Tipo de entrega:"),
      React.createElement(Radio.Group,{value:delivery,onChange:setDelivery,accessibility:"true"},
      React.createElement(Radio,{value:0,my:1},'Retirar na loja'),
      React.createElement(Radio,{value:1,my:1},'Delivery')),
      delivery===1&&React.createElement(SimpleMap,{radius:1500})))
    )
  }

  const Payment = ()=>{
    return(
      React.createElement(Box,{shadow:1,p:2},
      React.createElement(VStack,null,
      React.createElement(Text,{},"Metodo de pagamento"),
      React.createElement(Radio.Group,{value:payment,onChange:setPayment,accessibility:"true"},
      React.createElement(Radio,{value:0,my:1},'Cartão'),
      React.createElement(Radio,{value:1,my:1},'Dinheiro'),
      React.createElement(Radio,{value:2,my:1},'Pix'))),
        (payment===1)&&<Input type="number" w={["75%","40%","30%"]} placeholder="Com quanto você vai pagar?"/>
    ))
  }

  return (
    <CartProvider>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <Box w={'100%'} my={50} p={5} bg={"white"} justifyContent="center">
            <VStack space={3}>
              <HStack alignItems="flex-end">
                {display>0&&<Button variant="outline" onPress={prev}>Voltar</Button>}
                <Heading ml={10}>Pedido</Heading>
              </HStack>
              {display===0&&<Cart/>}
              {display===1&&<Delivery/>}
              {display===2&&<Payment/>}
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Sub Total</Text>
                <Text color="blueGray.400">R${cartTotal.toFixed(2)}</Text>
              </HStack>
                {display<3&&<Button my="2" onPress={next}>Continuar</Button>}
                {display>2&&<ReactWhatsapp number="5565992969922" message="Hello World!!!" element={()=><Button my="2">Fazer pedido</Button>}/>}
            </VStack>
          </Box>
        </Center>
      </NativeBaseProvider>
    </CartProvider>
  );
}
