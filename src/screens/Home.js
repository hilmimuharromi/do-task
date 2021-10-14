import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  ListCardTotalTask,
  ListCardProjects,
  FooterHome,
  PieChartTask,
} from '../components';
import {widthScreen} from '../utils/sizeScreen';
import {useDispatch, useSelector, connect} from 'react-redux';

const color = {
  bgColor: '#FDF5EC',
};

const HomeScreen = props => {
  const taskData = useSelector((state) => state.task.data)
  const [listProjects, setListProjects] = useState([]);
  const [listTask, setListTask] = useState([])
  const {navigation, project} = props;

  useEffect(() => {
    let tempProject = [];
    let tempTotalTask = [ {
      status: "All",
      total: 0,
      color: "#FFD233"
  },
  {
      status: "Pending",
      total: 0,
      color: "#EB5757"
  },
  {
      status: "In Progress",
      total: 0,
      color: "#2D9CDB"
  },
  {
      status: "Completed",
      total: 0,
      color: "#6FCF97"
  }];

    
    project.data.map(item => {
      let pending = 0;
      let inProgress = 0;
      let completed = 0;
     taskData.map(t => {
        if (t.project === item.id) {
          tempTotalTask[0].total += 1
          switch (t.status) {
            case 'Pending': 
              pending += 1;
              tempTotalTask[1].total += 1
            
            break;
             
            case 'In Progress': 
              inProgress += 1;
              tempTotalTask[2].total += 1
           
             

              break;

            case 'Completed':
              completed += 1;
              tempTotalTask[3].total += 1


              break;

            default:
             
              break;
          }
        }
      });

      tempProject.push({
        id: item.id,
        name: item.name,
        pending,
        inProgress,
        completed,
        totalTask: pending + inProgress + completed,
        color: item.color,
      });

    });
    
    setListTask(tempTotalTask)
    
    setListProjects(tempProject);
  }, [taskData]);
  return (
    <View style={styles.layout}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>DO YOUR TASK</Text>
      </View>
      <View style={styles.top}>
        <ListCardTotalTask data={listTask}/>
      </View>
      {/* <Text>
        {JSON.stringify(taskData)}
        </Text> */}
      <View style={styles.bottom}>
        <Text style={{fontSize: 18, margin: 20}}>Recent Projects</Text>
        <ListCardProjects data={listProjects} {...props} />
      </View>
      <FooterHome navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    backgroundColor: color.bgColor,
    flex: 1,
  },
  header: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    color: '#000',
    fontSize: 28,
  },
  top: {
    flex: 2,
    marginHorizontal: widthScreen(10),
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 3,
    paddingTop: 20,
    // marginHorizontal: widthScreen(5)
  },
});

const mapStateToProps = state => {
  const {project} = state;
  return {
    project,
  };
};
const mapDispatchToProps = {
  // AddProject
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
