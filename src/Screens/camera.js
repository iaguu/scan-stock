import React, { useState, useEffect } from 'react';

import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

import { BarCodeScanner } from 'expo-barcode-scanner';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

const IdentText = ({ route }) => {

const navigation = useNavigation();

const [alreadyRead, setRead] = useState(false);
const [firstOpening, setState] = useState(true);
const [operationMode, setMode] = useState(null);
const [showManualButton, manualButton] = useState(false);

const [scanned, setScanned] = useState(false);



useEffect(() => {
  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  getBarCodeScannerPermissions();
}, []);

if(route.params != undefined){
  if(route.params == 'reset'){
    if(alreadyRead == true){
      setRead(false)
    }
    if(scanned == true){
      setScanned(false)
    }
  }
}

  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    preview: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    marker: {
      position:'absolute',
      width: width * 0.6,
      height: width * 0.3,
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex:10,
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: "80%"
    },
    stripes: {
      position: 'absolute',
      width: width * 0.6,
      height: width * 0.3,
      borderRadius: 10,
      overflow: 'hidden',
      justifyContent: 'center',
    },
    stripe: {
      height: 3,
      backgroundColor: 'white',
      
    },
    text: {
      position:'absolute',
      color: 'white',
      textAlign:'center',
      fontSize: 22,
      top:-80,
      width:400
    },
    buttonContainer:{
      position:'absolute',
      top:'85%',
      textAlign:'center',
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    manualButton:{
      padding:15,
      backgroundColor:'white',
      borderRadius:15
    },
    manualText:{
      color:'black',
      textAlign:'center'
    },
  });
  
  const saveProductInDB = async (p, ean) =>{
    
    const passThrought = p;


      const storedProducts = await AsyncStorage.getItem('db');
      let products = storedProducts ? JSON.parse(storedProducts) : false;
      
      if(products == false){
        products = []
        products.push(p)
      }

      for (let i = 0; i < products.length; i++) {
        if(products[i].nome == p.nome || products[i].ean == p.ean){
          break;
        }
        else{
          products.push(p)
          break;
        }
      }
      
      await AsyncStorage.setItem('db', JSON.stringify(products));
      
      checkMode(passThrought, ean)

  }
      
  const removeProduct = async (ean) =>{

    try {

      const storedProducts = await AsyncStorage.getItem('products');
      
      let products = storedProducts ? JSON.parse(storedProducts) : [];
  
      const existingProductIndex = products.findIndex((p) => p.ean === ean);
      
      let name = products[existingProductIndex].name;

      if (existingProductIndex !== -1) {

        if (products[existingProductIndex].quantity > 1) {
          products[existingProductIndex].quantity -= 1;
          Alert.alert('Sucesso', `O produto: ${name} foi removido.\n\nQuantidade restante: ${products[existingProductIndex].quantity}.`);
        }
        else {
          
          const outOf = await AsyncStorage.getItem('outof');
          let outProducts = outOf ? JSON.parse(outOf) : [];

          for (let i = 0; i < array.length; i++) {
            if(outProducts[i].ean == ean){
              break;
            }else{
              outProducts.push(products[existingProductIndex]);
              await AsyncStorage.setItem('outof', JSON.stringify(outProducts));
            }
            
          }
          products.splice(existingProductIndex, 1);
          Alert.alert('Sucesso', `O produto: ${name} foi removido.\n\nNão há mais nenhum desse no estoque.`);
          
        }
  
        await AsyncStorage.setItem('products', JSON.stringify(products));

        navigation.navigate('Home');

      } else {
        Alert.alert('Erro', `Produto ${name} não encontrado.`);
        navigation.navigate("Home")
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível remover o produto, tente novamente.');
      navigation.navigate("Home")

    }
  }
  // const checkIfHasEAN = async (e) =>{

  //   var hasEAN = false;

  //   const storedProducts = await AsyncStorage.getItem('db');
  //   let products = storedProducts ? JSON.parse(storedProducts) : false;

  //   if (products == false){
  //     sendEAN(e);
  //   }else{

  //     for (let i = 0; i < products.length; i++) {
  //       if (products[i].ean == e) {
  //         var obj = {
  //           return: products[i]
  //         }
  //         hasEAN = true;
  //         break;
  //       }
  //     }
  //     if (hasEAN == true) {
  //       checkMode(obj)
  //     }else{
  //       sendEAN(e);
  //     }
  //   }
  // }

  const checkIfHasEAN = (res, ean) =>{
    checkMode(res, rean)
  }

  const checkMode = async (res, ean) =>{
    
    if(operationMode === 'add'){
      navigation.navigate('Add', res);
    }
    if(operationMode === 'remove'){
      removeProduct(ean);
    }
    
  }
  const barcodeReceived = async (e) => { 
    let ean = e.data;
    
    setScanned(true);    
    setRead(true)

    sendEAN(ean)

  };

  const sendEAN = async (ean) => {

    // Official and most powerfull (PAID)
    // const options = {
    //   method: 'GET',
    //   url: 'https://barcode-lookup.p.rapidapi.com/v3/products',
    //   params: {
    //     barcode: ean
    //   },
    //   headers: {
    //     'X-RapidAPI-Key': 'a06d441209msh2114de71e7a88d5p1fcf79jsnad9b756a450c',
    //     'X-RapidAPI-Host': 'barcode-lookup.p.rapidapi.com'
    //   }
    // };

    // Unnoficial Basic (Free)

    const options = {
      method: 'GET',
      url: 'https://barcode-monster.p.rapidapi.com/' + ean,
      headers: {
        'X-RapidAPI-Key': 'a06d441209msh2114de71e7a88d5p1fcf79jsnad9b756a450c',
        'X-RapidAPI-Host': 'barcode-monster.p.rapidapi.com'
      }
    };    
    
    try {
      const response = await axios.request(options);
      
      console.log(response.data);

      if(response.data.status == "not found"){
        Alert.alert('Erro', 'Produto não encontrado no banco de dados. Atualize para a versão premium para obter acesso ao banco de dados completo.');
        navigation.navigate("Home")
      }else{
        saveProductInDB(response.data, response.data.code)
      }


    } catch (error) {

      console.error(error);

    }

  };



  const handleAddProduct = () => {
    setMode('add')
    manualButton(true)
    setState(false)
  }

  const handleRemoveProduct = () => {
    setMode('remove')
    manualButton(false)
    setState(false)
  }



if(firstOpening == true){
  let styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: 'green',
      paddingHorizontal: 25,
      paddingVertical: 15,
      borderRadius: 5,
      marginBottom: 100,
    },
    button2: {
      backgroundColor: 'red',
      paddingHorizontal: 25,
      paddingVertical: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handleAddProduct()}>
        <Text style={styles.buttonText}>Adicionar Produto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={() => handleRemoveProduct()}>
        <Text style={styles.buttonText}>Remover Produto</Text>
      </TouchableOpacity>
    </View>
  );
}else{
  return (
    <View style={styles.container}>

        {!firstOpening && 
        <View  style={styles.preview}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : barcodeReceived}
            style={styles.preview}
          />
          <View style={styles.marker}>
          <Text style={styles.text}>Escanear código de barras</Text>
            <View style={styles.stripes}>
              <View style={[styles.stripe, { transform: [{ rotate: '45deg' }] }]} />
              <View style={[styles.stripe, { transform: [{ rotate: '-45deg' }] }]} />
            </View>
          </View>
        </View>
        }


        {showManualButton && 
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ManualAdd')} style={styles.manualButton}>
              <Text style={styles.manualText}>Adicionar Produto Manualmente</Text>
            </TouchableOpacity>
          </View>
        }



    </View>
  );
  }
}

export default IdentText;
