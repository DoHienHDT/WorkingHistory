import React from "react";
import { Image, StyleSheet, View, Alert,ActivityIndicator, TextInput, Dimensions, ImageBackground, TouchableOpacity, Text, AsyncStorage, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Component} from 'react';
import Loader from '../pages/Loader';

const {width: WIDTH} = Dimensions.get('window')

export default class LoginController extends Component { 

    static navigationOptions = {
        header: null
      };

      Login = async () => {
        fetch('http://wework.stg73.miosys.vn/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": this.state.taikhoan,
                "password":this.state.matkhau,
             })
            })
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
                loading: true,
                dataSource: responseJson["success"],
                data: responseJson["data"]
              }, function(){
              
              }); 
            if (this.state.dataSource === "Login success")  {
                if (this.state.data.group_id === 1) {
                    // this.state.loading = false
                    this.props.navigation.navigate("Admin");
                }   else {
                    this.props.navigation.navigate("User");
                }
             } else {
                // this.state.loading = false
                Alert.alert("Tên truy cập hoặc mật khẩu không đúng");
             }    
          })
          .catch((error) => {
            console.error(error);
          });
        }
    
      constructor(props) {
          super(props);
       
          this.state = {
              taikhoan: '',
              matkhau: '',
              loading: false,
          }
      }

    render() {
        
        return (
          
                <KeyboardAvoidingView behavior='padding' style ={styles.backgroundContainer}>
                    <TouchableWithoutFeedback style ={styles.backgroundContainer} 
                    onPress ={Keyboard.dismiss}>
                        <View style ={styles.backgroundContainer}>
                                        <View style={styles.logoContainer}>
                                            {/* <Loader loading={this.state.loading} /> */}
                                            <Image source={require('../assets/v-mio-system-logo.png')} style={styles.logo} />
                                        </View>
                                    
                                        <View style = {styles.inputContainer}>
                                                <TextInput 
                                                    style={styles.input}
                                                    placeholder={'Tài khoản'}
                                                    placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                                    underlineColorAndroid = 'transparent'
                                                    returnKeyType='next'
                                                    onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                                    onChangeText = {
                                                        (text) => {
                                                            this.setState(
                                                                (previousState) => {
                                                                    return {
                                                                        taikhoan: text
                                                                    };
                                                                }
                                                            );
                                                        }
                                                    }
                                                />
                                        </View>

                                        <View style = {styles.inputContainer}>
                                            <TextInput 
                                                style={styles.input}
                                                placeholder={'Mật khẩu'}
                                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                                underlineColorAndroid = 'transparent'
                                                secureTextEntry = {true}
                                                ref={"txtPassword"}
                                                onChangeText = {
                                                    (text) => {
                                                        this.setState(
                                                            (previousState) => {
                                                                return {
                                                                    matkhau: text
                                                                };
                                                            }
                                                        );
                                                    }
                                                }
                                            />
                                        </View>
                                  
                                            <TouchableOpacity style={styles.btnLogin}
                                                                onPress={() => {
                                                                    this.Login();
                                                                    // this.props.navigation.navigate("Admin");
                                                                }}>
                                            
                                                <Text style={styles.text}>Đăng nhập</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.contact}>Bạn chưa có tài khoản đăng nhập?</Text>        
                                    </View>
                            </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    logoContainer: {
        alignItems:'center'
    },
    container: {
      flex: 1,
      width: null,
      height: null,
      alignItems: "center",
      justifyContent: "center"
    },
    inputContainer: {
        marginBottom: 15
    },
    logo: {
      width: 300,
      height: 300
    },
    input: {
        width: WIDTH - 55,
        height: 50,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#bdbdbd',
        // color: '#bdbdbd',
        marginHorizontal: 25
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#5d99c6',
        justifyContent: 'center',
        marginTop: 140
    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
    contact: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        marginTop:80,
        marginLeft:10
    }
  });
