import React, { PureComponent } from 'react';
import { Alert, View, FlatList, StyleSheet,LayoutAnimation, Text,UIManager} from 'react-native'; 
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
    this.state = { opacityOfSelectedItem: 1, selectedItem: null,  isLoading: true,
      page: 1,
      seed: 1,
      refreshing: false};
    this.sharedElementRefs = {};

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  state = {
    dataName: [],
    dataTask: []
  };

  MemoUser = async () => {
    const { taikhoanAdmin, matkhauAdmin } = this.props;
    fetch('http://wework.stg73.miosys.vn/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": taikhoanAdmin.toLowerCase(),
            "password":matkhauAdmin.toLowerCase(),
         })
        })
      
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            loading: true,
            dataSource: responseJson["data"],
            returnData: responseJson.data.memo,
            returnDataBackup: responseJson.data.memo
          }, function(){
       
            //this.arrayData = this.state.returnData
            // Alert.alert(taikhoanAdmin.toLowerCase())

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
      <ScrollView horizontal = {true}  >
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
      <ScrollView>
        <View style={[styles.styleName]} pointerEvents="box-only">
          <Text>Date: {item.created_at}{"\n"} </Text>
            <FlatList 
              horizontal={true}
                  data={[item]}
                  renderItem={this.lineMemo} 
            />
        </View>
        </ScrollView>
    )
  }

  lineMemo = ({item}) => {
      return (
       <View>
          {
            item.todo.map( index => {
              return (
              <Text style={{color: "#e91e63", paddingTop: 5}}>{index }</Text> 
            );
          })}

          {
            item.doing.map( index => {
            return (
              <Text style={{color: "#ff9800", paddingTop: 5}}>{index}</Text> 
            );
          })}

          {
            item.done.map( index => {
            return (
              <Text style={{color: "#4caf50", paddingTop: 5}}>{index}</Text> 
            );
          })}
     </View>
      );
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
    var newData = this.state.returnDataBackup;
    newData = this.state.returnDataBackup.filter(item => {
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

       
        <ScrollView>
          <View >
              <FlatList
                data={this.state.returnData}
                renderItem={this.renderUser}
              /> 
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
 
  styleName: {
    flex:1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 30,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    
    ...getPlatformElevation(2),
  },
  backgroundColorView:
  {   
    width: 1,
    height: "100%",
    backgroundColor: 'black'
  }
});

export default List;
