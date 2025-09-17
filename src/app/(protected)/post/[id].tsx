import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  Image,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import posts from "../../../../assets/data/posts.json";
import comments from "../../../../assets/data/comments.json";
import PostListItem from "../../../components/PostListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatDistanceToNowStrict } from "date-fns";
import Entypo from "@expo/vector-icons/Entypo";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function PostDetailed() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [comment, setComment] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const detailedPost = posts.find((post) => post.id === id);
  const postComments = comments.filter(
    (comment) => comment.post_id === detailedPost?.id
  );

  if (!detailedPost) {
    return <Text>Post Not Found!</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={insets.top + 10}
    >
      <FlatList
        ListHeaderComponent={
          <PostListItem post={detailedPost} isDetailedPost />
        }
        data={postComments}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              marginTop: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              gap: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Image
                source={{
                  uri:
                    item.user.image ||
                    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
                }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 15,
                  marginRight: 4,
                }}
              />
              <Text
                style={{ fontWeight: "600", color: "#737373", fontSize: 13 }}
              >
                {item.user.name}
              </Text>
              <Text style={{ color: "#737373", fontSize: 13 }}>&#x2022;</Text>
              <Text style={{ color: "#737373", fontSize: 13 }}>
                {formatDistanceToNowStrict(new Date(item.created_at))}
              </Text>
            </View>
            <Text>{item.comment}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 14,
              }}
            >
              <Entypo name="dots-three-horizontal" size={15} color="#737373" />
              <Octicons name="reply" size={16} color="#737373" />
              <MaterialCommunityIcons
                name="trophy-outline"
                size={16}
                color="#737373"
              />
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <MaterialCommunityIcons
                  name="arrow-up-bold-outline"
                  size={18}
                  color="#737373"
                />
                <Text style={{ fontWeight: "500", color: "#737373" }}>
                  {item.upvotes}
                </Text>
                <MaterialCommunityIcons
                  name="arrow-down-bold-outline"
                  size={18}
                  color="#737373"
                />
              </View>
            </View>
          </View>
        )}
      />
      {/* POST A COMMENT */}
      <View
        style={{
          paddingBottom: +`${insets.bottom + 10}`,
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
          padding: 10,
          backgroundColor: "white",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,

          elevation: 4,
        }}
      >
        <TextInput
          placeholder="Join the conversation"
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={{ backgroundColor: "#E4E4E4", padding: 5, borderRadius: 5 }}
          multiline
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        {isInputFocused && (
          <Pressable
            disabled={!comment}
            onPress={() => console.error("Pressed")}
            style={{
              backgroundColor: !comment ? "lightgrey" : "#0d469b",
              borderRadius: 15,
              marginLeft: "auto",
              marginTop: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              Reply
            </Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
