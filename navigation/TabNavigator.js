import React from 'react';
import { StyleSheet } from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import{RFValue} from 'react-native-responsive-fontsize'
import CreateStory from '../screens/CreateStory';
import Feed from '../screens/Feed';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab= createMaterialBottomTabNavigator()
export default function BottomTabNavigator() {
  return (
     <Tab.Navigator 
     labeled= {false}
     barStyle= {styles.bottomTab}
     screenOptions={({route})=>({
       tabBarIcon:({focused,color,size})=>{
         let iconName
         if(route.name==='Feed'){
           iconName= focused?'book':'book-outline'
         }
         else if(route.name==='CreateStory'){
          iconName= focused?'create':'create-outline'
         }
         return <Ionicons name={iconName} size={RFValue(25)} style={styles.icon} color={color}/>
       }
     })}
     tabBarOptions={{
       activeTintColor: 'black',
       inactiveTintColor: 'grey'
     }}>
       <Tab.Screen name='Feed' component= {Feed}/>
       <Tab.Screen name='CreateStory' component= {CreateStory}/>
     </Tab.Navigator>
  )
}

const styles= StyleSheet.create({
  bottomTab:{
    backgroundColor: '#03002E',
    height: '8%',
    position: 'absolute',
    overflow: 'hidden',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  icon:{
    width: RFValue(30),
    height: RFValue(30)
  },
})

