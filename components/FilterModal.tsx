import { PropertyType, useFilterStore } from "@/store/filterStore";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TYPES: { label: string; value: PropertyType }[] = [
  { label: "All", value: null },
  { label: "Apartment", value: "apartment" },
  { label: "House", value: "house" },
  { label: "Villa", value: "villa" },
  { label: "Studio", value: "studio" },
];

const BEDS = [
  { label: "Any", value: null },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: 4 },
];

const PRICE_PRESETS = [
  { label: "Under \u20B950L", min: null, max: 5000000 },
  { label: "\u20B950L - \u20B91Cr", min: 5000000, max: 10000000 },
  { label: "\u20B91Cr - \u20B92Cr", min: 10000000, max: 20000000 },
  { label: "Above \u20B92Cr", min: 20000000, max: null },
];

export default function FilterModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const {
    type,
    bedrooms,
    minPrice,
    maxPrice,
    setType,
    setBedrooms,
    setMinPrice,
    setMaxPrice,
    resetFilters,
  } = useFilterStore();

  const [localType, setLocalType] = useState<PropertyType>(type);
  const [localBedrooms, setLocalBedrooms] = useState<number | null>(bedrooms);
  const [localMin, setLocalMin] = useState(minPrice !== null ? String(minPrice) : "");
  const [localMax, setLocalMax] = useState(maxPrice !== null ? String(maxPrice) : "");

  useEffect(() => {
    if (!visible) {
      return;
    }

    setLocalType(type);
    setLocalBedrooms(bedrooms);
    setLocalMin(minPrice !== null ? String(minPrice) : "");
    setLocalMax(maxPrice !== null ? String(maxPrice) : "");
  }, [bedrooms, maxPrice, minPrice, type, visible]);

  const activeCount = [localType, localBedrooms, localMin.trim(), localMax.trim()].filter(
    (value) => value !== null && value !== "",
  ).length;

  const parsePrice = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "").trim();
    if (!cleaned) {
      return null;
    }

    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const handleApply = () => {
    setType(localType);
    setBedrooms(localBedrooms);
    setMinPrice(parsePrice(localMin));
    setMaxPrice(parsePrice(localMax));
    onClose();
  };

  const handleReset = () => {
    setLocalType(null);
    setLocalBedrooms(null);
    setLocalMin("");
    setLocalMax("");
    resetFilters();
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/35">
        <Pressable className="absolute inset-0" onPress={onClose} />

        <View className="max-h-[90%] overflow-hidden rounded-t-[32px] bg-[#F8F8FA] shadow-2xl shadow-black/25">
          <View className="items-center pt-3">
            <View className="h-1.5 w-14 rounded-full bg-black/10" />
          </View>

          <View className="flex-row items-center justify-between bg-white px-5 pb-4 pt-2">
            <TouchableOpacity onPress={onClose} className="h-9 w-9 items-center justify-center">
              <Ionicons name="close" size={22} color="#111827" />
            </TouchableOpacity>
            <Text className="text-[17px] font-extrabold text-[#101318]">Filters</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text className="text-[13px] font-semibold text-[#315CFF]">Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 18 }}
            showsVerticalScrollIndicator={false}
          >
            <Text className="mb-3 text-[16px] font-extrabold text-[#101318]">Property Type</Text>
            <View className="mb-6 flex-row flex-wrap gap-2">
              {TYPES.map((item) => {
                const isActive = localType === item.value;

                return (
                  <TouchableOpacity
                    key={item.label}
                    onPress={() => setLocalType(item.value)}
                    className={`rounded-full border px-4 py-2 ${
                      isActive ? "border-[#315CFF] bg-[#315CFF]" : "border-[#E5E7EB] bg-white"
                    } shadow-sm shadow-black/5`}
                  >
                    <Text className={`text-sm font-semibold ${isActive ? "text-white" : "text-[#6B7280]"}`}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text className="mb-3 text-[16px] font-extrabold text-[#101318]">Bedrooms</Text>
            <View className="mb-6 flex-row gap-2">
              {BEDS.map((item) => {
                const isActive = localBedrooms === item.value;

                return (
                  <TouchableOpacity
                    key={item.label}
                    onPress={() => setLocalBedrooms(item.value)}
                    className={`flex-1 items-center rounded-2xl border py-3 ${
                      isActive ? "border-[#315CFF] bg-[#315CFF]" : "border-[#E5E7EB] bg-white"
                    } shadow-sm shadow-black/5`}
                  >
                    <Text className={`text-sm font-bold ${isActive ? "text-white" : "text-[#6B7280]"}`}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text className="mb-3 text-[16px] font-extrabold text-[#101318]">
              Price Range ({`\u20B9`})
            </Text>
            <View className="mb-3 flex-row gap-3">
              {[
                { label: "Min Price", value: localMin, onChange: setLocalMin, placeholder: "0" },
                { label: "Max Price", value: localMax, onChange: setLocalMax, placeholder: "Any" },
              ].map(({ label, value, onChange, placeholder }) => (
                <View key={label} className="flex-1">
                  <Text className="mb-1.5 text-xs font-medium text-[#8F98A8]">{label}</Text>
                  <View className="flex-row items-center rounded-2xl border border-[#E5E7EB] bg-white px-3 shadow-sm shadow-black/5">
                    <Text className="mr-1 text-sm text-[#A1A7B3]">{`\u20B9`}</Text>
                    <TextInput
                      className="flex-1 py-3 text-[#101318]"
                      placeholder={placeholder}
                      placeholderTextColor="#9CA3AF"
                      keyboardType="number-pad"
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                </View>
              ))}
            </View>

            <View className="flex-row flex-wrap gap-2">
              {PRICE_PRESETS.map((p) => {
                const minValue = p.min === null ? "" : String(p.min);
                const maxValue = p.max === null ? "" : String(p.max);
                const isActive = localMin.trim() === minValue && localMax.trim() === maxValue;

                return (
                  <TouchableOpacity
                    key={p.label}
                    onPress={() => {
                      setLocalMin(minValue);
                      setLocalMax(maxValue);
                    }}
                    className={`rounded-full border px-3 py-1.5 ${
                      isActive ? "border-[#BFD0FF] bg-[#EEF3FF]" : "border-[#E5E7EB] bg-white"
                    }`}
                  >
                    <Text className={`text-xs font-medium ${isActive ? "text-[#315CFF]" : "text-[#6B7280]"}`}>
                      {p.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <SafeAreaView edges={["bottom"]} className="bg-white px-5 pb-4 pt-4">
            <TouchableOpacity
              onPress={handleApply}
              className="items-center rounded-[18px] bg-[#315CFF] py-4 shadow-lg shadow-[#315CFF]/30"
            >
              <Text className="text-[16px] font-extrabold text-white">
                Apply Filters{activeCount > 0 ? ` (${activeCount})` : ""}
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}
