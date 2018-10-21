import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, TextInput,View, Image, StatusBar, Button } from 'react-native';

export default class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currState: "First"
    }
  }

  render(){
    let pic = {
      uri: 'https://cdn3.ijstatic.com/wp-content/uploads/2018/05/synchrony-bank-logo.png'
    };
    return(
      <View>
  <Image source={pic} style={{width: 360, height: 250}}/>
    <Text style={styles.bigblue}>Hi Mark!</Text>
            <Text style={styles.bigblue}>Welcome back to GAP!</Text>
                    <Text style={styles.bigblue}> Your Check-In Reward Today:</Text>

                    <Button
                    onPress={this.props.nextState}
              title="$5 off GAP by Oct 31 2018"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <View style={styles.buttonContainer}>
      <Button
        onPress={this.props.nextState}
        title="Check-In!"
        color="#841584"

      />
    </View>
  </View>
    )
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: '#ffb700',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }


});
