import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Image, BackHandler, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {API_KEY} from 'react-native-dotenv';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: [],
      backCount: 0,
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '757622213448-8f84te3h0889unf11fb5n3miqnktipvc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      this.props.navigation.push('Home');
      Toast.show({
        text: 'Success Login!',
        buttonText: 'Okay',
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <Image style={styles.image} source={require('../public/logo.png')} />
          <GoogleSigninButton
            style={styles.btn}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={false}
          />
          <Text>{API_KEY}</Text>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: w('72%'),
    height: h('8%'),
  },
  image: {
    width: w('54%'),
    height: h('24'),
  },
});
