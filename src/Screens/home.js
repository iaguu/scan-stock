
import { View, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';

import Header from "../Components/header";
import BottomMenu from "../Components/bottomMenu";

 
export default function Home() {

  
  const navigation = useNavigation();


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5F5F5',
    },
    rowOne: {
      marginTop: 200,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    rowTwo: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button1: {
      backgroundColor: '#90EE90',
      borderRadius: 10,
      margin: 20,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: 120,
      width: 120,
    },
    button2: {
      backgroundColor: '#FFC0CB',
      borderRadius: 10,
      margin: 20,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: 120,
      width: 120,
    },
    button3: {
      backgroundColor: '#87CEEB',
      borderRadius: 10,
      margin: 20,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: 120,
      width: 120,
    },
    button4: {
      backgroundColor: '#FFA07A',
      borderRadius: 10,
      margin: 20,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: 120,
      width: 120,
    },
    icon: {
      color:'white',
      fontSize: 100,
      alignSelf: 'center',
    },
  });
  
  
  return (
    
<View style={styles.container}>

<Header></Header>

<View style={styles.rowOne}>
  <TouchableOpacity onPress={() => navigation.navigate('Items', 'Geladeira')} style={styles.button1}>
    <Icon name="fridge" style={styles.icon} />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('Items', 'Limpeza')} style={styles.button2}>
    <Icon name="broom" style={styles.icon} />
  </TouchableOpacity>
</View>

<View style={styles.rowTwo}>
  <TouchableOpacity onPress={() => navigation.navigate('Items', 'Banheiro')} style={styles.button3}>
    <Icon name="toilet" style={styles.icon} />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('Items', 'Dispensa')} style={styles.button4}>
    <Icon name="file-cabinet" style={styles.icon} />
  </TouchableOpacity>
</View>



  <BottomMenu></BottomMenu>

</View>

  );
}

