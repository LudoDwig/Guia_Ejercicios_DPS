import { useState, useEffect } from 'react';
import {View,Text,Button, ScrollView,StyleSheet,TouchableOpacity} from 'react-native';
import axios from "axios";

export default function Integrantes(props){
  const {navigation}=props;
  const [member, setMember] = useState([]);
  const [carnet, setCarnet] = useState([]);

  const showMemberbyId=(id)=>{
    setCarnet(id)
    navigation.navigate('Miembro',{
      carnet
    })
  }

  useEffect(() => {
    // URL de API que devuelve la lista de integrantes
    const apiUrl =
      "http://192.168.1.10:81/GuiaDPS_APIS/api/allmembers.php";
    axios
      .get(apiUrl)
      .then((response) => {
        setMember(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de integrantes:", error);
      });
  }, []);

  return(
    <View>
      <ScrollView>
      
        {member.map((m)=>(
          <View style={styles.TeamContainer}>
          <TouchableOpacity onPress={() => showMemberbyId(m.carnet)}>
          <View style={styles.infoRow}>
          <Text>
            <Text style={styles.infoLabelBold}>
              {m.nombre}
            </Text>
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text>
            <Text style={styles.infoLabelBold}>
              {m.apellido}
            </Text>
          </Text>
        </View>
        <View style={styles.infoRow}>
        <Text>Fecha de nacimiento:
          <Text style={{ fontSize: 20 }}>
              {" "}
              {m.fecha_nac}
            </Text>
          </Text>    
        </View>
        <View  style={styles.infoRow}>
        <Text>Genero:
            <Text style={{ fontSize: 20 }}>
              {" "}
              {m.genero}
            </Text>
           </Text>
        </View>
        <View style={styles.infoRow}>
        <Text>Posicion:
            <Text style={{ fontSize: 20 }}>
              {" "}
              {m.posicion}
            </Text>
            </Text>
        </View>
        <View style={styles.infoRow}>
        <Text>Numero de camisa:
            <Text style={{ fontSize: 20 }}>
              {" "}
              {m.num_camisa}
            </Text>
            </Text>
        </View>
          </TouchableOpacity>
        </View>
        ))}
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  TeamContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  infoLabelBold: {
    fontSize: 36,
    fontWeight: "bold",
  },
});