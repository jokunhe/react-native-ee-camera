import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    Vibration,
    TouchableOpacity,
    Animated,
    Easing,
    Dimensions,
    ToastAndroid
} from 'react-native';
import Realm from 'realm';
import _ from 'lodash';
const {width, height}  = Dimensions.get('window');
import Camera from 'react-native-camera';
import ViewFinder from '../component/viewFinder';
import backIcon from '../img/nav_icon_back3x.png';//返回按钮
import scanLine from '../img/scan_line.png';//扫描线
let Scanresult =[];
let depot =[]
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


export default class ScanView extends Component {
    constructor(props) {
        super(props);
        this.camera = null;
        this.state = {
            transCode:[],//条码
            openFlash: false,
            active: true,
            flag:true,
            fadeInOpacity: new Animated.Value(0), // 初始值
            isEndAnimation:false,//结束动画标记
        }
        // this._goBack = this._goBack.bind(this);
        this._startAnimation = this._startAnimation.bind(this);
        this.barcodeReceived = this.barcodeReceived.bind(this);
        // this._search = this._search.bind(this);
        this._changeFlash = this._changeFlash.bind(this);
        this.changeState = this.changeState.bind(this);
    }
    componentDidMount() {
         this._startAnimation();
         let ScanData = realm.objects('Scan')
         console.log(ScanData);
         for(i=0;i<ScanData.length;i++){
           let temp={}
           temp.number=ScanData[i].number
           depot.push(temp);
         }
    }
    navigatePress = () => {
        console.log(Scanresult);
        this.props.navigation.navigate('Result',{Scanresults:Scanresult,title:'扫描结果',headerRight:<View></View>});
    }
    componentWillUnmount(){
        this.unmounted=true
    };
    //开始动画，循环播放
     _startAnimation() {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear
        }).start(
             () => {
                 if(!this.unmounted){
                      this.state.fadeInOpacity.setValue(0);
                     this._startAnimation()
              }
                   
             }
        );
        console.log("开始动画");
    }
     barcodeReceived(e) {
          let o = _.find(depot,['number', e.data]);
            if (o ==undefined){
              console.log(e.data);
              ToastAndroid.show('仓库中找不到~',ToastAndroid.SHORT)
              return 1;
            }
            else{
              if (e.data !== this.transCode) {
                  Vibration.vibrate([0, 500, 200, 500]);
                  this.transCode = e.data; // 放在this上，防止触发多次，setstate有延时
                  Scanresult.push(e.data)
                  if(this.state.flag){
                      this.changeState(false);
                      //通过条码编号获取数据
                  }
                  console.log("transCode="+this.transCode);
                  console.log(Scanresult)
              }
            }
       
      }

    //开灯关灯
    _changeFlash() {
        this.setState({
            openFlash: !this.state.openFlash,
        });
    }
     //改变请求状态
    changeState(status){
        this.setState({
            flag:status
        });
        
        console.log('status='+status);
    }

    render(){
        console.log(this.props.navigation)
        const {
                openFlash,
                active,
            } = this.state;
        return(
            <View style={styles.allContainer}>
                {(() => {
                    if (active) {
                        return (
                            <Camera
                                ref={cam => this.camera = cam}
                                style={styles.cameraStyle}
                                barcodeScannerEnabled={true}
                                onBarCodeRead={
                                   this.barcodeReceived
                                }
                                torchMode={openFlash ? 'on' : 'off'}>
                                    {/* <View style={styles.container}>
                                        <View style={styles.titleContainer}>
                                            <View style={styles.leftContainer}>
                                                <TouchableOpacity activeOpacity={1} onPress={ this._goBack}>
                                                    <View>
                                                        <Image style={ styles.backImg } source={ backIcon }/>
                                                    </View>
                                                </TouchableOpacity>
                                           </View>
                                        </View>
                                    </View> */}
                                <View style={styles.centerContainer}/>
                                <View style={{flexDirection:'row'}}>
                                    <View style={styles.fillView}/>
                                    <View style={styles.scan}>
                                        <ViewFinder/>
                                        <Animated.View style={[styles.scanLine, {
                                            opacity: 1,
                                            transform:[{
                                                translateY:this.state.fadeInOpacity.interpolate({
                                                    inputRange:[0,1],
                                                    outputRange:[0,220]
                                                })
                                            }]
                                        }]}>
                                            <Image source={scanLine}/>
                                        </Animated.View>
                                    </View>
                                    <View style={styles.fillView}/>
                                </View>
                                <View style={styles.bottomContainer}>
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            textAlign: 'center',
                                            width: 220,
                                            marginTop: active ? 25 : 245,
                                        },
                                    ]}
                                    numberOfLines={2}
                                >
                                    将条码放入框内即可自动扫描。
                                </Text>
                                <TouchableOpacity onPress={this._changeFlash}>
                                    <View style={styles.flash}>
                                        <Text style={styles.icon}></Text>
                                        <Text style={styles.text}>
                                            开灯/关灯
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.done} onPress={()=>{this.navigatePress()}}>完成</Text>
                                </View>
                            </Camera>
                         );
                    }
                })()}
            </View>
        )
    }
}

const styles =StyleSheet.create({
    allContainer:{
        flex:1,
    },
    container: {
        ...Platform.select({
            ios: {
                height: 64,
            },
            android: {
                height: 50
            }
        }),
        backgroundColor:'#000000',
        opacity:0.5
    },
    titleContainer: {
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 15,
            },
            android: {
                paddingTop: 0,
            }
        }),
        flexDirection: 'row',
    },
    leftContainer: {
        flex:0,
        justifyContent: 'center',
    },
    backImg: {
        marginLeft: 10,
    },
    cameraStyle: {
        alignSelf: 'center',
        width: width,
        height: height,
    },
    flash: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 60,
    },
    flashIcon: {
        fontSize: 1,
        color:'#ffffff',
    },
    text: {
        fontSize: 14,
        color: '#ffffff',
        marginTop:5
    },
    icon:{
        color:'#ffffff',
        fontSize:20,
        fontFamily:'iconfont'
    },
    scanLine:{
         alignSelf:'center',
    },
    centerContainer:{
        ...Platform.select({
            ios: {
                height: 80,
            },
            android: {
                height: 60,
            }
        }),
        width:width,
        backgroundColor:'#000000',
        opacity:0.5
    },
    bottomContainer:{
        alignItems:'center',
        backgroundColor:'#000000',
        alignSelf:'center',
        opacity:0.5,
        flex:1,
        width:width
    },
    fillView:{
        width: (width-220)/2,
        height: 220,
        backgroundColor: '#000000',
        opacity: 0.5
    },
    scan:{
        width: 220,
        height: 220,
        alignSelf: 'center'
    },
    done:{
        marginTop:30,
        fontSize:20,
        color: '#ffffff'
    }

})

