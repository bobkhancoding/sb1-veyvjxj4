import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Avatar, useTheme, List, Switch, Button, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function ProfileScreen() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [userProfile] = useState({
    name: 'Dr. Ram Sharma',
    email: 'ram.sharma@tutionghar.com',
    phone: '+977-9841234567',
    role: 'Admin & Teacher',
    institute: 'Sharma Tutorial Center',
    joinDate: '2024-01-01',
    avatar: 'RS',
  });

  const menuItems = [
    { title: 'Edit Profile', icon: 'account-edit', action: () => {} },
    { title: 'Manage Classes', icon: 'school', action: () => {} },
    { title: 'Student Reports', icon: 'file-chart', action: () => {} },
    { title: 'Billing & Subscription', icon: 'credit-card', action: () => {} },
    { title: 'Help & Support', icon: 'help-circle', action: () => {} },
    { title: 'About Tution Ghar', icon: 'information', action: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Title style={[styles.title, { color: theme.colors.onSurface }]}>
            Profile
          </Title>
          <MaterialCommunityIcons 
            name="cog" 
            size={24} 
            color={theme.colors.onSurface} 
          />
        </View>

        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <Card.Content>
            <View style={styles.profileHeader}>
              <Avatar.Text 
                size={80} 
                label={userProfile.avatar} 
                style={{ backgroundColor: theme.colors.primary }}
              />
              <View style={styles.profileInfo}>
                <Title style={styles.userName}>{userProfile.name}</Title>
                <Paragraph style={styles.userRole}>{userProfile.role}</Paragraph>
                <Paragraph style={styles.userInstitute}>{userProfile.institute}</Paragraph>
                <View style={styles.contactInfo}>
                  <MaterialCommunityIcons name="email" size={16} color={theme.colors.onSurfaceVariant} />
                  <Paragraph style={styles.contactText}>{userProfile.email}</Paragraph>
                </View>
                <View style={styles.contactInfo}>
                  <MaterialCommunityIcons name="phone" size={16} color={theme.colors.onSurfaceVariant} />
                  <Paragraph style={styles.contactText}>{userProfile.phone}</Paragraph>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Stats Card */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Quick Stats</Title>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="school" size={24} color={theme.colors.primary} />
                <Title style={styles.statNumber}>8</Title>
                <Paragraph style={styles.statLabel}>Classes</Paragraph>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="account-group" size={24} color={theme.colors.secondary} />
                <Title style={styles.statNumber}>156</Title>
                <Paragraph style={styles.statLabel}>Students</Paragraph>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="calendar" size={24} color={theme.colors.tertiary} />
                <Title style={styles.statNumber}>120</Title>
                <Paragraph style={styles.statLabel}>Days Active</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Settings Card */}
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Settings</Title>
            <List.Item
              title="Push Notifications"
              description="Get notified about important updates"
              left={props => <MaterialCommunityIcons name="bell" size={24} color={theme.colors.primary} />}
              right={() => (
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Dark Mode"
              description="Switch to dark theme"
              left={props => <MaterialCommunityIcons name="theme-light-dark" size={24} color={theme.colors.primary} />}
              right={() => (
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  color={theme.colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Menu Items */}
        <Card style={styles.menuCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Menu</Title>
            {menuItems.map((item, index) => (
              <View key={index}>
                <List.Item
                  title={item.title}
                  left={() => <MaterialCommunityIcons name={item.icon} size={24} color={theme.colors.primary} />}
                  right={() => <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />}
                  onPress={item.action}
                />
                {index < menuItems.length - 1 && <Divider />}
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Subscription Card */}
        <Card style={styles.subscriptionCard}>
          <Card.Content>
            <View style={styles.subscriptionHeader}>
              <MaterialCommunityIcons name="crown" size={24} color="#FFD700" />
              <Title style={styles.subscriptionTitle}>Premium Plan</Title>
            </View>
            <Paragraph style={styles.subscriptionText}>
              You are currently on the Premium plan with unlimited classes and priority support.
            </Paragraph>
            <Button 
              mode="outlined" 
              onPress={() => {}}
              style={styles.subscriptionButton}
            >
              Manage Subscription
            </Button>
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Card style={styles.logoutCard}>
          <Card.Content>
            <Button 
              mode="contained" 
              onPress={() => {}}
              style={[styles.logoutButton, { backgroundColor: '#F44336' }]}
              icon="logout"
            >
              Logout
            </Button>
          </Card.Content>
        </Card>

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userInstitute: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
  },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
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
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  settingsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  menuCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  subscriptionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  subscriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  subscriptionButton: {
    alignSelf: 'flex-start',
  },
  logoutCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  logoutButton: {
    width: '100%',
  },
  bottomPadding: {
    height: 80,
  },
});