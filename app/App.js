import React from 'react'
import {StackNavigator,DrawerNavigator,addNavigationHelpers,TabNavigator}from 'react-navigation';
import {connect}from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';

import Second from './page/Second.js'
import Home from './page/Home.js'
import You from './page/You.js'
import Result from './page/Result.js'
const Homeicon = require('./img/home1.png');
const Homeicons = require('./img/home2.png');
const Mineicon = require('./img/mine1.png');
const Mineicons = require('./img/mine2.png');
const backicon =require('./img/nav_icon_back3x.png');
const tabNavigator = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: ()=> TabOptions('首页',Homeicon,Homeicons,'首页'),
    },
    Mine:{
        screen:You,
        navigationOptions: ()=> TabOptions('我的',Mineicon,Mineicons,'我的'),
    },    

},
    {
    tabBarPosition: 'bottom',
    // tabBarComponent:TabBarBottom,
    swipeEnabled:false,
    animationEnabled:false,
    backBehavior:'none',
    lazy:true,
    tabBarOptions: {
        showIcon:true,
        // tabbar上label的style
        labelStyle: {
            color:'#323232',
            fontSize:12,

        },
        // tabbar的style
        style: {
            backgroundColor:'#FFFFFF',
            height:60,
            
        },
        // label和icon的背景色 活跃状态下
        // activeBackgroundColor:'green',
        // // label和icon的前景色 活跃状态下（选中）
        // activeTintColor:'green',
        // // label和icon的背景色 不活跃状态下
        // inactiveBackgroundColor:colors.text_color_gray_dark,
        // // label和icon的前景色 不活跃状态下(未选中)
        // inactiveTintColor:colors.text_color_gray_dark,
        // 是否显示label，默认为true
        showLabel:true,
        // 不透明度为按选项卡(iOS和Android < 5.0)
        pressOpacity:0.3,
        
        indicatorStyle :{
            height:0, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
        }
    }
});

export const TabOptions = (tabBarTitle,normalImage,selectedImage,navTitle) => {
    
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            focused
                ?
                <Image
                    source={selectedImage}
                    style={[styles.TabBarIcon]}
                />
                :
                <Image
                    source={normalImage}
                    style={[styles.TabBarIcon]}
                />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:20,color:'red'};
    // header的style
    const headerStyle = {backgroundColor:'blue'};
    return {tabBarLabel,tabBarIcon,headerTitle,headerTitleStyle,headerStyle};
};

export const MainNavigator = new StackNavigator({
    tabNavigator:{
        screen:tabNavigator,
        navigationOptions:{
            header:null
        },
        headerMode: 'screen'
    },
    Second:{
        screen:Second,
        navigationOptions: ({navigation}) => StackOptions({navigation}),
        
        headerMode: 'screen',
        
    },
    Result:{
        screen:Result,
        navigationOptions: ({navigation}) => StackOptions({navigation}),
        headerMode: 'screen'
    }, 
});


const StackOptions = ({navigation}) => {
    // console.log(navigation);
    let {state,goBack} = navigation;
    // if (!state.params.isVisible){
    //     return;
    // }
    // alert(state.routeName)
    const headerStyle = {backgroundColor:'#4ECBFC',};

    const headerTitle = state.params ? state.params.title : state.routeName;

    const headerTitleStyle = {fontSize:iOS?FONT_SIZE(20):FONT_SIZE(23),
        color:'white',fontWeight:'500',alignSelf:'center',justifyContent:'center',}
    const headerBackTitle = false;
    const headerLeft = (
        <TouchableOpacity onPress={()=>{goBack()}}>
                            <Image
                                style={{marginLeft:13,width:20,height:20}}
                                source={backicon}
                            />
        </TouchableOpacity> 
    );
    let headerRight;
    if (state.params){
        headerRight = state.params.headerRight;
    }
    else{
        headerRight = (
            <View></View>    
        )
    }
    let header;
    if (state.params ? state.params.isVisible === true : null){
        header = null;
    }
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,header,headerLeft,headerRight}
};





const styles = StyleSheet.create({
    TabBarIcon:{
        width:24,
        height:24
    }
});

const MainWithNavigationState = ({dispatch,nav})=>(
    <MainNavigator navigation={addNavigationHelpers({dispatch,state:nav})}/>
);

export default connect((state)=>{
    return {
        nav:state.nav
    }
})(MainWithNavigationState);