import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input } from 'native-base';
import { Image, View, Alert, Dimensions } from 'react-native';
import { Constants, Facebook } from 'expo';
import { inject, observer } from 'mobx-react';
import AppStore from '../stores/AppStore';

@inject('userStore', 'appStore')
@observer
export default class LoginContainer extends Component {
  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with '560009041005370' in prod
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();

          console.log('user:', profile)

          this.props.userStore.logInUser(profile)

          Alert.alert(
            'You\'ve succesfully Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  _handleEmailLogin = async () => {
    //mocklogin
    this.props.userStore.logInUser({name:'test user',id:123})
  }

  render() {
    const { height: screenHeight } = Dimensions.get('window');
    const styles = {
      contentStyle: {
        backgroundColor: '#2e2e2e',
        flex: 1,
        height: screenHeight,
        justifyContent: 'center',
        alignItems: 'center'
      },
      backgroundStyle: { flex: 1, height: undefined, width: undefined, opacity: 0.25 },
      loginContainerStyle: { justifyContent: 'center', marginTop: 60 },
      textWithLinesStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
      },
      horizontalLineStyle: {
        borderBottomColor: '#c7c7c7',
        borderBottomWidth: 1,
        flex: 1
      },
      smallTextStyle: {
        fontSize: 12,
        paddingLeft: 5,
        paddingRight: 5,
        color:'#c7c7c7',
      },
      emailButtonStyle: {
        marginTop: 20,
      }
    }

    return (
      <Container>
        <Content contentContainerStyle={styles.contentStyle}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: screenHeight,
            }}
          >
            <Image style={styles.backgroundStyle}
              source={require("../assets/images/splash.png")}
              resizeMode='contain'
            />
          </View>
          <View style={styles.loginContainerStyle}>

            <Button iconLeft onPress={this._handleFacebookLogin}>
              <Icon name='logo-facebook' />
              <Text>Continue with Facebook</Text>
            </Button>

            <View style={styles.textWithLinesStyle}>
              <View style={styles.horizontalLineStyle} />
              <Text style={styles.smallTextStyle}>OR ENTER YOUR EMAIL</Text>
              <View style={styles.horizontalLineStyle} />
            </View>

            <Item>
              <Input placeholder="Email" />
            </Item>

            <Button iconLeft block success style={styles.emailButtonStyle} onPress={this._handleEmailLogin}>
              <Icon name='md-mail' />
              <Text>Login with email</Text>
            </Button>

          </View>
        </Content>
      </Container>
    );
  }
}

