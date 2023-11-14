import { useState, useEffect } from 'react';
import {View,Text,Button, StyleSheet,TextInput} from 'react-native';
import { Picker } from "@react-native-picker/picker";

const Member=({route})=>{
    const{
      carnet,
    }=route.params;
    const [nombre, setNombre] = useState([""]);
    const [apellido, setApellido] = useState([""]);
    const [posicion, setPosicion] = useState([""]);
    const [num_camisa, setNumeroCamisa] = useState([""]);
  
    const DataFromApi=async()=>{
      await fetch('http://192.168.1.10:81/GuiaDPS_APIS/api/memberinfo.php',{
              method:'POST',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
              body: JSON.stringify({"carnet": carnet})  
          }).then(res=>res.json())
          .then(Data=>{
            setNombre(Data.member[0].nombre);
            setApellido(Data.member[0].apellido);
            setPosicion(Data.member[0].posicion);       
            setNumeroCamisa(Data.member[0].num_camisa);            
          });
    };
  
    useEffect(() => {
      DataFromApi();
    }, []);
  
    const ActualizarMemberPress = async () => {
      
      await fetch('http://192.168.1.10:81/GuiaDPS_APIS/api/updateMemberInfo.php',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({"carnet": carnet,
        "nombre": nombre,
        "apellido": apellido,
        "posicion": posicion,
        "num_camisa": num_camisa,})  
    }).then(res=>res.json())
    .then(resData=>{
            alert(resData.message);
    });
  };
  
  const deleteMember = async () => {
      
    await fetch('http://192.168.1.10:81/GuiaDPS_APIS/api/deleteMember.php',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body: JSON.stringify({"carnet": carnet})  
  }).then(res=>res.json())
  .then(resData=>{
          alert(resData.message);
  });
  };
  
  
    return(
      <View style={styles.formContainer1}>
      <Text style={styles.texto}>Actualizacion de integrantes</Text>
        <TextInput
        style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
        style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
        />
        <TextInput
        style={styles.input}
          placeholder="Posicion"
          value={posicion}
          onChangeText={setPosicion}
        />
        <TextInput
        style={styles.input}
          placeholder="Numero de camisa"
          value={num_camisa}
          onChangeText={setNumeroCamisa}
        />
        <Button title="Actualizar Miembro" onPress={ActualizarMemberPress}/>
        <Button title="Eliminar Miembro" onPress={deleteMember}/>
      </View>
    )
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
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
    formContainer1: {
      width: '100%', // Opcional para ajustar el ancho
      alignItems: 'center',
    },
    texto: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight:'bold',
      },
      button: {
        borderRadius: 50,
        borderCurve: 50,
      }
  });
  
  
  export default Member;