import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, FAB, useTheme, Chip, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function ClassesScreen() {
  const theme = useTheme();
  const [classes] = useState([
    {
      id: '1',
      name: 'Physics - Class 12',
      subject: 'Physics',
      teacher: 'Dr. Ram Sharma',
      students: 25,
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      room: 'PH001',
      status: 'active',
      nextClass: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: 'Mathematics - Class 11',
      subject: 'Mathematics',
      teacher: 'Prof. Sita Devi',
      students: 30,
      schedule: 'Tue, Thu, Sat - 2:00 PM',
      room: 'MT002',
      status: 'active',
      nextClass: '2024-01-16T14:00:00Z',
    },
    {
      id: '3',
      name: 'Chemistry - Class 10',
      subject: 'Chemistry',
      teacher: 'Mr. Hari Bahadur',
      students: 22,
      schedule: 'Mon, Wed, Fri - 4:00 PM',
      room: 'CH003',
      status: 'inactive',
      nextClass: '2024-01-17T16:00:00Z',
    },
  ]);

  const getStatusColor = (status: string) => {
    return status === 'active' ? theme.colors.tertiary : theme.colors.outline;
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      Physics: '#6C63FF',
      Mathematics: '#FFAA00',
      Chemistry: '#03DAC6',
    };
    return colors[subject] || theme.colors.primary;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Title style={[styles.title, { color: theme.colors.onSurface }]}>
              Classes
            </Title>
            <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
              Manage your tuition classes
            </Paragraph>
          </View>
          <MaterialCommunityIcons 
            name="filter" 
            size={24} 
            color={theme.colors.onSurface} 
          />
        </View>

        {/* Classes List */}
        <View style={styles.classesContainer}>
          {classes.map((classItem) => (
            <Card key={classItem.id} style={styles.classCard}>
              <Card.Content>
                <View style={styles.classHeader}>
                  <View style={styles.classInfo}>
                    <Title style={styles.className}>{classItem.name}</Title>
                    <View style={styles.chipContainer}>
                      <Chip 
                        style={[styles.subjectChip, { backgroundColor: getSubjectColor(classItem.subject) }]}
                        textStyle={{ color: 'white', fontSize: 10 }}
                      >
                        {classItem.subject}
                      </Chip>
                      <Chip 
                        style={[styles.statusChip, { backgroundColor: getStatusColor(classItem.status) }]}
                        textStyle={{ color: 'white', fontSize: 10 }}
                      >
                        {classItem.status.toUpperCase()}
                      </Chip>
                    </View>
                  </View>
                  <MaterialCommunityIcons 
                    name="dots-vertical" 
                    size={20} 
                    color={theme.colors.onSurfaceVariant} 
                  />
                </View>

                <View style={styles.classDetails}>
                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="account-tie" size={16} color={theme.colors.onSurfaceVariant} />
                    <Text style={styles.detailText}>{classItem.teacher}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="account-group" size={16} color={theme.colors.onSurfaceVariant} />
                    <Text style={styles.detailText}>{classItem.students} students</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="clock" size={16} color={theme.colors.onSurfaceVariant} />
                    <Text style={styles.detailText}>{classItem.schedule}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="door" size={16} color={theme.colors.onSurfaceVariant} />
                    <Text style={styles.detailText}>Room {classItem.room}</Text>
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <Button 
                    mode="outlined" 
                    onPress={() => {}}
                    style={styles.actionButton}
                    labelStyle={styles.buttonLabel}
                  >
                    View Details
                  </Button>
                  <Button 
                    mode="contained" 
                    onPress={() => {}}
                    style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                    labelStyle={styles.buttonLabel}
                  >
                    Go Live
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="plus"
        label="Add Class"
        onPress={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  classesContainer: {
    paddingHorizontal: 16,
  },
  classCard: {
    marginBottom: 16,
    elevation: 2,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  subjectChip: {
    height: 24,
  },
  statusChip: {
    height: 24,
  },
  classDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  buttonLabel: {
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  bottomPadding: {
    height: 80,
  },
});