import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Home, Feeds} from './screens/camerafeeds';
import {Music} from './screens/music';
import {Alarms} from './screens/alarmscreen';
import { Settings, Editing } from './screens/feedsettings';


const Stack = createStackNavigator();

export default function MyTabs() {
    return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Feeds" component={Feeds} />
        <Stack.Screen name="Music" component={Music} />
        <Stack.Screen name="Alarms" component={Alarms} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Editing" component={Editing} />
      </Stack.Navigator>
    );
  }