import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/"); // Go to home tab when logged in
    } catch (error) {
      Alert.alert("Login Error", "Invalid email or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>

      <Link href="/register" replace>
        <Text style={styles.linkText}>Create a new account</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000039",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 240,
    height: 160,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    borderWidth: 2,
    borderColor: "#63cfb0",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
    marginBottom: 15,
  },
  button: {
    width: "80%",
    backgroundColor: "#63cfb0",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    color: "#fff",
  },
});
