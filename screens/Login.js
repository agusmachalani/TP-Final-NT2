import * as yup from 'yup';

import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Fontisto, Ionicons, Octicons } from "@expo/vector-icons";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";

import Constants from 'expo-constants';
import { StatusBar } from "expo-status-bar";
import logo from "../assets/logo.png";

const reviewSchema = yup.object({
  email: yup.string()
    .email('Invalid e-mail')
    .required('An e-mail is required'),
  password: yup.string()
    .required('A password is required')
})

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);


{/**
  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);

    const url =
      "mongodb+srv://admin:admin123456@marianocluster.rp4b3.mongodb.net/trabajoPractico?retryWrites=true&w=majority";

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        navigation.navigate("Welcome");

        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.JSON());
        setSubmitting(false);
        handleMessage("An Error ocurred. Check your network and try again");
      });
  };


  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };
   */}

  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image source={logo} style={styles.logo} />

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={reviewSchema}
            onSubmit={(values, actions) => {
              actions.resetForm();
              addReview(values);
            }
            }
          >
            {(props) => (
              <View style={styles.styleFormArea}>
                <MyTextInput
                  label='Email Address'
                  icon='mail'
                  placeholder='isa@gmail.com'
                  placeholderTextColor={darkLight}
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                  keyboardType='email-address'
                />
                <Text style={styles.messageBoxRed}> {props.touched.email && props.errors.email}</Text>

                <MyTextInput
                  label='Password'
                  icon='lock'
                  placeholder='********'
                  placeholderTextColor={darkLight}
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <Text style={styles.messageBoxRed}>{props.touched.password && props.errors.password}</Text>

                {/**  {!isSubmitting && (  */}

                <TouchableOpacity style={styles.styledButton} onPress={props.handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                {/**  )}  */}

                {/**
                {isSubmitting && (  
                  <TouchableOpacity style={styles.styledButton} disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </TouchableOpacity>
                )}  
 */}
                <View style={styles.line} />

                <TouchableOpacity style={styles.styledButtonGoogle} onPress={props.handleSubmit}>
                  <Fontisto name="google" color={primary} size={25} />
                  <Text style={styles.buttonTextGoogle}>Sign in with Google</Text>
                </TouchableOpacity>

                <View style={styles.extraView}>
                  <Text style={styles.extraText}> Forgot password? </Text>
                  <TouchableOpacity style={styles.textLink} onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.textLinkContent}> Recovery</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ height: 10, backgroundColor: 'white' }}></View>
                <View style={styles.extraView}>
                  <Text style={styles.extraText}> I don't have an account </Text>
                  <TouchableOpacity style={styles.textLink} onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.textLinkContent}> Signup</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ height: 30, backgroundColor: 'white' }}></View>

              </View>
            )}
          </Formik>
        </View>
        <StatusBar style="light" />
      </View>
    </ScrollView>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <View style={styles.leftIcon}>
        <Octicons name={icon} size={30} color={brand} />
      </View>
      <Text style={styles.styledInputLabel}>{label}</Text>
      <TextInput style={styles.styledTextInput} {...props} />
      {isPassword && (
        <TouchableOpacity style={styles.rightIcon} onPress={() => setHidePassword((prev) => !prev)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Login;


//--------------------ESTILOS-----------------------
const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: '#ffffff',
  secondary: '#E5E7EB',
  third: '#1F2937',
  darkLight: '#9CA3AF',
  brand: '#cf5475',
  green: '#10B981',
  red: '#EF4444',
};

const { primary, secondary, third, darkLight, brand, green, red } = Colors;


const styles = StyleSheet.create({
  logo: {
    height: 90,
    width: 120,
    resizeMode: "contain",

  },
  container: {
    flex: 1,
    padding: 1,
    paddingTop: StatusBarHeight + 7,
    backgroundColor: primary
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  styleFormArea: {
    width: "90%"
  },
  styledTextInput: {
    backgroundColor: secondary,
    padding: 15,
    paddingLeft: 55,
    paddingRight: 55,
    borderRadius: 5,
    fontSize: 16,
    height: 60,
    marginVertical: 3,
    marginBottom: 10,
    color: third
  },
  styledInputLabel: {
    color: third,
    fontSize: 13,
    textAlign: "left",
  },
  leftIcon: {
    left: 15,
    top: 38,
    position: "absolute",
    zIndex: 1
  },
  rightIcon: {
    right: 15,
    top: 38,
    position: "absolute",
    zIndex: 1
  },
  styledButton: { //mejorar estilos de botón cuando sea Google
    padding: 15,
    backgroundColor: brand,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    height: 60
  },
  styledButtonGoogle: {
    padding: 15,
    backgroundColor: green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
    flexDirection: "row",
  },
  buttonText: {
    color: primary,
    fontSize: 16
  },
  buttonTextGoogle: {
    color: primary,
    fontSize: 16,
    padding: 25
  },
  messageBoxGreen: {
    textAlign: "center",
    fontSize: 13,
    color: green
  },
  messageBoxRed: {
    textAlign: "center",
    fontSize: 13,
    color: red
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: darkLight,
    marginVertical: 10
  },
  extraView: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 1
  },
  extraText: {
    justifyContent: "center",
    alignContent: "center",
    color: third,
    fontSize: 15
  },
  textLink: {
    justifyContent: "center",
    alignItems: "center"
  },
  textLinkContent: {
    color: brand,
    fontSize: 15
  }
});
