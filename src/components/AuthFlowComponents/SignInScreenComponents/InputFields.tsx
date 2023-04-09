import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomInput from "../CustomInput";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import SignUpScreen from "../../../screens/Auth/SignUpScreen";
import { SaveKey } from "../../../utils/SecureStorage";
import { setLoggedIn } from "../../../store/UserSlice";
import { SignInApi } from "../../../api/AuthenticateUser";
import PrimaryButton from "../../CommonComponents/PrimaryButton";
import { SupabaseContext } from "../../../context/SupabaseContext";

const InputFields = () => {
  const [loading, setLoading] = useState(false);

  const { supabaseClient } = useContext(SupabaseContext);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const behavior = Platform.OS === "ios" ? "padding" : undefined;

  const formScheme = yup.object({
    email: yup.string().email(),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password has to be atleast 8 characters"),
  });

  const goToSignUp = () => {
    //@ts-expect-error
    navigation.navigate(SignUpScreen.name);
  };

  return (
    <View>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          console.log(
            "🚀 ~ file: InputFields.tsx:49 ~ onSubmit={ ~ values:",
            values
          );
          setLoading(true);
          const res = await supabaseClient?.auth.signInWithPassword({
            email: values.email,
            password: values.password,
          });
          console.log("🚀 ~ file: InputFields.tsx:58 ~ res:", res);
          setLoading(false);
        }}
        validationSchema={formScheme}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            {console.log(
              "🚀 ~ file: InputFields.tsx:75 ~ InputFields ~ errors:",
              errors
            )}
            <KeyboardAvoidingView behavior={behavior}>
              <CustomInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
              />
              {errors.email && touched.email && (
                <>
                  <Text>{errors.email}</Text>
                </>
              )}
              <CustomInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
              />
              {errors.password && touched.password && (
                <>
                  <Text>{errors.password}</Text>
                </>
              )}
            </KeyboardAvoidingView>
            <PrimaryButton onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default InputFields;

const styles = StyleSheet.create({});
