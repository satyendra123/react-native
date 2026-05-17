import { useSavedProperty } from "@/hooks/useSavedProperty";
import { formatPrice } from "@/lib/utils";
import { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function PropertyCard({
  property,
  onUnsave,
  showSave = false,
}: {
  property: Property;
  onUnsave?: () => void;
  showSave?: boolean;
}) {
  const { isSaved, saveLoading, toggleSave } = useSavedProperty(property.id, onUnsave);

  return (
    <View
      className="mb-4 flex-row overflow-hidden rounded-2xl bg-white"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
        opacity: property.is_sold ? 0.5 : 1,
      }}
    >
      <Image source={{ uri: property.images[0] }} className="h-28 w-28" resizeMode="cover" />

      <View className="flex-1 justify-between p-3">
        <View>
          <Text className="mb-1 text-sm font-bold text-gray-800" numberOfLines={1}>
            {property.title}
          </Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={11} color="#6B7280" />
            <Text className="text-xs text-gray-500" numberOfLines={1}>
              {property.city}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-blue-600">{formatPrice(property.price)}</Text>
          {property.is_sold ? (
            <View className="rounded-full bg-red-50 px-2 py-0.5">
              <Text className="text-xs font-semibold text-red-500">Sold</Text>
            </View>
          ) : (
            <View className="flex-row gap-3">
              <View className="flex-row items-center gap-1">
                <Ionicons name="bed-outline" size={11} color="#6B7280" />
                <Text className="text-xs text-gray-500">{property.bedrooms} bd</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Ionicons name="expand-outline" size={11} color="#6B7280" />
                <Text className="text-xs text-gray-500">{property.area_sqft} sq ft</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {showSave ? (
        <TouchableOpacity onPress={toggleSave} disabled={saveLoading} className="w-10 items-center pt-3">
          <Ionicons
            name={isSaved ? "heart" : "heart-outline"}
            size={18}
            color={isSaved ? "#EF4444" : "#9CA3AF"}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
