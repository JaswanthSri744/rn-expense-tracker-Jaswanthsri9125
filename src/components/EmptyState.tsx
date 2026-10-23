import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { COLORS } from "../constants/colors";
import { SPACING, FONT_SIZES } from "../constants/spacing";

type EmptyStateProps = {
  message: string;
};

export default function EmptyState({
  message,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.large,
    alignItems: "center",
  },
  message: {
    color: COLORS.secondaryText,
    fontSize: FONT_SIZES.medium,
    textAlign: "center",
  },
});