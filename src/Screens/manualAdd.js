import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddProductScreen = () => {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [ean, setBarCode] = useState('');

  const handleAddProduct = async () => {

    if (!name.trim() || !description.trim()) {
      Alert.alert('Error', 'Por favor preencha os campos obrigatórios.');
    }else{

    const product = {
      id : 1000,
      name,
      price,
      description,
      ean,
      image: 'https://i.pinimg.com/236x/ea/56/e3/ea56e3ce387edc4fb87963b0c6d757a1.jpg',
      quantity: 1,
    };

    try {
      const storedProducts = await AsyncStorage.getItem('products');
      let products = storedProducts ? JSON.parse(storedProducts) : [];
  
      const lastId = products.length > 0 ? products[products.length - 1].id : 0;
      
      product.id = lastId + 1;
  
      const existingProductIndex = products.findIndex(p => p.name === product.name);
  
      if (existingProductIndex !== -1) {
        products[existingProductIndex].quantity += 1;
      } else {
        products.push(product);
      }
  
      await AsyncStorage.setItem('products', JSON.stringify(products));

      setName('');
      setPrice('');
      setDescription('');
      setBarCode('');

      navigation.navigate("Items");

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível adicionar o produto, tente novamente.');
    }

  }

  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome: *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Insira o nome do produto"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Preço:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Insira o preço do produto (opcional)"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição: *</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Insira a descrição do produto"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Código de barras (EAN):</Text>
        <TextInput
          style={styles.input}
          value={ean}
          onChangeText={setBarCode}
          placeholder="Insira o código de barras (se disponível)"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Adicionar ao Estoque</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:'35%'
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black',
    textAlign:'center'

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color:'black',
    textAlign:'center',

  },
  button: {
    backgroundColor: '#2E8B57',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default AddProductScreen;