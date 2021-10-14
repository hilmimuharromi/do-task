import React from 'react';
import {View, FlatList} from 'react-native';
import CardTotalTask from './CardTotalTask';
import {widthScreen} from '../utils/sizeScreen';
import {PieChart} from 'react-native-chart-kit';
const data = [
  {
    name: 'PENDING',
    total: 0,
    color: '#EB5757',
  },
  {
    name: 'IN PROGRESS',
    total: 0,
    color: '#2D9CDB',
  },
  {
    name: 'COMPLETED',
    total: 0,
    color: '#6FCF97',
  },
];

const PieChartTask = () => {
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 1,
    legendFontSize: 18,
    legendFontColor: '#7F7F7F'
  };

  return (
    <PieChart
      data={data}
      width={widthScreen(90)}
      height={220}
      accessor={'total'}
      backgroundColor={'#fff'}
      paddingLeft={'10'}
      chartConfig={chartConfig}
      avoidFalseZero={true}
      style={{
        marginVertical: 8,
        borderRadius: 16,
        elevation: 4,
      }}
    />
  );
};

export default PieChartTask;
