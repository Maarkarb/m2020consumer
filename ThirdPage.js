import React, { Component } from 'react';
import { AppRegistry, Image, TouchableOpacity , View} from 'react-native';

export default class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Qr-4.png'
    };
    return (
      <View>
      <TouchableOpacity onPress={this.props.nextState}>
      <Image source={pic} style={{width: 350, height: 400}} button onPress={()=> {this.props.nextState}}/>
      </TouchableOpacity>
      </View>
    );
  }
}
