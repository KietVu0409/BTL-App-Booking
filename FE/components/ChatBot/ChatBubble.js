import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import botIcon from './image/chatbotr.jpg';
import userIcon from './image/avatarIcon.jpg';

const ChatBubble = ({ role, text, onSpeech }) => {
  return (
    <View style={[styles.chatContainer, role === "user" ? styles.userContainer : styles.modelContainer]}>
      {role === "model" && (
        <Image source={botIcon} style={styles.avatarIcon} />
      )}
      <View
        style={[
          styles.chatItem,
          role === "user" ? styles.userChatItem : styles.modelChatItem,
        ]}
      >
        <Text style={[styles.chatText, { color: role === "model" ? "#FFF" : "#000" }]}>{text}</Text>
        {role === "model" && (
          <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
            <Ionicons name="volume-high-outline" size={15} color="#FFF" />
          </TouchableOpacity>
        )}
      </View>
      {role === "user" && (
        <Image source={userIcon} style={styles.avatarIcon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  modelContainer: {
    justifyContent: "flex-start",
  },
  chatItem: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "90%",
    position: "relative",
  },
  userChatItem: {
    backgroundColor: "#EAEAEA",
    alignSelf: "flex-end",
  },
  modelChatItem: {
    backgroundColor: "#73777B",
    alignSelf: "flex-start",
  },
  chatText: {
    fontSize: 16,
    fontWeight: 700,
  },
  speakerIcon: {
    position: "absolute",
    right: 5,
    bottom: 5,
    alignItems: "flex-end",
  },
  avatarIcon: {
    marginHorizontal: 5,
    width: 35,
    height: 35,
    borderRadius: 15,
  },
});

export default ChatBubble;