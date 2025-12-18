import { View, Text, StyleSheet } from 'react-native';

export default function ProfilesListScreen() {
  return (
    <View style={styles.container}>
      <Text>Profiles List Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});