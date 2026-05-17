import AppDrawerContent from "@/components/AppDrawerContent";
import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer
      drawerContent={(props) => <AppDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        overlayColor: "rgba(0, 0, 0, 0.38)",
        drawerStyle: {
          backgroundColor: "#F8F8FA",
          width: 300,
        },
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home" }} />
    </Drawer>
  );
}
