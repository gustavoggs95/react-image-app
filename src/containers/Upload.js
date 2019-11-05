import React from 'react';
import {
    View,
    Text,
  } from 'react-native';
  
import firebase from 'react-native-firebase';
const { app } = firebase.storage() || '';
  
  const Upload = () => {
    return (
      <View>
          <Text>
              Upload!
              {
                  JSON.stringify(app)
              }
          </Text>
      </View>
    );
  };
  
  
  export default Upload;
  