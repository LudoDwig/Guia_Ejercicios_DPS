import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaFormulario from '../../componentes/formulario';
import PantallaMostrarDatos from '../../componentes/informacion';

const Stack = createNativeStackNavigator();
const Ej1Stack = () =>{
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Clinica Anaya" component={PantallaFormulario} />   
        <Stack.Screen name="Datos Generales" component={PantallaMostrarDatos} />   
      </Stack.Navigator>
  );
}

export default Ej1Stack;
