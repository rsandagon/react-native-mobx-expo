import React, { Component } from 'react';
import { inject , observer} from 'mobx-react';
import LoginContainer from './LoginContainer'
import MapContainer from './MapContainer'

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
        <LoginContainer/>
      );
    }
  }
}
