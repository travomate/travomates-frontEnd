import { StyleSheet, Text, View,TextInput,TouchableOpacity, Pressable,FlatList } from 'react-native'
import React,{useState,useContext} from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Entypo,MaterialIcons  } from "@expo/vector-icons";
import { ThemeContext } from '../../contexts/ThemeContext';
import { colors } from '../../Config/theme/colors';


const countriesData = [
  { country: 'USA', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco'] },
  { country: 'Canada', cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa'] },
  { country: 'United Kingdom', cities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow'] },
  { country: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'] },
  { country: 'Germany', cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'] },
];

const SendTo = () => {

 // theme
 const {theme} = useContext(ThemeContext);
 const activeColors = colors[theme.mode];


  const [isFocus, setIsFocus] = useState(false);
  const [inputText, setInputText] = useState('');
  const navigation = useNavigation();
  const [suggestions, setSuggestions] = useState([]);

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
    navigation.navigate('Search', {input2: selectedCity})
    
  };


  const handleCancelPress = () => {
    navigation.goBack();
    
  };
  const clearText = () =>{
    setInputText('');
    setSuggestions([])
  }

  return (
    <View style={[styles.container, {backgroundColor:activeColors.bgcolor}]}>
   <View style={styles.AllContents}>
   <View style={styles.inputContainer}>
            <Text style={[styles.label, {color:activeColors.TextColor}]}>Sending To</Text>
            <View style={[styles.inputButton, isFocus && {borderColor:'blue'}]}>
            <TextInput
              placeholder={!isFocus? "ex.Kigali" : " "}
              value={inputText}
              onChangeText={handleTextChange}
              onFocus={()=> setIsFocus(true)}
              placeholderTextColor="gray"
              
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
      
      <View style={styles.buttonCancel}>
         <Pressable  onPress={handleCancelPress}>
         <Text style={{color:'red', fontSize:17, fontWeight:'600'}}>Cancel</Text>
         </Pressable>
      </View>
   </View>
    
    </View>
  )
}
export default SendTo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  AllContents: {
    marginVertical:20,
    marginTop:30
  },
  buttonCancel: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  
  inputContainer: {
    marginTop: 20,
    padding: 20,
    marginBottom:10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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

