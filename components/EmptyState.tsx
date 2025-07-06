import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, icon, actionText, onAction }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.content}>
        <MaterialCommunityIcons 
          name={icon} 
          size={64} 
          color={theme.colors.onSurfaceVariant} 
        />
        <Title style={[styles.title, { color: theme.colors.onSurface }]}>
          {title}
        </Title>
        <Paragraph style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
          {description}
        </Paragraph>
        {actionText && onAction && (
          <Button 
            mode="contained" 
            onPress={onAction}
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          >
            {actionText}
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    elevation: 2,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  actionButton: {
    paddingHorizontal: 24,
  },
});