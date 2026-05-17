import FilterModal from "@/components/FilterModal";
import { useFilterStore } from "@/store/filterStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const properties = [
  {
    id: "modern-luxury-villa",
    title: "Modern Luxury Villa",
    location: "Mumbai",
    type: "villa",
    bedrooms: 4,
    price: "\u20B91.3Cr",
    priceValue: 13000000,
    beds: "4 bd",
    area: "3200 ft\u00B2",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sky-view-penthouse",
    title: "Sky View Penthouse",
    location: "Mumbai",
    type: "apartment",
    bedrooms: 3,
    price: "\u20B92.8Cr",
    priceValue: 28000000,
    beds: "3 bd",
    area: "2800 ft\u00B2",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "green-valley-bungalow",
    title: "Green Valley Bungalow",
    location: "Bangalore",
    type: "house",
    bedrooms: 5,
    price: "\u20B985L",
    priceValue: 8500000,
    beds: "5 bd",
    area: "4500 ft\u00B2",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "downtown-studio-loft",
    title: "Downtown Studio Loft",
    location: "Bangalore",
    type: "studio",
    bedrooms: 1,
    price: "\u20B932L",
    priceValue: 3200000,
    beds: "1 bd",
    area: "650 ft\u00B2",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cozy-2bhk",
    title: "Cozy 2BHK Apartment",
    location: "Bangalore",
    type: "apartment",
    bedrooms: 2,
    price: "\u20B955L",
    priceValue: 5500000,
    beds: "2 bd",
    area: "1100 ft\u00B2",
    image:
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "heritage-row-house",
    title: "Heritage Row House",
    location: "Delhi",
    type: "house",
    bedrooms: 4,
    price: "\u20B992L",
    priceValue: 9200000,
    beds: "4 bd",
    area: "2200 ft\u00B2",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lake-view-apartment",
    title: "Lake View Apartment",
    location: "Pune",
    type: "apartment",
    bedrooms: 3,
    price: "\u20B958L",
    priceValue: 5800000,
    beds: "3 bd",
    area: "1450 ft\u00B2",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "urban-family-home",
    title: "Urban Family Home",
    location: "Hyderabad",
    type: "house",
    bedrooms: 4,
    price: "\u20B974L",
    priceValue: 7400000,
    beds: "4 bd",
    area: "1900 ft\u00B2",
    image:
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "riverfront-duplex",
    title: "Riverfront Duplex",
    location: "Mumbai",
    type: "house",
    bedrooms: 4,
    price: "\u20B91.65Cr",
    priceValue: 16500000,
    beds: "4 bd",
    area: "2600 ft\u00B2",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "palm-grove-residency",
    title: "Palm Grove Residency",
    location: "Chennai",
    type: "apartment",
    bedrooms: 2,
    price: "\u20B969L",
    priceValue: 6900000,
    beds: "2 bd",
    area: "980 ft\u00B2",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sunset-hills-villa",
    title: "Sunset Hills Villa",
    location: "Goa",
    type: "villa",
    bedrooms: 5,
    price: "\u20B92.25Cr",
    priceValue: 22500000,
    beds: "5 bd",
    area: "4100 ft\u00B2",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "central-city-flat",
    title: "Central City Flat",
    location: "Noida",
    type: "apartment",
    bedrooms: 1,
    price: "\u20B941L",
    priceValue: 4100000,
    beds: "1 bd",
    area: "760 ft\u00B2",
    image:
      "https://images.unsplash.com/photo-1560448075-bb4caa6b6f7b?auto=format&fit=crop&w=1200&q=80",
  },
];

