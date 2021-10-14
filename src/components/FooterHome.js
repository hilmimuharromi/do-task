import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';

import {heightScreen, widthScreen} from '../utils/sizeScreen';

const FooterHome = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  const projectStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
        }),
      },
    ],
  };

  const taskStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -160],
        }),
      },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
        }),
      },
    ],
  };

  return (
    <View style={styles.footer}>

      <Animated.View style={[styles.layoutButtonPin, taskStyle]}>
        <View style={styles.layoutTextPin}>
          <Text>New Task</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonPin}
          onPress={() => {
          toggleMenu();

            navigation.navigate('NewTask');
          }}>
          <IconFA5 name="tasks" size={28} color="#FFD233" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.layoutButtonPin, projectStyle]}>
        <View style={styles.layoutTextPin}>
          <Text>New Project</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonPin}
          onPress={() => {
          toggleMenu();

            navigation.navigate('NewProject');
          }}>
          <IconFA5 name="archive" size={28} color="#FFD233" />
        </TouchableOpacity>
      </Animated.View>

      <Pressable
        style={styles.buttonPlus}
        onPress={() => {
          toggleMenu();
        }}>
        <Animated.View style={[rotation]}>
          <Icon name="plus" size={28} color="#fff" />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 0,
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: widthScreen(40),
  },
  buttonPlus: {
    backgroundColor: '#FFD233',
    elevation: 4,
    width: widthScreen(15),
    height: widthScreen(15),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 10,
    right: 20,
  },
  layoutButtonPin: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    bottom: 0,
    right: 0,
  },
  layoutTextPin: {
    backgroundColor: '#fff',
    elevation: 4,
    width: widthScreen(25),
    height: heightScreen(5),
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonPin: {
    backgroundColor: '#FFF',
    elevation: 4,
    width: widthScreen(15),
    height: widthScreen(15),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default FooterHome;
