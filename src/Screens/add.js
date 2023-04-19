import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    padding:35
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0.4,
  },
  itemName: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color:'black'
  },
  itemPrice: {
    textAlign: 'center',
    fontSize: 18,
    color: '#2E8B57',
    marginVertical: 10,
  },
  itemDescription: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    color:'black'
  },
  itemQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    color:'black',
    paddingHorizontal: 100,
    marginVertical: 30
  },
  itemQnt: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color:'black'
  },
  button: {
    backgroundColor: '#2E8B57',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button2: {
    backgroundColor: '#FF4136',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  text:{
    color:'black'
  }
});

const ProductScreen = ({ route }) => {
  const navigation = useNavigation();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('Home');
        return true;
      },
    );

    return () => backHandler.remove();
  }, [navigation]);

  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categoria, setCategory] = useState("Geladeira");


    if(route.params != undefined){
      
        const prodInfos = route.params.return;
      
        var product = {
            id: null,
            name: prodInfos.nome,
            price: prodInfos.preco,
            description: prodInfos.cest_descricao,
            ean: prodInfos.ean,
            image: 'https://i.pinimg.com/236x/ea/56/e3/ea56e3ce387edc4fb87963b0c6d757a1.jpg',
            quantity: quantity,
            category: null
        };
    }else{
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Produto não encontrado.</Text>
            </View>
        )
    }

    const addProduct = async () => {

      try {
        const storedProducts = await AsyncStorage.getItem('products');
        let products = storedProducts ? JSON.parse(storedProducts) : [];
    
        const lastId = products.length > 0 ? products[products.length - 1].id : 0;
        product.id = lastId + 1;

        product.category = categoria;
    
        const existingProductIndex = products.findIndex(p => p.name === product.name);
    
        if (existingProductIndex !== -1) {
          products[existingProductIndex].quantity += 1;
        } else {
          products.push(product);
        }

        console.log(products);

        await AsyncStorage.setItem('products', JSON.stringify(products));

        navigation.navigate('Home')
        Alert.alert('', 'Produto adicionado com sucesso!');

      } catch (error) {

        console.log(error);
        Alert.alert('Erro', 'Não foi possível adicionar o produto, tente novamente.');

      }
    };
    
    const quantityChange = (op) =>{
      if(op == '+'){
        setQuantity(quantity + 1);
      }else{
        if (quantity == 1){
          Alert.alert('Erro', 'Não é possível reduzir a quantidade.');
        }else{
          setQuantity(quantity - 1);
        }
      }
    }
    const categories = ['Geladeira', 'Limpeza', 'Banheiro', 'Dispensa'];
    const handleCategoryClick = (index) => {

      let c;

      switch (index) {
        case 0:
          c = "Geladeira";
          break;
        case 1:
          c = "Limpeza";
          break;
        case 2:
          c = "Banheiro";
          break;
        case 3:
          c = "Dispensa";
          break;
        default:
          c = "Categoria inválida";
          break;
      }
      

      setSelectedCategory(index);
      setCategory(c)
    };
  
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image style={styles.itemImage} source={{ uri: product.image }} />
        <Text style={styles.itemName}>{product.name}</Text>
        <Text style={styles.itemPrice}>{product.price}</Text>
        <Text style={styles.itemDescription}>{product.description}</Text>
        <View style={{ flexDirection: 'row' }}>

{categories.map((category, index) => (
  <TouchableOpacity
    key={index}
    onPress={() => handleCategoryClick(index)}
    style={{
      backgroundColor: selectedCategory === index ? 'blue' : 'transparent',
      padding: 10,
      borderRadius: 5,
      marginRight: 10,
    }}>
    <Text style={{ color: selectedCategory === index ? 'white' : 'black' }}>{category}</Text>
  </TouchableOpacity>
))}
</View>
        <View style={styles.itemQuantity}>

          <TouchableOpacity onPress={() => quantityChange('-')}>
            <Icon name="minus-circle" size={30} color="red" />
          </TouchableOpacity>

          <Text style={styles.itemQnt}>{quantity}</Text>

          <TouchableOpacity onPress={() => quantityChange('+')}>
            <Icon name="plus-circle" size={30} color="green" />
          </TouchableOpacity>

        </View>
        <TouchableOpacity onPress={() => addProduct()} style={styles.button}>
          <Text style={styles.buttonText}>Adicionar ao estoque</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Camera', 'reset')} style={styles.button2}>
          <Text style={styles.buttonText}>Digitalizar novamente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductScreen;
