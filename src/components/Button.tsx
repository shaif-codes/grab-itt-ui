import { BUTTONS_STYLES } from "@/constants/button";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ButtonType } from "@/types/button";
import { IconName } from "@/types/icon";
import { Ionicons } from "@expo/vector-icons";

interface ButtonProps {
  title: string;
  onPress: () => void;
  type: ButtonType;
  extraContainerStyle?: ViewStyle;
  extraButtonStyle?: ViewStyle;
  extraTextStyle?: TextStyle;
  icon?: IconName;
  disabled?: boolean;
  iconSize?: number;
  iconColor?: string;
}

export default function Button({ title, onPress, type, extraContainerStyle, extraButtonStyle, extraTextStyle, icon, disabled, iconSize, iconColor }: ButtonProps) {
  const buttonStyle = BUTTONS_STYLES[type];
  return (
    <View style={[styles.buttonContainer, extraContainerStyle]}>
      <TouchableOpacity style={[styles.button, buttonStyle as ViewStyle, extraButtonStyle]} disabled={disabled} onPress={onPress}>
        {icon && <Ionicons style={[styles.icon]} name={icon} size={iconSize || 20} color={iconColor || colors.text.primary} />}
        <Text style={[styles.buttonText, extraTextStyle ]}>{title}</Text>
      </TouchableOpacity>  
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: spacing.padding.md,
    paddingBottom: spacing.padding.xl,

  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.padding.md,
    paddingHorizontal: spacing.padding.lg,
    borderRadius: spacing.borderRadius.md,
    borderWidth: 1,
  },
  buttonText: {
    ...typography.textStyles.button,
    color: colors.button.primaryDark,
    // marginLeft: spacing.sm,
  },
  icon: {
    marginRight: spacing.padding.md
  },
});
