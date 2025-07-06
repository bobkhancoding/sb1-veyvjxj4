import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, FAB, useTheme, Avatar, Text, Button, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function StudentsScreen() {
  const theme = useTheme();
  const [students] = useState([
    {
      id: '1',
      name: 'Rajesh Thapa',
      email: 'rajesh.thapa@example.com',
      phone: '+977-9841234567',
      class: 'Physics - Class 12',
      enrollmentDate: '2024-01-01',
      status: 'active',
      attendance: 95,
      avatar: 'RT',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+977-9851234568',
      class: 'Mathematics - Class 11',
      enrollmentDate: '2024-01-02',
      status: 'active',
      attendance: 88,
      avatar: 'PS',
    },
    {
      id: '3',
      name: 'Amit Gurung',
      email: 'amit.gurung@example.com',
      phone: '+977-9861234569',
      class: 'Chemistry - Class 10',
      enrollmentDate: '2024-01-03',
      status: 'inactive',
      attendance: 72,
      avatar: 'AG',
    },
  ]);

  const getStatusColor = (status: string) => {
    return status === 'active' ? theme.colors.tertiary : theme.colors.outline;
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return '#4CAF50';
    if (attendance >= 75) return '#FF9800';
    return '#F44336';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Title style={[styles.title, { color: theme.colors.onSurface }]}>
              Students
            </Title>
            <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
              Manage your enrolled students
            </Paragraph>
          </View>
          <MaterialCommunityIcons 
            name="magnify" 
            size={24} 
            color={theme.colors.onSurface} 
          />
        </View>

        {/* Students List */}
        <View style={styles.studentsContainer}>
          {students.map((student) => (
            <Card key={student.id} style={styles.studentCard}>
              <Card.Content>
                <View style={styles.studentHeader}>
                  <View style={styles.studentInfo}>
                    <Avatar.Text 
                      size={50} 
                      label={student.avatar} 
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <View style={styles.studentDetails}>
                      <Title style={styles.studentName}>{student.name}</Title>
                      <Paragraph style={styles.studentClass}>{student.class}</Paragraph>
                      <View style={styles.contactInfo}>
                        <MaterialCommunityIcons name="phone" size={14} color={theme.colors.onSurfaceVariant} />
                        <Text style={styles.contactText}>{student.phone}</Text>
                      </View>
                    </View>
                  </View>
                  <MaterialCommunityIcons 
                    name="dots-vertical" 
                    size={20} 
                    color={theme.colors.onSurfaceVariant} 
                  />
                </View>

                <View style={styles.studentStats}>
                  <View style={styles.statContainer}>
                    <Chip 
                      style={[styles.statusChip, { backgroundColor: getStatusColor(student.status) }]}
                      textStyle={{ color: 'white', fontSize: 10 }}
                    >
                      {student.status.toUpperCase()}
                    </Chip>
                    <View style={styles.attendanceContainer}>
                      <Text style={styles.attendanceLabel}>Attendance</Text>
                      <View style={styles.attendanceBar}>
                        <View 
                          style={[
                            styles.attendanceProgress, 
                            { 
                              width: `${student.attendance}%`,
                              backgroundColor: getAttendanceColor(student.attendance)
                            }
                          ]} 
                        />
                      </View>
                      <Text style={[styles.attendanceText, { color: getAttendanceColor(student.attendance) }]}>
                        {student.attendance}%
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.enrollmentInfo}>
                  <MaterialCommunityIcons name="calendar" size={16} color={theme.colors.onSurfaceVariant} />
                  <Text style={styles.enrollmentText}>
                    Enrolled on {new Date(student.enrollmentDate).toLocaleDateString()}
                  </Text>
                </View>

                <View style={styles.actionButtons}>
                  <Button 
                    mode="outlined" 
                    onPress={() => {}}
                    style={styles.actionButton}
                    labelStyle={styles.buttonLabel}
                  >
                    View Profile
                  </Button>
                  <Button 
                    mode="contained" 
                    onPress={() => {}}
                    style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                    labelStyle={styles.buttonLabel}
                  >
                    Mark Attendance
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
        icon="account-plus"
        label="Add Student"
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
  studentsContainer: {
    paddingHorizontal: 16,
  },
  studentCard: {
    marginBottom: 16,
    elevation: 2,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  studentInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  studentDetails: {
    marginLeft: 12,
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  studentClass: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  studentStats: {
    marginBottom: 12,
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusChip: {
    height: 24,
  },
  attendanceContainer: {
    flex: 1,
    marginLeft: 16,
  },
  attendanceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  attendanceBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 4,
  },
  attendanceProgress: {
    height: '100%',
    borderRadius: 3,
  },
  attendanceText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  enrollmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  enrollmentText: {
    marginLeft: 8,
    fontSize: 12,
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