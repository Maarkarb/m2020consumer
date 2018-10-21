import React, { Component } from 'react';
import { ListView, StyleSheet, Dimensions } from 'react-native';
import { View, Button, Container, Header, Content, Icon, List, ListItem, Text, Left, Right, Body, Title, Thumbnail} from 'native-base';
// const datas = [
//   'Simon Mignolet',
//   'Nathaniel Clyne',
//   'Dejan Lovren',
//   'Mama Sakho',
//   'Alberto Moreno',
//   'Emre Can',
//   'Joe Allen',
//   'Phil Coutinho',
// ];

const data = {
  grant_type: "client_credentials",
  client_id: "A3Eemq9hAAWwSSNPsVPyRGEfweQOsNxY",
  client_secret: "fhGfzAEDAmrWl6eP"
};

export default class SecondPage extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      currText:"Your Items",
      isReady: false,
      currState:"Second",
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady:true})
  }
  deleteRow = (secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  getCustomerDetails = (usertoken) => {
    axios.get("https://api-stg.syf.com/m2020/credit/customers/1/purchaseStatistics", { headers: { Authorization: "Bearer " + usertoken } })
 .then(response => {
     // If request is good...
     console.log(response.data);
     this.setState({currText2: response.data.retailer});
  })
 .catch((error) => {
     console.log('error ' + error);
     this.setState({currText2: usertoken});
  });
  }
  changeText = () => {
    axios.post("https://api-stg.syf.com/oauth2/v1/token", 'grant_type=client_credentials&client_id=A3Eemq9hAAWwSSNPsVPyRGEfweQOsNxY&client_secret=fhGfzAEDAmrWl6eP')
   .then(response => {
      console.log(response.data);
      // this.setState({currText: "No World"});
      USER_TOKEN = response.data.access_token;
      this.setState({currText: response.data.access_token});
      console.log('userresponse ' + response.data.access_token);
      this.getCustomerDetails(USER_TOKEN);
    })
   .catch((error) => {
      console.log('error ' + error);
   });
   // this.setState({currText: "No World"});
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Header>
          <Left style={styles.centralize}/>
            <Body style={styles.centralize}>
              <Title style={styles.addPadTop}>Your cart</Title>
            </Body>
          <Right style={styles.centralize}/>
        </Header>
          <Text>{this.state.currText}</Text>
          <Text>{this.state.currText2}</Text>
        <Content>
          <List style={styles.listHeight}>
             <ListItem avatar button onPress={this.props.nextState}>
               <Left>
                 <Thumbnail source={{ uri: 'https://www.gap.com/webcontent/0014/545/014/cn14545014.jpg' }} />
               </Left>
               <Body>
                 <Text>Vintage V-Neck T-Shirt</Text>
               <Text note>#231887</Text>
               </Body>
               <Right>
                        <Text>$19.95</Text>
               </Right>
             </ListItem>

             <ListItem avatar button onPress={this.props.nextState}>

               <Left>
                 <Thumbnail source={{ uri: 'https://www.gap.com/webcontent/0015/810/721/cn15810721.jpg' }} />
               </Left>
               <Body>
                 <Text>Superdenim Jeggings with Fantastiflex</Text>
                  <Text note>Exp: #349398</Text>
               </Body>
               <Right>
                       <Text>$39.95</Text>
               </Right>
             </ListItem>
             <ListItem avatar button onPress={()=>{this.props.nextState}}>
               <Left>
                 <Thumbnail source={{ uri: 'https://cdn3.ijstatic.com/wp-content/uploads/2018/05/synchrony-bank-logo.png' }} />
               </Left>
               <Body>
                 <Text>Synchrony Voucher</Text>
                 <Text note>Exp: 30 Oct 201</Text>
              </Body>
              <Right>
                      <Text>-$5.00</Text>
              </Right>
             </ListItem>
          </List>




        </Content>
        <Button style={styles.checkoutBtn} onPress={this.props.nextState}>
            <Text style={styles.centerText}>PAY $64.90</Text>
        </Button>


      </Container>

    );
  }

}

const styles = StyleSheet.create({
  centralize: {
    flex: 1,
    alignItems:'center'
  },
  addPadTop: {
    paddingTop: 20,
    textAlign: 'center'
  },
  addPadBtm: {
    paddingBottom: 20,
  },
  checkoutBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  centerText:{
    textAlign: "center"
  }
})
