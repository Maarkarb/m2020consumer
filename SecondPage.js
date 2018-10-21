import React, { Component } from 'react';
import { ListView, StyleSheet } from 'react-native';
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
      currText:"Your Vouchers",
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
              <Title style={styles.addPadTop}>In-Store</Title>
            </Body>
          <Right style={styles.centralize}/>
        </Header>
          <Text>{this.state.currText}</Text>
          <Text>{this.state.currText2}</Text>
        <Content>
          <List>
             <ListItem avatar button onPress={this.props.nextState}>
               <Left>
                 <Thumbnail source={{ uri: 'http://www.downtownsantacruz.com/wp-content/uploads/2017/10/Gap-logo.png' }} />
               </Left>
               <Body>
                 <Text>GAP</Text>
               <Text note>Exp: 30 Oct 2018</Text>
               </Body>
               <Right>

               </Right>
             </ListItem>

             <ListItem avatar button onPress={this.props.nextState}>

               <Left>
                 <Thumbnail source={{ uri: 'https://cblproperty.blob.core.windows.net/production/assets/blt6a95d66b9e962f66-AmericanEagle_381.jpeg' }} />
               </Left>
               <Body>
                 <Text>American Eagle</Text>
                  <Text note>Exp: 29 Oct 2018</Text>
               </Body>
               <Right>

               </Right>
             </ListItem>
             <ListItem avatar button onPress={()=>{this.props.nextState}}>
               <Left>
                 <Thumbnail source={{ uri: 'https://res.cloudinary.com/goodsearch/image/upload/v1439940283/hi_resolution_merchant_logos/old-navy_coupons.jpg' }} />
               </Left>
               <Body>
                 <Text>Old Navy</Text>
                 <Text note>Exp: 30 Oct 2018</Text>
              </Body>


             </ListItem>


          </List>




        </Content>
        <View>
        <Button
            onPress={this.props.nextState}
            title="Check out!"
            color="#841584"

            />
        </View>

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
  }
})
