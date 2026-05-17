import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import type { ComponentProps } from "react";
import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type Listing = {
  id: string;
  type?: string;
  title: string;
  location: string;
  price: string;
  image: string;
  meta: { icon: IoniconName; label: string }[];
};

const featuredListings: Listing[] = [
  {
    id: "downtown-studio-loft",
    type: "Studio",
    title: "Downtown Studio Loft",
    location: "22 MG Road, Bangalore",
    price: "\u20B932L",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    meta: [
      { icon: "bed-outline", label: "1" },
      { icon: "water-outline", label: "1" },
    ],
  },
  {
    id: "green-valley",
    type: "House",
    title: "Green Valley",
    location: "7 Green Valley",
    price: "\u20B985L",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    meta: [
      { icon: "bed-outline", label: "2" },
      { icon: "water-outline", label: "2" },
    ],
  },
  {
    id: "lake-view-apartment",
    type: "Apartment",
    title: "Lake View Apartment",
    location: "Koramangala, Bangalore",
    price: "\u20B958L",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    meta: [
      { icon: "bed-outline", label: "3" },
      { icon: "water-outline", label: "2" },
    ],
  },
  {
    id: "skyline-penthouse",
    type: "Penthouse",
    title: "Skyline Penthouse",
    location: "Whitefield, Bangalore",
    price: "\u20B91.4Cr",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    meta: [
      { icon: "bed-outline", label: "4" },
      { icon: "water-outline", label: "3" },
    ],
  },
  {
    id: "garden-terrace-home",
    type: "Villa",
    title: "Garden Terrace Home",
    location: "Indiranagar, Bangalore",
    price: "\u20B976L",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    meta: [
      { icon: "bed-outline", label: "3" },
      { icon: "water-outline", label: "2" },
    ],
  },
  {
    id: "modern-family-home",
    type: "House",
    title: "Modern Family Home",
    location: "HSR Layout, Bangalore",
    price: "\u20B989L",
    image:
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80",
    meta: [
      { icon: "bed-outline", label: "4" },
      { icon: "water-outline", label: "3" },
    ],
  },
];

