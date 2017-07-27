import { AppRegistry,View,Text } from 'react-native';
import React, { Component } from 'react';
import {Provider}from 'react-redux';
import configureStore from '../Store/ConfigureStore';
const store = configureStore();
import './common/Global'
import App from './App';
if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        },
    };
}

export default class Root extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
                <Provider store={store}>
                    <App />
                </Provider>
        );
    }
};


console.ignoredYellowBox = ['Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
];


AppRegistry.registerComponent('chuanzhang', () => Root);