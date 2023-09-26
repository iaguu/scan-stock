import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaDeCompras() {

  const [selectedItems, setSelectedItems] = useState([]);
  const [lista, setLista] = useState(null);

  const navigation = useNavigation();
  

  const loadList = async () =>{

    const storedProducts = await AsyncStorage.getItem('outof');
    let products = storedProducts ? JSON.parse(storedProducts) : [];
    
    setLista(products);
  }


  useEffect(() => {
    loadList();
  }, []);


  const addToList = async (item, ean) => {

    const prods = await AsyncStorage.getItem('products');
    const db = await AsyncStorage.getItem('db');
    
    let product;
    let products = prods ? JSON.parse(prods) : [];
    let banco = db ? JSON.parse(db) : false;

      for (let i = 0; i < banco.length; i++) {
        if (banco[i].ean == ean || banco[i].nome == item) {
          product = banco[i];
          break;
        }
      }    

    console.log(banco);
    console.log(product);


    product.quantity = 0;
    
    products.push(product);
    
    await AsyncStorage.setItem('products', JSON.stringify(products));

    removeFromList(item, ean)
    
    loadList();
  };

  const removeFromList = async (item, ean) => {

    const outOf = await AsyncStorage.getItem('outof');
    let outProducts = outOf ? JSON.parse(outOf) : [];

    const existingProductIndex = outProducts.findIndex((p) => p.ean === ean  || p.name === item);
      
    outProducts.splice(existingProductIndex, 1);

    await AsyncStorage.setItem('outof', JSON.stringify(outProducts));
  
    loadList();
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <Text style={[styles.itemText]}>
          {item.name}
        </Text>
          <TouchableOpacity style={styles.buttonCompra} onPress={() => addToList(item.name, item.ean)}>
            <Text style={styles.buttonAddText}>Adicionar a lista de Compras.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRemove} onPress={() => removeFromList(item.name, item.ean)}>
            <Text style={styles.buttonRemoveText}>Não comprar mais.</Text>
          </TouchableOpacity>
      </View>
  );

  return (
      <View style={{flex:1}}>

          <View style={styles.header}>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color="white" />
              </TouchableOpacity>
                <Text style={styles.title}>Notificações</Text>

            </View>

          <View style={styles.container}>
          {lista && lista.length > 0 ? (
          <View style={styles.emptyListContainer}>
            <Text style={styles.infault}>Produtos em falta:</Text>
          </View>
          ) : (
            <View style={styles.emptyListContainer}>
              <Text style={styles.notInfault}>Você não tem Notificações.</Text>
            </View>
          )}
            <FlatList
              data={lista}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedItems}
              ItemSeparatorComponent={renderSeparator}
              contentContainerStyle={styles.flatListContentContainer}
              />

          </View>

      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:50,
  },
  header: {
    backgroundColor: '#87CEFA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop:50,
    paddingBottom:20,
    width:'100%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center',
    marginRight:'30%'
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'black',
    borderWidth:2,
    padding:35
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedItemText: {
    fontWeight: 'normal',
    textDecorationStyle:'dashed',
    textDecorationLine:'line-through',
    borderWidth:0

  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
  infault:{
    color:'black',
    textAlign:'center',
    fontSize:24,
    fontWeight:'bold',
    padding:30
  },
  notInfault:{
    color:'black',
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
  },
  buttonCompra:{
    padding:10,
    backgroundColor:"green",
    marginBottom:15,
    marginTop:30,
    borderRadius:5,
  },
  buttonRemove:{
    padding:10,
    backgroundColor:"red",
    borderRadius:5,
  },
  buttonAddText:{
    color:'white'
  },
  buttonRemoveText:{

    color:'white'
  }
});
