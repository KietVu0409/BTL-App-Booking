import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from '@react-navigation/native';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatBubble from "./ChatBubble";
import background from './image/BackGround7.png';

const apiKey = "AIzaSyBMNL6aZF05JhYawDTjPVvh9e4hK11l7TU";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const Chatbot = ({ customer }) => {
    const navigation = useNavigation();
    const [chat, setChat] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleUserInput = async () => {
        let updatedChat = [
            ...chat,
            {
                role: "user",
                parts: [{ text: userInput }],
            },
        ];
        setLoading(true);

        try {
            const chatSession = model.startChat({
                generationConfig,
                history: updatedChat.map(item => ({
                    role: item.role,
                    parts: item.parts,
                })),
            });

            const result = await chatSession.sendMessage(userInput);
            const modelResponse = result.response.text();

            if (modelResponse) {
                const updateChatWithModel = [
                    ...updatedChat,
                    {
                        role: "model",
                        parts: [{ text: modelResponse }],
                    },
                ];

                setChat(updateChatWithModel);
                setUserInput("");
            }
        } catch (error) {
            console.log("Error calling Gemini Pro API: ", error);
            console.log("Error response: ", error.response);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }  
    };

    const handleSpeech = async (text) => {
        if (isSpeaking) {
            stop();
            setIsSpeaking(false);
        } else {
            if (!(await isSpeakingAsync())) {
                speak(text);
                setIsSpeaking(true);
            }
        }
    };

    const renderChatItem = ({ item }) => (
        <ChatBubble
            role={item.role}
            text={item.parts[0].text}
            onSpeech={() => handleSpeech(item.parts[0].text)}
        />
    );

    const handleBackPress = () => {
        navigation.goBack({ customer: customer });
    };

    return (
        <ImageBackground source={background} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <Ionicons name="arrow-back" size={24} color="#FFF" style={{marginRight: 90}} />
                    </TouchableOpacity>
                    <Text style={styles.title}>ChatRoom AI</Text>
                </View>
                <FlatList
                    data={chat}
                    renderItem={renderChatItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.chatContainer}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        placeholderTextColor={"#aaa"}
                        value={userInput}
                        onChangeText={setUserInput}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleUserInput}>
                        <Ionicons name="send" size={15} color="#000" />
                    </TouchableOpacity>
                </View>
                {loading && <ActivityIndicator style={styles.loading} color="#333" />}
                {error && <Text style={styles.error}>{error}</Text>}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 16,
        //justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFF",
        marginLeft: 8,
        //alignSelf: "center",
    },
    chatContainer: {
        padding: 16,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    input: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 8,
        borderRadius: 8,
    },
    button: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#FFE31A",
        marginLeft: 8,
    },
    buttonText: {
        color: "#fff",
    },
    loading: {
        marginTop: 16,
    },
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 16,
    },
});

export default Chatbot;