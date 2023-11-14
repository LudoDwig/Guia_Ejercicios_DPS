import { useState, useEffect } from 'react';
import {View,Text,Button,StyleSheet,TextInput} from 'react-native';
import axios from "axios";


export default function Resumen(props){
  const {navigation}=props;
  const [totalEquipos, setTotalE] = useState([]);
  const [totalMiembros, setTotalM] = useState([]);

  useEffect(() => {
    // URL de API que devuelve el total de integrantes
    const apiUrl =
      "http://192.168.1.10:81/GuiaDPS_APIS/api/countMembers.php";
    axios
      .get(apiUrl)
      .then((response) => {
        setTotalM(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el total de integrantes:", error);
      });
  }, []);

  useEffect(() => {
    // URL de API que devuelve el total de integrantes
    const apiUrl =
      "http://192.168.1.10:81/GuiaDPS_APIS/api/countTeams.php";
    axios
      .get(apiUrl)
      .then((response) => {
        setTotalE(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el total de equipos:", error);
      });
  }, []);

  return(
    <View style={styles.formContainer1}>
      <Text>Total de Equipos registrados:</Text>
      {totalEquipos.map((e)=>(
        <Text style={{ fontSize: 20 }}>
              {" "}
              {e.TotalEquipos}
        </Text>
      ))}
      <Text>Total de Miembros registrados:</Text>
      {totalMiembros.map((e)=>(
        <Text style={{ fontSize: 20 }}>
              {" "}
              {e.TotalMiembros}
        </Text>
      ))}
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