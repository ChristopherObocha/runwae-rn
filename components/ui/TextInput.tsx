import { Platform, View, ViewStyle, TextStyle, TextInput as RNTextInput, TextInputProps as RNTextInputProps, useColorScheme, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

type InputVariant = 'default' | 'filled' | 'outline' | 'ghost';
type InputSize = 'sm' | 'md' | 'lg';

interface TextInputProps extends RNTextInputProps {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  error?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelColor?: string;
}

const TextInput: React.FC<TextInputProps> = ({ 
  label,
  error,
  variant = 'default', 
  size = 'md', 
  disabled = false, 
  containerStyle,
  inputStyle,
  labelColor,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isFocused, setIsFocused] = useState(false);
  // const focused = ;

  const sizeStyle: Record<InputSize, {height?: number, fontSize: number, padding: number}> = {
    sm: { fontSize: 16, padding: 8 },
    md: { height: 50, fontSize: 16, padding: 14 },
    lg: { height: 55, fontSize: 32, padding: 16 },
  };

  const getVariantStyle = (variant: InputVariant) => {
    const baseStyle: ViewStyle = {
     borderRadius: 12,
     backgroundColor: Colors[colorScheme].background,

     paddingHorizontal: sizeStyle[size].padding,
     height: sizeStyle[size].height,
     opacity: disabled ? 0.5 : 1,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     ...Platform.select({
      web: {
        maxWidth: 320,
      },
     }),
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: Colors[colorScheme].primary,
          borderWidth: 0,
        };
      case 'outline':
        return {
          ...baseStyle,
          borderWidth: isFocused ? 2 : 1,
          backgroundColor: 'transparent',
          borderColor: Colors.white,
        }
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 0,
        }
      default:
        return baseStyle;
    }
  }

  const getTextColor = () => {
    if (disabled) {
      return Colors[colorScheme].icon;
    }
    return Colors[colorScheme].text;
  }

  const textInputStyle = {
    height: sizeStyle[size].height,
    fontSize: sizeStyle[size].fontSize,
    padding: sizeStyle[size].padding,
    color: getTextColor(),
    width: '100%' as const,
  }

  // TODO: Add error style that will use dark or light mode
  // const errorStyle = {
  //   color: 'red',
  //   fontSize: 12,
  //   marginTop: 4,
  // }

  return (
    <View
      style={[styles.container, containerStyle]}
    >
      {label && <ThemedText style={[styles.label, {color: labelColor ?? getTextColor()}]}>{label}</ThemedText> }
       <View style={[ getVariantStyle(variant), disabled && styles.disabled ]}>
        <RNTextInput 
          {...props}
          style={[textInputStyle, inputStyle]}
          placeholderTextColor={getTextColor()}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
       </View>
       {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default TextInput;