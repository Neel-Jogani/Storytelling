import * as React from 'react'
import { View, Text, TouchableOpacity,StyleSheet, SafeAreaView, FlatList, Platform, StatusBar, Image} from 'react-native'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import StoryCard from './StoryCard'

let customFont= {
    BubblegumSans: require('../assets/fonts/BubblegumSans-Regular.ttf')
}
let stories= require('./TempStories.json')

export default class Feed extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fontLoaded: false,
        }
    }
    async _loadFontsAsync(){
        await Font.loadAsync(customFont)
        this.setState({
            fontLoaded: true
        })
    }
    componentDidMount(){
        this._loadFontsAsync()
    }

    keyExtractor=(item,index)=>{
        index.toString()
    }
    renderItem=({item: story})=>{
        return <StoryCard story={story} navigation={this.props.navigation}/>
    }
    render(){
        if(!this.state.fontLoaded){
            return <AppLoading/>
        }
        else{
            return(
                <View style={styles.container}>
                    <SafeAreaView style={styles.SafeAreaView}/>
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image source={require('../assets/logo.png')} style={styles.logo}/>       
                        </View>
                        <View style={styles.appTitleContainer}>
                            <Text style={styles.header}>Story Telling App</Text>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <FlatList keyExtractor={this.keyExtractor}
                                  data={stories}
                                  renderItem={this.renderItem}/>
                    </View>
                </View>
            )
        }
        
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#010048'
    },
    SafeAreaView:{
        marginTop: Platform.OS==='android'?StatusBar.height:0
    },
    appTitle:{
        flex: 0.07,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding:5,
    },
    appIcon:{
        flex: 0.3,
    },
    logo:{
        width:60,
        height:60,
        resizeMode: 'contain',
        marginLeft:20,
    },
    appTitleContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    header:{
       color: 'white',
       fontSize: 30,
       paddingLeft: 20,
       fontFamily: 'BubblegumSans' 
    },
    cardContainer:{
        flex: 0.85,
    }
})