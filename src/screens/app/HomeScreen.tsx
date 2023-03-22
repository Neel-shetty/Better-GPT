import { StyleSheet, Text, View, Button } from "react-native";
import React, { useContext } from "react";
import { SupabaseContext } from "../../context/SupabaseContext";
import Header from "../../components/HomeComponents/Header";
import ChatList from "../../components/HomeComponents/ChatList";

const HomeScreen = () => {
  const { supabaseClient, user } = useContext(SupabaseContext);
  async function logout() {
    const error = await supabaseClient?.auth.signOut();
    console.log("🚀 ~ file: HomeScreen.tsx:12 ~ logout ~ error:", error?.error);
  }
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.chatContainer}>
        <ChatList />
      </View>
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
});

