import { Image, StyleSheet, View } from "react-native";

export function ImagePreview({ src }: { src?: string }) {
  return (
    <View style={styles.preview}>
      {src ? (
        <Image source={{ uri: src }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#eee",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    backgroundColor: "#ddd",
  },
});
