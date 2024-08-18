import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useState } from "react";
import useStorage from '../../hooks/useStorage';

export function ModalText({ handleClose }) {
    const [title, setTitle] = useState("");
    const [passwords, setPasswords] = useState("");
    const { saveItem } = useStorage();

    const handleSave = async () => {
        if (title.trim() === "" || passwords.trim() === "") {
            Alert.alert("Error", "Both fields are required.");
            return;
        }

        const newPassword = { title, password: passwords };
        await saveItem("@pass", newPassword); // Use the same key as ModalPassword

        handleClose(); // Close the modal after saving
        Alert.alert("Password saved successfully!");
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require("../../assets/armario-aberto.png")}
                    style={styles.logo}
                />
                <Text style={styles.title}>Nick or Email</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter title"
                    placeholderTextColor="#000"
                />
                <Text style={styles.title}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={passwords}
                    onChangeText={setPasswords}
                    placeholder="Enter password"
                    placeholderTextColor="#000"
                    secureTextEntry
                />
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleSave}>
                        <Text style={styles.buttonSaveText}>Save Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(24,24,24, 0.6)",
    },
    input: {
        width: "90%",
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        marginLeft: 10,
        paddingHorizontal: 10,
    },
    button: {
        flex: 1,
        backgroundColor: "#a0a0a0",
        width: "80%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 14,
        marginBottom: 14,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
    },
    buttonArea: {
        flexDirection: "row",
        width: "90%",
        marginTop: 8,
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonSave: {
        backgroundColor: "#392DE9",
        borderRadius: 8,
    },
    buttonSaveText: {
        color: "#FFF",
        fontWeight: "bold"
    },
    logo: {
        width: 250,
        height: 400,
        marginTop: -80,
        marginLeft: "15%"
    },
    content: {
        backgroundColor: "#FFF",
        width: "100%",
        justifyContent: "center",
        borderRadius: 8,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 10,
        color: "#000"
    }
});
