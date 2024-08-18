import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export function PasswordItem({ title, password, removePassword }) {
    return (
        <Pressable onLongPress={removePassword} style={styles.container}>
            <Text style={styles.dataTitle}>{title}</Text>
            <Text style={styles.dataPassword}>{password}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0e0e0e",
        padding: 14,
        width: "100%",
        marginBottom: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dataTitle: {
        fontWeight: 'bold',
        color: "#FFF",
    },
    dataPassword: {
        color: '#FFF',
    }
});
