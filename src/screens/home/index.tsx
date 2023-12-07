import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet,Image, View, Modal, Text, Dimensions,TouchableOpacity, ImageBackground } from "react-native";
import { Button } from 'react-native-paper';
import Scanner from "../../components/Scanner";


export default function Home() {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
          
        <View style={styles.modal}>
        <ImageBackground  
      resizeMode='cover'
      source={require('../../../src/img/fundoQR.png')} 
      style={{width: "100%", height: "100%"}}>
          <Scanner />
          <Image style={{width:300,height:300,zIndex:1,alignSelf:"center",top:100,position:"absolute"}} source={require("../../img/transmissao.webp")}></Image>
          <Text style={{alignSelf:"center",fontSize:48,bottom:80}}>Transmitindo...</Text>
          <TouchableOpacity style={styles.buttom} onPress={() => setModalVisible(false)}><Text style={styles.textbuttom}>X</Text></TouchableOpacity>
        </ImageBackground>
        </View>
      </Modal>
      <StatusBar style="inverted"  />
      <ImageBackground  
      resizeMode='cover'
      source={require('../../../src/img/fundoQR.png')} 
      style={{width: "100%", height: "100%"}}>
      
      <Button style={styles.buttomscan} dark={true} rippleColor="black" buttonColor='' icon="qrcode-scan" mode="contained"  onPress={() => setModalVisible(true)}>
                Scanear QRCODE
                    </Button>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  buttom:{
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor:'blue',
    textAlign:'center',
    justifyContent:"center",
    alignSelf:"center",
    display:"flex",
    alignItems:'center',
    marginTop:"5%",
  },
  buttomscan:{
    width: "75%",
    height: 50,
    borderRadius: 50,
    backgroundColor:'blue',
    textAlign:'center',
    justifyContent:"center",
    display:"flex",
    alignItems:'center',
    paddingHorizontal:24,
    paddingVertical:8,
    marginTop:"100%",
    marginLeft:"11.5%"
  },
  textbuttom:{
    color:"white",
    fontWeight:"bold",
    textAlign:'center',
    fontSize:30,
  },
  textbuttomscan:{
    color:"white",
    fontWeight:"bold",
    textAlign:'center',
    fontSize:16,
  }
});