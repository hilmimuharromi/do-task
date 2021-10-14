import { Dimensions } from "react-native"

const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const widthScreen = (percent) => {
    return windowWidth * percent / 100
}

const heightScreen = (percent) => {
    return height * percent / 100
}



export {
    widthScreen,
    heightScreen
}