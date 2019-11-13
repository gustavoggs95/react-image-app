import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    StyleSheet,
    Image
  } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import { Bar } from 'react-native-progress';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
class Upload extends Component {

  constructor(props){
    super(props)

    this.state = {
      progress: 0,
      progressMsg: '',
      selectedImage: null
    }
  }

  selectPhoto(){
    ImagePicker.launchImageLibrary({}, (response) => {
      console.log('Response = ', response);
      this.setState({ 
        selectedImage: response.uri, 
        progress: 0,
        progressMsg: 'Uploading Image...'
      })
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
    
        const ext = response.type.split('/').pop(); // Extract image extension
        const filename = `${new Date().toISOString()}.${ext}`; // Generate unique name
        this.setState({ uploading: true });

        console.log('filename: ', filename)

        firebase
        .storage()
        .ref(`images/${filename}`)
        .putFile(response.path)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes)
          
            this.setState({ progress });
          },
          error => {
            unsubscribe();
            console.log('error: ', error)
          }, (success) => {
            this.savePhoto(success.downloadURL)
          }
        )

      }
    })
  }

  takePhoto(){
    ImagePicker.launchCamera({}, (response) => {
      console.log('Response = ', response);
      this.setState({ 
        selectedImage: response.uri, 
        progress: 0,
        progressMsg: 'Uploading Image...'
      })
    
      if (response.error || response.didCancel) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
    
        const ext = response.uri.split('.').pop(); // Extract image extension
        const filename = `${new Date().toISOString()}.${ext}`; // Generate unique name
        this.setState({ uploading: true });

        firebase
        .storage()
        .ref(`images/${filename}`)
        .putFile(response.uri)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes)

            this.setState({ progress });
          },
          error => {
            unsubscribe();
            alert('Sorry, Try again.');
          }, 
          success => {
            this.savePhoto(success.downloadURL)
          }
        )

      }
    })
  }

  savePhoto(uri){
    firebase.database().ref('images/').push({
      date: new Date().toISOString(),
      uri
  }).then(res => {
    console.log('success! ', res)
    this.setState({ 
      progressMsg: 'Image has been uploaded!'
     })
  }).catch(err => {
    this.setState({
      progressMsg: 'Error uploading message'
    })
  })
  }

  // getPhotos(){
  //   firebase.database().ref('images/').once('value', function (snapshot) {
  //     console.log(snapshot.val())
  // });
  // }

  render(){
    return (
      <View style={{ flex: 1 }}>
          {
            this.state.selectedImage ?
              <Image style={{ flex: 3}} source={{ uri: this.state.selectedImage }}/>
            :
              <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                <EvilIcons name="image" size={200} color={'gray'} />
                <Text> Selecione alguma imagem nas opções abaixo </Text>
              </View>
          }
          <View style={ styles.uploadContainer }>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.takePhoto()} style={styles.button}>
                  <View style={{ flexDirection: 'row' }}>
                    <Entypo name="camera" size={20} color="white" />
                    <Text style={{ color: 'white', marginLeft: 10 }}>
                      Take Photo
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.selectPhoto()} style={styles.button}>
                  <View style={{ flexDirection: 'row' }}>
                    <Entypo name="folder-images" size={20} color="white" />
                    <Text style={{ color: 'white', marginLeft: 10 }}>
                      Select Photo
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
              <View style={{ position: 'absolute', width: '101%', bottom: -1, alignSelf: 'center'}}>
                <Text style={{ textAlign: 'center', marginBottom: 3 }}>
                  { this.state.progressMsg }
                </Text>
                <Bar 
                  animationType='timing' 
                  useNativeDriver={true}  
                  progress={this.state.progress} 
                  width={null} 
                  height={12} 
                  color={'rgb(0, 200, 0)'}
                  borderRadius={0}
                  borderWidth={0}
                  unfilledColor={'lightgray'}
                />
              </View>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100
  },
  uploadContainer:{
    flex: 1, 
    justifyContent: 'center', 
    margin: 20, 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 10,
    overflow: 'hidden'
  }
})
    
export default Upload;
  