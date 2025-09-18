import { AntDesign } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import groups from "../../../assets/data/groups.json";
import { Group } from "../../types";
import { useSetAtom } from "jotai";
import { selectedGroupAtom } from "../../atoms";

export default function GroupSelector() {
  const [searchValue, setSearchValue] = useState("");
  const setGroup = useSetAtom(selectedGroupAtom);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const onGroupSelected = (group: Group) => {
    setGroup(group);
    router.back();
  };
  return (
    <SafeAreaView style={{ marginHorizontal: 10, flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          onPress={() => router.back()}
          name="close"
          size={24}
          color="black"
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            flex: 1,
            paddingRight: 30,
          }}
        >
          Post to
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.searchContainer}>
          <AntDesign name="search" size={16} color="gray" />
          <TextInput
            placeholder="Search for a community"
            placeholderTextColor={"grey"}
            style={{ paddingVertical: 10, flex: 1 }}
            value={searchValue}
            onChangeText={(text) => setSearchValue(text)}
          />
          {searchValue && (
            <AntDesign
              name="close-circle"
              size={15}
              color="#E4E4E4"
              onPress={() => setSearchValue("")}
            />
          )}
        </View>

        <FlatList
          data={filteredGroups}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onGroupSelected(item)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: 20,
                marginHorizontal: 5,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 40, aspectRatio: 1, borderRadius: 20 }}
              />
              <Text style={{ fontWeight: "600" }}>{item.name}</Text>
            </Pressable>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
    borderRadius: 5,
    gap: 5,
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
});
