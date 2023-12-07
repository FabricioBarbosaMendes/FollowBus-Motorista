import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import App from '../../screens/home'
import { propsNavigationStack } from "./Models";

const {Navigator,Screen} = createNativeStackNavigator<propsNavigationStack>()

export default function() {
    return(
        <Navigator initialRouteName="App">
            <Screen name="App" options={{title:'',headerTransparent:true,headerShown: false}} component={App}/>
        </Navigator>
    )
}