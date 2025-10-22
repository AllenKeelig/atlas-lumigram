import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { homeFeed } from "@/placeholder";
import { runOnJS } from "react-native-reanimated";


export default function HomeScreen() {
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
    <GestureHandlerRootView style={styles.root}>
      <FlashList
        data={homeFeed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // define gestures per item
          const doubleTap = Gesture.Tap()
            .numberOfTaps(2)
            .onStart(() => handleDoubleTap());

          const longPress = Gesture.LongPress()
            .minDuration(400)
            .onStart(() => {
              runOnJS(handleLongPress)(item.id);
            });

          const composed = Gesture.Simultaneous(doubleTap, longPress);

          return (
            <GestureDetector gesture={composed}>
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
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
