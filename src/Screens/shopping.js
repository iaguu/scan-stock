import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaDeCompras() {

  const [selectedItems, setSelectedItems] = useState([]);
  const [lista, setLista] = useState(null);

  const navigation = useNavigation();
  

  const loadList = async () =>{
    
    let tempList = []
    let product = null
    let i = 0;

    const storedProducts = await AsyncStorage.getItem('products');
    let products = storedProducts ? JSON.parse(storedProducts) : [];
    
    console.log(products);    
    while(i < products.length){      
      if (products[i].quantity <= 2 || product[i].quantity == 0) {
        product = products[i];
        tempList.push(product);
      }
      i++;
    }
    setLista(tempList);
  }


  useEffect(() => {
    loadList();
  }, []);


  const handleSelectItem = (item) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.includes(item);
      return isSelected
        ? prevSelectedItems.filter((selectedItem) => selectedItem !== item)
        : [...prevSelectedItems, item];
    });
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectItem(item.nome)}>
      <View style={styles.itemContainer}>
        <Text
          style={[
            styles.itemText,
            selectedItems.includes(item.nome) && styles.selectedItemText,
          ]}
        >
          {item.nome}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
      <View style={{flex:1}}>

          <View style={styles.header}>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color="white" />
              </TouchableOpacity>
                <Text style={styles.title}>Lista de Compras</Text>

            </View>

          <View style={styles.container}>
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
    paddingHorizontal: 30,
    paddingVertical:20,
    width:'100%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center',
    marginRight:70
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
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
});
