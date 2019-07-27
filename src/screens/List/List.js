import React, { PureComponent } from 'react';
import { Alert, View, FlatList, StyleSheet,LayoutAnimation} from 'react-native';

import { SharedElement } from 'react-native-motion';

import Toolbar from './Toolbar';
import BottomBar from './BottomBar';
import { ListItem } from '../../components';
import { ListUser } from '../../components';
import data from '../../data/data';
import { ScrollView } from 'react-native-gesture-handler';
import SearchBar from "react-native-dynamic-search-bar";
import { CustomLayoutSpring } from "react-native-animation-layout";

class List extends PureComponent {


  constructor(props) {
    super(props);
    this.MemoUser();
    this.state = { opacityOfSelectedItem: 1, selectedItem: null };
    this.sharedElementRefs = {};
    this.arrayNameUser = [];
    this.arrayTaskUser = [];
    this.arrayDate = [];
    
  }

  state = {
    dataName: []
  };


  MemoUser = async () => {
    fetch('http://wework.stg73.miosys.vn/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": "admin",
            "password":"12345678",
         })
        })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            loading: true,
            dataSource: responseJson["data"],
            memo: responseJson.data.memo,
          }, function(){  
            // Alert.alert(this.state.memo[1])

            for (var i = 0; i < this.state.memo.length; i++){
              fullname = responseJson["data"]["memo"][i]["fullname"];
              // Alert.alert(this.state.memo.length)
              memo = responseJson["data"]["memo"][i]["memo"];
       
              for (var j = 0; j < memo.length; j++) { 
              
                todo = memo[j]["todo"]
                doing = memo[j]["doing"]
                done =  memo[j]["done"]

                created_at = memo[j]["created_at"]
              
                this.arrayDate.push({
                  created_at: created_at,
                  name: fullname,
                  todo: todo,
                  doing: doing,
                  done: done
                })

                 sortedCars1 = this.arrayDate.sort((a, b) =>
                 b.created_at.split('-').reverse().join().localeCompare(a.created_at.split('-').reverse().join()));
              }
             }
          
          }); 
          
      })
      .catch((error) => {
        console.error(error);
      });
    }

  getSharedNode = props => {
    const { item } = props;

    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <ListItem item={item} animateOnDidMount={false} isHidden={false} />
      </View>
    );
  };

  renderUser = ({ item }) => {
    const { opacityOfSelectedItem } = this.state;
    const { selectedItem } = this.props;
   
    const isHidden = selectedItem && selectedItem.name !== item.name;
    const isSelected = selectedItem && selectedItem.name === item.name;
    const id = item.name;
   
    return (
        <View
          style={{
            opacity: opacityOfSelectedItem,
            backgroundColor: 'transparent',
          }}
        >
         
        <ListItem
            item={item}
            onPress={this.getSharedNode}
            isHidden={isHidden}
        />
        </View>

    );
  };

  filterList = text => {
    var newData = this.arrayDate;
    newData = this.arrayDate.filter(item => {
      const itemData = item.name.toLowerCase();
      // {Alert.alert(itemData)}
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    LayoutAnimation.configureNext(CustomLayoutSpring(null, null, "scaleXY"));
  
  };

  render() {
    const { opacityOfSelectedItem } = this.state;
    const { selectedItem, phase } = this.props;
      
    return (
    
      <View style={styles.container}>
              <SearchBar
            onPressToFocus
            autoFocus={false}
            fontColor="gray"
            iconColor="gray"
            shadowColor="black"
            cancelIconColor="gray"
            backgroundColor="white"
            placeholder="Search here"
            onChangeText={text => {
              this.filterList(text);
            }}
            onPressCancel={() => {
              this.filterList("");
            }}
            // onPress={() => alert("onPress")}
          />

        <Toolbar/>
        <ScrollView >
                    <View >
                              <View >
                                          <FlatList
                                               horizontal={true}
                                                data={this.arrayDate}
                                                keyExtractor={(item, index) => index}
                                                dataExtra={{ phase, opacityOfSelectedItem }}
                                                renderItem={this.renderUser}
                                              
                                          />
                              </View> 
 
                          </View>     
                          </ScrollView>  
          </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    
  },
  backgroundColorView:
  {   
    width: 1,
    height: "100%",
    backgroundColor: 'black'
  }
});

export default List;
