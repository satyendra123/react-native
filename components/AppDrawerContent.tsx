import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router";
import { Text, View } from "react-native";

const MENU_ITEMS = [
  { label: "Home", href: "/", icon: "home-outline" as const },
  { label: "Search", href: "/search", icon: "search-outline" as const },
  { label: "Add Property", href: "/create", icon: "add-circle-outline" as const },
  { label: "Saved", href: "/saved", icon: "heart-outline" as const },
  { label: "Profile", href: "/profile", icon: "person-outline" as const },
];

export default function AppDrawerContent({ navigation }: DrawerContentComponentProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (href: string) => {
    navigation.closeDrawer();
    requestAnimationFrame(() => {
      router.replace(href as never);
    });
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={{ paddingBottom: 28 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 pb-3 pt-2">
        <View className="rounded-[32px] bg-[#101318] px-5 py-5 shadow-xl shadow-black/20">
          <View className="flex-row items-center">
            <View className="h-14 w-14 items-center justify-center rounded-[22px] bg-white/10">
              <Text className="text-[20px] font-black text-white">A</Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-[12px] font-bold uppercase tracking-[0.22em] text-white/55">
                AutoHome
              </Text>
              <Text className="mt-1 text-[22px] font-black text-white">Satyendra</Text>
              <Text className="mt-1 text-[12px] leading-5 text-white/70">
                Browse homes, save favorites, and manage properties.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="px-2 pt-2">
        <Text className="px-3 pb-2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8F98A8]">
          Menu
        </Text>

        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <DrawerItem
              key={item.href}
              focused={isActive}
              activeTintColor="#315CFF"
              inactiveTintColor="#101318"
              activeBackgroundColor="#EEF3FF"
              label={item.label}
              icon={({ color, size }) => <Ionicons name={item.icon} color={color} size={size} />}
              onPress={() => handleNavigate(item.href)}
              labelStyle={{ fontSize: 15, fontWeight: "700" }}
              style={{
                borderRadius: 18,
                marginHorizontal: 12,
                marginVertical: 4,
              }}
            />
          );
        })}
      </View>

      <View className="px-4 pt-5">
        <View className="rounded-[24px] bg-white px-4 py-4 shadow-md shadow-black/5">
          <Text className="text-[13px] font-bold text-[#101318]">Quick tip</Text>
          <Text className="mt-1 text-[12px] leading-5 text-[#8F98A8]">
            Tap the menu icon on the home screen to open this drawer anytime.
          </Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
