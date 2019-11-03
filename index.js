/**
 * @format
 */
import { Navigation } from "react-native-navigation";
import App from './App';
import Home from './src/containers/Home'
import Profile from './src/containers/Profile'
import Upload from './src/containers/Upload'

Navigation.registerComponent(`App`, () => App);
Navigation.registerComponent(`Home`, () => Home);
Navigation.registerComponent(`Profile`, () => Profile);
Navigation.registerComponent(`Upload`, () => Upload);


Navigation.events().registerAppLaunchedListener(() => {
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
                                  text: 'Tab 2',
                                  icon: require('./src/assets/one.png')
                                }
                              }
                            }
                          },
                          {
                            component: {
                              name: 'Upload',
                              options: {
                                bottomTab: {
                                  text: 'Tab 3',
                                  icon: require('./src/assets/two.png')
                                }
                              }
                            }
                          },
                          {
                            component: {
                              name: 'Profile',
                              options: {
                                bottomTab: {
                                  text: 'Tab 3',
                                  icon: require('./src/assets/two.png')
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
});