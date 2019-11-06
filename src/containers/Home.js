
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  return (
    <View>
        <Text>
            Home!
        </Text>
        <Icon name="rocket" size={55} color="#900" />
    </View>
  );
};


export default Home;
