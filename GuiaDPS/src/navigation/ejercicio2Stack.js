import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ejercicio2 from '../../screens/ejercicio2';

const Stack = createNativeStackNavigator();

export default function Ej2Stack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Ej2" component={Ejercicio2} options={{title: 'Consultas de IPS'}}/>
    </Stack.Navigator>
  )
}