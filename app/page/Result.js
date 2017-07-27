import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jieguo:[]
        }
        
    }
    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle:navigation.state.params?navigation.state.params.headerTitle:'Detail1',
        headerRight:(
            <Text style={{color:'red',marginRight:20}} onPress={()=>navigation.state.params?navigation.state.params.navigatePress():null}>我的</Text>
        ),
    });

    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            headerTitle:'Detail1',
            navigatePress:this.navigatePress,
        });
    }

    navigatePress = () => {
        alert('点击headerRight');
    }
    componentWillMount(){
      this.setState({
            jieguo:this.props.navigation.state.params.Scanresults,
        });
    }
    ResultData(){
        let temp = []
        data =this.state.jieguo;
        for(var key in data){
            temp.push(
            <View  key={key}>
            <Text key={key}> {data[key]}</Text>
            </View>
            )
        }
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});