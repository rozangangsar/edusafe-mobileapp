import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import api from '../../services/api';

const ParentDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await api.get('/api/activitychild/mine');
      setActivities(response.data || []);
    } catch (err) {
      setError('Gagal memuat aktivitas');
      console.error('Error loading activities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadActivities();
    setIsRefreshing(false);
  };

  const ActivityCard = ({ activity }) => (
    <View style={styles.activityCard}>
      <View style={styles.activityHeader}>
        <Text style={styles.childName}>{activity.ChildID?.name || 'N/A'}</Text>
        <Text style={styles.activityType}>{activity.Activity}</Text>
      </View>
      <Text style={styles.date}>
        {new Date(activity.Date).toLocaleDateString('id-ID')}
      </Text>
      <Text style={styles.time}>
        {activity.TimeStart} - {activity.TimeEnd}
      </Text>
      <Text style={styles.teacher}>Guru: {activity.TeacherID?.name || 'N/A'}</Text>
    </View>
  );

  if (isLoading && !isRefreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0B3869" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard Orang Tua</Text>
        <Text style={styles.headerSubtitle}>Pantau aktivitas anak Anda</Text>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={activities}
          renderItem={({ item }) => <ActivityCard activity={item} />}
          keyExtractor={(item) => item._id || Math.random().toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Belum ada aktivitas</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#0B3869',
    padding: 20,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  listContent: {
    padding: 16,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0D58AB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityHeader: {
    marginBottom: 8,
  },
  childName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B3869',
    marginBottom: 4,
  },
  activityType: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  teacher: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});

export default ParentDashboard;
