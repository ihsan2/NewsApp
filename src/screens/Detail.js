import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {Icon, Divider} from 'react-native-elements';
import moment from 'moment';
import {Button, Toast} from 'native-base';

export default class Detail extends Component {
  constructor() {
    super();
    this.state = {
      like: false,
    };
  }

  onLike = () => {
    this.setState({like: !this.state.like}, () => {
      if (this.state.like) {
        Toast.show({
          buttonText: 'Okay',
          text: 'Add to Favourite',
          type: 'success',
        });
      } else {
        Toast.show({
          buttonText: 'Okay',
          text: 'Remove to Favourite',
          type: 'danger',
        });
      }
    });
  };

  render() {
    const {info} = this.props.route.params;

    return (
      <>
        <SafeAreaView style={styles.container}>
          <ImageBackground
            style={styles.backImg}
            source={{
              uri: info.urlToImage
                ? info.urlToImage
                : 'https://seeba.se/wp-content/themes/consultix/images/no-image-found-360x260.png',
            }}>
            <StatusBar
              barStyle={'light-content'}
              translucent={true}
              backgroundColor={'rgba(52, 51, 54, 0.2)'}
            />
            <View style={styles.icStar}>
              <TouchableOpacity onPress={this.onLike}>
                <Icon
                  name={this.state.like ? 'star' : 'star-border'}
                  type={'material'}
                  color={'#fff'}
                  size={36}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.icLeft}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name="chevron-left"
                  type="evilicon"
                  color={'#fff'}
                  size={40}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <ScrollView>
            <Text style={styles.source}>
              {info.source.name ? info.source.name : 'Anonymous'}
            </Text>
            <Text style={styles.title}>{info.title.split(' - ')[0]}</Text>
            <Divider style={styles.div} />
            <Text style={styles.author}>
              {info.author ? info.author : 'Anonymous'} -{' '}
              {info.source.name ? info.source.name : 'Anonymous'}
            </Text>
            <Text style={styles.time}>
              {moment(info.publishedAt).format('dddd, D MMMM YYYY HH:mm')}
            </Text>
            <Text style={styles.content}>
              {info.content ? info.content.split(' [')[0] : info.description}
            </Text>
            <Button
              style={styles.btn}
              onPress={() =>
                this.props.navigation.navigate('WebDetail', {url: info.url})
              }>
              <Text style={styles.btnText}>Read More</Text>
            </Button>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImg: {
    width: w('100%'),
    height: h('32%'),
  },
  icStar: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: w('4%'),
    marginTop: h('5.4%'),
  },
  icLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    marginLeft: w('4%'),
    marginTop: h('5.4%'),
  },
  source: {
    marginLeft: w('4%'),
    marginTop: h('2.4%'),
    fontSize: w('4.2'),
    fontWeight: 'bold',
    color: '#21499D',
  },
  title: {
    marginLeft: w('4%'),
    marginRight: w('4%'),
    marginTop: h('0.6%'),
    fontSize: w('5.4'),
    fontWeight: 'bold',
    color: '#000',
  },
  div: {
    marginTop: h('2.4%'),
  },
  author: {
    marginLeft: w('4%'),
    marginTop: h('2.4%'),
    fontSize: w('3%'),
    color: '#AEB4BA',
    fontWeight: '200',
  },
  time: {
    marginLeft: w('4%'),
    marginTop: h('0.24%'),
    fontSize: w('3%'),
    color: '#AEB4BA',
    fontWeight: '200',
  },
  content: {
    marginLeft: w('4%'),
    marginRight: w('2%'),
    marginTop: h('1.2%'),
    fontSize: w('4.2%'),
    color: '#000',
    fontWeight: '200',
    marginBottom: h('2%'),
  },
  btn: {
    marginBottom: h('2%'),
    width: w('32%'),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: w('2.4%'),
    backgroundColor: '#424242',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: w('4.2'),
  },
});
