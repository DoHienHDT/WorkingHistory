import React from 'react';
import { InteractionManager, StyleSheet, Text, View, TouchableHighlight, Image, Alert } from 'react-native';
import { SharedElementRenderer } from 'react-native-motion';

import List from './List/List';
// import Detail from './Detail/Detail';
// import ToolbarBackground from './Detail/ToolbarBackground';


export default class Admin extends React.Component {

    static navigationOptions= ({ navigation, screenProps }) => ({
        headerLeft: null,
    
        headerStyle: {
          backgroundColor: '#5d99c6',
        },
        headerLeft:  (<TouchableHighlight onPress={() => {
          Alert.alert(
              'Đăng xuất',
              'Bạn có chắc kết thúc phiên làm việc',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () =>  navigation.navigate("Login")},
              ],
              {cancelable: false},
            );
      
      }}underlayColor={'#3498db'}>
        <Image style={{ width: 35, height: 35, marginLeft: 10 }}  source={require('../assets/back.png')} />
        </TouchableHighlight>)
    });

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      phase: 'phase-0',
    };
  }

  renderPage() {
    const { navigation } = this.props;
    const taikhoanDev = navigation.getParam('taikhoan', 'NO-ID');
    const matkhauDev = navigation.getParam('matkhau', 'NO-ID');

    return (
      <View style={{ flex: 1 }}>
        <List taikhoanAdmin = {taikhoanDev}
              matkhauAdmin = {matkhauDev}
        />
      </View>
    );
  }
  
  render() {
    return (
      <SharedElementRenderer>
       
        <View style={styles.container}>
  
          {this.renderPage()}
        </View>
      </SharedElementRenderer>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#90caf9",
    flex: 1,
  },
});
