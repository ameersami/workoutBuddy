import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraProps } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

import Timer from '../Timer/Timer';
import PlayBackReview  from '../PlayBackReview/PlayBackReview';

const CameraComponent = () => {

  let camera: any = null;
  const [hasCameraPermission, setCameraPersmission] = React.useState(false);
  const [type, setType] = React.useState(Camera.Constants.Type.front);
  const [isRecording, setIsRecording] = React.useState(false);
  const [onBreak, setOnBreak] = React.useState(false);
  const [videoURI, setVideoURI] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const camera = await Permissions.askAsync(Permissions.CAMERA);
      const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setCameraPersmission(camera.status === 'granted' && audio.status === 'granted' && cameraRoll.status === 'granted');
    })();
  }, []);

  const recordVideo = async () => {
    if (camera && !isRecording) {
      setIsRecording(true);
      setVideoURI('');
      const recording = await camera.recordAsync({
        mute: true
      });
      if (recording && recording.uri) {
        setVideoURI(recording.uri);
      }
      return;
    }
    stopRecordVideo();
  };

  const stopRecordVideo = async () => {
    if (camera && isRecording) {
      setIsRecording(false);
      await camera.stopRecording();
    }
  };

  const toggleBreak = () => {
    setOnBreak(!onBreak);
  }

  const handleDeleteVideo = () => {
    setVideoURI('');
  }

  const handleSaveVideo = () => {
    MediaLibrary.saveToLibraryAsync(videoURI)
    setVideoURI('');
  }


  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
      <View style={{ flex: 1 }}>
        <Camera
          style={styles.camera}
          type={type}
          videoStabilizationMode={Camera.Constants.VideoStabilization.off}
          ref={ref => camera = ref}
        >
          <View
            style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={styles.buttonText}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={recordVideo}>
              <Text style={styles.buttonText}> {isRecording ? 'Stop Recording' : 'Record Video'} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleBreak}>
              <Text style={styles.buttonText}>{ onBreak ? 'End Break' : 'Start Break'}</Text>
            </TouchableOpacity>
          </View>
          <Timer isRecording={onBreak}/>
          <PlayBackReview
            videoURI={videoURI}
            handleDeleteVideo={handleDeleteVideo}
            handleSaveVideo={handleSaveVideo}
          />
        </Camera>
      </View>
  );

};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    bottom: 0,
    display: "flex",
    position: "absolute",
    width: "100%"
  },
  button: {
    width: '100%',
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'pink'
  },
  buttonText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black'
  },
  camera: {
    flex: 1
  }
});

export default CameraComponent;