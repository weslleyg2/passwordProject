import { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, Image, TouchableOpacity, Modal } from 'react-native';
import Slider from "@react-native-community/slider";
import { ModalPassword } from '../../../src/components/modal/index';
import { ModalText } from '../../../src/components/modal/modalText';
const charset = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%!&%#`;

export function Home() {
  const [size, setSize] = useState(10);
  const [passwordValue, setPasswordValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTextVisible, setModalTextVisible] = useState(false);

  function generatePassword() {
    let password = "";

    for (let i = 0, n = charset.length; i < size; i++) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setPasswordValue(password);
    setModalVisible(true);
  }

  function entrePassword() {
    setModalTextVisible(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>{size} characters </Text>
      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={6}
          maximumValue={20}
          maximumTrackTintColor="#ff0000"
          minimumTrackTintColor="#000"
          thumbTintColor="#392de9"
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Generate Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={entrePassword}>
        <Text style={styles.buttonText}>Text Password</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalPassword password={passwordValue} handleClose={() => setModalVisible(false)} />
      </Modal>

      <Modal visible={modalTextVisible} animationType="fade" transparent={true}>
        <ModalText handleClose={() => setModalTextVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    marginBottom: 60
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  area: {
    marginTop: 14,
    marginBottom: 14,
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 6,
  },
  button: {
    backgroundColor: "#392de9",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 18
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
  }
});
