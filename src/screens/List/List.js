import React, { PureComponent } from 'react';
import { Alert, View, FlatList, StyleSheet,LayoutAnimation, Text} from 'react-native';
import Row from '../../components/Row';
import Header from '../../components/ListItem/Header';
import Toolbar from './Toolbar';
import { ListItem } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import SearchBar from "react-native-dynamic-search-bar";
import { CustomLayoutSpring } from "react-native-animation-layout";
import { getPlatformElevation } from '../../utils';

class List extends PureComponent {


  constructor(props) {
    super(props);
    this.MemoUser();
    this.state = { opacityOfSelectedItem: 1, selectedItem: null, dataName: [], dataTask: [] };
    this.sharedElementRefs = {};
    // this.arrayDate = [];
    // this.arrayNameUser = [];
    this.arrayData = []
  }

  state = {
    dataName: [],
    dataTask: []
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
            returnData: responseJson.data.memo,
          }, function(){
            //this.arrayData = this.state.returnData
            // Alert.alert(this.state.memo[1])

            // for (var i = 0; i < this.state.returnData.length; i++){
            //   fullname = responseJson["data"]["memo"][i]["fullname"];
            //   // Alert.alert(this.state.memo.length)
            //   memo = responseJson["data"]["memo"][i]["memo"];
            //   arrayMemoTemp = []
            //   for ( j = 0; j< memo.length; j++){
            //     id = memo[j].id;
            //     todo = memo[j].todo;
            //     doing= memo[j].doing;
            //     done = memo[j].done;
            //     arrayTodoTemp = []
            //     arrayDoingTemp = []
            //     arrayDoneTemp = []
            //     for (td=0;td<todo.length;td++){
            //       arrayTodoTemp.push()
            //     }


            //     console.log(id)
            //   }
              // this.arrayNameUser.push({
              //   name: fullname
              // })
              // arrayMemo = []
              // for (var j = 0; j < memo.length; j++) { 
              //   {Alert.alert(j)}
              //   todo = memo[j]["todo"]
              //   doing = memo[j]["doing"]
              //   done =  memo[j]["done"]

              //   // created_at = memo[j]["created_at"]    

              //   // sortedCars1 = this.arrayDate.sort((a, b) =>
              //   // b.created_at.split('-').reverse().join().localeCompare(a.created_at.split('-').reverse().join()));
              //   arrayMemo.push({
              //     todo: todo,
              //     doing: doing,
              //     done: done
              //  })
              // }
              // this.arrayDate.push(arrayMemo)
            //  }
            //  this.setState({
            //   dataName: this.arrayNameUser,
            // })
          });
          // this.setState({
          //   dataTask: this.arrayDate
          // })
          //{Alert.alert(this.arrayData)}
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
  
    return (
      <ScrollView horizontal = {true}>
                <View style={[styles.styleName]} pointerEvents="box-only">     
                      <Header  name={item.fullname}/>  
                </View>
  
                <View>
                  <FlatList 
                    horizontal={true}
                        data={item.memo}
                        renderItem={this.taskMemo} 
                  />
                </View>
        </ScrollView>
    );
  };
  
  taskMemo = ({item}) => {
    return(
      <ScrollView horizontal = {false}>
        <View style={[styles.styleName]} pointerEvents="box-only">
          <Text>Date: {item.created_at} </Text>
          {
            [item.todo].map( index => {
              return (
              <Text style={{color: "#e91e63"}}>{index }</Text> 
            );
          })}
          {[item.doing].map( index => {
            return (
              <Text style={{color: "#ff9800"}}>{index}</Text> 
            );
          })}
          {[item.done].map( index => {
            return (
              <Text style={{color: "#0000ff"}}>{index}</Text> 
            );
          })}
        </View>
      </ScrollView>
    )
  }


  // taskMemo = ({item}) => {
  //   array.forEach(element => {
  //     return (
  //         <View style={[styles.styleName]} pointerEvents="box-only">
  //       {/* {Alert.alert(item)} */}
  //         <ScrollView horizontal={true} >
  //             <View style={styles.nameContainer}>
  //             <Row style={styles.containerRow}>
  //                           <View style= {{flexDirection: 'column', flex:1}} >
  //                           <Text>TO DO: </Text>
  //                             {
  //                               [item.todo].map( index => {
  //                                   return (
  //                                         <Text style={{color: "#e91e63", width: 50}}>{index}</Text> 
  //                                   );
  //                             })}
  //                         </View>
  //                           <View style= {{flexDirection: 'column', paddingLeft: 50, flex:1}}>
  //                                 <Text>DOING </Text>
  //                                     {[item.doing].map( index => {
  //                                           return (
  //                                                 <Text style={{color: "#ff9800"}}>{index}</Text> 
  //                                           );
  //                                     })}
  //                           </View>
  //                           <View style= {{flexDirection: 'column', paddingLeft: 50, flex:1}}>
  //                                 <Text>DOING </Text>
  //                                     {[item.done].map( index => {
  //                                           return (
  //                                                 <Text style={{color: "#ff9800"}}>{index}</Text> 
  //                                           );
  //                                     })}
  //                           </View>
  //                   </Row>
  //             </View>     
  //         </ScrollView>
  //         </View>
  //     );
  //   });
  // };

  filterList = text => {
    var newData = this.state.returnData;
    newData = this.state.returnData.filter(item => {
      const itemData = item.fullname.toLowerCase();
      // {Alert.alert(itemData)}
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    LayoutAnimation.configureNext(CustomLayoutSpring(null, null, "scaleXY"));
    this.setState({
      returnData: newData
    });
  };

  render() {
    
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
            onPress={() => alert("onPress")}
        />
        <Toolbar/>
        <View >
          <View >
            <FlatList
              //  horizontal={true}
              data={this.state.returnData}
              // keyExtractor={(item, index) => index}
              // dataExtra={{ phase, opacityOfSelectedItem }}
              renderItem={this.renderUser}
            /> 
          </View> 
        </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    
  },
  nameContainer: {
 
    marginLeft: 10,
   
  
  },
  containerRow: {
    flex: 1,
    height: 400,
    width: 250,
   
  },
  styleName: {
    flex:1,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    
    ...getPlatformElevation(2),
  },
  backgroundColorView:
  {   
    width: 1,
    height: "100%",
    backgroundColor: 'black'
  },
  imageWrapper: {
    borderWidth: 2,
    borderColor: "#AE8B8C"
  },
  mediaWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-around",
  
    marginVertical: 3,
  },
});

export default List;
