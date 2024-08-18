import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () =>{
    //Seacher Saved Itens
    const getItem = async(key) =>{
        try {
            const passwords = await AsyncStorage.getItem(key);
            return JSON.parse(passwords)|| [];
        } catch (error) {
            console.log('Seacher Error', error);
            return[];
        }
    };

    //Itens saved in storage
    const saveItem = async (key,value) =>{
        try {
            let passwords = await getItem(key);

            passwords.push(value);
            await AsyncStorage.setItem(key, JSON.stringify(passwords));
        } catch (error) {
            console.log('Save Error', error);
        }
    };

    //Remove something of storage
    const removeItem = async (key, title) => {
        try {
            const items = await getItem(key);
            const updatedItems = items.filter(item => item.title !== title); // Filtra pelo título
            await AsyncStorage.setItem(key, JSON.stringify(updatedItems));
            return updatedItems;
        } catch (error) {
            console.log('Remove Item Error:', error);
        }
    };

    return{
        getItem,
        saveItem,
        removeItem,
    }
    
    
};

export default useStorage;