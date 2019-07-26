import React, { PureComponent } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ScaleAndOpacity } from 'react-native-motion';
import Header from './Header';
import { getPlatformElevation } from '../../utils';
class ListUser extends PureComponent {

  render() {

    const { item, isSelected, style, isHidden, animateOnDidMount } = this.props;
    const { name } = item;

    return (

          <ScaleAndOpacity
            isHidden={isHidden}
            animateOnDidMount={animateOnDidMount}
          >
            <TouchableWithoutFeedback>
              <View style={[styles.container, style]} pointerEvents="box-only">
                <Header name={name} isReceived={isReceived} />
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

export default ListUser;
