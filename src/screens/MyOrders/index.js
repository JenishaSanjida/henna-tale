import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import OptionButtons from "../../components/ToogleBtn/index";


const Stack = createNativeStackNavigator();

const MyOrder = (props) => {
    return (
        <View>
            <Text>MyOrder Screen</Text>
        </View>

    )
}


// const ToogleBtn = (props) => {
//     return( <div className="App">
//     <OptionButtons/>
//   </div>
//   )
// }

export default MyOrder


