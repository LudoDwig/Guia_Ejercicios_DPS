import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ejercicio3 from '../../screens/ejercicio3';
import Equipos from '../../screens/InfoEquipos';
import Integrantes from '../../screens/InfoMembers';
import Resumen from '../../screens/GeneraInfo';
import Equipo from '../../screens/InfoTeam';
import Member from '../../screens/infoMember';

const Stack = createNativeStackNavigator();

export default function Ej3Stack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Ej3" component={Ejercicio3} options={{title: 'Inscripcion de equipos'}}/>
      <Stack.Screen name="Informacion de Equipos" component={Equipos} />   
      <Stack.Screen name="Informacion de Miembros" component={Integrantes} />   
      <Stack.Screen name="Equipo" component={Equipo} />  
      <Stack.Screen name="Miembro" component={Member} />  
      <Stack.Screen name="Resumen de datos" component={Resumen} /> 
    </Stack.Navigator>
  )
}