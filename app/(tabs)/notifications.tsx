import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme, Avatar, Text, Button, Chip, Badge } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { FilterChips } from '@/components/FilterChips';

export default function NotificationsScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const [notifications] = useState([
    {
      id: '1',
      title: 'New Assignment Posted',
      message: 'Physics assignment on mechanics has been uploaded to your class',
      type: 'assignment',
      time: '2 hours ago',
      isRead: false,
      classId: '1',
      className: 'Physics - Class 12',
    },
    {
      id: '2',
      title: 'Test Reminder',
      message: 'Math quiz scheduled for tomorrow at 2:00 PM. Please be prepared.',
      type: 'test',
      time: '4 hours ago',
      isRead: false,
      classId: '2',
      className: 'Mathematics - Class 11',
    },
    {
      id: '3',
      title: 'Class Cancelled',
      message: 'Chemistry class cancelled due to teacher unavailability. Will be rescheduled.',
      type: 'announcement',
      time: '1 day ago',
      isRead: true,
      classId: '3',
      className: 'Chemistry - Class 10',
    },
    {
      id: '4',
      title: 'Attendance Marked',
      message: 'Your attendance has been marked as present for today\'s English class.',
      type: 'attendance',
      time: '2 days ago',
      isRead: true,
      classId: '4',
      className: 'English - Class 9',
    },
    {
      id: '5',
      title: 'New Resource Available',
      message: 'Biology notes for Chapter 5 have been uploaded by your teacher.',
      type: 'resource',
      time: '3 days ago',
      isRead: true,
      classId: '5',
      className: 'Biology - Class 12',
    },
  ]);

  const filterOptions = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.isRead).length },
    { id: 'assignment', label: 'Assignments', count: notifications.filter(n => n.type === 'assignment').length },
    { id: 'test', label: 'Tests', count: notifications.filter(n => n.type === 'test').length },
    { id: 'announcement', label: 'Announcements', count: notifications.filter(n => n.type === 'announcement').length },
  ];

  const getNotificationIcon = (type: string) => {
    const icons = {
      assignment: 'file-document',
      test: 'clipboard-check',
      announcement: 'bullhorn',
      attendance: 'calendar-check',
      resource: 'book-open',
    };
    return icons[type] || 'bell';
  };

  const getNotificationColor = (type: string) => {
    const colors = {
      assignment: '#6C63FF',
      test: '#FF6B6B',
      announcement: '#4ECDC4',
      attendance: '#45B7D1',
      resource: '#96CEB4',
    };
    return colors[type] || theme.colors.primary;
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilters.length === 0 || selectedFilters.includes('all')) {
      return matchesSearch;
    }
    
    if (selectedFilters.includes('unread') && !notification.isRead) {
      return matchesSearch;
    }
    
    return matchesSearch && selectedFilters.includes(notification.type);
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <View style={styles.titleContainer}>
              <Title style={[styles.title, { color: theme.colors.onSurface }]}>
                Notifications
              </Title>
              {unreadCount > 0 && (
                <Badge style={[styles.badge, { backgroundColor: theme.colors.error }]}>
                  {unreadCount}
                </Badge>
              )}
            </View>
            <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
              Stay updated with your classes
            </Paragraph>
          </View>
          <MaterialCommunityIcons 
            name="bell-ring" 
            size={24} 
            color={theme.colors.onSurface} 
          />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search notifications..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Chips */}
        <FilterChips
          options={filterOptions}
          selectedIds={selectedFilters}
          onSelectionChange={setSelectedFilters}
          multiSelect={false}
        />

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Card style={styles.quickActionsCard}>
            <Card.Content>
              <View style={styles.quickActions}>
                <Button 
                  mode="outlined" 
                  onPress={() => {}}
                  style={styles.actionButton}
                  icon="check-all"
                  compact
                >
                  Mark All Read
                </Button>
                <Button 
                  mode="contained" 
                  onPress={() => {}}
                  style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                  icon="cog"
                  compact
                >
                  Settings
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Notifications List */}
        <View style={styles.notificationsContainer}>
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              style={[
                styles.notificationCard,
                !notification.isRead && styles.unreadCard
              ]}
            >
              <Card.Content>
                <View style={styles.notificationHeader}>
                  <View style={styles.notificationInfo}>
                    <View style={[
                      styles.iconContainer,
                      { backgroundColor: getNotificationColor(notification.type) }
                    ]}>
                      <MaterialCommunityIcons 
                        name={getNotificationIcon(notification.type)} 
                        size={20} 
                        color="white" 
                      />
                    </View>
                    <View style={styles.notificationDetails}>
                      <View style={styles.titleRow}>
                        <Text style={[
                          styles.notificationTitle,
                          !notification.isRead && styles.unreadTitle
                        ]}>
                          {notification.title}
                        </Text>
                        {!notification.isRead && (
                          <View style={[styles.unreadDot, { backgroundColor: theme.colors.primary }]} />
                        )}
                      </View>
                      <Text style={styles.notificationMessage}>
                        {notification.message}
                      </Text>
                      <View style={styles.metaInfo}>
                        <Chip 
                          style={[styles.classChip, { backgroundColor: theme.colors.surfaceVariant }]}
                          textStyle={styles.classChipText}
                          compact
                        >
                          {notification.className}
                        </Chip>
                        <Text style={styles.timeText}>{notification.time}</Text>
                      </View>
                    </View>
                  </View>
                  <MaterialCommunityIcons 
                    name="dots-vertical" 
                    size={20} 
                    color={theme.colors.onSurfaceVariant} 
                  />
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {filteredNotifications.length === 0 && (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <MaterialCommunityIcons 
                name="bell-off" 
                size={64} 
                color={theme.colors.onSurfaceVariant} 
              />
              <Title style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>
                No notifications found
              </Title>
              <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
                {searchQuery ? 'Try adjusting your search or filters' : 'You\'re all caught up!'}
              </Paragraph>
            </Card.Content>
          </Card>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  badge: {
    marginLeft: 8,
    fontSize: 10,
  },
  searchContainer: {
    paddingHorizontal: 16,
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  quickActionsCard: {
    elevation: 2,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  notificationsContainer: {
    paddingHorizontal: 16,
  },
  notificationCard: {
    marginBottom: 12,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#6C63FF',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  notificationInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationDetails: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classChip: {
    height: 24,
  },
  classChipText: {
    fontSize: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
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
  bottomPadding: {
    height: 80,
  },
});