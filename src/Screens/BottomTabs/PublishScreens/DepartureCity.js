import { StyleSheet, Text, View,Pressable,TouchableOpacity,TextInput,FlatList } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import { colors } from '../../../../Config/theme/colors';
import { useContext } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';


const countriesData = [
  { country: 'USA', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco'] },
  { country: 'Canada', cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa'] },
  { country: 'United Kingdom', cities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow'] },
  { country: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'] },
  { country: 'Germany', cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'] },
];


const DepartureCity = () => {

// theme colors
const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];


  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState(false);
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  
  const handleArrowBackPress = () => {
    navigation.goBack();
  };
  const handleNextPress = () => {
    console.log(inputText)
  };

  const handleTextChange = (text) => {
    setInputText(text);

    const filteredSuggestions = countriesData.reduce((acc, curr) => {
      const filteredCities = curr.cities.filter((city) =>
        city.toLowerCase().startsWith(text.toLowerCase())
      );
      return [...acc, ...filteredCities.map((city) => `${city}, ${curr.country}`)];
    }, []);

    setSuggestions(filteredSuggestions);
  };

  const handlePress = (selectedCity) => {
    setInputText(selectedCity);
    setSuggestions([])
    // navigation.navigate('Search',{input1: selectedCity})
  };

  const clearText = () =>{
    setInputText('');
    setSuggestions([]);
    setIsFocus(false)
  }

  return (
    <View style={[styles.container,{backgroundColor:activeColors.bgcolor}]}>
     <View style={styles.content}>

    {/* Arrow Head */}
    <View style={styles.ArrowSection}>
        <TouchableOpacity  onPress={handleArrowBackPress}>
        <AntDesign name="arrowleft" size={26} color="#dc661f" />
        </TouchableOpacity>
    </View>

      {/* header text */}
      <View style={styles.TextSection}>
        <Text style={[styles.TextHeader,{color:activeColors.TextColor}]}>where do you start from</Text>
      </View>

           {/* input button section */}
         <View style={styles.inputContainer}>
           <Text style={[styles.label,{color:activeColors.TextColor}]}>Departure Citytt</Text>
           <View style={[styles.inputButton, isFocus && {borderColor:'blue'}]}>
           <TextInput
             placeholder={!isFocus ? "ex.paris" : " "}
             value={inputText}
             onChangeText={handleTextChange}
             onFocus={()=> setIsFocus(true)}
           />
           {
             inputText !== '' &&
             <TouchableOpacity onPress={clearText} style={styles.cancelIcon}>
             <Ionicons name="close" size={20} color="gray" />
             </TouchableOpacity>
           }
           </View>
           {suggestions.length > 0 && (
       <FlatList
         data={suggestions}
         renderItem={({ item }) => (
           <Pressable style={styles.pressable} onPress={() => handlePress(item)}>
             <Text style={styles.suggestionText}>{item}</Text>
           </Pressable>
         )}
         keyExtractor={(item) => item}
       />
     )}
   </View>
         {inputText !== '' && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
            <Text style={styles.nextText}>Next</Text>
            <FontAwesome name="arrow-circle-right" size={50} color="#dc661f" style={{ paddingLeft: 6 }} />
          </TouchableOpacity>
        )}
         
    </View>
      
    </View>
  )
}

export default DepartureCity

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff', 
  },
  content:{
    marginTop:25, 
    marginHorizontal:20
  },
  ArrowSection: {
    marginVertical:20,
    marginHorizontal:10
  },
  TextSection:{
    marginTop:10,
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom:20
  },
  TextHeader:{
    fontSize:29,
    fontWeight:'700'
  },
  nextButton: {
   flexDirection:'row',
   alignItems: "center",
   bottom:-350,
   right:10,
   position:'absolute'
  },
  nextText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
   
  },
  inputButton: {
    flexDirection:'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    alignItems:'center',
    justifyContent:'space-between',
    
  },
  inputContainer: {
    marginTop: 20,
    marginBottom:20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pressable: {
    backgroundColor: '#e5e5e5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  suggestionText: {
    fontSize: 15,
    fontWeight: '500',
  },
})

