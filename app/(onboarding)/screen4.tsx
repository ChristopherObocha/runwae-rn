import { Link } from 'expo-router';
import { MotiView } from 'moti';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function OnboardingScreen4() {
  return (
    <View style={styles.container}>
      <MotiView
        style={styles.imageContainer}
        from={{ rotate: '0deg' }}
        animate={{ rotate: '360deg' }}
        transition={{
          type: 'timing',
          duration: 2000,
          loop: true,
        }}>
        <Svg width={width * 0.8} height={width * 0.8} viewBox="0 0 374 496">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M311.418 307.409C278.339 409.637 168.651 465.693 66.4226 432.614C-35.8053 399.535 -91.8614 289.847 -58.7821 187.619C-53.8229 172.293 -47.1418 158.005 -39.0223 144.899C-43.8186 153.853 -47.886 163.358 -51.1235 173.363C-80.3785 263.773 -30.8031 360.779 59.6061 390.034C150.015 419.289 247.022 369.714 276.277 279.305C305.532 188.896 255.957 91.8886 165.548 62.6337C143.821 55.6032 121.712 53.1254 100.255 54.6729C128.257 50.8682 157.529 53.1322 186.213 62.414C288.441 95.4933 344.497 205.181 311.418 307.409Z"
            fill="white"
            fillOpacity="0.28"
          />
          <Circle cx="55.5" cy="210.5" r="6.5" fill="white" />
          <Circle cx="248.5" cy="218.5" r="8.5" fill="white" />
          <Circle cx="55" cy="429" r="10" fill="white" />
        </Svg>
      </MotiView>

      <View style={styles.content}>
        <Text style={styles.title}>Ready to Start?</Text>
        <Text style={styles.description}>
          Begin your running journey today and discover a new way to track and
          improve your performance.
        </Text>
      </View>

      <Link href="/(tabs)/explore" style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
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
