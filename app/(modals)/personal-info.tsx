import DefaultAvatar from "@/assets/svgs/avatar.svg";
import { useNotificationContext } from "@/context";
import useAuth from "@/context/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { supabase } from "@/utils/supabase";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import {
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
interface FormData {
  nombres: string;
  apellidos: string;
  email?: string;
  perfil: string;
}

export default function PersonalInfo() {
  const { userData, session } = useAuth();
  const { showNotification } = useNotificationContext();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombres: userData?.nombres,
      apellidos: userData?.apellidos,
      email: session?.user?.email,
      perfil: "https://img.icons8.com/?size=40&id=23454&format=png",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      const { error } = await supabase
        .from("usuarios")
        .update({
          nombres: data.nombres,
          apellidos: data.apellidos,
        })
        .eq("id", userData.id);

      if (error) {
        showNotification({
          title: "Error al actualizar los datos",
          alertStatus: "error",
        });
        return;
      }

      showNotification({
        title: "Datos actualizados",
        alertStatus: "success",
      });
    } catch (e) {
      // Este bloque captura errores que no sean específicamente de Supabase
      console.error("Error inesperado:", e);
      showNotification({
        title: "Error inesperado",
        alertStatus: "error",
      });
    }
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      setValue("perfil", result.assets[0].uri);
    }
  };

  React.useEffect(() => {
    (async () => {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        alert("Aceptar los permisos para acceder a la galería");
      }
    })();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <VStack margin={5} space={3}>
          <VStack alignItems="center" space={3} className="bg-background">
            <HStack space={2} alignItems="center">
              {userData ? (
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=40&id=23454&format=png",
                  }}
                  alt="profile-pic"
                  style={{ width: 120, height: 120 }}
                  className="rounded-full "
                />
              ) : (
                <DefaultAvatar width={80} height={80} />
              )}
            </HStack>

            <Button
              onPress={pickImageAsync}
              rounded={7}
              variant="outline"
              colorScheme="teal"
              px={6}
              height={10}
            >
              <FontAwesome5 name="camera" size={20} color="black" />
            </Button>
          </VStack>
          <HStack>
            <View className="bg-accent w-1 h-8 rounded-full my-3 " />
            <Text className="text-[#464444] p-3 font-bold text-lg">
              Informacion Básica
            </Text>
          </HStack>
          <VStack space={5}>
            <FormControl isInvalid={!!errors.nombres}>
              <FormControl.Label>Nombres</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    size="lg"
                    rounded={7}
                    onBlur={onBlur}
                    py={3}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="nombres"
                rules={{ required: true }}
                defaultValue=""
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.nombres && "Este campo es requerido"}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.apellidos}>
              <FormControl.Label>Apellidos</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    size="lg"
                    rounded={7}
                    py={3}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    //TODO : El valor debe ser el apellido del usuario y no un placeholder
                    value={value}
                    placeholder="Apellido"
                  />
                )}
                name="apellidos"
                rules={{ required: true }}
                defaultValue=""
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.apellidos && "Este campo es requerido"}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormControl.Label>Correo electrónico</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    size="lg"
                    rounded={7}
                    py={3}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Correo electrónico"
                  />
                )}
                name="email"
                rules={{ required: true }}
                defaultValue=""
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.email && "Este campo es requerido"}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              onPress={handleSubmit(onSubmit)}
              colorScheme="primary"
              borderRadius={10}
              mt={4}
              height={12}
            >
              <Text className="font-semibold text-white ">
                Actualizar Datos
              </Text>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
