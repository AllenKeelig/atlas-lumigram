import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

import { db } from "@/firebaseConfig"; // adjust path if needed
import {
  collection,
  getDocs,
  limit as limitFn,
  orderBy,
  query,
  startAfter,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";

const PAGE_SIZE = 10;

type Post = {
  id: string;
  imageUrl: string;
  caption?: string;
  createdAt?: any;
  createdBy?: string;
};

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [visibleCaptions, setVisibleCaptions] = useState<{ [key: string]: boolean }>({});

  // double-tap action (keeps your favorite alert behavior)
  const handleDoubleTap = useCallback(() => {
    Alert.alert("Double tapped!", "This will favorite in Part 2.");
  }, []);

  // long-press toggles caption visibility for a post
  const handleLongPress = useCallback((id: string) => {
    setVisibleCaptions((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // transform Firestore doc to Post
  const docToPost = (doc: QueryDocumentSnapshot<DocumentData>): Post => {
    const d = doc.data();
    return {
      id: doc.id,
      imageUrl: d.imageUrl,
      caption: d.caption,
      createdAt: d.createdAt,
      createdBy: d.createdBy,
    };
  };

  // initial load or refresh: fetch first page
  const fetchFirstPage = useCallback(async () => {
    try {
      setRefreshing(true);
      const postsCol = collection(db, "posts");
      const q = query(postsCol, orderBy("createdAt", "desc"), limitFn(PAGE_SIZE));
      const snap = await getDocs(q);

      const fetched: Post[] = snap.docs.map(docToPost);
      setPosts(fetched);

      const last = snap.docs[snap.docs.length - 1] ?? null;
      setLastDoc(last);
      setHasMore(snap.docs.length === PAGE_SIZE);
    } catch (err) {
      console.error("Error fetching first page:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // load next page (pagination)
  const fetchNextPage = useCallback(async () => {
    if (!hasMore || isFetchingMore || !lastDoc) return;
    try {
      setIsFetchingMore(true);
      const postsCol = collection(db, "posts");
      const q = query(
        postsCol,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limitFn(PAGE_SIZE)
      );
      const snap = await getDocs(q);
      const fetched: Post[] = snap.docs.map(docToPost);

      setPosts((prev) => [...prev, ...fetched]);
      const last = snap.docs[snap.docs.length - 1] ?? null;
      setLastDoc(last);
      setHasMore(snap.docs.length === PAGE_SIZE);
    } catch (err) {
      console.error("Error fetching next page:", err);
    } finally {
      setIsFetchingMore(false);
    }
  }, [lastDoc, hasMore, isFetchingMore]);

  useEffect(() => {
    // initial load
    fetchFirstPage();
  }, [fetchFirstPage]);

  // FlashList callbacks
  const onRefresh = useCallback(() => {
    // pull-to-refresh re-fetches the first page
    fetchFirstPage();
  }, [fetchFirstPage]);

  const onEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const renderItem = ({ item }: { item: Post }) => {
    // create gestures for this item
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

    const composed = Gesture.Simultaneous(doubleTap, longPress);

    return (
      <GestureDetector gesture={composed}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          {visibleCaptions[item.id] && item.caption ? (
            <View style={styles.captionContainer}>
              <Text style={styles.captionText}>{item.caption}</Text>
            </View>
          ) : null}
        </View>
      </GestureDetector>
    );
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <FlashList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // FlashList v2 handles sizing automatically; no estimatedItemSize
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No posts yet</Text>
          </View>
        }
        // keep a reasonable maxToRenderPerBatch if needed (optional)
        // maxToRenderPerBatch={6}
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
  emptyContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#999",
  },
});