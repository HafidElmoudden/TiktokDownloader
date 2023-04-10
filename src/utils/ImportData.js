import AsyncStorage from "@react-native-async-storage/async-storage";

export function importData() {
    return new Promise(async (resolve, reject) => {
        try {
            const arr = [];
            const keys = await AsyncStorage.getAllKeys();
            for (const key of keys) {
              const val = await AsyncStorage.getItem(key);
              arr.push(JSON.parse(val));
            }
            resolve(arr);
          } catch (error) {
            alert(error);
            reject(error);
        }
    })
}