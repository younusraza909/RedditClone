import PostListItem from "../../components/PostListItem";
import posts from "../../../assets/data/posts.json";
import { FlatList } from "react-native";

export default function HomeScreen() {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
    />
  );
}
