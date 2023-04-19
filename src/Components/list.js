import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';

import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
  item: {
    padding: 15,
    margin: 15,
    fontSize: 18,
    borderWidth: 0.1,
    borderColor: '#ccc',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0.4,
  },
  itemDescription:{
    color:'black',
    textAlign:'center',
    marginVertical: 20
  },
  itemName: {
    textAlign: 'center',
    color: 'black',
  },
  itemQnt: {
    textAlign: 'center',
    color: 'black',
  },
  itemquantity: {
    paddingVertical: 20,
    paddingHorizontal: 75,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemimage: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    margin: 20,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
  },
  emptyListText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    position:'absolute',
    top:200
  },
});

const renderItem = ({ item, removeItem, addItem }) => {

  return(

  <View style={styles.item}>
   <Image
        style={styles.itemimage}
        source={{ uri: item.image }}
      />

    <Text style={styles.itemName}>{item.name}</Text>

    <Text style={styles.itemDescription}>{item.description}</Text>

    <View style={styles.itemquantity}>

      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Icon color='red' name="minus-circle" size={30} />
      </TouchableOpacity>

      <Text style={styles.itemQnt}>{item.quantity}</Text>

      <TouchableOpacity onPress={() => addItem(item.id)}>
        <Icon color='green' name="plus-circle" size={30} />
      </TouchableOpacity>

    </View>

  </View>
)};
const ProductList = ({ route }) => {

  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage foi limpo com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar o AsyncStorage:', error);
    }
  }

  const navigation = useNavigation();

  const [products, setProducts] = useState(null);
  const [firstLoading, setLoadState] = useState(true);
  const [sorted, setSorted] = useState(true);

  const loadProducts = async () =>{

    let a = await AsyncStorage.getItem('products')
    a = JSON.parse(a);

    if(a == null){}else{
      let category;
      let tempList = [];
      
      switch (route.params) {
        case "Geladeira":
          category = "Geladeira";
          break;
        case "Limpeza":
          category = "Limpeza";
          break;
        case "Banheiro":
          category = "Banheiro";
          break;
        case "Dispensa":
          category = "Dispensa";
          break;
        default:
          category = "Categoria inválida";
          break;
      }

      if (category !== "Categoria inválida") {
        for (let i = 0; i < a.length; i++) {
          if (a[i].category === category && a[i].quantity != 0) {
            tempList.push(a[i]);
          }
        }
      }

      const sorted = [...tempList].sort((a, b) => b.id - a.id);
      setProducts(sorted)
      

    }
    
   
  }

  useEffect(() => {
    
    loadProducts();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('Home');
        return true;
      },
    );

    return () => backHandler.remove();
  }, [navigation]);
  const removeItem = async (id) => {

    const storedProducts = await AsyncStorage.getItem('products');
    let products = storedProducts ? JSON.parse(storedProducts) : [];
  
    const existingProductIndex = products.findIndex((p) => p.id === id);
  
    if (existingProductIndex !== -1) {
      if (products[existingProductIndex].quantity > 1) {
        products[existingProductIndex].quantity -= 1;
      } else {

        const faltando = await AsyncStorage.getItem('outof');
        let out = faltando ? JSON.parse(faltando) : [];
        out.push(products[existingProductIndex]);
        await AsyncStorage.setItem('outof', JSON.stringify(out));

        Alert.alert("Item em falta:",`O produto: ${products[existingProductIndex].name} foi removido.`)
        products.splice(existingProductIndex, 1);
      }
      
      await AsyncStorage.setItem('products', JSON.stringify(products));

      loadProducts()
  
    } 
  
  }
  
  const addItem = async (id) => {
  
    const storedProducts = await AsyncStorage.getItem('products');
    let products = storedProducts ? JSON.parse(storedProducts) : [];
  
    const existingProductIndex = products.findIndex((p) => p.id === id);
  
    if (existingProductIndex !== -1) {
  
      products[existingProductIndex].quantity += 1;
    
      await AsyncStorage.setItem('products', JSON.stringify(products));
  
      loadProducts()
    } 
  
  }

  return (
    <View>
      {products && products.length > 0 ? (
        <FlatList
          data={products}
          style={styles.container}
          keyExtractor={item => item.id.toString()}
          removeItem={removeItem}
          addItem={addItem}
          renderItem={({ item }) => renderItem({ item, removeItem, addItem })}
        />
      ) : (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>A lista de produtos está vazia.</Text>
      </View>
      )}
    </View>
  );
  
}



export default ProductList;
