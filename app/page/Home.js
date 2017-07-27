import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToastAndroid
} from 'react-native';
import Realm from 'realm';
class Scan {}
Scan.schema= {
    name: 'Scan',
    properties: {
        id:'string',
        name: 'string',
        number:'string',// 添加默认值的写法
    }
};
let realm = new Realm({schema: [Scan]});

export default class Home extends Component {
  createData() {
        realm.write(() => {
           realm.create('Scan', {id:'0', name:'吉泽明步', number:'13312345678'});
           realm.create('Scan', {id:'1', name:'苍井空', number:'13512345678'});
           realm.create('Scan', {id:'2', name:'小泽玛利亚', number:'13612345678'});
           realm.create('Scan', {id:'3', name:'皮皮虾我们走', number:'13712345678'});
           realm.create('Scan', {id:'4', name:'波多野结衣', number:'13812345678'});
        })
          ToastAndroid.show('导入本地数据成功~',ToastAndroid.SHORT)         
    }
  removeData() {
        realm.write(() => {
            // 获取Person对象
            let Scan = realm.objects('Scan');
            // 删除
            realm.delete(Scan);
        })
        ToastAndroid.show('删除成功~',ToastAndroid.SHORT)
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={()=>{this.props.navigation.navigate('Second',{title:'扫描',headerRight:<View></View>})}}>
          点击进入扫码
        </Text>
        <Text style={styles.instructions} onPress={()=>{this.createData()}}>
         此生无悔入华夏
        </Text>
        <Text style={styles.instructions} onPress={()=>{this.removeData()}} >
          来世还生{'\n'}
          种花家
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    marginBottom:20
  },
});