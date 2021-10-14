import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import DonutChart from './DonutChart'
import {heightScreen, widthScreen} from '../utils/sizeScreen'
// import {useNavigation} from '@react-navigation/native'
import {navigate} from '../utils/NavigationService'
const CardTotalProjects = ({item}) => {
    // const navigation = useNavigation()
    const total = item.pending + item.inProgress + item.completed
    let progress = Math.round(item.completed / item.totalTask * 100)

    if(total === 0) {
        progress = 0
    }


    const tintColor = () => {
        if(progress < 50){
            return '#EB5757'
        } else if (progress < 90) {
            return '#2D9CDB'
        } else {
            return '#6FCF97'
        }
    }
    if(item.lastItem) {
        return <View style={{height: 100}} />
    }
    return(
        <TouchableOpacity onPress={() => {
            navigate('ListTask', {
                project: item.id
            })
           console.log(item, progress, total)
        }} style={{...styles.layout, backgroundColor: item.color}}>
             <DonutChart
                    size={heightScreen(6)}
                    rotation={0}
                    width={4}
                    style={{ padding: 5, margin: 5 }}
                    childrenContainerStyle={{padding: 5, margin: 5}}
                    fill={progress}
                    tintColor={tintColor()}
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor="#C4C4C490">
                    {
                        (fill) => (
                            <Text style={styles.textProgress}>
                                {fill} %
                            </Text>
                        )
                    }
                </DonutChart>
                <View style={styles.layoutRight}>
                    <Text style={styles.textTitle}>{item.name}</Text>
                    <View style={styles.layoutTotal}>
                        <Text style={styles.textStatus}>{item.totalTask}</Text>
                        <Text style={styles.textStatus}>Tasks</Text>
                    </View>
                </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    layout: {
        width: widthScreen(80),
        height: heightScreen(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        borderRadius: 20,
        margin: 10,
        elevation: 3,
        opacity: 1,
        padding: 5,
        backgroundColor: '#fff'
    },
    layoutRight: {
        width: widthScreen(60),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    layoutTotal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 14,
        color: '#000',
        margin: 10,
        alignSelf: 'center',
    },
    textProgress: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center'
    },
    textStatus: {
        fontSize: 14,
        color: '#000',
      
    }
})

export default CardTotalProjects