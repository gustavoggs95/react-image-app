
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'

class Home extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      photos: [],
      page: 1
    }
  }

  getPhotos(){
    const key = '098b0bd80e1f6d161a603e9e70d6e6b258f42bfa43ee7789a27ef11743c15743'

    axios.get(`https://api.unsplash.com/photos?client_id=${key}&page=${this.state.page}`).then(res => {
      console.log('success: ', res.data)
      this.setState({
        photos: this.state.photos.concat(res.data),
        page: this.state.page + 1
      })
    }).catch(err => {
      console.log('error: ', err)
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

  render(){
    return (
      <ScrollView>
        <View>
            {
              this.state.photos.map((item, index) => {
                return(
                  <View style={styles.photoCard} key={index}>
                    <Image style={{ width: '100%', height: 400}} blurRadius={0} source={{ uri: item.urls.small }}/>
                    <View style={styles.photoText}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text> { item.user.name } </Text>
                        <Text> { this.getDate(item.user.updated_at) } </Text>
                      </View>
                      { item.description && <Text> { item.description } </Text> }
                    </View>
                  </View>
                )
              })
            }
          <TouchableOpacity style={{ padding: 20, alignItems: 'center' }} onPress={() => this.getPhotos()}>
            <Text>
              Load More
            </Text>
          </TouchableOpacity>
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
  }
})


export default Home;
