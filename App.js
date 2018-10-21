import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, TextInput,View, Image, StatusBar, Button } from 'react-native';
import FrontPage from './FrontPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import FourthPage from './FourthPage';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currState: "First"
    }
  }

  nextState = () => {
    if (this.state.currState=="First") {
      this.setState({currState: "Second"});
    }
    else if (this.state.currState=="Second") {
      this.setState({currState: "Third"});
          }
    else if (this.state.currState=="Third") {
      this.setState({currState: "Fourth"});
    }
  }

  render() {
    let currActivity;
    if (this.state.currState=="First") {
      currActivity = <FrontPage nextState={() => {this.nextState()}}/>;
    } else if (this.state.currState=="Second"){
      currActivity = <SecondPage nextState={() => {this.nextState()}}/>;
    }
    else if (this.state.currState=="Third"){
      currActivity = <ThirdPage nextState={() => {this.nextState()}}/>;
    }
    else {
      currActivity = <FourthPage />;
    }
    return currActivity;
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
