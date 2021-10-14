import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import {heightScreen, widthScreen} from '../utils/sizeScreen';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useDispatch, connect } from 'react-redux'
import { AddProject } from '../stores/action'

const NewProjectScreen = ({navigation, AddProject}) => {
  
  let colors = [
    '#FF9065',
    '#38D1AD',
    '#3CC4C4',
    '#3ED4F5',
    '#5BBEFF',
    '#787DFF',
    '#D57AF1',
    '#FF779F',
    '#FE8F64',
    '#CF6F97',
    '#BCCF6F',
    '#2D9CDB',
    '#6F95CF',
    '#2D9CDB',
    "#6F95CF"
  ];
  const days = [1, 2, 3, 4, 5, 6, 7, 'never'];
  const [color, setColor] = useState(colors[0]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState("")


  const selectedColor = item => {
    if (item === color) {
      return {
        borderColor: '#000',
        borderWidth: 2,
      };
    }
  };

  const saveProject = () => {
    const data = {
      name,
      description,
      color,
      tasks: []
    }

    console.log(data)

    AddProject(data)


  };
  return (
    <View style={styles.layout}>
      <View style={styles.layoutTop}>
        <Pressable
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}>
          <Icon name="left" size={28} color="#fff" />
        </Pressable>
        <Text>New Project</Text>
      </View>

      <View style={styles.layoutForm}>
        <View style={styles.layoutInput}>
          <Text>Name</Text>
          <TextInput
            value={name}
            style={styles.input}
            onChangeText={text => setName(text)}
          />
        </View>

        <View style={styles.layoutInput}>
          <Text>Description</Text>
          <TextInput
            multiline
            numberOfLines={4}
            value={description}
            style={styles.description}
            onChangeText={text => setDescription(text)}
          />
        </View>

        {/* <View style={styles.layoutInput}>
          <Text>Deadline</Text>
          <View style={styles.date}>
            {date && <Text>{moment(date).format('DD-MM-YYYY')}</Text>}
            <Pressable onPress={() => setOpen(true)}>
              <IconFontisto name="date" size={14} color="#000" />
            </Pressable>
          </View> */}
          {open && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setDate(currentDate);
                console.log(currentDate);
                setOpen(!open);
              }}
            />
          )}
          {/* <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          /> */}
        {/* </View> */}

        {/* <View style={styles.layoutInput}>
          <Text>Remind</Text>
          <Picker
            style={styles.input}
            androidVariant="nativeAndroid"
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            {days.map(item => (
              <Picker.Item
                key={item}
                label={item !== 'never' ? `${item} day before` : item}
                value={item}
              />
            ))}
          </Picker>
        </View> */}
        <View style={styles.layoutInput}>
          <Text>Color Tag</Text>
          <FlatList
            data={colors}
            numColumns={5}
            renderItem={({item}) => (
              <Pressable
                style={{
                  backgroundColor: item,
                  width: widthScreen(12),
                  height: widthScreen(12),
                  margin: widthScreen(2),
                  elevation: 4,
                  borderRadius: 5,
                  ...selectedColor(item),
                }}
                onPress={() => setColor(item)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>

      <View style={styles.layoutFooter}>
        <Pressable style={styles.buttonFooter} onPress={saveProject}>
          <Text>Create A Project</Text>
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
    justifyContent: 'flex-start',
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
    alignItems: 'center',
  },
  layoutInput: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    height: heightScreen(5)
  },
  description: {
    backgroundColor: '#fff',
    padding: 10,
    height: heightScreen(15),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  date: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: heightScreen(5)
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
    backgroundColor: '#FFD233',
    height: widthScreen(12),
    width: widthScreen(80),
    borderRadius: 10,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



const mapStateToProps = state => {
  const { project } = state;
  return {
    project
      
  };
}
const mapDispatchToProps = {
  AddProject
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectScreen)
