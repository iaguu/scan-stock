
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const BottomMenu = () => {
  const navigation = useNavigation();
    return (
      <View style={styles.bottomMenu}>

        <TouchableOpacity style={{ marginTop:260 }}>
        <View style={{ padding: 10 }}>
          <Icon color='#87CEFA' name="gear" size={65} />
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')} style={{ marginTop:200, padding: 25 }}>
        <View style={{ padding: 10, height: 100}}>
          <Icon color="black" name="barcode" size={140} />
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Shopping')} style={{ marginTop:263}}>
        <View style={{ padding: 10 }}>
          <Icon color='#87CEFA' name="shopping-bag" size={50} />
        </View>
        </TouchableOpacity>

      </View>
    );
  };

  const styles = StyleSheet.create({
    bottomMenu:{
      flexDirection: 'row',
      marginBottom: 25
    },
  });
  
export default BottomMenu;  