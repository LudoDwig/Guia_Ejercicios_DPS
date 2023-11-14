import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ejercicio2 = () => {
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const apiUrl = 'https://ipwho.is/'+ip;
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        setData(response.data);
        saveToHistory(response.data);
        setModalVisible(true);
        setError(null);
      } else {
        console.error('Error en la respuesta de la API:', response.status);
        setError('Error en la respuesta de la API');
      }
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
      setError('Error al obtener datos de la API');
    }
  };

  const saveToHistory = async (result) => {
    try {
      const previousHistory = await AsyncStorage.getItem('ipHistory');
      const newHistory = previousHistory ? JSON.parse(previousHistory).concat(result) : [result];
      await AsyncStorage.setItem('ipHistory', JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Error guardando historial', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('ipHistory');
      setHistory([]);
    } catch (error) {
      console.error('Error limpiando información', error);
    }
  };

  const renderHistory = () => {
    return history.map((item, index) => (
      <View key={index} style={styles.historyItem}>
        <Text style={styles.historyText}>{`IP: ${item.ip}`}</Text>
        {/* Renderizar otros datos del historial si es necesario */}
      </View>
    ));
  };

  return (
    <View>
      <TextInput
        placeholder="Ingresar dirección IP"
        value={ip}
        onChangeText={setIp}
      />
      <Button title="Consultar IP" onPress={handleSearch} />

      <Modal isVisible={isModalVisible} transparent={true} animationType="slide">
        <View styles={styles.modalContent}>
          {data && (
            <>
              <Text>{`Tipo de IP: ${data.type}`}</Text>
              <Text>{`Continente: ${data.continent}`}</Text>
              <Text>{`País: ${data.country}`}</Text>
              <Text>{`Código de País: ${data.country_code}`}</Text>
              <Text>{`Región: ${data.region}`}</Text>
              <Text>{`Ciudad: ${data.city}`}</Text>
              <Text>{`Capital: ${data.capital}`}</Text>
              {data.country_code && (
                <Image
                  source={{
                    uri: `https://ipwhois.io/flag/${data.country_code.toLowerCase()}.svg`,
                  }}
                  style={{ width: 50, height: 30 }}
                />
              )}
              <Text>{`Hora actual: ${data.current_time}`}</Text>
              <Text>{`Org: ${data.org}`}</Text>
              <Text>{`ISP: ${data.isp}`}</Text>
              <Text>{`Dominio: ${data.domain}`}</Text>
            </>
          )}
          {error && <Text>{error}</Text>}
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <Button title="Limpiar historial" onPress={clearHistory} />
      {renderHistory()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  historyContainer: {
    marginTop: 20,
  },
  historyItem: {
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
  },
});

export default Ejercicio2;