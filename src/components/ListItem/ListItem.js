import React, { PureComponent } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
import { ScaleAndOpacity } from 'react-native-motion';

import Header from './Header';
import Content from './Content';
import { getPlatformElevation } from '../../utils';
import { ScrollView } from 'react-native-gesture-handler';
class ListItem extends PureComponent {

  onPressed = event => {
    const { onPress, item } = this.props;
    onPress(item, event.nativeEvent);
  };
  render() {

    const { item, isSelected, style, isHidden, animateOnDidMount } = this.props;
    
    const { name,created_at, isReceived, ...rest} = item;
  
    return (
      <ScaleAndOpacity
          isHidden={isHidden}
          animateOnDidMount={animateOnDidMount}>
            <TouchableWithoutFeedback onPress={this.onPressed}>
              <View style={[styles.container]} pointerEvents="box-only">
                <Header name={name} created_at={created_at} isReceived={isReceived} />
                <Content  {...rest} />
                  
              </View>
            </TouchableWithoutFeedback>
      </ScaleAndOpacity>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    ...getPlatformElevation(2),
  },
});

export default ListItem;
