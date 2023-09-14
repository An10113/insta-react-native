import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

export default function Add() {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null)
  const [permission, requestPermission] = Camera.useCameraPermissions();

  //   if (!permission) ...

  //   if (!permission.granted) ...

    const takePicture = async () => {
        if(camera){
            const data = camera.takePictureAsync(null)
            console.log(data.uri)
        }
    }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera ref={ref => setCamera(ref)} style={styles.camera} type={type} ratio={"1:1"} />
      </View>

      <Button
        style={styles.button}
        onPress={toggleCameraType}
        title="flip image"
      >
      </Button>
      <Button title="take a picture" onPress={() => takePicture()}>

      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
});
