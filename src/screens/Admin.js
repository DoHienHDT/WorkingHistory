import React from 'react';
import { InteractionManager, StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { SharedElementRenderer } from 'react-native-motion';

import List from './List/List';
// import Detail from './Detail/Detail';
// import ToolbarBackground from './Detail/ToolbarBackground';
import SearchBar from "react-native-dynamic-search-bar";

export default class Admin extends React.Component {

    static navigationOptions= ({ navigation, screenProps }) => ({
        headerLeft: null,
    
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerLeft:  (<TouchableHighlight onPress={() => navigation.navigate("Login")} underlayColor={'#3498db'}>
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
       <View>
          <SearchBar
            onPressToFocus
            autoFocus={false}
            fontColor="white"
            iconColor="white"
            shadowColor="black"
            cancelIconColor="white"
            backgroundColor="#3498db"
            placeholder="Search here"
            // onChangeText={text => {
            //   this.filterList(text);
            // }}
            // onPressCancel={() => {
            //   this.filterList("");
            // }}
            // onPress={() => alert("onPress")}
          />
          </View>
        <View style={styles.container}>
      
          {this.renderPage()}
        </View>
      </SharedElementRenderer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 10,
    flex: 1,
  },
});
