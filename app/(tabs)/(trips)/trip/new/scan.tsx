import { useRef, useState } from 'react';
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
import { useJoinTripCallback } from '@/stores/TripListStore';

export default function ScanQRCode() {
  const [permission, requestPermission] = useCameraPermissions();
  const joinTripCallback = useJoinTripCallback();
  const router = useRouter();

  const [qrCodeDetected, setQrCodeDetected] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.message}>
          We need your permission to show the camera
        </ThemedText>
        <Button onPress={requestPermission} variant="ghost">
          Grant permission
        </Button>
      </View>
    );
  }

  const handleConfirmJoinList = () => {
    joinTripCallback(qrCodeDetected);
    if (router.canDismiss()) {
      router.dismiss();
    }
    router.push({
      pathname: '/trip/[tripId]',
      params: { tripId: qrCodeDetected },
    });
  };

  const handleBarcodeScanned = (
    barcodeScanningResult: BarcodeScanningResult
  ) => {
    const qrCodeUrl = barcodeScanningResult.data;

    // Extract listId from QR code URL
    const tripIdMatch = qrCodeUrl.match(/tripId=([^&]+)/);
    if (tripIdMatch) {
      const tripId = tripIdMatch[1];
      setQrCodeDetected(tripId);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setQrCodeDetected('');
      }, 1000);
    }
  };

  return (
    <CameraView
      style={styles.camera}
      facing="back"
      barcodeScannerSettings={{
        barcodeTypes: ['qr'],
      }}
      onBarcodeScanned={handleBarcodeScanned}>
      <View style={styles.contentContainer}>
        {qrCodeDetected ? (
          <View style={styles.detectedContainer}>
            <ThemedText style={styles.detectedText} type="title">
              🥳 QR code detected!!!
            </ThemedText>
            <Button onPress={handleConfirmJoinList} variant="ghost">
              Join trip
            </Button>
          </View>
        ) : (
          <ThemedText style={styles.instructionText} type="defaultSemiBold">
            Point the camera at a valid Trip QR Code
          </ThemedText>
        )}
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  camera: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  detectedContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 30,
  },

  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  detectedText: {
    color: 'white',
    marginBottom: 16,
  },
  instructionText: {
    color: 'white',
  },
});
