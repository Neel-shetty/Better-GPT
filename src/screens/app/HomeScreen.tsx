import { StyleSheet, Text, View, Button } from "react-native";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/UserSlice";
import { DeleteKey } from "../../utils/SecureStorage";
import { SupabaseContext } from "../../context/SupabaseContext";

const HomeScreen = () => {
  const { supabaseClient, user } = useContext(SupabaseContext);
  async function logout() {
    const error = await supabaseClient?.auth.signOut();
    console.log("🚀 ~ file: HomeScreen.tsx:12 ~ logout ~ error:", error?.error);
  }
  return (
    <View style={styles.root}>
      <Text>HomeScreen</Text>
      <Button title="Log out" onPress={logout} />
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
});
