import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import Loading from 'react-native-spinkit';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {Toast} from 'native-base';

export default class Splash extends Component {
  componentDidMount = () => {
    setTimeout(async () => {
      await AsyncStorage.getItem('userInfo').then(res => {
        if (res === null) {
          this.props.navigation.navigate('Login');
          Toast.show({
            text: 'You are not logged in',
            buttonText: 'Okay',
            duration: 3000,
          });
        } else {
          this.props.navigation.navigate('Home');
          Toast.show({
            text: 'You have logged in',
            buttonText: 'Okay',
            type: 'success',
            duration: 3000,
          });
        }
      });
    }, 2800);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={require('../public/logo.png')} />
        <Loading
          style={styles.load}
          type="FoldingCube"
          size={54}
          color={'#E78200'}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: w('54%'),
    height: h('24'),
  },
  load: {
    position: 'absolute',
    bottom: 0,
    marginBottom: h('12%'),
  },
});
