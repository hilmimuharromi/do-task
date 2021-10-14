import PushNotification from 'react-native-push-notification';
import {navigate} from './NavigationService';
const configure = () => {
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
          console.log("TOKEN:", token);
        },
      
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
          console.log("NOTIFICATION:", notification);
          navigate('NewTask')
      
      
          // process the notification
      
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish();
        },
      
        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
          console.log("ACTION:", notification.action);
          console.log("NOTIFICATION ON Action:", notification);

          // process the action
        },
      
        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function(err) {
          console.error(err.message, err);
        },
      
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
      
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
      
        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
        requestPermissions: Platform.OS === 'ios'
      });
}




const createChannel = (channel) => {
    configure()

    PushNotification.createChannel(
        {
          channelId: channel, // (required)
          channelName: "My channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: true, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
}

const localNotification = (channelId, judul, pesan) => {
      configure()
    PushNotification.localNotification({
        channelId: channelId, 
        title: judul, // (optional)
        message: pesan, 
      vibrate: true,
      vibration: 500,
      playSound: true,
      soundName: 'default',
      actions: '["Yes", "No"]'
    })
  }


 const localNotificationSchedule = (data) => {
    PushNotification.localNotificationSchedule({
        channelId:data.id,
        message: data.title, // (required)
        date: new Date(data.alarmDate), // in 60 secs
        title:data.title,
        vibrate: true,
      vibration: 500,
      playSound: true,
      repeatTime: 1, 
      });
}

const deleteChannel = (channelId) => {
  PushNotification.deleteChannel(channelId);
}


const getAllChannel = () => {
  PushNotification.getChannels(function (channel_ids) {
    console.log(channel_ids); // ['channel_id_1']
  });

  PushNotification.getScheduledLocalNotifications((data) => {
console.log('data ===>', data)
  });
}
  export {
      createChannel, localNotification, localNotificationSchedule, getAllChannel, deleteChannel
  }