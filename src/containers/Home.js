
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import { Navigation } from "react-native-navigation";

class Home extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      photos: [],
      page: 1,
      isLoading: false
    }
  }

  getPhotos(){
    const key = '098b0bd80e1f6d161a603e9e70d6e6b258f42bfa43ee7789a27ef11743c15743'

    this.setState({ isLoading: true })

    axios.get(`https://api.unsplash.com/photos?client_id=${key}&page=${this.state.page}`).then(res => {
      console.log('success: ', res.data)
      this.setState({
        photos: this.state.photos.concat(res.data),
        page: this.state.page + 1
      })
    }).catch(err => {
      console.log('error: ', err)
    }).finally(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  getDate(date){
    let newDate = new Date(date)
    
    date = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear()

    return date

  }

  componentDidMount(){
    this.getPhotos()
  }

  goToImage(imageData){
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ImageViewer',
        passProps: {
          imageData
        },
        options: {
          topBar: {
            title: {
              text: 'Image Viewer'
            }
          }
        }
      }
    })
  }

  render(){
    return (
      <ScrollView>
        <View>
            {
              this.state.isLoading && this.state.photos.length == 0 ?
              <View>
                <ActivityIndicator style={{ marginTop: 50 }} size={50}/>
                <Text style={{ textAlign: 'center' }}> Loading photos... </Text>
              </View>
              :
                this.state.photos.map((item, index) => {
                  return(
                    <TouchableHighlight 
                      underlayColor={null}
                      style={styles.photoCard} 
                      key={index} 
                      onPress={() => { this.goToImage(item) }}
                    >
                      <View >
                        <Image style={{ width: '100%', height: 400}} blurRadius={0} source={{ uri: item.urls.small }}/>
                        <View style={styles.photoText}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image style={ styles.userAvatar} source={{ uri: item.user.profile_image.small }} />
                              <Text> { item.user.name } </Text>
                            </View>
                            <Text> { this.getDate(item.user.updated_at) } </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableHighlight>
                  )
                })
            }
            {
              this.state.photos.length > 0 &&
              <TouchableOpacity style={{ padding: 20, alignItems: 'center' }} onPress={() => this.getPhotos()}>
                <View style={{ flexDirection: 'row' }}>
                  {
                    this.state.isLoading ?
                      <ActivityIndicator size={30}/>
                    :
                      <Text> Load More </Text>
                  }
                </View>
              </TouchableOpacity>
            }
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  photoCard: {
    margin: 10,
    overflow: 'hidden',
    borderRadius: 10,
    
  },
  photoText: {
    padding: 10,
    backgroundColor: 'rgba(117,117,117,0.2)'
  },
  userAvatar:{
    width: 20, 
    height: 20,
    marginRight: 5,
    borderRadius: 50
  }
})


export default Home;
