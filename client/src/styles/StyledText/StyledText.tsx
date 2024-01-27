import React from "react";
import { Text, StyleSheet } from "react-native";
import ThemePrimary from "../../themes/ThemePrimary/ThemePrimary";

export default function StyledText({
  children,
  color,
  fontSize,
  fontWeight,
  style,
  ...restOfProps
}: {
  children: string;
  color: string;
  fontSize: string;
  fontWeight: string;
  style: string;
}): React.JSX.Element {
  const textStyles = [
    styles.text,
    color === "primary" && styles.colorPrimary,
    color === "secondary" && styles.colorSecondary,
    fontSize === "subheading" && styles.subheading,
    fontWeight === "bold" && styles.bold,
  ];

  return (
    <Text style={textStyles} {...restOfProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: ThemePrimary.colors.textPrimary,
    fontSize: ThemePrimary.fontSizes.body,
    fontFamily: ThemePrimary.fonts.main,
/*     fontWeights: ThemePrimary.fontWeights.normal,
 */  },
  colorPrimary: {
    color: ThemePrimary.colors.primary,
  },
  colorSecondary: {
    color: ThemePrimary.colors.textSecondary,
  },
  bold: {
/*     fontWeights: ThemePrimary.fontWeights.bold,
 */  },
  subheading: {
    fontSize: ThemePrimary.fontSizes.subheading,
  },
});
