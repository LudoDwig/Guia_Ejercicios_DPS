// PantallaFormulario.js (actualización con Picker para el género)
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image ,StyleSheet, ScrollView, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';



export default function PantallaFormulario ({ navigation })  {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [genero, setGenero] = useState('No especificado');
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [telefono, setTelefono] = useState('');
    const [casa, setCasa] = useState('');
    const [correo, setCorreo] = useState('');
    const [documento1, setDocumento1] = useState('');
    const [documento2, setDocumento2] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [direccionCasa, setDireccionCasa] = useState('')
  
    const guardarDatos = () => {
     
        
        const fechaActual = new Date();
        if (fechaNacimiento > fechaActual) {
          Alert.alert('ERROR: La fecha de nacimiento no puede ser mayor a la actual');
          return;
        }

        if (nombre !== '' && apellido !== '' 
      && 
      direccionCasa !== '' &&
      /^\d{8}-\d$/.test(documento1) &&
      /^\d{4}-\d{6}-\d{3}-\d$/.test(documento2) &&
      fechaNacimiento !== '' &&
      /^[67]\d{7}$/.test(telefono) &&
      /^2\d{7}$/.test(casa) &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(correo)
      ) {
        navigation.navigate('Datos Generales', {
          nombre,
          apellido,
          genero,
          fechaNacimiento: fechaNacimiento.toISOString().split('T')[0],
          telefono,
          casa,
          correo,
          direccionCasa,
          documento1,
          documento2,
        });
      }else{
        Alert.alert('Verifique los datos ingresados')
       
      }
      
    };
    

    return (
      <ImageBackground
      source={require('../src/img/amaya-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
      style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
        <Image
          source={require('../src/img/logo-amaya.jpg')}
          style={styles.logo}
        />
        <Text style={styles.texto}>Clinica Dr.Anaya</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
          style={styles.input}
        />
        <TextInput
          value={apellido}
          onChangeText={setApellido}
          placeholder="Apellido"
          style={styles.input}
        />
        <Picker
          selectedValue={genero}
          onValueChange={(itemValue) => setGenero(itemValue)}
          style={{ height: 50, width: 150, marginBottom: 10 }}
        >
          <Picker.Item label="No especificado" value="No especificado" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
        </Picker>
        <Button style={styles.button} title="Seleccionar Fecha de Nacimiento" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={fechaNacimiento}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || fechaNacimiento;
              setShowDatePicker(false);
              setFechaNacimiento(currentDate);
            }}
          />
        )}
        
        <TextInput
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Número de Teléfono (8 dígitos)"
          style={styles.input}
          maxLength={8}
        />
        <TextInput
          value={casa}
          onChangeText={setCasa}
          placeholder="Número de Casa (8 dígitos)"
          style={styles.input}
          maxLength={8}
        />
        <TextInput
          value={correo}
          onChangeText={setCorreo}
          placeholder="Correo Electrónico (algo@dominio.com)"
          style={styles.input}
        />
        <TextInput
          value={direccionCasa}
          onChangeText={setDireccionCasa}
          placeholder="Direccion"
          style={styles.input}
        />
        <TextInput
          value={documento1}
          onChangeText={setDocumento1}
          placeholder="DUI (00000000-0)"
          style={styles.input}
          maxLength={10}

        />
        <TextInput
          value={documento2}
          onChangeText={setDocumento2}
          placeholder="NIT (0000-000000-000-0)"
          style={styles.input}
          maxLength={17}

        />
        <Button
        style={styles.button}
        onPress={guardarDatos}
        title='Guardar'
      >
        </Button>
     
        </View>
      </ScrollView>
      </ImageBackground>
    );
          
  };


  const styles = StyleSheet.create({
    container: {
      marginLeft: 7,
  
      borderRadius: 50,
      backgroundColor: 'rgba(230, 231, 254, 0.85)',
      marginTop: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 15,
      alignItems: 'center',
      justifyContent:'center',
      paddingBottom: 50,
      marginRight: 7,
      marginBottom: 30,
      },
      formContent: {
        alignItems: 'center',
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Puedes ajustar la propiedad de redimensionamiento según tus necesidades
      },
      logoContainer: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      logo: {
        borderRadius: 50,
        width: 200,
        height: 200,
      },
      formContainer: {
        width: '100%', // Opcional para ajustar el ancho
        alignItems: 'center',
      },
      input: {
        marginTop: 10,
        height: 40,
        width: '80%',
        borderColor: 'blue',
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        textDecorationLine: 'underline',
      },
      button: {
        borderRadius: 50,
        borderCurve: 50,
      },
     texto: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight:'bold',
      },
      placeholder: {
        
        fontSize: 20,
        fontWeight:'bold',
        },

  
    
    });
  
