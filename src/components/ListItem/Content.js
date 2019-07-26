import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, ScrollView ,TextInput} from 'react-native';

import Row from '../Row';

class Content extends PureComponent {
  render() {
    const { todo, doing, done } = this.props;

    return (
      
      <Row style={styles.container}>
        <ScrollView horizontal={true}>
     
          <View style={{flex:1, flexDirection: 'row'}}>
          
                <View style= {{flexDirection: 'column', flex:1}} >
                <Text>TO DO </Text>
                {
                  todo.map( index => {
                      return (
                            <Text style={{color: "#e91e63", width: 50}}>{index}</Text> 
                      );
                })}
                </View>
                
                <View style= {{flexDirection: 'column', paddingLeft: 50, flex:1}}>
                <Text>DOING </Text>
                    {doing.map( index => {
                          return (
                                <Text style={{color: "#ff9800"}}>{index}</Text> 
                          );
                    })}
                </View>

                <View  style= {{flexDirection: 'column', paddingLeft: 50, flex:1}}>
                <Text>DONE </Text>
                    {done.map( index => {
                          return (
                                <Text style={{color: "#4caf50"}}>{index}</Text> 
                          );
                    })}
                </View>
              </View>
          </ScrollView>
      </Row>
   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 250,
    alignItems: 'center',
    
  },
  cellContainer: {
    // flexDirection: 'row',
    flex: 1,

  },
  titleText: {
    fontSize: 13,
    color: 'gray',
  },
  amountText: {
    paddingTop: 15,
    fontSize: 12,

  },
});

export default Content;
