import { FontAwesome } from "@expo/vector-icons";
import { Button, HStack, VStack } from "native-base";
import * as React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function Export() {
  const [show, setShow] = React.useState(false);

  return (
    <View className="flex flex-col space-y-6 justify-between">
      <VStack space={1} className="bg-background rounded-b-lg py-4 px-7">
        <HStack>
          <View className="bg-accent w-2 h-8 rounded-full my-3 " />
          <Text className="text-[#464444] p-3 font-bold text-lg">
            Formatos de Exportación
          </Text>
        </HStack>

        <Text className=" text-[#464444]">
          Selecciona el tipo de documento en el que desea exportar su historial
          de gastos
        </Text>

        <VStack mt={10} space={4}>
          <Button colorScheme="blue" variant="subtle" borderWidth={0.2}>
            <HStack alignItems="center">
              <Image
                className="w-5 h-5 mr-2"
                source={{
                  uri: "https://img.icons8.com/?size=48&id=13674&format=png",
                }}
              />
              <Text className="font-semibold text-black">
                Documento de Word
              </Text>
            </HStack>
          </Button>

          <Button colorScheme="green" variant="subtle" borderWidth={0.2}>
            <HStack alignItems="center">
              <Image
                className="w-5 h-5 mr-2"
                source={{
                  uri: "https://img.icons8.com/?size=48&id=13654&format=png",
                }}
              />
              <Text className="font-semibold text-black">Hoja de Cálculo</Text>
            </HStack>
          </Button>

          <Button colorScheme="red" variant="subtle" borderWidth={0.2}>
            <HStack alignItems="center">
              <Image
                className="w-5 h-5 mr-2"
                source={{
                  uri: "https://img.icons8.com/?size=48&id=13417&format=png",
                }}
              />
              <Text className="font-semibold text-black">Archivo en PDF</Text>
            </HStack>
          </Button>
        </VStack>
        <Button
          className="rounded-lg  mt-14"
          height={10}
          endIcon={
            <FontAwesome
              name="download"
              color="white"
              marginRight={3}
              marginTop={2}
            />
          }
        >
          <Text className="font-semibold text-white ">
            Exportar en los 3 formatos
          </Text>
        </Button>
      </VStack>
    </View>
  );
}
