import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, FAB, useTheme, Avatar, Text, Button, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function AttendanceScreen() {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData] = useState([
    {
      id: '1',
      studentName: 'Rajesh Thapa',
      className: 'Physics - Class 12',
      status: 'present',
      time: '10:15 AM',
      avatar: 'RT',
    },
    {
      id: '2',
      studentName: 'Priya Sharma',
      className: 'Mathematics - Class 11',
      status: 'absent',
      time: '-',
      avatar: 'PS',
    },
    {
      id: '3',
      studentName: 'Amit Gurung',
      className: 'Chemistry - Class 10',
      status: 'late',
      time: '4:25 PM',
      avatar: 'AG',
    },
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      present: '#4CAF50',
      absent: '#F44336',
      late: '#FF9800',
    };
    return colors[status] || theme.colors.outline;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      present: 'check-circle',
      absent: 'close-circle',
      late: 'clock-alert',
    };
    return icons[status] || 'help-circle';
  };

  const getTodayStats = () => {
    const present = attendanceData.filter(item => item.status === 'present').length;
    const absent = attendanceData.filter(item => item.status === 'absent').length;
    const late = attendanceData.filter(item => item.status === 'late').length;
    return { present, absent, late, total: attendanceData.length };
  };

  const stats = getTodayStats();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Title style={[styles.title, { color: theme.colors.onSurface }]}>
              Attendance
            </Title>
            <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
              Track student attendance
            </Paragraph>
          </View>
          <MaterialCommunityIcons 
            name="calendar" 
            size={24} 
            color={theme.colors.onSurface} 
          />
        </View>

        {/* Date Selector */}
        <View style={styles.dateContainer}>
          <Card style={styles.dateCard}>
            <Card.Content>
              <View style={styles.dateHeader}>
                <Text style={styles.dateText}>Today's Attendance</Text>
                <Text style={styles.dateValue}>{new Date().toLocaleDateString()}</Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <Card style={[styles.statCard, { backgroundColor: '#4CAF50' }]}>
              <Card.Content>
                <MaterialCommunityIcons name="check-circle" size={24} color="white" />
                <Text style={styles.statNumber}>{stats.present}</Text>
                <Text style={styles.statLabel}>Present</Text>
              </Card.Content>
            </Card>
            <Card style={[styles.statCard, { backgroundColor: '#F44336' }]}>
              <Card.Content>
                <MaterialCommunityIcons name="close-circle" size={24} color="white" />
                <Text style={styles.statNumber}>{stats.absent}</Text>
                <Text style={styles.statLabel}>Absent</Text>
              </Card.Content>
            </Card>
            <Card style={[styles.statCard, { backgroundColor: '#FF9800' }]}>
              <Card.Content>
                <MaterialCommunityIcons name="clock-alert" size={24} color="white" />
                <Text style={styles.statNumber}>{stats.late}</Text>
                <Text style={styles.statLabel}>Late</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Attendance List */}
        <View style={styles.attendanceContainer}>
          <Card style={styles.sectionCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Student Attendance</Title>
              {attendanceData.map((item) => (
                <View key={item.id} style={styles.attendanceItem}>
                  <View style={styles.studentInfo}>
                    <Avatar.Text 
                      size={40} 
                      label={item.avatar} 
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <View style={styles.studentDetails}>
                      <Text style={styles.studentName}>{item.studentName}</Text>
                      <Text style={styles.className}>{item.className}</Text>
                    </View>
                  </View>
                  <View style={styles.attendanceStatus}>
                    <Chip 
                      style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) }]}
                      textStyle={{ color: 'white', fontSize: 10 }}
                      icon={() => (
                        <MaterialCommunityIcons 
                          name={getStatusIcon(item.status)} 
                          size={16} 
                          color="white" 
                        />
                      )}
                    >
                      {item.status.toUpperCase()}
                    </Chip>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Card style={styles.sectionCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Quick Actions</Title>
              <View style={styles.actionsRow}>
                <Button 
                  mode="outlined" 
                  onPress={() => {}}
                  style={styles.actionButton}
                  icon="qrcode-scan"
                >
                  QR Scan
                </Button>
                <Button 
                  mode="contained" 
                  onPress={() => {}}
                  style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                  icon="clipboard-check"
                >
                  Bulk Mark
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="clipboard-check"
        label="Mark Attendance"
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
  dateContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  dateCard: {
    elevation: 2,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateValue: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
  },
  attendanceContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionCard: {
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  studentDetails: {
    marginLeft: 12,
  },
  studentName: {
    fontSize: 14,
    fontWeight: '600',
  },
  className: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  attendanceStatus: {
    alignItems: 'flex-end',
  },
  statusChip: {
    height: 24,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
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