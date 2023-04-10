import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addToAsyncStorage(id, data) {
  await AsyncStorage.setItem(id, JSON.stringify(data));
}
