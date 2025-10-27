import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export function useImagePicker() {
  const [image, setImage] = useState<string | undefined>(undefined);

  async function openImagePicker() {
    // Request permission using expo-image-picker, not expo-media-library
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("You need to grant media library permissions.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function reset() {
    setImage(undefined);
  }

  return { image, openImagePicker, reset };
}
