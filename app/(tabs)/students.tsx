import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, FAB, useTheme, Avatar, Text, Button, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { FilterChips } from '@/components/FilterChips';
import { PullToRefresh } from '@/components/PullToRefresh';

export default function StudentsScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
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
      grade: 'A',
      lastSeen: '2 hours ago',
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
      grade: 'B+',
      lastSeen: '1 day ago',
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
      grade: 'B',
      lastSeen: '1 week ago',
    },
    {
      id: '4',
      name: 'Sita Rai',
      email: 'sita.rai@example.com',
      phone: '+977-9871234570',
      class: 'English - Class 9',
      enrollmentDate: '2024-01-04',
      status: 'active',
      attendance: 92,
      avatar: 'SR',
      grade: 'A-',
      lastSeen: '3 hours ago',
    },
  ]);

  const filterOptions = [
    { id: 'all', label: 'All', count: students.length },
    { id: 'active', label: 'Active', count: students.filter(s => s.status === 'active').length },
    { id: 'inactive', label: 'Inactive', count: students.filter(s => s.status === 'inactive').length },
    { id: 'high-attendance', label: 'High Attendance', count: students.filter(s => s.attendance >= 90).length },
    { id: 'low-attendance', label: 'Low Attendance', count: students.filter(s => s.attendance < 80).length },
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? theme.colors.tertiary : theme.colors.outline;
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return '#4CAF50';
    if (attendance >= 75) return '#FF9800';
    return '#F44336';
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return '#4CAF50';
    if (grade.startsWith('B')) return '#2196F3';
    if (grade.startsWith('C')) return '#FF9800';
    return '#F44336';
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilters.length === 0 || selectedFilters.includes('all')) {
      return matchesSearch;
    }
    
    const matchesFilter = selectedFilters.some(filter => {
      switch (filter) {
        case 'active':
          return student.status === 'active';
        case 'inactive':
          return student.status === 'inactive';
        case 'high-attendance':
          return student.attendance >= 90;
        case 'low-attendance':
          return student.attendance < 80;
        default:
          return true;
      }
    });
    
    return matchesSearch && matchesFilter;
  });

  const handleRefresh = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <SafeAreaView style={styles.container}>
      <PullToRefresh onRefresh={handleRefresh}>
        <View style={styles.content}>
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
            <View style={styles.headerActions}>
              <MaterialCommunityIcons 
                name="export" 
                size={24} 
                color={theme.colors.onSurface} 
                style={styles.headerIcon}
              />
              <MaterialCommunityIcons 
                name="filter" 
                size={24} 
                color={theme.colors.onSurface} 
              />
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <SearchBar
              placeholder="Search students..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Filter Chips */}
          <FilterChips
            options={filterOptions}
            selectedIds={selectedFilters}
            onSelectionChange={setSelectedFilters}
          />

          {/* Stats Overview */}
          <View style={styles.statsContainer}>
            <Card style={styles.statsCard}>
              <Card.Content>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                      {students.filter(s => s.status === 'active').length}
                    </Text>
                    <Text style={styles.statLabel}>Active</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: theme.colors.secondary }]}>
                      {Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%
                    </Text>
                    <Text style={styles.statLabel}>Avg Attendance</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: theme.colors.tertiary }]}>
                      {students.filter(s => s.attendance >= 90).length}
                    </Text>
                    <Text style={styles.statLabel}>High Performers</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>

          {/* Students List */}
          <View style={styles.studentsContainer}>
            {filteredStudents.map((student) => (
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
                        <View style={styles.nameRow}>
                          <Text style={styles.studentName}>{student.name}</Text>
                          <Chip 
                            style={[styles.gradeChip, { backgroundColor: getGradeColor(student.grade) }]}
                            textStyle={{ color: 'white', fontSize: 10 }}
                            compact
                          >
                            {student.grade}
                          </Chip>
                        </View>
                        <Text style={styles.studentClass}>{student.class}</Text>
                        <View style={styles.contactInfo}>
                          <MaterialCommunityIcons name="phone" size={14} color={theme.colors.onSurfaceVariant} />
                          <Text style={styles.contactText}>{student.phone}</Text>
                        </View>
                        <View style={styles.contactInfo}>
                          <MaterialCommunityIcons name="clock" size={14} color={theme.colors.onSurfaceVariant} />
                          <Text style={styles.contactText}>Last seen {student.lastSeen}</Text>
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
                        compact
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
                      icon="account"
                    >
                      Profile
                    </Button>
                    <Button 
                      mode="outlined" 
                      onPress={() => {}}
                      style={styles.actionButton}
                      labelStyle={styles.buttonLabel}
                      icon="message"
                    >
                      Message
                    </Button>
                    <Button 
                      mode="contained" 
                      onPress={() => {}}
                      style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                      labelStyle={styles.buttonLabel}
                      icon="clipboard-check"
                    >
                      Attendance
                    </Button>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>

          {filteredStudents.length === 0 && (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <MaterialCommunityIcons 
                  name="account-search" 
                  size={64} 
                  color={theme.colors.onSurfaceVariant} 
                />
                <Title style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>
                  No students found
                </Title>
                <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
                  {searchQuery ? 'Try adjusting your search or filters' : 'Add your first student to get started'}
                </Paragraph>
              </Card.Content>
            </Card>
          )}

          <View style={styles.bottomPadding} />
        </View>
      </PullToRefresh>

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
  content: {
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 16,
  },
  searchContainer: {
    paddingHorizontal: 16,
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statsCard: {
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  gradeChip: {
    height: 20,
    marginLeft: 8,
  },
  studentClass: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
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
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  buttonLabel: {
    fontSize: 11,
  },
  emptyCard: {
    marginHorizontal: 16,
    elevation: 2,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
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