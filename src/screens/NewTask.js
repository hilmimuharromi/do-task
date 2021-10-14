import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import {heightScreen, widthScreen} from '../utils/sizeScreen';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux'
import {AddTask} from '../stores/action'
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {localNotificationSchedule, createChannel, getAllChannel, deleteChannel} from '../utils/NotifService'

const NewTaskScreen = ({navigation}) => {
  const [deadline, setDeadline] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [remind, setRemind] = useState("0")
  const [status, setStatus] = useState('Pending')
  const taskData = useSelector((state) => state.task.data)
  const projects = useSelector((state) => state.project.data)
  const [project, setProject] = useState(projects[0].id)
  const dispatch = useDispatch()
  const listStatus = ['Pending', 'In Progress', 'Completed']

  const saveTask = () => {
    const data = {
      id: uuidv4(),
      title,
      project,
      deadline,
      remind,
      status,
      created: moment()
    }
    console.log(taskData)
    // getAllChannel()

    if(Number(remind) !== 0) {
      addAlarm(data)

    }

    dispatch(AddTask(data))
    navigation.goBack()

    // console.log(data)
  }

  const addAlarm = async (data) => {
    // await createChannel(data.id)
    const project = projects.find((item) => item.id === data.id)
    data.alarmDate = moment(data.deadline).subtract(data.remind, 'minutes')
    console.log('masuk',data, project)
    await localNotificationSchedule(data)
  }


  return (
    <View style={styles.layout}>
      <View style={styles.layoutTop}>
        <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
          <Icon name="left" size={28} color="#fff" />
        </Pressable>
        <Text>New Task</Text>
      </View>

      <View style={styles.layoutForm}>
        <View style={styles.layoutInput}>
          <Text>Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} />
        </View>

        <View style={styles.layoutInput}>
          <Text>Project</Text>
          <Picker
            style={styles.input}
            androidVariant="nativeAndroid"
            selectedValue={project}
            onValueChange={(itemValue, itemIndex) =>
              setProject(itemValue)
            }>
            {projects.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.layoutInput}>
          <Text>Status</Text>
          <Picker
            style={styles.input}
            androidVariant="nativeAndroid"
            selectedValue={status}
            onValueChange={(itemValue, itemIndex) =>
              setStatus(itemValue)
            }>
            {listStatus.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <View style={styles.layoutInput}>
          <Text>Deadline</Text>
          <View style={styles.date}>
            {deadline && <Text>{moment(deadline).format('DD-MM-YYYY HH:mm')}</Text>}
            <Pressable onPress={() => setOpen(true)}>
              <IconFontisto name="date" size={14} color="#000" />
            </Pressable>
          </View>
          <DatePicker
            modal
            open={open}
            date={deadline}
            onConfirm={date => {
              setOpen(false);
              setDeadline(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        <View style={styles.layoutInput}>
          <Text>Remind</Text>
          <View tyle={styles.input}>
            <Pressable />
          </View>
          <Picker
            style={styles.input}
            androidVariant="nativeAndroid"
            selectedValue={remind}
            onValueChange={(itemValue, itemIndex) =>
              setRemind(itemValue)
            }>
            <Picker.Item label="5 minutes before" value="5" />
            <Picker.Item label="10 minutes before" value="10" />
            <Picker.Item label="1 hours before" value="60" />
            <Picker.Item label="6 hours before" value="360" />
            <Picker.Item label="Never" value="0" />
          </Picker>
        </View>
      </View>
      {/* <Text>
        {JSON.stringify(taskData)}
        </Text> */}

      <View style={styles.layoutFooter}>
          <Pressable style={styles.buttonFooter} onPress={saveTask}>
              <Text>
                  Create A Task
              </Text>
          </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  layoutTop: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: widthScreen(10),
  },
  layoutForm: {
    flex: 4,
    width: widthScreen(80),
    justifyContent: 'flex-start',
    marginHorizontal: widthScreen(10),
  },
  layoutFooter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  layoutInput: {
    marginVertical: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    height: 50,
  },
  date: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  buttonBack: {
    backgroundColor: '#FFD233',
    elevation: 4,
    width: widthScreen(10),
    height: widthScreen(10),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 5,
  },
  
  buttonFooter: {
      backgroundColor: "#FFD233",
      height: 40,
      width: widthScreen(80),
      borderRadius: 10,
      elevation: 4,
      justifyContent: 'center',
    alignItems: 'center'
  }
});

export default NewTaskScreen;
