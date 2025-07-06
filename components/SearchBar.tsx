import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  style?: any;
}

export function SearchBar({ 
  placeholder = "Search...", 
  value, 
  onChangeText, 
  onSubmit,
  style 
}: SearchBarProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        mode="outlined"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
          }
        ]}
        outlineStyle={{
          borderColor: isFocused ? theme.colors.primary : theme.colors.outline,
          borderWidth: isFocused ? 2 : 1,
        }}
        left={
          <TextInput.Icon 
            icon={() => (
              <MaterialCommunityIcons 
                name="magnify" 
                size={20} 
                color={theme.colors.onSurfaceVariant} 
              />
            )}
          />
        }
        right={
          value ? (
            <TextInput.Icon 
              icon={() => (
                <MaterialCommunityIcons 
                  name="close" 
                  size={20} 
                  color={theme.colors.onSurfaceVariant} 
                />
              )}
              onPress={() => onChangeText('')}
            />
          ) : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    fontSize: 14,
  },
});