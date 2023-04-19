import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Icon name="notifications-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top:0,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#87CEFA',
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 15,
    },
    title: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
  });

  export default Header