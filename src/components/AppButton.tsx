import {
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

import { COLORS } from "../constants/colors";
import { SPACING, FONT_SIZES } from "../constants/spacing";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "danger";
  disabled?: boolean;
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        variant === "danger" && styles.dangerButton,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: SPACING.medium,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  dangerButton: {
    backgroundColor: COLORS.danger,
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    color: COLORS.white,
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
  },
});