import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { globalStyles } from "../../themes";
import { SupabaseContext } from "../../context/SupabaseContext";
import { useRoute } from "@react-navigation/native";

const ChatScreen = () => {
  const [messages, setMessages] = useState<any[]>([]);
  console.log("🚀 ~ file: ChatScreen.tsx:9 ~ ChatScreen ~ messages:", messages);
  const { supabaseClient } = useContext(SupabaseContext);
  const route: any = useRoute();
  const messageChannel = supabaseClient?.channel("chatroom");
  async function sendMessage() {
    if (!supabaseClient) return null;
    const parent_chat_id = route.params?.chatId;
    console.log(
      "🚀 ~ file: ChatScreen.tsx:13 ~ sendMessage ~ parent_chat_id:",
      parent_chat_id
    );
    const { status, error } = await supabaseClient.from("message").insert({
      parent_chat_id,
      text: "nice",
    });
    console.log("🚀 ~ file: ChatScreen.tsx:15  ~ status:", status, error);

    // if (!messageChannel) return null;
    // messageChannel.subscribe(async (status) => {
    //   if (status === "SUBSCRIBED") {
    //     const parent_chat_id = route.params?.chatId;
    //     const { status, error } = await supabaseClient.from("message").insert({
    //       parent_chat_id,
    //       text: "second message",
    //     });
    //     console.log("🚀 ~ file: ChatScreen.tsx:15  ~ status:", status, error);
    //   }
    // });
  }

  async function getMessages() {
    if (!supabaseClient) return null;
    if (!messageChannel) return null;
    console.log("get messages running");
    const messageSubscription = messageChannel.on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "message" },
      (payload) => {
        console.log("data received!", payload);
        setMessages((prev) => {
          const temp = prev;
          temp.push(payload);
          return temp;
        });
      }
    );
    console.log("get message ending");
    // return () => messageSubscription.unsubscribe();
  }

  useEffect(() => {
    // getMessages();
    if(messages.length === 0 ){
      const {} = supabaseClient?.from("message").select("*").eq("parent_chat_id", route.params?.chatId).then((data)=>{
        console.log("🚀 ~ file: ChatScreen.tsx:17 ~ data:", data);
        setMessages(data.data);
      }
      )
    }
    if (!supabaseClient) return null;
    if (!messageChannel) return null;
    console.log("get messages running");
    const messageSubscription = messageChannel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "message" },
        (payload) => {
          console.log("data received!", payload);
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe((status) => console.log(status));
    console.log("get message ending");
    return () => {
      messageSubscription.unsubscribe();
    };
  }, []);

  return (
    <View style={globalStyles.centerRoot}>
      <View style={{ height: 50 }} />
      <Button title="send message" onPress={sendMessage} />
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item?.text}</Text>}
      />
    </View>
  );
};

export default { component: ChatScreen, name: "ChatScreen" };

const styles = StyleSheet.create({});
