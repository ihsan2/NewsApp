import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';

const NoResult = () => {
  return (
    <>
      <View style={styles.view}>
        <Image
          source={{
            uri:
              'https://cdn.shopify.com/s/files/1/1061/1924/products/Unhappy_Face_Emoji_Icon_ios10_1024x1024.png?v=1571606093',
          }}
          style={styles.image}
        />
        <Text style={styles.text}>Sorry... No Result Found!</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    height: h('20%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: w('20%'),
    height: h('10.2%'),
  },
  text: {
    color: '#7B7D7D',
    fontSize: w('4.2%'),
    fontWeight: 'bold',
    marginTop: h('2.4%'),
  },
});

export default NoResult;
