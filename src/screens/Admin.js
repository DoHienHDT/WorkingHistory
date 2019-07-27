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
  onItemPressed = item => {
    this.setState({
      // phase: 'phase-1',
      selectedItem: item,
    });
  };
  onBackPressed = () => {
    this.setState({
      phase: 'phase-3',
    });
  };
  onSharedElementMovedToDestination = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        phase: 'phase-2',
      });
    });
  };
  onSharedElementMovedToSource = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        selectedItem: null,
        phase: 'phase-0',
      });
    });
  };
  renderPage() {
    const { selectedItem, position, detailItem, phase } = this.state;

    return (

      <View style={{ flex: 1 }}>
     
        <List
          selectedItem={selectedItem}
          onItemPress={this.onItemPressed}
          phase={phase}
        />
    
      </View>
    );
  }
  

  render() {
    const {
      selectedItem,
      goToDetail,
      position,
      detailItem,
      goBackRequested,
      phase,
    } = this.state;

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
  color: {
    
  },
  container: {
    backgroundColor: "#90caf9",
  
    flex: 1,
  },
});