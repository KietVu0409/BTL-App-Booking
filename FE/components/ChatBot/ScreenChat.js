import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Chatbot from './Chatbot';

export default function ScreenChat() {
  return (
    <View style={styles.container}>
      <Chatbot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});