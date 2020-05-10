import React from 'react';
import { Audio, Video } from 'expo-av';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const PlayBackReview = (props: { videoURI: string, handleDeleteVideo: () => void, handleSaveVideo: () => void }) => {

  let video: any;
  const [play, setPlay] = React.useState(false);

  if (!props.videoURI) {
    return (
      <View></View>
    )
  }

  return (
    <View style={styles.player}>
      <Video
        ref={ref => video = ref}
        source={{ uri: props.videoURI}}
        isMuted
        shouldPlay={play}
        isLooping
        style={styles.video}
      />
      <Text onPress={() => { setPlay(!play); video.presentFullscreenPlayer(); }} style={styles.play}>{play ? 'Stop' : 'Play'}</Text>
      <View style={styles.actionContainer}>
        <Text onPress={props.handleSaveVideo} style={styles.save} >Save</Text>
        <Text onPress={props.handleDeleteVideo} style={styles.delete}>Delete</Text>
      </View>
    </View>
  )

};

const styles = StyleSheet.create({
  player: {
    width: '100%',
    height: '100%',
    padding: 20,
    color: "white",
    position: "absolute",
    backgroundColor: 'black'
  },
  video: {
    width: '100%',
    height: '100%'
  },
  play: {
    width: '100%',
    padding: 10,
    color: 'white',
    backgroundColor: 'blue',
    position: "absolute",
    bottom: 80,
    left: 20
  },
  actionContainer: {
    width: '100%',
    position: "absolute",
    bottom: 45,
    left: 20,
    display: "flex",
    flexDirection: "row"
  },
  save: {
    width: '50%',
    padding: 10,
    backgroundColor: 'white'
  },
  delete: {
    width: '50%',
    padding: 10,
    backgroundColor: 'red'
  }
});

export default PlayBackReview;