import { useState, useEffect } from 'react';
import {View,Text,TextInput, Button,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

export default function Ejercicio3(props){
  const {navigation}=props;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [nombreE, setNombreE] = useState('');
  const [facultad, setFacultad] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [torneo, setTorneo] = useState('');

  const [carnet, setCarnet] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [posicion, setPosicion] = useState('');
  const [numeroCamisa, setNumeroCamisa] = useState('');
  const [equipo, setEquipo] = useState('');
  const [team, setTeam] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState("");

  const RegistroE = async () => {
    // Lógica para registrar el equipo
    await fetch('http://192.168.1.10:81/GuiaDPS_APIS/api/registrarequipo.php',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body: JSON.stringify({"nombre": nombreE,
      "facultad": facultad,
      "ciclo": ciclo,
      "torneo": torneo,})  
  }).then(res=>res.json())
  .then(resData=>{
          //alert(resData.mensaje);
          if(resData.mensaje==="Equipo registrado"){
              alert(resData.mensaje);
          }
          else
          {
            alert(resData.mensajeReal);
          }
  });
  };

  const RegistroI = async () => {
    // Lógica para registrar el integrante
    await fetch('http://192.168.1.10:81/GuiaDPS_APIS/api/registrarintegrante.php',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
      "carnet":carnet,
      "nombre": nombre,
      "apellido": apellido,
      "fecha_nac": fechaNacimiento,
      "genero": genero,
      "posicion": posicion,
      "num_camisa": numeroCamisa,
      "id_equipo": equipoSeleccionado,})  
  }).then(res=>res.json())
  .then(resData=>{
          //alert(resData.mensaje);
          if(resData.mensaje==="Integrante registrado en el equipo"){
              alert(resData.mensaje);
          }
          else
          {
            alert(resData.mensajeReal);
          }
  });
  };

  const showTeamList=()=>{
    navigation.navigate("Informacion de Equipos")
  }

  const showMembersList=()=>{
    navigation.navigate("Informacion de Miembros")
  }
  const showGeneralInfo=()=>{
    navigation.navigate("Resumen de datos")
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    const año = date.getFullYear();
    const mes = date.getMonth() + 1;
    const dia = date.getDate();
  
    // Formatea la fecha en "yyyy-MM-dd"
    const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
    setFechaNacimiento(fechaFormateada);
    hideDatePicker();
  };

  useEffect(() => {
    // URL de API que devuelve la lista de equipos
    const apiUrl =
      "http://192.168.1.10:81/GuiaDPS_APIS/api/allteam.php";
    axios
      .get(apiUrl)
      .then((response) => {
        // Almacena la lista de equipos en el estado
        setTeam(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de equipos:", error);
      });
  }, []);
  
  return(
    <>
    <ScrollView>
    <View style={styles.formContainer1}>
    <Text style={styles.texto}>Inscripcion de equipos</Text>
      <TextInput
      style={styles.input}
        placeholder="Nombre del Equipo"
        value={nombreE}
        onChangeText={setNombreE}
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
      <Button title="Registrar Equipo" onPress={RegistroE} />
    </View>
    <View style={styles.formContainer1}>
    <Text style={styles.texto}>Inscripcion de integrantes</Text>

<TextInput
  style={styles.input}
  placeholder="Carnet"
  value={carnet}
  onChangeText={setCarnet}
/>
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
        <TouchableOpacity onPress={showDatePicker}>
          <Button style={styles.button} title="Seleccionar Fecha de Nacimiento" onPress={() => showDatePicker()} />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={confirmarFecha}
          onCancel={hideDatePicker}
          locale="es_ES"
          headerTextIOS="Elige la fecha"
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
          display="spinner" 
          displayFormat="YYYY-MM-DD"
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
<TextInput
  style={styles.input}
  placeholder="Posición"
  value={posicion}
  onChangeText={setPosicion}
/>
<TextInput
  style={styles.input}
  placeholder="Número de Camisa"
  value={numeroCamisa}
  onChangeText={setNumeroCamisa}
/>
<Picker   style={{ height: 50, width: 150, marginBottom: 10 }}
          selectedValue={equipoSeleccionado}
          onValueChange={(itemValue) => setEquipoSeleccionado(itemValue)}
        >
          <Picker.Item label="Selecciona un equipo" value="" />
          {team.map((e) => (
            <Picker.Item
              key={e.id}
              label={e.nombre}
              value={e.id}
            />
          ))}
  </Picker>
<Button title="Agregar Integrante" onPress={RegistroI} />
    </View>
    </ScrollView>
    <Button title="Lista de equipos" onPress={showTeamList} />
    <Button title="Lista de estudiantes" onPress={showMembersList} />
    <Button title="Informacion general" onPress={showGeneralInfo} />
    </>
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
