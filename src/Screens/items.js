import React from 'react';

import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';

import ProductList from "../Components/list";

function Items({route}) {
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: {
            flex:1,
            flexDirection: 'column'
        },
        button:{
        },
        add:{
            position:'absolute',
            backgroundColor: 'lightgray',
            width:'100%',
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            paddingTop:20
        },
        lista:{
            marginTop:100
        }
      });

    return (
        <View style={styles.container}>
    
            <View style={styles.add}>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera', 'reset')}>
                    <Icon name="barcode" size={100} color="black" />
                </TouchableOpacity>

            </View>

            <View style={styles.lista}>

                <ProductList
                route={route}
                ></ProductList>

            </View>
            
        </View>
        
)}


export default Items;