import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Modal } from 'react-native';
import TouchID from 'react-native-touch-id';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PIN_KEY = 'user_pin';

const Login = () => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isPinVisible, setIsPinVisible] = useState(false);
  const [isSettingPin, setIsSettingPin] = useState(false);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [pinExists, setPinExists] = useState(false);
  const navigation = useNavigation();

  const config = {
    title: 'Authentication Required',
    imageColor: '#e00606',
    imageErrorColor: '#ff0000',
    sensorDescription: 'Touch sensor',
    sensorErrorDescription: 'Failed to authenticate',
  };

  useEffect(() => {
    // Check if a PIN is already set
    const checkPin = async () => {
      const storedPin = await AsyncStorage.getItem(PIN_KEY);
      setPinExists(!!storedPin);
    };
    checkPin();
  }, []);

  const authenticate = async () => {
    try {
      await TouchID.isSupported(config);
      await TouchID.authenticate('Authenticate to proceed', config);
      navigation.navigate('Home');
    } catch (error) {
      setIsPinVisible(true); // Show PIN input if biometrics are not available
    }
  };

  const handlePinSubmit = async () => {
    if (isSettingPin) {
      if (pin === confirmPin) {
        await AsyncStorage.setItem(PIN_KEY, pin);
        Alert.alert('PIN Set', 'Your PIN has been set successfully.');
        setIsSettingPin(false);
        setIsChangingPin(false);
        setPin('');
        setConfirmPin('');
        setPinExists(true);
      } else {
        Alert.alert('Error', 'PINs do not match.');
      }
    } else if (isChangingPin) {
      const storedPin = await AsyncStorage.getItem(PIN_KEY);
      if (pin === storedPin) {
        setIsSettingPin(true); // Allow setting a new PIN
        setPin('');
        setConfirmPin('');
      } else {
        Alert.alert('Authentication Failed', 'Incorrect PIN, please try again.');
      }
    } else {
      const storedPin = await AsyncStorage.getItem(PIN_KEY);
      if (pin === storedPin) {
        setIsPinVisible(false); // Close the PIN modal
        navigation.navigate('Home');
      } else {
        Alert.alert('Authentication Failed', 'Incorrect PIN, please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <TouchableOpacity style={styles.button} onPress={authenticate}>
        <Text style={styles.buttonText}>Login with Biometrics</Text>
      </TouchableOpacity>

      {pinExists ? (
        <TouchableOpacity style={styles.button} onPress={() => setIsChangingPin(true)}>
          <Text style={styles.buttonText}>Change PIN</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setIsSettingPin(true)}>
          <Text style={styles.buttonText}>Set PIN</Text>
        </TouchableOpacity>
      )}

      <Modal visible={isPinVisible || isSettingPin || isChangingPin} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {isSettingPin ? 'Set New PIN' : isChangingPin ? 'Enter Current PIN' : 'Enter PIN'}
          </Text>
          <TextInput
            style={styles.pinInput}
            placeholder={isSettingPin ? 'Enter your new PIN' : 'Enter your PIN'}
            secureTextEntry
            keyboardType="numeric"
            value={pin}
            onChangeText={setPin}
          />
          {isSettingPin && (
            <TextInput
              style={styles.pinInput}
              placeholder="Confirm your new PIN"
              secureTextEntry
              keyboardType="numeric"
              value={confirmPin}
              onChangeText={setConfirmPin}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={handlePinSubmit}>
            <Text style={styles.buttonText}>{isSettingPin ? 'Set PIN' : 'Submit PIN'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            setIsPinVisible(false);
            setIsSettingPin(false);
            setIsChangingPin(false);
          }}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#392de9',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  pinInput: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});

export default Login;
