import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {widthScreen, heightScreen} from '../utils/sizeScreen'
import {navigate} from '../utils/NavigationService'

const CardTotalTask = ({item}) => {
    return(
        <Pressable onPress={() => {
            navigate('ListTask', {
                status: item.status
            })
        }} style={{...styles.layout, backgroundColor: item.color}}>
            <Text style={styles.textTotal}>{item.total}</Text>
            <Text style={styles.textStatus}>{item.status}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    layout: {
        width: widthScreen(30),
        height: heightScreen(10),
        alignItems: 'center',
        justifyContent:'flex-end',
        borderRadius: 20,
        margin: 20,
        elevation: 4,
        opacity: 1,
        paddingBottom: 5
    },
    textTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
        alignSelf: 'center',
    },
    textStatus: {
        fontSize: 14,
        color: '#000'
    }
})

export default CardTotalTask