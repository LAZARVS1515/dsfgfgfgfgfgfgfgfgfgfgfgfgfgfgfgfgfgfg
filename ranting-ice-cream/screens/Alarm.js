import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  TextInput,
} from 'react-native';
import {Audio} from "expo-av"
import { Header } from 'react-native-elements';
export default class AlarmScreen extends React.Component {
  playSound = async () => {
    await Audio.Sound.createAsync(
      { uri: 'http://soundbible.com/mp3/Buzzer-SoundBible.com-188422102.mp3' },
      { shouldPlay: true }
    );
  };
  constructor() {
    super();
    this.state = { alarmTime: '', currentTime: '' };
    this.setAlarmTime = this.setAlarmTime.bind(this);
  }
  checkAlarmClock() {
    if (this.state.alarmTime ==='undefined' || !this.state.alarmTime){
      this.alarmMessage = 'Please Set Your Alarm';
      
    }
    else {
      this.alarmMessage = 'Your Alarm Is Set For ' + this.state.alarmTime + '.';
      if (this.state.currentTime === this.state.alarmTime) {
        this.playSound();
      }
       else {
        console.log('Not Yet');
        console.log(this.state.alarmTime)
      }
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => this.checkAlarmClock(), 1000);
    this.clock = setInterval(() => this.setCurrentTime(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.clock);
  }

  setCurrentTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
  })}
  setAlarmTime(event) {
    event.preventDefault();
    const inputAlarmTime = event.target.value + ':00';
    this.setState({ alarmTime: inputAlarmTime });
  }
  render() {
    return (
      <View>
        <Header
          backgroundColor={'#ff6869'}
          leftComponent={{ icon: 'home' }}
          rightComponent={{ icon: 'settings' }}
          centerComponent={{
            text: 'Alarm Settings',
            style: { color: 'black', fontSize: 29 },
          }}
        />
        <Text style={styles.timethingamajigers}>
          It Is {this.state.currentTime}
        </Text>
        <Text style={styles.messagethingamajigers}>{this.alarmMessage}</Text>
        <View style={styles.viewthingamajigers}>
          <input type="time" onChange={this.setAlarmTime}></input>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timethingamajigers: {
    color: 'black',
    justifyContent: 'center',
    alignSelf:'center',
    fontSize: 36,
    fontVariant: 'bold',
  },
  messagethingamajigers: {
    color: 'black',
    marginTop:60,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 24,
  },
  viewthingamajigers: {
    marginTop: 100,
    marginLeft:70,
    width: 220,
    height: 24,
    justifyContent:'center',
    shadowColor: 'black',
    borderRadius: 110,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 20,
  },
});