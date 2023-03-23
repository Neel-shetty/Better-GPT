import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SupabaseContext } from "../../context/SupabaseContext";
import Header from "../../components/HomeComponents/Header";
import ChatList from "../../components/HomeComponents/ChatList";
import { useNavigation } from "@react-navigation/native";
import ChatScreen from "./ChatScreen";

const HomeScreen = () => {
  const { supabaseClient, user } = useContext(SupabaseContext);
  const navigation: any = useNavigation();

  async function createNewChat() {
    if (!supabaseClient) return null;

    const { error, status } = await supabaseClient.from("chats").insert({
      title: "New Chat",
      owner_id: user?.id,
    });

    const { data } = await supabaseClient
      .from("chats")
      .select("id")
      .eq("owner_id", user?.id)
      .order("id", { ascending: false })
      .limit(1)
      .single();
    console.log("🚀 ~ file: HomeScreen.tsx:25 ~  ~ data:", data);
    navigation.navigate(ChatScreen.name, { chatId: data?.id });
  }

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.chatContainer}>
        <ChatList />
      </View>
      <TouchableOpacity
        onPress={() => {
          createNewChat();
        }}
        style={{ position: "absolute", bottom: 10, right: 10 }}
      >
        <View style={styles.circle}>
          <Text style={{ fontSize: 24 }}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default { name: "HomeScreen", component: HomeScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chatContainer: {
    flex: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: 50,
    width: 50,
    position: "absolute",
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    bottom: 10,
    right: 10,
  },
});
