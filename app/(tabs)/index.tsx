import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, FAB, useTheme, Surface, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useClasses } from '@/hooks/useClasses';
import { useStudents } from '@/hooks/useStudents';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function DashboardScreen() {
  const theme = useTheme();
  const { profile, signOut } = useAuth();
  const { classes, isLoading: classesLoading } = useClasses();
  const { students, isLoading: studentsLoading } = useStudents();

  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    todayAttendance: 0,
    upcomingTests: 0,
  });

  useEffect(() => {
    if (!classesLoading && !studentsLoading) {
      setStats({
        totalClasses: classes.length,
        totalStudents: students.length,
        todayAttendance: Math.floor(students.length * 0.85), // Mock data
        upcomingTests: 3, // Mock data
      });
    }
  }, [classes, students, classesLoading, studentsLoading]);

  const quickActions = [
    { title: 'Create Class', icon: 'plus-circle', color: theme.colors.primary },
    { title: 'Mark Attendance', icon: 'clipboard-check', color: theme.colors.secondary },
    { title: 'Add Student', icon: 'account-plus', color: theme.colors.tertiary },
    { title: 'Go Live', icon: 'video', color: '#FF6B6B' },
  ];

  const recentActivities = [
    { title: 'Physics Class Started', time: '2 hours ago', icon: 'school' },
    { title: 'Math Test Created', time: '4 hours ago', icon: 'file-document' },
    { title: 'New Student Enrolled', time: '1 day ago', icon: 'account-plus' },
    { title: 'Chemistry Notes Uploaded', time: '2 days ago', icon: 'file-upload' },
  ];

  if (classesLoading || studentsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Title style={[styles.welcomeText, { color: theme.colors.onSurface }]}>
              Welcome back, {profile?.full_name?.split(' ')[0]}!
            </Title>
            <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
              Here's what's happening in your tuition center today
            </Paragraph>
          </View>
          <View style={styles.headerActions}>
            <MaterialCommunityIcons 
              name="bell" 
              size={24} 
              color={theme.colors.onSurface} 
              style={styles.headerIcon}
            />
            <Button
              mode="text"
              onPress={signOut}
              compact
              textColor={theme.colors.error}
            >
              Logout
            </Button>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <Card style={[styles.statCard, { backgroundColor: theme.colors.primary }]}>
              <Card.Content>
                <MaterialCommunityIcons name="school" size={24} color="white" />
                <Text style={styles.statNumber}>{stats.totalClasses}</Text>
                <Text style={styles.statLabel}>Classes</Text>
              </Card.Content>
            </Card>
            <Card style={[styles.statCard, { backgroundColor: theme.colors.secondary }]}>
              <Card.Content>
                <MaterialCommunityIcons name="account-group" size={24} color="white" />
                <Text style={styles.statNumber}>{stats.totalStudents}</Text>
                <Text style={styles.statLabel}>Students</Text>
              </Card.Content>
            </Card>
          </View>
          <View style={styles.statsRow}>
            <Card style={[styles.statCard, { backgroundColor: theme.colors.tertiary }]}>
              <Card.Content>
                <MaterialCommunityIcons name="clipboard-check" size={24} color="white" />
                <Text style={styles.statNumber}>{stats.todayAttendance}</Text>
                <Text style={styles.statLabel}>Present Today</Text>
              </Card.Content>
            </Card>
            <Card style={[styles.statCard, { backgroundColor: '#FF6B6B' }]}>
              <Card.Content>
                <MaterialCommunityIcons name="file-document" size={24} color="white" />
                <Text style={styles.statNumber}>{stats.upcomingTests}</Text>
                <Text style={styles.statLabel}>Tests Due</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Quick Actions */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Quick Actions</Title>
            <View style={styles.quickActionsContainer}>
              {quickActions.map((action, index) => (
                <Surface key={index} style={[styles.actionItem, { backgroundColor: action.color }]}>
                  <MaterialCommunityIcons name={action.icon} size={24} color="white" />
                  <Text style={styles.actionText}>{action.title}</Text>
                </Surface>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Recent Activities */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Recent Activities</Title>
            {recentActivities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <MaterialCommunityIcons 
                  name={activity.icon} 
                  size={20} 
                  color={theme.colors.primary} 
                />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="plus"
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
  },
  sectionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityContent: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
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