function PropertyRow({ item }) {
  return (
    <View className="flex-row rounded-[22px] bg-white p-2 shadow-md shadow-black/5">
      <Image
        source={{ uri: item.image }}
        className="h-[92px] w-[96px] rounded-[18px]"
        contentFit="cover"
        transition={180}
      />

      <View className="flex-1 px-3 py-1">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-2">
            <Text numberOfLines={1} className="text-[15px] font-extrabold text-[#101318]">
              {item.title}
            </Text>
            <View className="mt-1 flex-row items-center">
              <Ionicons name="location-outline" size={12} color="#9CA3AF" />
              <Text numberOfLines={1} className="ml-1 text-[12px] text-[#8F98A8]">
                {item.location}
              </Text>
            </View>
          </View>

          <View className="pt-1">
            <Ionicons name="heart" size={18} color="#D54B60" />
          </View>
        </View>

        <View className="mt-4 flex-row items-end justify-between">
          <Text className="text-[18px] font-black text-[#2E63FF]">{item.price}</Text>
          <View className="flex-row items-center">
            <View className="flex-row items-center">
              <Ionicons name="bed-outline" size={12} color="#8F98A8" />
              <Text className="ml-1 text-[12px] font-medium text-[#8F98A8]">{item.beds}</Text>
            </View>
            <View className="ml-3 flex-row items-center">
              <Ionicons name="expand-outline" size={12} color="#8F98A8" />
              <Text className="ml-1 text-[12px] font-medium text-[#8F98A8]">{item.area}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { type, bedrooms, minPrice, maxPrice } = useFilterStore();

  const normalizedQuery = query.trim().toLowerCase();
  const activeFilterCount = [type, bedrooms, minPrice, maxPrice].filter((value) => value !== null)
    .length;

  const filteredProperties = properties.filter((item) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.location.toLowerCase().includes(normalizedQuery);

    const matchesType = type === null || item.type === type;
    const matchesBedrooms =
      bedrooms === null ? true : bedrooms === 4 ? item.bedrooms >= 4 : item.bedrooms === bedrooms;
    const matchesMinPrice = minPrice === null || item.priceValue >= minPrice;
    const matchesMaxPrice = maxPrice === null || item.priceValue <= maxPrice;

    return matchesQuery && matchesType && matchesBedrooms && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1 bg-[#F8F8FA]">
      <StatusBar style="dark" />
      <FilterModal visible={filtersVisible} onClose={() => setFiltersVisible(false)} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        <View className="px-4 pt-2">
          <Text className="text-[30px] font-black tracking-[-0.04em] text-[#101318]">
            Find Property
          </Text>

          <View className="mt-5 flex-row items-center rounded-[24px] bg-white px-4 py-3 shadow-md shadow-black/10">
            <Ionicons name="search" size={18} color="#C0C5CF" />
            <TextInput
              placeholder="Search by title or city..."
              placeholderTextColor="#B5BBC6"
              className="ml-3 flex-1 text-[15px] text-[#101318]"
              autoCorrect={false}
              value={query}
              onChangeText={setQuery}
            />
            <Pressable
              onPress={() => setFiltersVisible(true)}
              className="relative h-10 w-10 items-center justify-center rounded-2xl bg-[#F2F4F8]"
            >
              <MaterialCommunityIcons name="tune-variant" size={18} color="#4B5563" />
              {activeFilterCount > 0 ? (
                <View className="absolute -right-1 -top-1 h-4 min-w-4 items-center justify-center rounded-full bg-[#315CFF] px-1">
                  <Text className="text-[10px] font-bold text-white">{activeFilterCount}</Text>
                </View>
              ) : null}
            </Pressable>
          </View>

          <Text className="mt-6 text-[12px] font-medium text-[#A1A7B3]">
            {filteredProperties.length} properties found
          </Text>

          <View className="mt-4">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((item, index) => (
                <View key={item.id} className={index === 0 ? "" : "mt-4"}>
                  <PropertyRow item={item} />
                </View>
              ))
            ) : (
              <View className="mt-6 rounded-[24px] bg-white px-5 py-8 shadow-md shadow-black/5">
                <Text className="text-center text-[16px] font-extrabold text-[#101318]">
                  No properties found
                </Text>
                <Text className="mt-2 text-center text-[13px] text-[#8F98A8]">
                  Try a different search or clear the filters.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
