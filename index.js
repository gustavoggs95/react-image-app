/**
 * @format
 */
import { Navigation } from "react-native-navigation";
import App from './App';
import Home from './src/containers/Home'
import Profile from './src/containers/Profile'
import Upload from './src/containers/Upload'
import Icon from 'react-native-vector-icons/FontAwesome';

Navigation.registerComponent(`App`, () => App);
Navigation.registerComponent(`Home`, () => Home);
Navigation.registerComponent(`Profile`, () => Profile);
Navigation.registerComponent(`Upload`, () => Upload);



// Icon.getImageSource('user', 20, 'red').then((source) => {

// });

Navigation.events().registerAppLaunchedListener(() => {
  Promise.all([
    Icon.getImageSource('home', 20),
    Icon.getImageSource('plus-square-o', 20),
    Icon.getImageSource('user', 20)
  ]).then(response => {
    Navigation.setRoot({
      root: {
          stack: {
              children: [
                  {
                      bottomTabs: {
                          children: [
                            {
                              component: {
                                name: 'Home',
                                options: {
                                  bottomTab: {
                                    text: 'Home',
                                    icon: response[0],
                                    selectedTextColor: 'black'
                                  }
                                }
                              }
                            },
                            {
                              component: {
                                name: 'Upload',
                                options: {
                                  bottomTab: {
                                    text: 'Add Photo',
                                    icon: response[1],
                                    selectedTextColor: 'black'
                                  }
                                }
                              }
                            },
                            {
                              component: {
                                name: 'Profile',
                                options: {
                                  bottomTab: {
                                    text: 'Profile',
                                    icon: response[2],
                                    selectedTextColor: 'black'
                                  }
                                }
                              }
                            }
                          ],
                          options: {}
                        }
                  }
              ],
              options: {
                  topBar: {
                    title: {
                      text: 'Image App',
                      alignment: 'center'
                    }
                  }
                }
          }
      }
    });
  })
  
});