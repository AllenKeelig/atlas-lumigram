import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { favoritesFeed } from "@/placeholder";

export default function FavoritesScreen() {
  const [visibleCaptions, setVisibleCaptions] = useState<{ [key: string]: boolean }>({});

  const handleDoubleTap = () => {
    Alert.alert("Double tapped!", "This will favorite in Part 2.");
  };

  const handleLongPress = (id: string) => {
    setVisibleCaptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <FlashList
      data={favoritesFeed}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const doubleTap = Gesture.Tap()
          .numberOfTaps(2)
          .onStart(() => {
            runOnJS(handleDoubleTap)();
          });

        const longPress = Gesture.LongPress()
          .minDuration(400)
          .onStart(() => {
            runOnJS(handleLongPress)(item.id);
          });

        const combined = Gesture.Simultaneous(doubleTap, longPress);

        return (
          <GestureDetector gesture={combined}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              {visibleCaptions[item.id] && (
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>{item.caption}</Text>
                </View>
              )}
            </View>
          </GestureDetector>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: 400,
    borderRadius: 12,
  },
  captionContainer: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 8,
  },
  captionText: {
    color: "#fff",
    textAlign: "center",
  },
});
