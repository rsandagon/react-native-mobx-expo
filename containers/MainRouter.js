import React, { Component } from 'react'

import SideBar from './SideBar'

import HomeScreen from './HomeScreen'
import CalendarScreen from './CalendarScreen'
import LocationScreen from './LocationScreen'
import VehicleScreen from './VehicleScreen'
import PaymentScreen from './PaymentScreen'

import { DrawerNavigator } from 'react-navigation'

const MainRouter = DrawerNavigator(
  {
    Home: {screen: HomeScreen},
    Calendar: {screen: CalendarScreen},
    Location: {screen: LocationScreen},
    Vehicle: {screen: VehicleScreen},
    Payment: {screen: PaymentScreen},
  },
  {
    contentComponent: props => <SideBar {...props}/>,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
);

export default MainRouter;