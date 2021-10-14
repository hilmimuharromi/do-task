import React from 'react'
import {View, FlatList, StyleSheet, Text} from 'react-native'
import CardTotalProjects from './CardTotalProjects'

const data = [
    {
        title: "E-commerce App",
        pending: 5,
        inProgress: 7,
        completed: 10,
        color: "#6FCF97"
    },
    {
        title: "Learn UI & UX",
        pending: 7,
        inProgress: 7,
        completed: 15,
        color: "#2D9CDB"
    },
    {
        title: "Sport",
        pending: 1,
        inProgress: 0,
        completed: 15,
        color: "#6F95CF"
    },
    {
        title: "E-commerce App",
        pending: 5,
        inProgress: 7,
        completed: 10,
        color: "#2D9CDB"
    },
    {
        title: "Learn UI & UX",
        pending: 7,
        inProgress: 7,
        completed: 15,
        color: "#BCCF6F"
    },
    {
        title: "Sport",
        pending: 1,
        inProgress: 0,
        completed: 15,
        color: "#CF6F97"
    },   
]

const ListCardProjects = (props) => {
    const {data} = props
    return(
        <>
        {/* <Text>
            {JSON.stringify(data)}
        </Text> */}

        <FlatList
        contentContainerStyle={styles.layout}
        data={[...data, {lastItem: true}]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={CardTotalProjects}
      
        />
        </>
    )
}

const styles = StyleSheet.create({
    layout: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    }
})

export default ListCardProjects