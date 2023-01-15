import React from "react";
import { CartProvider, useCart } from "react-use-cart";
import {
  Slide,
  Button,
  Box,
  Input,
  Heading,
  VStack,
  HStack,
  Text,
  CheckIcon,
  Center,
  NativeBaseProvider,
  Divider,
  Checkbox,
  Radio,
} from "native-base";

export default function CartView() {

  const [isOpen, setIsOpen] = React.useState(false);
  const [groupValues, setGroupValues] = React.useState([]);
  const [value, setValue] = React.useState("one");

  const { items, removeItem, updateItemQuantity, getItem, cartTotal }=useCart();
/*
const Alert = () => (
  <Slide in={false} placement="top">
    <Box w="100%" position="absolute" p="2" borderRadius="xs" bg="emerald.100" alignItems="center" justifyContent="center" safeArea>
      <HStack space={2}>
        <CheckIcon size="4" color="emerald.600" mt="1" />
        <Text color="emerald.600" textAlign="center" fontWeight="medium">
          Pedido feito com sucesso.
        </Text>
      </HStack>
    </Box>
  </Slide>
);
*/

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <CartProvider>
          <Center>
            <Box my={50} p={5} bg={"white"} justifyContent="center">
              <VStack space={3}>
                <HStack alignItems="flex-end">
                  <Heading>Pedido</Heading>
                </HStack>

                {items.map((item, index) => (
                  <Box key={index} shadow={1} p={2}>
                    <HStack mb={2} alignItems="center" justifyContent="space-between">
                      <HStack alignItems="center" justifyContent="start">
                        <img style={{ height: 48, width: 48 }} src={item.thumbnail} alt=""/>
                        <Text isTruncated mx={2} fontWeight="medium">{item.title}</Text>
                      </HStack>

                      <HStack alignItems="end" justifyContent="end">
                        <VStack alignItems="end" justifyContent="end">
                          <Text color="blueGray.400">{getItem(item.id).quantity} x R${item.price}</Text>
                          <Button.Group isAttached colorScheme="blue" size="xs">
                            <Button onPress={() => {updateItemQuantity(item.id,getItem(item.id).quantity - 1)}}>-</Button>
                            <Button variant="outline">{getItem(item.id).quantity}</Button>
                            <Button onPress={() => {updateItemQuantity(item.id,getItem(item.id).quantity + 1)}}>+</Button>
                            <Button colorScheme="secondary" onPress={() => removeItem(item.id)}>&times;</Button>
                          </Button.Group>
                        </VStack>
                      </HStack>
                    </HStack>
                  </Box>
                ))}

                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Sub Total</Text>
                  <Text color="blueGray.400">${cartTotal.toFixed(2)}</Text>
                </HStack>
{/*
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Taxa</Text>
                  <Text color="blueGray.400">$38.84</Text>
                </HStack>

                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Valor total</Text>
                  <Text color="emerald.600">R$ {(cartTotal + 38.84).toFixed(2)}</Text>
                </HStack>

                <Divider />

                <HStack>
                  <VStack mr={5}>
                    <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={(nextValue) =>setValue(nextValue)}>
                      <Text fontWeight="medium">Tipo de retirada: </Text>
                      <Radio value="two" my={1}>Retirar no local</Radio>
                      <Radio value="one" my={1}>Entrega</Radio>
                    </Radio.Group>
                  </VStack>

                  <VStack>
                    <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
                      <Text fontWeight="medium">Pagamento</Text>
                      <Checkbox value="two">Cartão</Checkbox>
                      <Checkbox value="one" my={2}>Dinheiro</Checkbox>
                    </Checkbox.Group>
                    { groupValues.includes("one") && (<Text> <Input type="number" placeholder="Troco para:" w={"120px"}/></Text>)}
                  </VStack>
                </HStack>

                <VStack space={2} mt="2">
                  <Text bold>Código promocional</Text>
                  <HStack space={3}>
                    <Input flex="1" />
                    <Button variant="outline">Aplicar</Button>
                  </HStack>
                </VStack>
*/}
                <Button my="2" onPress={() => setIsOpen(!isOpen)}>Fazer encomenda</Button>
              </VStack>

              <Slide in={isOpen} placement="top">
                <Box w="100%" position="absolute" p="2" borderRadius="xs" bg="emerald.100" alignItems="center" justifyContent="center" safeArea>
                  <HStack space={2}>
                    <CheckIcon size="4" color="emerald.600" mt="1"/>
                    <Text color="emerald.600" textAlign="center" fontWeight="medium">Pedido feito com sucesso.</Text>
                  </HStack>
                </Box>
              </Slide>
            </Box>

          </Center>
        </CartProvider>

      </Center>
    </NativeBaseProvider>
  );
}
