import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
// import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import Avatar from './Avatar';
import Row from '../Row';
import assets from '../../assets';

class Header extends PureComponent {
  render() {
    const { name, isReceived, created_at } = this.props;

    return (
      <Row style={styles.container}>
        <Avatar text={name.substring(0, 1)} src={assets[name]} />
        <View style={styles.nameContainer}>
          <Text>Họ và tên:   {name}</Text>
        </View>
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#90caf9',
    height: 56,
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    marginLeft: 16,
    width: 200
  }
});

export default Header;
