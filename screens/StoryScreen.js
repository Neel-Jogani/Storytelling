import * as React from 'react'
import { View, Text, TouchableOpacity,StyleSheet, SafeAreaView, FlatList, Platform, StatusBar, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { ScrollView } from 'react-native-gesture-handler'
import * as Speech from 'expo-speech'

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
  };

export default class StoryScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fontsLoaded: false,
            speakerColor: 'grey',
            speakerIcon:'volume-high-outline'
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    
    componentDidMount() {
        this._loadFontsAsync();
    }

    async initiateTTS(title,author,story,moral){
        const currentColor= this.state.speakerColor
        this.setState({
            speakerColor: currentColor==='grey'?'red':'grey'
        })
        if(currentColor==='grey'){
            Speech.speak(`${title} by ${author}`)
            Speech.speak(story)
            Speech.speak('moral of the story is')
            Speech.speak(moral)
        }
        else{
            Speech.stop()
        }
    }
    render(){
        if(!this.props.route.params){
            this.props.navigation.navigate('Home')
        }
        else if(!this.state.fontsLoaded){
            return <AppLoading/>
        }
        else{
            return(
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea}/>
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image source={require('../assets/logo.png')} style={styles.logo}/>       
                        </View>
                        <View style={styles.appTitleContainer}>
                            <Text style={styles.header}>Story Telling App</Text>
                        </View>
                    </View>
                    <View style={styles.storyContainer}>
                        <ScrollView style={styles.storyCard}>
                            <Image source={require('../assets/story_image_1.png')} style={styles.image}/>
                            <View style={styles.dataContainer}>
                                <View style={styles.titleTextContainer}>
                                    <Text style={styles.storyTitleText}>{this.props.route.params.story.title}</Text>
                                    <Text style={styles.storyAuthorText}>{this.props.route.params.story.author}</Text>
                                    <Text style={styles.storyAuthorText}>{this.props.route.params.story.created_on}</Text>
                                </View>
                                <View style={styles.iconContainer}>
                                    <TouchableOpacity onPress={()=>{
                                        this.initiateTTS(
                                            this.props.route.params.story.title,
                                            this.props.route.params.story.author,
                                            this.props.route.params.story.story,
                                            this.props.route.params.story.moral
                                        )
                                    }}>
                                        <Ionicons name={this.state.speakerIcon}
                                                size={RFValue(30)}
                                                color={this.state.speakerColor}
                                                style={{margin:RFValue(50)}}/>
                                        </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.storyTextContainer}>
                                <Text style={styles.storyText}>{this.props.route.params.story.story}</Text>
                                <Text style={styles.moralText}>{this.props.route.params.story.moral}</Text>
                            </View>
                            <View style={styles.actionContainer}>
                                <View style={styles.likeButton}>
                                    <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                                    <Text style={styles.likeText}>12k</Text>
                                </View>
                            </View>
                        </ScrollView>
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
    storyContainer: {
        flex: 1
      },
      storyCard: {
        margin: RFValue(20),
        backgroundColor: "#2f345d",
        borderRadius: RFValue(20)
      },
      image: {
        width: "100%",
        alignSelf: "center",
        height: RFValue(200),
        borderTopLeftRadius: RFValue(20),
        borderTopRightRadius: RFValue(20),
        resizeMode: "contain"
      },
      dataContainer: {
        flexDirection: "row",
        padding: RFValue(20)
      },
      titleTextContainer: {
        flex: 0.8
      },
      storyTitleText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        color: "white"
      },
      storyAuthorText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(18),
        color: "white"
      },
      iconContainer: {
        flex: 0.2
      },
      storyTextContainer: {
        padding: RFValue(20)
      },
      storyText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(15),
        color: "white"
      },
      moralText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(20),
        color: "white"
      },
      actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: RFValue(10)
      },
      likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        flexDirection: "row",
        backgroundColor: "#eb3948",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(30)
      },
      likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
      }
})