import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1 bg-[#FCFCFD]">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-[26px] font-black tracking-[-0.03em] text-[#101318]">Sign In</Text>
        <Text className="mt-2 max-w-[280px] text-center text-[14px] leading-6 text-[#7E8796]">
          Authentication screen for your future login flow.
        </Text>
      </View>
    </SafeAreaView>
  );
}
