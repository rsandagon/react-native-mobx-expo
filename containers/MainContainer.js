import React, { Component } from 'react'
import { inject , observer} from 'mobx-react'
import LoginContainer from './LoginContainer'
import MapContainer from './MapContainer'
import getTheme from '../native-base-theme/components'
import variables from '../native-base-theme/variables/platform'

import {StyleProvider} from 'native-base'


@inject('userStore','appStore')
@observer
export default class MainContainer extends Component {

  render() {
    if (this.props.userStore.isLogin) {
      return (
        < MapContainer/>
      );
    } else {
      return (
        <StyleProvider style={getTheme(variables)}>
          <LoginContainer/>
        </StyleProvider>
      );
    }
  }
}
