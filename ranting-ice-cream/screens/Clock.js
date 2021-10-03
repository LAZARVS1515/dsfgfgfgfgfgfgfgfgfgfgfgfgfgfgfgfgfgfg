import * as React from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Header } from 'react-native-elements';
export default class ClockScreen extends React.Component {
  
  animatedValue = new Animated.Value(0);
  animatedSec = new Animated.Value(0);
  animatedScale = new Animated.Value(0);
  constructor() {
    super();
    this.state = { currentTime: '', alarmTime: '' };
  }
  setCurrentTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString('en-US', { hour12: false }),
    });
  }
  animation = () => {
    Animated.timing(this.animatedValue, {
      toValue: this.animatedSec,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  componentDidMount() {
    this.animation();
    const date = new Date();
    let seconds =
      +(date.getHours() * 60 * 60) + date.getMinutes() * 60 + date.getSeconds();
    setInterval(() => {
      seconds = seconds + 1;
      this.animatedSec.setValue(seconds);
    }, 1000);
  }

  render() {
    const inputs = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const size = 200;
    const interpolate = {
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    };
    const sec = Animated.multiply(this.animatedValue, 6);
    const secInterpolation = sec.interpolate(interpolate);
    const min = Animated.divide(sec, new Animated.Value(60));
    const minInterpolation = min.interpolate(interpolate);
    const hour = Animated.divide(min, new Animated.Value(12));
    const hourInterpolation = hour.interpolate(interpolate);
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#ff6869'}
          leftComponent={{ icon: 'home' }}
          rightComponent={{ icon: 'settings' }}
          centerComponent={{
            text: 'Clock Screen',
            style: { color: 'black', fontSize: 31 },
          }}
        />
        <View style={styles.bg}>
          <View
            style={{
              position: 'absolute',
              left: 10,
              top: 10,
            }}>
            {inputs.map((item, index) => {
              const rotate = `${index * 30}deg`;
              return (
                <View
                  style={{
                    width: size,
                    height: size,
                    alignItems: 'center',
                    position: 'absolute',
                    transform: [{ rotate }],
                  }}>
                  <View
                    style={{ width: 1.5, height: 10, backgroundColor: 'red' }}
                  />
                </View>
              );
            })}
            <Animated.View
              style={{
                width: size,
                height: size,
                alignItems: 'center',
                position: 'absolute',
                transform: [{ rotate: secInterpolation }],
              }}>
              <View
                style={{
                  width: 1,
                  height: size * 0.45,
                  backgroundColor: '#ff5b00',
                  marginTop: size * 0.05,
                }}
              />
            </Animated.View>

            <Animated.View
              style={{
                width: size,
                height: size,
                alignItems: 'center',
                position: 'absolute',
                transform: [{ rotate: minInterpolation }],
              }}>
              <View
                style={{
                  width: 2,
                  height: size * 0.45,
                  backgroundColor: 'black',
                  marginTop: size * 0.05,
                }}
              />
            </Animated.View>

            <Animated.View
              style={{
                width: size,
                height: size,
                alignItems: 'center',
                position: 'absolute',
                transform: [{ rotate: hourInterpolation }],
              }}>
              <View
                style={{
                  width: 2.5,
                  height: size * 0.3,
                  backgroundColor: 'black',
                  marginTop: size * 0.2,
                }}
              />
            </Animated.View>
          </View>

          <Animated.View
            style={[styles.bg, { transform: [{ scale: this.animatedScale }] }]}
          />
        </View>
        <TouchableOpacity style={styles.buttonStyle} onPress={() =>
                        this.props.navigation.navigate("Alarm")}>
          <Text style={styles.textStyle}> Set An Alarm </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  buttonStyle: {
    width: 130,
    height: 38,
    borderRadius: 10,
    alignSelf: 'center',
    padding: 7.5,
    margin: 5,
    marginTop: 70,
    backgroundColor: '#ff6868',
  },
  textStyle: {
    color: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
    fontVariant: 'bold',
  },
  bg: {
    width: 220,
    height: 220,
    marginTop: 100,
    marginLeft: 60,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 20,
  },
});