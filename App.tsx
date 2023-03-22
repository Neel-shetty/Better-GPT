import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./src/navigation/Navigator";
import { store } from "./src/store/index";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppLoading } from "./src/utils/AppLoading";
import SupabaseProvider from "./src/context/SupabaseContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <AppLoading>
      <SupabaseProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Navigator />
          </QueryClientProvider>
        </Provider>
      </SupabaseProvider>
    </AppLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
