import { ScrollView, StyleSheet } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterChipsProps {
  options: FilterOption[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  multiSelect?: boolean;
}

export function FilterChips({ 
  options, 
  selectedIds, 
  onSelectionChange, 
  multiSelect = true 
}: FilterChipsProps) {
  const theme = useTheme();

  const handleChipPress = (id: string) => {
    if (multiSelect) {
      const newSelection = selectedIds.includes(id)
        ? selectedIds.filter(selectedId => selectedId !== id)
        : [...selectedIds, id];
      onSelectionChange(newSelection);
    } else {
      onSelectionChange(selectedIds.includes(id) ? [] : [id]);
    }
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {options.map((option) => {
        const isSelected = selectedIds.includes(option.id);
        return (
          <Chip
            key={option.id}
            selected={isSelected}
            onPress={() => handleChipPress(option.id)}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected 
                  ? theme.colors.primary 
                  : theme.colors.surface,
              }
            ]}
            textStyle={{
              color: isSelected 
                ? theme.colors.onPrimary 
                : theme.colors.onSurface,
              fontSize: 12,
            }}
          >
            {option.label}
            {option.count !== undefined && ` (${option.count})`}
          </Chip>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    marginRight: 8,
    height: 32,
  },
});