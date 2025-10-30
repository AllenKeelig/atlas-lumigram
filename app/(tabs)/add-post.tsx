import { useState } from "react";
import { Button, StyleSheet, View, Alert } from "react-native";
import { ImagePreview } from "@/components/ImagePreview";
import { CaptionInput } from "@/components/CaptionInput";
import { Loading } from "@/components/Loading";
import { useImagePicker } from "@/hooks/useImagePicker";
import { auth, db, storage } from "@/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Page() {
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { image, openImagePicker, reset } = useImagePicker();

  async function handleSave() {
    if (!image || !caption.trim()) {
      Alert.alert("Missing info", "Please select an image and add a caption.");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Upload image to Firebase Storage
      const response = await fetch(image);
      const blob = await response.blob();
      const imageRef = ref(storage, `posts/${Date.now()}.jpg`);
      await uploadBytes(imageRef, blob);

      // 2️⃣ Get download URL
      const imageUrl = await getDownloadURL(imageRef);

      // 3️⃣ Add post document to Firestore
      const user = auth.currentUser;
      await addDoc(collection(db, "posts"), {
        imageUrl,
        caption,
        createdAt: serverTimestamp(),
        createdBy: user ? user.uid : "anonymous",
      });

      Alert.alert("Success!", "Post uploaded successfully.");
      reset();
      setCaption("");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ImagePreview src={image} />

      <View style={styles.footerContainer}>
        {!image && <Button title="Choose a photo" onPress={openImagePicker} />}

        {image && (
          <View style={{ padding: 10 }}>
            <CaptionInput caption={caption} setCaption={setCaption} />
            <Button title="Save" onPress={handleSave}  />
            <Button title="Reset" onPress={reset}  />
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
