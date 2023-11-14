import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ej1Stack from './ejercicio1Stack';
import Ej3Stack from './ejercicio3Stack';
import Ej2Stack from './ejercicio2Stack';

const Tab=createBottomTabNavigator();
export default function NavigationTab(){
  return(
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="ejercicio1" component={Ej1Stack} options={{title: 'Ej1'}}/>
      <Tab.Screen name="ejercicio2" component={Ej2Stack} options={{title: 'Ej2'}}/>
      <Tab.Screen name="ejercicio3" component={Ej3Stack} options={{title: 'Ej3'}}/>
    </Tab.Navigator>
  )
}