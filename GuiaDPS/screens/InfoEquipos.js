import { useState, useEffect } from 'react';
import {View,Text,Button, ScrollView,StyleSheet,TouchableOpacity} from 'react-native';
import axios from "axios";

export default function Equipos(props){
  const {navigation}=props;
  const [team, setTeam] = useState([]);
  const [teamId, setTeamId] = useState([]);

  const showTeambyId=(id)=>{
    setTeamId(id)
    navigation.navigate('Equipo',{
      teamId
    })
  }

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
    <View>
      <ScrollView>
      
        {team.map((e)=>(
          <View style={styles.TeamContainer}>
          <TouchableOpacity onPress={() => showTeambyId(e.id)}>
          <View style={styles.infoRow}>
          <Text>
            <Text style={styles.infoLabelBold}>
              {e.nombre}
            </Text>
          </Text>
        </View>
        <View style={styles.infoRow}>
        <Text>Facultadad:
          <Text style={{ fontSize: 20 }}>
              {" "}
              {e.facultad}
            </Text>
          </Text>    
        </View>
        <View  style={styles.infoRow}>
        <Text>Ciclo:
            <Text style={{ fontSize: 20 }}>
              {" "}
              {e.ciclo}
            </Text>
           </Text>
        </View>
        <View style={styles.infoRow}>
        <Text>Torneo:
            <Text style={{ fontSize: 20 }}>
              {" "}
              {e.torneo}
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