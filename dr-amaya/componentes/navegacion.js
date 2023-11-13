import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaFormulario from './formulario';
import PantallaMostrarDatos from './informacion';

// Importa otras pantallas si es necesario

const Stack = createNativeStackNavigator();
const NavegacionApp = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Clinica Anaya" component={PantallaFormulario} />   
        <Stack.Screen name="Datos Generales" component={PantallaMostrarDatos} />   
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavegacionApp;
