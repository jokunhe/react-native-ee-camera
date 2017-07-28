import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid
} from 'react-native';

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jieguo:[]
        }
        
    }
    emptys(){
        this.setState({
            jieguo:[]
        });
        this.props.navigation.setParams({
        Scanresults:[]
    });
         ToastAndroid.show('清理完毕~',ToastAndroid.SHORT)
    }

    
    componentWillMount(){
      this.setState({
            jieguo:this.props.navigation.state.params.Scanresults,
        });
    }
    ResultData(){
        let temp = []
        data =this.state.jieguo;
        if(data.length<1){
            temp.push(
            <View key={1}>
            <Text key={1}>没有添加任何数据</Text>
            </View>
            )
        }else{
        for(var key in data){
            temp.push(
            <View  key={key}>
            <Text key={key}> {data[key]}</Text>
            </View>
            )
        }}
        return temp;
    }
  render() {
      console.log(this.state.jieguo[0])
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          扫描出来的仓库中有的数据如下
        </Text>
          {this.ResultData()}
          <Text style={styles.welcome}  onPress={()=>{this.emptys()}}>清空所有数据</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});