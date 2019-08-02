    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     *
     * @format
     * @flow
     */

    import React, {Fragment} from 'react';
    import {
      View,
      Text,
      TouchableOpacity,
      Image,
      FlatList,
      Alert,
      Dimensions,
      TextInput,
      ScrollView,
      ActivityIndicator,
      TouchableHighlight
    } from 'react-native';
import { SafeAreaView } from 'react-navigation';
   
    export default class User extends React.Component {
      state = { 
        username: 'vutran',
        password: '12345678',
        activityIndicator: true,
        hidden: false,
        add: false,
        group_id: '',
        fullname:'', 
        token:'',
        memoid: 0,
        arrayTodo: [],
        arrayDoing: [],
        arrayDone: [],
        taskAdd: '',
        taskAdd: '',
        indexSelected: {},
        refreshing: false,
        timePassed: false
      }
      Hide = () => {
        this.setState({ hidden: false });
      }

      OKEdit = () => {
        this.setState({ hidden: false ,refreshing: true});
        let vt =  this.state.indexSelected.vt
        let tb = this.state.indexSelected.tb
        if (tb === 0){
          this.state.arrayTodo[vt] = this.state.taskName
        }
        else if (tb === 1){
          this.state.arrayDoing[vt] = this.state.taskName
        }
        else{
          this.state.arrayDone[vt] = this.state.taskName
        }
      }

      Add = () => {
        this.setState({ add: true ,refreshing: false});
      }

      CancelAdd = () => {
        this.setState({ add: false });
      }

      OkAdd = () => {
        this.setState({ add: false ,refreshing: true});
        this.state.arrayTodo.push(''+this.state.taskAdd)
      }
      
      setTimePassed(){
        this.setState({
          refreshing: true
        })
      }

      todoToDoing(vl,vt){
        this.setState({ refreshing: false})
        this.state.arrayTodo.splice(vt,1)
        this.state.arrayDoing.push(vl)
        setTimeout( () => {
          this.setState({ refreshing: true})
        },1000);
      }

      todoToDone(vl,vt){
        this.setState({ refreshing: false})
        this.state.arrayTodo.splice(vt,1)
        this.state.arrayDone.push(vl)
        setTimeout( () => {
          this.setState({ refreshing: true})
        },1000);
      }

      doingToTodo(vl,vt){
        this.setState({ refreshing: false})
        this.state.arrayDoing.splice(vt,1)
        this.state.arrayTodo.push(vl)
        setTimeout( () => {
          this.setState({ refreshing: true})
        },1000);
      }

      doingToDone(vl,vt){
        this.setState({ refreshing: false})
        this.state.arrayDoing.splice(vt,1)
        this.state.arrayDone.push(vl)
        setTimeout( () => {
          this.setState({ refreshing: true})
        },1000);
      }

      doneToTodo(vl,vt){
        this.setState({ refreshing: false})
        this.state.arrayDone.splice(vt,1)
        this.state.arrayTodo.push(vl)
        setTimeout( () => {
          this.setState({ refreshing: true})
        },1000);
      }

      doneToDoing(vl,vt){
        this.setState({ refreshing: false})
        this.state.arrayDone.splice(vt,1)
        this.state.arrayDoing.push(vl)
        setTimeout( () => {
          this.setState({ refreshing: true})
        },1000);
      }
      
      submit = () => {
        return fetch('http://wework.stg73.miosys.vn/api/memo-update', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer'+this.state.token
          },
          body: JSON.stringify({
            memo_id: this.state.memoid,
            todo: this.state.arrayTodo,
            doing: this.state.arrayDoing,
            done: this.state.arrayDone
          }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
          // {Alert.alert(responseJson.message)}
          if (responseJson.message === 'Update success'){
            Alert.alert(
              'SUBMIT SUCCESS',
              'Báo cáo công việc thành công',
              [
                {text: 'OK', onPress: () => {null}},
              ],
              {cancelable: false},
            );  
          }
        })
        .catch((error) => {
          console.error(error);
        }); 
      }
   
      static navigationOptions= ({ navigation, screenProps }) => (
        {
        headerLeft: null,
        title: navigation.state.params.name,
        headerStyle: {
          backgroundColor: '#5d99c6',
        },
        headerLeft:  (<TouchableHighlight  onPress={() => {
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
        }} underlayColor={'#3498db'}>
        <Image style={{ width: 35, height: 35, marginLeft: 10 }}  source={require('../assets/back.png')} />
        </TouchableHighlight>)
    });

      logout(){
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
      }

      componentDidMount() {
        setInterval(() => {
          this.getdata()
        }, 300000);
      }

      getdata() {
      const { navigation } = this.props;
      const taikhoanDev = navigation.getParam('taikhoan', 'NO-ID');
      const matkhauDev = navigation.getParam('matkhau', 'NO-ID');
        return fetch('http://wework.stg73.miosys.vn/api/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: taikhoanDev.toLowerCase(),
            password: matkhauDev.toLowerCase(),
          }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
          let a = responseJson.data.memo.todo;
          let b = responseJson.data.memo.doing;
          let c = responseJson.data.memo.done;
          let memo_Id = responseJson.data.memo.memo_id
          let tokenId = responseJson.token
          let fullnameUser = responseJson.data.fullname
          this.setState({
            arrayTodo: a,
            arrayDoing: b,
            arrayDone: c,
            memoid: memo_Id,
            token: tokenId,
            activityIndicator: false,
            fullname: fullnameUser
          }, function(){
            // {Alert.alert(responseJson.data.memo.todo.slice(0, -1))}
          });
        })
        .catch((error) =>{
          console.error(error);
      });
      }
      
      componentWillMount(){
          this.getdata()
      }

      render(){
        console.disableYellowBox = true;
        return(
          <View style={{flex:1,backgroundColor:'#d5ecf6'}}>
              <View style={{flexDirection:'column',position: 'absolute',top:0,left:0,width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>

                {/* <View style={{height:70,backgroundColor:'#32A4D4',flexDirection:'column-reverse'}}> */}
                  {/* <View style={{height:50,backgroundColor:"#32A4D4",flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <TouchableOpacity onPress={this.logout}>
                      <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                          <Image 
                              style={{width:40,height:40,marginRight:10,borderRadius:20}}
                              source = {require('../assets/hiendeptrai.jpg')}
                          />
                        <Text style={{fontSize:20}}>{this.state.fullname}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.Add}>
                      <Image 
                        style={{width:30,height:30,marginRight:10}}
                        source = {require('../assets/hiendeptrai.jpg')}
                      />
                    </TouchableOpacity>
                  </View> */}
                {/* </View> */}

                <View style={{height:30,backgroundColor:'#96d0e9',flexDirection:'row'}}>
                    <View style={{flex:3,alignItems:'center',flexDirection:'row',marginLeft:20}}><Text style={{fontSize:15}}>Task Name</Text></View>
                    <View style={{flex:2,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginRight:10}}>
                      <Text style={{fontSize:15}}>Todo</Text>
                      <Text style={{fontSize:15}}>Doing</Text>
                      <Text style={{fontSize:15}}>Done</Text>
                    </View>
                </View>

                <View style={{marginTop:5,flex:1}}>
                    <ScrollView>
                        <Text style={{fontSize:17,fontWeight:'bold',marginTop:5,marginBottom:5,marginLeft:5}}>ToDo</Text>
                        <FlatList
                          refreshing={this.state.refreshing}
                          data={this.state.arrayTodo}
                          renderItem={({item,index}) => 
                          <View style={{flex:1}}>
                              <TouchableOpacity 
                                onPress={() => this.setState({ hidden: true ,refreshing: false,taskName: item,indexSelected: {vt:index,tb:0}})}
                                style={{flex:1}}>
                                <View style={{height:70,backgroundColor:'#f8bbd0',flexDirection:'column'}}>
                                    <View style={{height:65,flexDirection:'row'}}>
                                      <View style={{flex:3,alignItems:'center',flexDirection:'row',marginLeft:20}}><Text style={{fontSize:15}}>{item}</Text></View>
                                      <View style={{flex:2,justifyContent:'space-evenly',flexDirection:'row',alignItems:'center',marginRight:10}}>
                                        <TouchableOpacity onPress={null}>
                                          <Image 
                                            style={{width:25,height:25}}
                                            source = {require('../assets/checked.png')}
                                            
                                          />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.todoToDoing(vl=item,vt=index)}>
                                          <Image 
                                            style={{width:25,height:25}}
                                            source = {require('../assets/square.png')}
                                          />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.todoToDone(vl=item,vt=index)}>
                                          <Image 
                                            style={{width:25,height:25}}
                                            source = {require('../assets/square.png')}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                    <View style={{height:5,backgroundColor:'#d5ecf6'}}></View>
                                </View>
                              </TouchableOpacity>
                          </View>  
                        }/>
                        <Text style={{fontSize:17,fontWeight:'bold',marginTop:5,marginBottom:5,marginLeft:5}}>Doing</Text>
                        <FlatList
                          refreshing={this.state.refreshing}
                          data={this.state.arrayDoing}
                          renderItem={({item,index}) => 
                          <View style={{flex:1}}>
                              <TouchableOpacity 
                                onPress={() => this.setState({ hidden: true,refreshing:false ,taskName: item,indexSelected:{vt:index,tb:1}})}
                                style={{flex:1}}>
                                <View style={{height:70,backgroundColor:'#ffe0b2',flexDirection:'column'}}>
                                    <View style={{height:65,flexDirection:'row'}}>
                                      <View style={{flex:3,alignItems:'center',flexDirection:'row',marginLeft:20}}><Text style={{fontSize:15}}>{item}</Text></View>
                                      <View style={{flex:2,justifyContent:'space-evenly',flexDirection:'row',alignItems:'center',marginRight:10}}>
                                          <TouchableOpacity onPress={() => this.doingToTodo(vl=item,vt=index)}>
                                              <Image 
                                                style={{width:25,height:25}}
                                                source = {require('../assets/square.png')}
                                              />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={null}>
                                              <Image 
                                                style={{width:25,height:25}}
                                                source = {require('../assets/checked.png')}
                                              />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.doingToDone(vl=item,vt=index)}>
                                              <Image 
                                                style={{width:25,height:25}}
                                                source = {require('../assets/square.png')}
                                              />
                                            </TouchableOpacity>
                                      </View>
                                    </View>
                                    <View style={{height:5,backgroundColor:'#d5ecf6'}}></View>
                                </View>
                              </TouchableOpacity>
                          </View>  
                        }/>
                        <Text style={{fontSize:17,fontWeight:'bold',marginTop:5,marginBottom:5,marginLeft:5}}>Done</Text>
                        <FlatList
                          refreshing={this.state.refreshing}
                          data={this.state.arrayDone}
                          renderItem={({item,index}) => 
                          <View style={{flex:1}}>
                              <TouchableOpacity 
                                onPress={() => this.setState({ hidden: true,refreshing:false ,taskName: item,indexSelected:{vt:index,tb:2}})}
                                style={{flex:1}}>
                                <View style={{height:70,backgroundColor:'#c8e6c9',flexDirection:'column'}}>
                                    <View style={{height:65,flexDirection:'row'}}>
                                      <View style={{flex:3,alignItems:'center',flexDirection:'row',marginLeft:20}}><Text style={{fontSize:15}}>{item}</Text></View>
                                      <View style={{flex:2,justifyContent:'space-evenly',flexDirection:'row',alignItems:'center',marginRight:10}}>
                                            <TouchableOpacity onPress={() => this.doneToTodo(vl=item,vt=index)}>
                                              <Image 
                                                style={{width:25,height:25}}
                                                source = {require('../assets/square.png')}
                                              />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.doneToDoing(vl=item,vt=index)}>
                                              <Image 
                                                style={{width:25,height:25}}
                                                source = {require('../assets/square.png')}
                                              />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={null}>
                                              <Image 
                                                style={{width:25,height:25}}
                                                source = {require('../assets/checked.png')}
                                              />
                                            </TouchableOpacity>
                                      </View>
                                    </View>
                                    <View style={{height:5,backgroundColor:'#d5ecf6'}}></View>
                                </View>
                              </TouchableOpacity>
                          </View>  
                        }/>
                    </ScrollView>
                </View>

                <SafeAreaView style={{backgroundColor:'#32A4D4', marginBottom: 120, margin: 10, borderRadius: 5}}>
                  <View >
                    <TouchableOpacity onPress={this.submit}>
                      <Text style={{fontSize:20,height:50,fontWeight:'bold',textAlign:'center',paddingVertical:10, color: "white"}}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              </View> 

            {this.state.hidden ? (
              <View style={{position: 'absolute',width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'black',opacity:0.9,justifyContent:'center',alignItems:'center'}}>
                <View style={{borderRadius:5,width:Dimensions.get('window').width - 40,height:250,backgroundColor:'white'}}>
                    <Text style={{fontSize:20,marginTop:5,fontWeight:'bold',alignSelf:'center'}}>TASK NAME</Text>
                    <TextInput
                      style={{borderColor: '#32A4D4', borderWidth: 1, marginTop:5,marginLeft:10,marginRight:10,height:150,fontSize:15,padding:5}}
                      multiline={true}
                      onChangeText={(text) => this.setState({taskName: text})}
                      value={this.state.taskName}
                    />
                    <View style={{height:50,margin:10,flexDirection:'row'}}>
                      <TouchableOpacity 
                        onPress={this.Hide}
                        style={{flex:1,justifyContent:'center',alignItems:'center',borderColor:'#32A4D4',borderWidth:1}}>
                          <Text style={{fontSize:15,fontWeight:'bold',color:'#CF3232'}}>CANCEL</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={this.OKEdit}
                        style={{flex:1,justifyContent:'center',alignItems:'center',borderColor:'#32A4D4',borderWidth:1}}>
                          <Text style={{fontSize:15,fontWeight:'bold',color:'#32A4D4'}}>OK</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
            ) : null}
            
            {this.state.add ? (
              <View style={{position: 'absolute',width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'black',opacity:0.9,justifyContent:'center',alignItems:'center'}}>
                <View style={{borderRadius:5,width:Dimensions.get('window').width - 40,height:250,backgroundColor:'white'}}>
                    <Text style={{fontSize:20,marginTop:5,fontWeight:'bold',alignSelf:'center'}}>NEW ISSUE</Text>
                    <TextInput
                      style={{borderColor: '#32A4D4', borderWidth: 1, marginTop:5,marginLeft:10,marginRight:10,height:150,fontSize:15,padding:5}}
                      multiline={true}
                      onChangeText={(text) => this.setState({taskAdd: text})}
                    />
                    <View style={{height:50,margin:10,flexDirection:'row'}}>
                      <TouchableOpacity 
                        onPress={this.CancelAdd}
                        style={{flex:1,justifyContent:'center',alignItems:'center',borderColor:'#32A4D4',borderWidth:1}}>
                          <Text style={{fontSize:15,fontWeight:'bold',color:'#CF3232'}}>CANCEL</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={this.OkAdd}
                        style={{flex:1,justifyContent:'center',alignItems:'center',borderColor:'#32A4D4',borderWidth:1}}>
                          <Text style={{fontSize:15,fontWeight:'bold',color:'#32A4D4'}}>OK</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
            ) : null}

            {this.state.activityIndicator ? (
              <View style={{position: 'absolute',width:Dimensions.get('window').width,height:Dimensions.get('window').height,flex:1,backgroundColor:'clear',justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : null}
          </View>
        )
      }
    }