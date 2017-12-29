import React, { Component } from 'react'
import {Dimensions} from 'react-native'
import { inject, observer } from 'mobx-react'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';


@inject('userStore', 'appStore')
@observer
export default class HomeScreen extends Component {

  render() {
    const { height: screenHeight } = Dimensions.get('window');
    const styles = {
      contentStyle: {
        backgroundColor: '#2e2e2e',
        flex: 1,
        height: screenHeight,
        justifyContent: 'center',
        alignItems: 'center'
      }
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={styles.contentStyle}>
          <Text>
            This is Content Section
          </Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
