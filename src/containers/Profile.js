import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ScrollView
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Feather';

class Profile extends Component {

  constructor(props){
    super(props)

    this.state = {
      data: {}
    }

  }

  componentDidMount(){
    this.getPhotos()
  }

  componentWillUnmount(){
    firebase.database().ref('images/').off('value')
  }

  getPhotos(){
    let current = this
    firebase.database().ref('images/').on('value', function (snapshot) {
      current.setState({
        data: snapshot.val() || {}
      })
  });
  }


  render(){
    return (
      <ScrollView>
        <View>
            {/* <Button title="Get Data" onPress={() => {
              let current = this
              firebase.database().ref('images/').once('value', function (snapshot) {
                console.log(snapshot.val())
                current.setState({
                  data: snapshot.val()
                })
            });
            } } /> */}
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {
                Object.keys(this.state.data).length > 0 &&
                Object.keys(this.state.data).map((item, index) => {
                  return(
                    <View key={index} style={{ width: '50%' }}>
                      <Image 
                      style={{ width: '100%', height: 200, resizeMode: 'stretch', backgroundColor: 'gainsboro' }} source={{ uri: this.state.data[item].uri }} />
                    </View>
                  )
                })
              }
            </View>
        </View>
      </ScrollView>
    )
  }
}


export default Profile;
