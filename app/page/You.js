import React, { Component } from 'react';
import {

  StyleSheet,
  Text,
  View
} from 'react-native';

export default class You extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
         使用提示！
        </Text>
        <Text style={styles.instructions}>
          第一次使用请点击《此生无悔入华夏》
        </Text>
        <Text style={styles.instructions}>
          如果需要删除本地数据,{'\n'}
          请点击来世还生种花家
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
    marginBottom: 5,
  },
});