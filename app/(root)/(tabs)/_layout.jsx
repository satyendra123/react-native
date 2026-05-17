import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

const activeBlue = "#2E63FF";
const inactiveDark = "#111111";

function TabIcon({ name, color, focused, size = 24, isCreate = false }) {
  if (isCreate) {
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#111111",
          borderRadius: 28,
          height: 56,
          justifyContent: "center",
          marginTop: -18,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 8,
          width: 56,
        }}
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </View>
    );
  }

  return <Ionicons name={name} size={size} color={focused ? activeBlue : color ?? inactiveDark} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeBlue,
        tabBarInactiveTintColor: inactiveDark,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarStyle: {
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 12,
          height: 76,
          borderTopWidth: 0,
          borderRadius: 30,
          backgroundColor: "rgba(255,255,255,0.98)",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 18,
          elevation: 16,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? "home" : "home-outline"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? "search" : "search-outline"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Add Property",
          tabBarLabel: "Add Property",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} isCreate />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? "heart" : "heart-outline"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? "person" : "person-outline"} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
