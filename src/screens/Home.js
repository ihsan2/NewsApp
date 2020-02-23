import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import NoResult from '../components/NoResult';
import {connect} from 'react-redux';
import {getNews, getSearchNews} from '../public/redux/actions/news';
import {getNewsUrl, getSearchNewsUrl} from '../api';
import {Header, Body, Right, Button, Toast} from 'native-base';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {Icon, SearchBar} from 'react-native-elements';
import ListNews from '../components/ListNews';
import {Menu, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin} from '@react-native-community/google-signin';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      news: [],
      page: 1,
      pageSize: 10,
      country: 'id',
      search: '',
      clickSearch: '',
      user: {},
    };
  }

  componentDidMount = async () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '757622213448-8f84te3h0889unf11fb5n3miqnktipvc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    });
    await AsyncStorage.getItem('userInfo').then(res => {
      const user = JSON.parse(res).user;
      this.setState({user});
    });
    this.getData();
  };

  handleRefresh = () => {
    this.getData();
  };

  handleLoadMore = () => {
    this.setState({page: this.state.page + 1}, () => {
      this.props
        .getSearch(
          getSearchNewsUrl(
            this.state.search,
            this.state.page,
            this.state.pageSize,
          ),
        )
        .then(() => {
          this.setState({
            news: [...this.state.news, ...this.props.dataSearch.data],
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  onSearch = search => {
    this.setState({search});

    this.props
      .getSearch(getSearchNewsUrl(search, this.state.page, this.state.pageSize))
      .then(() => {
        this.setState({
          news: this.props.dataSearch.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getData = async () => {
    const {page, pageSize, country} = this.state;
    await this.props.get(getNewsUrl(page, pageSize, country));
  };

  signOut = async () => {
    Alert.alert(
      'Logout',
      'Are you sure to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();
              await AsyncStorage.removeItem('userInfo');
              this.props.navigation.navigate('Login');
              Toast.show({
                text: 'Logout Success',
                buttonText: 'Okay',
                type: 'info',
                duration: 3000,
              });
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={'rgba(43,47,51, 0.9)'}
            barStyle={'light-content'}
            translucent={false}
          />
          {this.state.clickSearch ? (
            <SearchBar
              showLoading={this.props.dataSearch.isLoading}
              searchIcon={() => (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      clickSearch: !this.state.clickSearch,
                      search: '',
                      page: 1,
                    })
                  }>
                  <Icon name="chevron-small-left" type="entypo" color="#fff" />
                </TouchableOpacity>
              )}
              placeholderTextColor={'#fff'}
              placeholder="Search News ..."
              onChangeText={val => {
                this.onSearch(val);
              }}
              onClear={() => {
                this.setState({search: '', page: 1});
              }}
              value={this.state.search}
              inputStyle={styles.colorStyle}
            />
          ) : (
            <Header style={styles.header}>
              <StatusBar
                backgroundColor={'rgba(43,47,51, 0.9)'}
                barStyle={'light-content'}
                translucent={false}
              />
              <Body>
                <Text style={styles.textHeader}>Home</Text>
              </Body>
              <Right style={styles.right}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      clickSearch: !this.state.clickSearch,
                    })
                  }>
                  <Icon name="search" type="fontisto" color="#fff" size={30} />
                </TouchableOpacity>
                <Menu>
                  <MenuTrigger>
                    <Image
                      style={styles.imgProfile}
                      source={{
                        uri: this.state.user.photo,
                      }}
                    />
                  </MenuTrigger>
                  <MenuOptions>
                    <Image
                      style={styles.imgProfile1}
                      source={{
                        uri: this.state.user.photo,
                      }}
                    />
                    <Text style={styles.txName}>{this.state.user.name}</Text>
                    <Text style={styles.txEmail}>{this.state.user.email}</Text>
                    <Button
                      style={styles.logout}
                      danger
                      onPress={this.signOut.bind(this)}>
                      <Text style={styles.txLogout}>Sign Out</Text>
                    </Button>
                  </MenuOptions>
                </Menu>
              </Right>
            </Header>
          )}
          <View style={styles.body}>
            {this.state.search ? (
              <>
                <Text style={styles.text}>
                  Search Results ({this.props.dataSearch.totalResults})
                </Text>
                {!this.props.dataSearch.totalResults ? (
                  <NoResult />
                ) : (
                  <FlatList
                    data={this.state.news}
                    renderItem={({item}) => (
                      <ListNews
                        item={item}
                        navigation={this.props.navigation}
                      />
                    )}
                    keyExtractor={(item, index) => `${item.title}-${index}`}
                    style={styles.list}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() =>
                      this.props.data.isLoading ? (
                        <ActivityIndicator style={styles.loadMore} />
                      ) : (
                        <></>
                      )
                    }
                  />
                )}
              </>
            ) : (
              <>
                <Text style={styles.text}>Top Headlines</Text>
                <FlatList
                  data={this.props.data.data}
                  renderItem={({item}) => (
                    <ListNews item={item} navigation={this.props.navigation} />
                  )}
                  keyExtractor={(item, index) => `${item.title}-${index}`}
                  style={styles.list}
                  onRefresh={this.handleRefresh}
                  refreshing={this.state.refreshing}
                />
              </>
            )}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(43,47,51,1)',
  },
  textHeader: {
    fontSize: w('6%'),
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: w('5%'),
  },
  right: {
    marginRight: w('3.2%'),
  },
  colorStyle: {
    color: '#fff',
  },
  body: {
    flex: 1,
    backgroundColor: '#CBD2D8',
  },
  list: {marginBottom: h('2%')},
  text: {
    marginTop: h('2%'),
    marginLeft: h('2%'),
    fontSize: w('5.4%'),
    fontWeight: 'bold',
    color: '#20409A',
  },
  imgProfile: {
    width: w('8%'),
    height: h('4%'),
    borderRadius: w('50%'),
    marginLeft: w('3.2%'),
  },
  imgProfile1: {
    width: w('20%'),
    height: h('10%'),
    borderRadius: w('50%'),
    alignSelf: 'center',
    marginTop: h('2.4%'),
  },
  txName: {
    alignSelf: 'center',
    fontSize: w('4.2%'),
    marginTop: h('1.2%'),
    fontWeight: 'bold',
  },
  txEmail: {
    alignSelf: 'center',
    fontSize: w('3.6%'),
  },
  logout: {
    width: w('32%'),
    marginTop: h('1.2%'),
    marginBottom: h('1.2%'),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: w('1.2'),
  },
  txLogout: {
    fontSize: w('4.2%'),
    fontWeight: '900',
    color: '#fff',
  },
});

const mapStateToProps = state => {
  return {
    data: state.news,
    dataSearch: state.search,
  };
};

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getNews(url)),
  getSearch: url => dispatch(getSearchNews(url)),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Home);
