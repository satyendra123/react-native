import { formatPrice } from "@/lib/utils";
import { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export default function FeaturedCard({ property }: { property: Property }) {
  return (
    <View
      className="mr-4 w-72 overflow-hidden rounded-3xl bg-white"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        opacity: property.is_sold ? 0.5 : 1,
      }}
    >
      <Image source={{ uri: property.images[0] }} className="h-44 w-full" resizeMode="cover" />

      <View className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1">
        <Text className="text-xs font-semibold capitalize text-blue-600">{property.type}</Text>
      </View>

      {property.is_sold ? (
        <View className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1">
          <Text className="text-xs font-semibold text-white">Sold</Text>
        </View>
      ) : null}

      <View className="p-4">
        <Text className="mb-1 text-base font-bold text-gray-800" numberOfLines={1}>
          {property.title}
        </Text>

        <View className="mb-3 flex-row items-center gap-1">
          <Ionicons name="location-outline" size={13} color="#6B7280" />
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            {property.address}, {property.city}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold text-blue-600">{formatPrice(property.price)}</Text>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="bed-outline" size={13} color="#6B7280" />
              <Text className="text-xs text-gray-500">{property.bedrooms}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="water-outline" size={13} color="#6B7280" />
              <Text className="text-xs text-gray-500">{property.bathrooms}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
