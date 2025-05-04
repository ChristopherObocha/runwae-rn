import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export default function OnboardingScreen2() {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 1000 }}
        style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/Logo 2.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </MotiView>

      <View style={styles.content}>
        <Text style={styles.title}>Track Your Progress</Text>
        <Text style={styles.description}>
          Monitor your runs, set goals, and watch your improvement over time
          with detailed analytics.
        </Text>
      </View>

      <Link href="/(onboarding)/screen3" style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.8,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#4c669f',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
