import { Button, Center, Input, Select, TextArea, VStack } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddExpense() {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  return (
    <SafeAreaView className="bg-primary">
      <Text className="font-bold text-center text-xl text-white">
        Añadir Gasto
      </Text>
      <View className="bg-mutedwhite shadow-xl space-y-5 rounded-3xl p-5 m-5">
        <Text className="font-semibold text-left text-xl ">Detalles</Text>
        {/* //TODO: Change the value and selected value of each select component */}
        <VStack space={4}>
          <Select
            id="categorias"
            selectedValue={category}
            size="md"
            color="gray.400"
            minWidth="105"
            placeholder="Categoría"
            borderRadius={7}
            dropdownIcon={
              <FontAwesome5
                name="chevron-down"
                color="#6D6868"
                marginRight={10}
                size={10}
              />
            }
            _selectedItem={{
              bg: "teal.500",
            }}
            mt={1}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Select.Item label="Transporte" value="transporte" />
            <Select.Item label="Alimentación" value="alimentacion" />
            <Select.Item label="Ropa" value="ropa" />
            <Select.Item label="Casuales" value="casuales" />
            <Select.Item label="Salud" value="salud" />
          </Select>
          <TextArea
            autoCompleteType
            placeholder="Descripción del Gasto"
            minH={20}
          />
          <Select
            id="tipo"
            borderRadius={7}
            selectedValue={type}
            size="md"
            color="gray.400"
            placeholder="Tipo"
            minWidth="105"
            dropdownIcon={
              <FontAwesome5
                name="chevron-down"
                color="#6D6868"
                marginRight={10}
                size={10}
              />
            }
            _selectedItem={{
              bg: "teal.500",
            }}
            mt={1}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Select.Item label="Fijo" value="transporte" />
            <Select.Item label="Variable" value="variable" />
          </Select>
          <Input size="md" placeholder="Monto" type="text" borderRadius={7} />
        </VStack>
        <Center>
          <Button
            colorScheme="teal"
            width="100"
            className="rounded-full"
            marginTop={16}
          >
            Guardar
          </Button>
        </Center>
      </View>
    </SafeAreaView>
  );
}