import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import useStorage from '../../hooks/useStorage';
import { PasswordItem } from './components/passwordItem';
import { Ionicons } from '@expo/vector-icons'

export function Passwords() {
    const [listPasswords, setListPasswords] = useState([]);
    const focused = useIsFocused();
    const { getItem, removeItem } = useStorage();

    useEffect(() => {
        async function loadPassword() {
            const passwords = await getItem("@pass");
            setListPasswords(passwords);
        }
        loadPassword();
    }, [focused]);

    async function handleDeletePassword(item) {
        const passwords = await removeItem('@pass', item.title); // Aqui, você está usando `item.title`, então certifique-se de que não há títulos duplicados
        setListPasswords(passwords);
    }
    ;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>My Passwords</Text>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={listPasswords}
                    keyExtractor={(item, index) => `${item.title}_${index}`} // Cria uma chave única combinando o título com o índice
                    renderItem={({ item }) =>
                        <PasswordItem
                            title={item.title}
                            password={item.password}
                            removePassword={() => handleDeletePassword(item)}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#392de9",
        padding: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14,
    },
    title: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        padding: 10
    },
    icon: {
        width: 50, // Defina uma largura
        height: 50, // Defina uma altura
        backgroundColor: '#392de9', // Adicione uma cor de fundo para contrastar
        justifyContent: 'center', // Centraliza o conteúdo horizontalmente
        alignItems: 'center', // Centraliza o conteúdo verticalmente
        borderRadius: 25, // Para deixar o botão redondo
        position: 'absolute', // Posiciona o ícone
        bottom: 20, // Ajuste para posicionar no rodapé, se necessário
        right: 20, // Ajuste para posicionar no rodapé, se necessário
    }
});
