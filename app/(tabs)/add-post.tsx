import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ImagePreview } from "@/components/ImagePreview";
import { CaptionInput } from "@/components/CaptionInput";
import { Loading } from "@/components/Loading";
import { useImagePicker } from "@/hooks/useImagePicker";

export default function Page() {
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const {image, openImagePicker, reset } = useImagePicker();

  return (
    <View style={styles.container}>
      <ImagePreview src={image} />

      <View style={styles.footerContainer}>
        {!image && (
          <Button title="Choose a photo" onPress={openImagePicker} />
        )}

        {image && (
          <View style={{ flex: 1, gap: 16 }}>
            <View style={{ flex: 0 }}>
              <CaptionInput caption={caption} setCaption={setCaption} />
            </View>
            <Button title="Save" onPress={() => alert("Save")} />
            <Button title="Reset" onPress={reset} />
          </View>
        )}
      </View>

      {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  footerContainer: {
    width: "100%",
    marginTop: 20,
    gap: 12,
  },
});
