import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { globalStyles } from "../../themes";
import { SupabaseContext } from "../../context/SupabaseContext";

const ChatList = () => {
  const { supabaseClient, user } = useContext(SupabaseContext);

  async function getChats() {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient.from('chats').select("*");
    console.log("🚀 ~ file: ChatList.tsx:12 ~ getChats ~ error:", error);
    console.log("🚀 ~ file: ChatList.tsx:10 ~ getChats ~ data:", data);
  }

  async function createChat() {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
      .from("chats")
      .insert({
        title: "test from client",
        owner_id: user?.id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    console.log("🚀 ~ file: ChatList.tsx:12 ~ getChats ~ error:", error);
    console.log("🚀 ~ file: ChatList.tsx:10 ~ getChats ~ data:", data);
  }

  useEffect(() => {
    getChats();
    createChat();
  }, []);
  return (
    <View style={globalStyles.centerRoot}>
      <Text>ChatList</Text>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
