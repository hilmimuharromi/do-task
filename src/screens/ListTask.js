import React, {useState, useEffect} from 'react'
import {ScrollView, Text} from 'react-native'
import { useSelector } from 'react-redux'
const ListTask = ({navigation, route}) => {
    const [data, setData] = useState([])
    const listProjects = useSelector((state) => state.project.data)
    const listTask = useSelector((state) => state.task.data)
    const {project, status} = route.params


    useEffect(() => {
        if(project) {
            const filterData = listTask.filter((item) => item.project === project)
            setData(filterData)
        }

        if(status) {
            if(status === 'All') {
                setData(listTask)
            } else {
                const filterData = listTask.filter((item) => item.status === status)
                setData(filterData)
            }
        }
    }, [listTask])
    return(
        <ScrollView>
            <Text>
                List task {JSON.stringify(project)}

            </Text>
            {data.map((item) => (
                 <Text key={item.id}>
                 - {item.title} - {item.status}
             </Text>

            ))}

            {/* <Text>
                List projects {JSON.stringify(listProjects)}

            </Text> */}

           
        </ScrollView>
    )
}

export default ListTask