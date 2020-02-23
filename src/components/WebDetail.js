import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';

class WebDetail extends Component {
  render() {
    const {url} = this.props.route.params;
    return <WebView source={{uri: url}} style={{marginTop: h('3.6%')}} />;
  }
}

export default WebDetail;
