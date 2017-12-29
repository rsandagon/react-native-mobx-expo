import React, { Component } from 'react'
import { inject , observer} from 'mobx-react'
import LoginContainer from './LoginContainer'
import MainRouter from './MainRouter'

@inject('userStore','appStore')
@observer
export default class MainContainer extends Component {

  render() {
    if (this.props.userStore.isLogin) {
      return (
        < MainRouter/>
      )
    } else {
      return (
          <LoginContainer/>
      );
    }
  }
}
