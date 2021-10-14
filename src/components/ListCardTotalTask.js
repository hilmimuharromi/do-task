import React, {useState, useEffect} from 'react'
import {View, FlatList} from 'react-native'
import CardTotalTask from './CardTotalTask'

const data = [
    {
        status: "All",
        total: 30,
        color: "#FFD233"
    },
    {
        status: "Pending",
        total: 10,
        color: "#EB5757"
    },
    {
        status: "In Progress",
        total: 5,
        color: "#2D9CDB"
    },
    {
        status: "Completed",
        total: 15,
        color: "#6FCF97"
    }
]

const ListCardTotalTask = ({data}) => {
    // const [data, setData] = useState([])

    // useEffect(() => {
      
    // }, [taskData])
    return(
        <FlatList
        data={data}
        numColumns={2}
        horizontal={false}
        keyExtractor={item => item.status}
        renderItem={CardTotalTask}
        />
    )
}

export default ListCardTotalTask