import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PantallaFormulario from './componentes/formulario';
import NavigationTab from './src/navigation/navigationtab';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
     <NavigationContainer>
      <NavigationTab/>
     </NavigationContainer>

  );
}

