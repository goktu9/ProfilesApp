import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
// +++ Import the api client.
import { api } from '../api/client';

export default function ProfilesListScreen({ navigation }) {
  // +++ State for storing profiles list.
  const [profiles, setProfiles] = useState([]);
  // +++ State for tracking current page number.
  const [page, setPage] = useState(1);
  // +++ State for loading status.
  const [loading, setLoading] = useState(false);
  // +++ State for error handling.
  const [error, setError] = useState(null);
  // +++ State to check if more data is available.
  const [hasMore, setHasMore] = useState(true);

  // +++ Function to fetch profiles from API.
  const fetchProfiles = async () => {
    // +++ If already loading or no more data, stop.
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      // +++ Make GET request with pagination params.
      const res = await api.get(`/profiles?page=${page}&limit=10`);

      if (res.data.length === 0) {
        // +++ No more data to load.
        setHasMore(false);
      } else {
        // +++ Append new profiles to existing list.
        setProfiles(prev => [...prev, ...res.data]);
        // +++ Increment page number for next fetch.
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError('Failed to load profiles. Check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // +++ Fetch profiles on initial component mount.
  useEffect(() => {
    fetchProfiles();
  }, []);

  // +++ Render individual profile item.
  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      // +++ Navigate to details screen with profile ID.
      onPress={() => navigation.navigate('ProfileDetail', { id: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </Pressable>
  );

  // +++ Render loading indicator at the bottom.
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  };

  // +++ Display error message if initial load fails.
  if (error && profiles.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={fetchProfiles}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        // +++ Trigger fetch when scrolling to end.
        onEndReached={fetchProfiles}
        // +++ Threshold to trigger onEndReached.
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    // Shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});