
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageZoom from 'react-native-image-pan-zoom';

class ImageViewer extends Component {
  
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
      const imageUrl  = this.props.imageData.urls.regular
      const { description, likes, id } = this.props.imageData
      const { name, location, profile_image } = this.props.imageData.user
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{flex: 1}}>
            <View>
              <ImageZoom 
                cropWidth={Dimensions.get('window').width}
                cropHeight={400}
                imageWidth={Dimensions.get('window').width}
                imageHeight={400}
                style={{ backgroundColor: 'lightgrey'}}
              >
                <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={{ uri: imageUrl }} />
              </ImageZoom>
            </View>
            <View style={styles.textContainer}>
              <View style={ styles.nameContainer }>
                <Image style={{ height: 50, width: 50 }} source={{ uri: profile_image.medium }} />
                <Text style={{ fontWeight: 'bold', fontSize: 18}} > { name } </Text>
              </View>
                <Text style={{ fontWeight: 'bold' }}>Location </Text><Text style={{marginBottom: 10}}>{ location || 'unknown' }</Text>
                <Text style={{ fontWeight: 'bold' }}>Description </Text><Text style={{marginBottom: 10}}>{ description || 'none' }</Text>
                <Text style={{ fontWeight: 'bold' }}>ID </Text><Text style={{marginBottom: 10}}>{ id }</Text>
                <Text style={{ fontWeight: 'bold' }}>Likes  </Text><Text style={{marginBottom: 10}}>{ likes }</Text>
            </View>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
    textContainer:{
      padding: 20,
      flex: 1,
    },
    nameContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    }
})


export default ImageViewer;