const recommendedListings: Listing[] = [
  {
    id: "sea-facing",
    title: "Sea Facing 38HK",
    location: "Mumbai",
    price: "\u20B91.9Cr",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    meta: [
      { icon: "bed-outline", label: "3 bd" },
      { icon: "expand-outline", label: "1800 sq ft" },
    ],
  },
  {
    id: "heritage-row-house",
    title: "Heritage Row House",
    location: "Delhi",
    price: "\u20B992L",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    meta: [
      { icon: "bed-outline", label: "4 bd" },
      { icon: "expand-outline", label: "2200 sq ft" },
    ],
  },
  {
    id: "oak-residence",
    title: "Oak Residence",
    location: "Pune",
    price: "\u20B983L",
    image:
      "https://images.unsplash.com/photo-1568605114943-2b6a1c7d4a8f?auto=format&fit=crop&w=1200&q=80",
    meta: [
      { icon: "bed-outline", label: "3 bd" },
      { icon: "expand-outline", label: "1600 sq ft" },
    ],
  },
  {
    id: "coastal-calm",
    title: "Coastal Calm",
    location: "Goa",
    price: "\u20B91.2Cr",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    meta: [
      { icon: "bed-outline", label: "5 bd" },
      { icon: "expand-outline", label: "2800 sq ft" },
    ],
  },
  {
    id: "sunset-bliss",
    title: "Sunset Bliss",
    location: "Hyderabad",
    price: "\u20B974L",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    meta: [
      { icon: "bed-outline", label: "3 bd" },
      { icon: "expand-outline", label: "1900 sq ft" },
    ],
  },
  {
    id: "urban-loft",
    title: "Urban Loft",
    location: "Chennai",
    price: "\u20B867L",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    meta: [
      { icon: "bed-outline", label: "2 bd" },
      { icon: "expand-outline", label: "1200 sq ft" },
    ],
  },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const featuredCardWidth = Math.min(Math.max((width - 48) * 0.66, 220), 268);
  const drawerNavigation = useNavigation("/(root)") as { openDrawer: () => void };

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1 bg-[#FCFCFD]">
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        <View className="px-4 pt-1">
          <View className="mt-6 flex-row items-start justify-between">
            <View className="flex-row items-center">
              <Pressable
                onPress={() => drawerNavigation.openDrawer()}
                className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-md shadow-black/10"
              >
                <Ionicons name="menu-outline" size={24} color="#101318" />
              </Pressable>
              <Text className="text-[34px] font-black tracking-[-0.04em] text-[#101318]">
                Home
              </Text>
            </View>
            <View className="items-end pt-2">
              <Text className="text-[13px] font-medium text-[#9CA3AF]">
                Good morning {"\u2600\ufe0f"}
              </Text>
              <Text className="mt-1 text-[16px] font-extrabold text-[#101318]">Satyendra</Text>
            </View>
          </View>

          <View className="mt-5 flex-row items-center rounded-[24px] bg-white px-4 py-3 shadow-md shadow-black/10">
            <Ionicons name="search" size={18} color="#C0C5CF" />
            <Text className="ml-3 flex-1 text-[15px] text-[#B5BBC6]">
              Search properties, cities...
            </Text>
            <Pressable className="h-10 w-10 items-center justify-center rounded-2xl bg-[#315CFF]">
              <MaterialCommunityIcons name="tune-variant" size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          <Text className="mb-4 mt-8 text-[18px] font-black text-[#111827]">Featured</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {featuredListings.map((listing, index) => (
              <View key={listing.id} style={{ marginLeft: index === 0 ? 0 : 12 }}>
                <Pressable className="rounded-[26px] bg-white shadow-lg shadow-black/10" style={{ width: featuredCardWidth }}>
                  <View className="overflow-hidden rounded-[26px] bg-slate-100">
                    <Image
                      source={{ uri: listing.image }}
                      style={{ height: 176, width: "100%" }}
                      contentFit="cover"
                      transition={180}
                    />
                    <View className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1">
                      <Text className="text-[12px] font-semibold text-[#5A6780]">
                        {listing.type}
                      </Text>
                    </View>
                  </View>
                  <View className="px-1 pb-1 pt-3">
                    <Text numberOfLines={1} className="text-[16px] font-extrabold text-[#101318]">
                      {listing.title}
                    </Text>
                    <View className="mt-1 flex-row items-center">
                      <Ionicons name="location-outline" size={13} color="#A3ABB9" />
                      <Text numberOfLines={1} className="ml-1 flex-1 text-[12px] text-[#A3ABB9]">
                        {listing.location}
                      </Text>
                    </View>
                    <View className="mt-3 flex-row items-end justify-between">
                      <Text className="text-[18px] font-black text-[#2E63FF]">{listing.price}</Text>
                      <View className="flex-row items-center">
                        <View className="flex-row items-center">
                          <Ionicons name={listing.meta[0].icon} size={12} color="#8F98A8" />
                          <Text className="ml-1 text-[12px] font-medium text-[#8F98A8]">
                            {listing.meta[0].label}
                          </Text>
                        </View>
                        <View className="ml-3 flex-row items-center">
                          <Ionicons name={listing.meta[1].icon} size={12} color="#8F98A8" />
                          <Text className="ml-1 text-[12px] font-medium text-[#8F98A8]">
                            {listing.meta[1].label}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
              </View>
            ))}
          </ScrollView>

          <Text className="mb-4 mt-8 text-[18px] font-black text-[#111827]">Recommended</Text>
          <View>
            {recommendedListings.map((listing, index) => (
              <View key={listing.id} style={{ marginTop: index === 0 ? 0 : 16 }}>
                <Pressable className="flex-row rounded-[24px] bg-white p-2 shadow-md shadow-black/5">
                  <View className="h-[92px] w-[108px] overflow-hidden rounded-[20px] bg-slate-100">
                    <Image
                      source={{ uri: listing.image }}
                      style={{ height: "100%", width: "100%" }}
                      contentFit="cover"
                      transition={180}
                    />
                  </View>
                  <View className="flex-1 px-3 py-1">
                    <Text numberOfLines={1} className="text-[15px] font-extrabold text-[#101318]">
                      {listing.title}
                    </Text>
                    <View className="mt-1 flex-row items-center">
                      <Ionicons name="location-outline" size={13} color="#A3ABB9" />
                      <Text numberOfLines={1} className="ml-1 flex-1 text-[12px] text-[#A3ABB9]">
                        {listing.location}
                      </Text>
                    </View>
                    <View className="mt-4 flex-row items-end justify-between">
                      <Text className="text-[18px] font-black text-[#2E63FF]">{listing.price}</Text>
                      <View className="flex-row items-center">
                        <View className="flex-row items-center">
                          <Ionicons name={listing.meta[0].icon} size={12} color="#8F98A8" />
                          <Text className="ml-1 text-[12px] font-medium text-[#8F98A8]">
                            {listing.meta[0].label}
                          </Text>
                        </View>
                        <View className="ml-3 flex-row items-center">
                          <Ionicons name={listing.meta[1].icon} size={12} color="#8F98A8" />
                          <Text className="ml-1 text-[12px] font-medium text-[#8F98A8]">
                            {listing.meta[1].label}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
