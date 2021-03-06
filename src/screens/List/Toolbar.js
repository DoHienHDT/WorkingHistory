import React, { PureComponent } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
// import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

import { Row } from '../../components';
import translateAndOpacity from '../../animations/translateAndOpacity';

class Toolbar extends PureComponent {
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View>
          <Row style={styles.toolbarContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Nhân viên</Text>
            </View>
            <View style={styles.menuIconContainer}>
              {/* <Ionicons name="md-menu" size={24} color="#008dff" /> */}
            </View>
            <View style={styles.menuIconContainer}>
              {/* <MaterialCommunityIcons
                name="file-document"
                size={24}
                color="#008dff"
              /> */}
            </View>
          </Row>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  toolbarContainer: {
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 16,
    // backgroundColor: '#90caf9',
  },
  titleContainer: {
    flex: 1,
  },
  toolbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,

  },
  statusBar: {
    height: 10,

  },
  titleBackText: {
    color: 'red',
    marginLeft: 8,
  },
  titleText: {
      color: "white",
    fontSize: 24,
    fontWeight: '900',
  },
  backContainer: {
    flex: 1,
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default translateAndOpacity(Toolbar);
