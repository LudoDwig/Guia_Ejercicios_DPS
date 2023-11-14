import React, { useState } from 'react';
import { View, Text, Button, ScrollView, Alert, StyleSheet, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const PantallaMostrarDatos = ({ route }) => {
  const {
    nombre,
    apellido,
    genero,
    fechaNacimiento,
    telefono,
    casa,
    correo,
    direccionCasa,
    documento1,
    documento2,
    // Agrega el resto de las variables que pasaste
  } = route.params;
  const calcularEdad = (fechaNacimiento) => {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    // Ajustar la edad para verificar si ya pasó su cumpleaños de este año
    const mesActual = fechaActual.getMonth();
    const mesNacimiento = fechaNac.getMonth();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNac.getDate())) {
      return edad - 1;
    }

    return edad;
  };
  const edad = calcularEdad(fechaNacimiento);

  // Clasificar la edad
  let clasificacion = '';
  if (edad >= 0 && edad <= 5) {
    clasificacion = 'Primera infancia';
  } else if (edad >= 6 && edad <= 11) {
    clasificacion = 'Infancia';
  } else if (edad >= 12 && edad <= 18) {
    clasificacion = 'Adolescencia';
  } else if (edad >= 19 && edad <= 26) {
    clasificacion = 'Juventud';
  } else if (edad >= 27 && edad <= 59) {
    clasificacion = 'Adultez';
  } else {
    clasificacion = 'Adulto mayor';
  }

  return (<ImageBackground
    source={require('../src/img/amaya-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
    style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nombre: {nombre}</Text>
        <Text style={styles.title}>Apellido: {apellido}</Text>
        <Text style={styles.title}>Género: {genero}</Text>
        <Text style={styles.title}>Fecha de Nacimiento: {fechaNacimiento}</Text>
        <Text style={styles.title}>Teléfono: {telefono}</Text>
        <Text style={styles.title}>Teléfono de Casa: {casa}</Text>
        <Text style={styles.title}>Correo Electrónico: {correo}</Text>
        <Text style={styles.title}>DUI: {documento1}</Text>
        <Text style={styles.title}>NIT: {documento2}</Text>
      </View>
      <View style={styles.edadContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>Clasificación de edad:</Text>
        <Text style={styles.title}>{`Edad: ${edad} años - ${clasificacion}`}</Text>
      </View>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 255, 0.35)',
    padding: 20,
    
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(230, 231, 254, 0.85)',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  edadContainer: {
    backgroundColor: 'rgba(230, 231, 254, 0.85)',
    marginTop: 20,
   
    alignItems: 'center',
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Puedes ajustar la propiedad de redimensionamiento según tus necesidades
  },
});
export default PantallaMostrarDatos;
