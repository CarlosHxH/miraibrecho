import React from "react";
import { Stack, Alert, IconButton, HStack, VStack, CloseIcon, Text, Center, NativeBaseProvider } from "native-base";

export default function MyComponentAlert({title="titulo",status="success"}) {
    return <NativeBaseProvider>
      <Center>
        <Stack space={3} w="100%" maxW="400">
            <Alert w="100%" status={status}>
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">{title}</Text>
                  </HStack>
                  <IconButton variant="unstyled" _focus={{borderWidth: 0}} icon={<CloseIcon size="3" />} _icon={{color: "coolGray.600"}} />
                </HStack>
              </VStack>
            </Alert>;
        </Stack>;
      </Center>
    </NativeBaseProvider>
  }

/*
<Examples/>

function Examples() {
  const { isOpen, onOpen, onClose } = useDisclose();
  return <Center>
      <Button onPress={onOpen}>Actionsheet</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text fontSize="16" color="gray.500" _dark={{color: "gray.300"}}>
              Albums
            </Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>;
}
*/


/*
<Examples/>
function Examples() {
  const { isOpen, onOpen, onClose } = useDisclose();
  return <Center>
      <Button onPress={onOpen}>Actionsheet</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text fontSize="16" color="gray.500" _dark={{color: "gray.300"}}>
              Albums
            </Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>;
}
*/