import React, { useState } from "react";
import { Text, StyleSheet, Pressable, View, TouchableOpacity, Alert } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

export function PasswordItem({ title, password, removePassword }) {
    const [hidePass, setHidePass] = useState(true);

    const copyToClipboard = () => {
        Clipboard.setString(password);
        Alert.alert('Password copied', 'Password has been copied to clipboard');
    };

    return (
        <Pressable onLongPress={removePassword} style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.dataTitle}>{title}</Text>
                <Text style={styles.dataPassword}>
                    {hidePass ? '******' : password}
                </Text>
            </View>
            <TouchableOpacity 
                style={styles.icon} 
                onPress={() => setHidePass(!hidePass)}
            >
                <Ionicons 
                    name={hidePass ? "eye-off" : "eye"} 
                    size={24} 
                    color="#FFF" 
                />
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.icon}
                onPress={copyToClipboard}
            >
                <Ionicons name="copy" size={24} color="#FFF" />
            </TouchableOpacity>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0e0e0e",
        padding: 14,
        width: "100%",
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textContainer: {
        flex: 1,
        marginRight: 10, 
    },
    dataTitle: {
        fontSize:25,
        fontWeight: 'bold',
        color: "#FFF",
    },
    dataPassword: {
        color: '#FFF',
    },
    icon:{
        width: 50, 
        height: 50, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});
