import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { globalStyles } from "../../themes";
import { SupabaseContext } from "../../context/SupabaseContext";
import { useNavigation } from "@react-navigation/native";

const ChatList = () => {
  const { supabaseClient, user } = useContext(SupabaseContext);
  const [chats, setChats] = useState<any[]>();

  const navigation: any = useNavigation();

  async function getChats() {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
      .from("chats")
      .select("*")
      .eq("owner_id", user?.id)
      .order("created_at", { ascending: false });
    if (data) setChats(data);
    // console.log("🚀 ~ file: ChatList.tsx:12 ~ getChats ~ error:", data, error);
  }

  useEffect(() => {
    getChats();
  }, []);

  return (
    <View style={globalStyles.centerRoot}>
      <FlatList
        data={chats}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={()=>{
              navigation.navigate("ChatScreen", {chatId: item.id})
            }} style={{ marginVertical: 10 }}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
