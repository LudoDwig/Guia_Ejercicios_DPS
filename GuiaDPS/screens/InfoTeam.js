import { useState, useEffect } from 'react';
import {View,Text,Button, StyleSheet,TextInput} from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const Equipo=({route})=>{
  const{
    teamId,
  }=route.params;
  const [nombre, setNombre] = useState([""]);
  const [facultad, setFacultad] = useState([""]);
  const [ciclo, setCiclo] = useState([""]);
  const [torneo, setTorneo] = useState([""]);

  const DataFromApi=async()=>{
    await fetch('http://192.168.1.10:81/GuiaDPS_APIS/api/teaminfo.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"id": teamId})  
        }).then(res=>res.json())
        .then(Data=>{
          setNombre(Data.equipo[0].nombre);
          setFacultad(Data.equipo[0].facultad);
          setCiclo(Data.equipo[0].ciclo);       
          setTorneo(Data.equipo[0].torneo);            
        });
  };

  useEffect(() => {
    DataFromApi();
  }, []);

  const ActualizarPress = async () => {
    
    await fetch('http://192.168.1.10:81/GuiaDPS_APIS/api/updateTeamInfo.php',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body: JSON.stringify({"id": teamId,
      "nombre": nombre,
      "facultad": facultad,
      "ciclo": ciclo,
      "torneo": torneo,})  
  }).then(res=>res.json())
  .then(resData=>{
          alert(resData.message);
  });
};

const DeleteTeam = async () => {
    
  await fetch('http://192.168.1.10:81/GuiaDPS_APIS/api/deleteTeam.php',{
    method:'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body: JSON.stringify({"id": teamId})  
}).then(res=>res.json())
.then(resData=>{
        alert(resData.message);
});
};


  return(
    <View style={styles.formContainer1}>
    <Text style={styles.texto}>Actualizacion de equipos</Text>
      <TextInput
      style={styles.input}
        placeholder="Nombre del Equipo"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
      style={styles.input}
        placeholder="Facultad"
        value={facultad}
        onChangeText={setFacultad}
      />
      <TextInput
      style={styles.input}
        placeholder="Ciclo"
        value={ciclo}
        onChangeText={setCiclo}
      />
      <Picker
          selectedValue={torneo}
          onValueChange={(itemValue) => setTorneo(itemValue)}
          style={{ height: 50, width: 150, marginBottom: 10 }}
        >
          <Picker.Item label="No especificado" value="No especificado" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
        </Picker>
      <Button title="Actualizar Equipo" onPress={ActualizarPress}/>
      <Button title="Eliminar Equipo" onPress={DeleteTeam}/>
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


export default Equipo;