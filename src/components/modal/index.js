import { StyleSheet, Text, View, TouchableOpacity, Pressable, TextInput } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import useStorage from '../../hooks/useStorage';

export function ModalPassword({ password, handleClose }) {
    const { saveItem } = useStorage();
    const [title, setTitle] = useState("");

    async function handleCopyPassword() {
        if (!title) {
            alert("Please enter a title before saving.");
            return;
        }

        const newPassword = { title, password };
        await Clipboard.setStringAsync(password);
        await saveItem("@pass", newPassword);
        
        alert("Password saved successfully!");
        handleClose();
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Generated Password</Text>

                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter title"
                    placeholderTextColor="#000"  // Placeholder color set to black
                />
                <Pressable style={styles.innerPassword} onLongPress={handleCopyPassword}>
                    <Text style={styles.text}>{password}</Text>
                </Pressable>

                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword}>
                        <Text style={styles.buttonSaveText}>Save Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(24,24,24, 0.6)",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        backgroundColor: "#FFF",
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    title: {
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 10,
        color: "#000"
    },
    innerPassword: {
        backgroundColor: '#0e0e0e',
        width: '90%',
        padding: 14,
        borderRadius: 8,
        marginBottom: 12, // Added some margin for better spacing
    },
    text: {
        color: "#FFF",
        textAlign: 'center'
    },
    input: {
        width: "90%",
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        color: "#000",  // Text color set to black
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
    }
});
