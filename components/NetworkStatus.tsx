import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';

export function NetworkStatus() {
  const theme = useTheme();
  const [isConnected, setIsConnected] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected ?? true;
      setIsConnected(connected);
      
      if (!connected) {
        setShowStatus(true);
      } else {
        // Hide status after a delay when reconnected
        setTimeout(() => setShowStatus(false), 2000);
      }
    });

    return unsubscribe;
  }, []);

  if (!showStatus) return null;

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isConnected ? theme.colors.tertiary : theme.colors.error }
    ]}>
      <MaterialCommunityIcons 
        name={isConnected ? "wifi" : "wifi-off"} 
        size={16} 
        color="white" 
      />
      <Text style={styles.text}>
        {isConnected ? 'Back online' : 'No internet connection'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
});