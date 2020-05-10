import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';

const INTERVAL_TIME = 180000;
const TimerComponent = (props: { isRecording: boolean }) => {

  const [timerRunning, setTimerRunning] = React.useState(props.isRecording);
  const [time, setTime] = React.useState();

  React.useEffect(() => {
    if (!props.isRecording) {
      setTimerRunning(false);
      return;
    }
    setTimerRunning(true);
  }, [props.isRecording]);

  const getFormattedTime = (time) => {
    setTime(time);
  }

  const handleFinish = () => {
  }

  return (
    <View style={styles.buttonContainer}>
        <Timer
          totalDuration={INTERVAL_TIME}
          start={timerRunning}
          reset={!timerRunning}
          getTime={getFormattedTime}
          handleFinish={handleFinish}
        />
    </View>
  );

};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    position: "absolute",
    width: "100%",
    display: "flex",
    top: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
    backgroundColor: "blue",
    width: "100%",
    top: 50,
    textAlign: "center",
    padding: 15
  },
});

export default TimerComponent;