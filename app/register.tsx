import { Link, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={() => router.replace("/(tabs)/")}>
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>

      <Link href="/login" replace>
        <Text style={styles.linkText}>Login to existing account</Text>
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
