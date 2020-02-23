import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import moment from 'moment';

const ListNews = props => {
  const {item, navigation} = props;
  const time = moment(item.publishedAt).format('dddd, D MMMM YYYY HH:mm');
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Detail', {
            info: item,
          })
        }>
        <View style={styles.view}>
          <Image
            style={styles.image}
            source={{
              uri: item.urlToImage
                ? item.urlToImage
                : 'https://seeba.se/wp-content/themes/consultix/images/no-image-found-360x260.png',
            }}
          />
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.author}>
            {item.source.name ? item.source.name : 'Anonymous'} | {time}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    width: w('92%'),
    alignSelf: 'center',
    marginTop: h('2'),
    borderRadius: w('2.4%'),
    backgroundColor: '#fff',
    paddingBottom: w('2%'),
  },
  image: {
    width: w('92%'),
    height: h('24%'),
    borderTopLeftRadius: w('2.4%'),
    borderTopRightRadius: w('2.4%'),
  },
  text: {
    fontSize: w('4.2%'),
    fontWeight: 'bold',
    padding: w('2%'),
  },
  author: {
    fontSize: w('3%'),
    color: '#AEB4BA',
    paddingLeft: w('2%'),
    paddingRight: w('2%'),
    fontWeight: '200',
  },
});

export default ListNews;
