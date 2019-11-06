import React, { Component } from 'react';
import {
    View,
    Text,
    Button
  } from 'react-native';
import ImagePicker from 'react-native-image-picker';
  
import firebase from 'react-native-firebase';
  
class Upload extends Component {

  constructor(props){
    super(props)

    this.state = {
      progress: 0
    }
  }

  selectPhoto(){
    ImagePicker.launchImageLibrary({}, (response) => {
      console.log('Response = ', response);
    
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
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
            
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              // success action
            }
            this.setState({ progress });
          },
          error => {
            unsubscribe();
            console.log('error: ', error)
          }
        )

      }
    })
  }

  takePhoto(){
    ImagePicker.launchCamera({}, (response) => {
      console.log('Response = ', response);
    
      if (response.error) {
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
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
            
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              // success action
            }
            this.setState({ progress });
          },
          error => {
            unsubscribe();
            alert('Sorry, Try again.');
          }
        )

      }
    })
  }

  render(){
    return (
      <View>
          <Text>
            Upload: {this.state.progress}%
          </Text>
          <Button onPress={() => this.takePhoto()} title="Take Photo" />
          <Button onPress={() => this.selectPhoto()} title="Select Photo" />

      </View>
    )
  }
}
  
  
  export default Upload;
  