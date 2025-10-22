import { TextInput, StyleSheet, View } from "react-native";

export function CaptionInput({
  caption,
  setCaption,
}: {
  caption: string;
  setCaption: (text: string) => void;
}) {
  return (
    <View style={styles.container}>
      <TextInput
        value={caption}
        onChangeText={setCaption}
        placeholder="Enter caption..."
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
});
