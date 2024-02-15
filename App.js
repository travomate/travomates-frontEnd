import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View} from 'react-native';
import Navigation from './src/Navigations/Navigation';
import { ThemeContext } from './contexts/ThemeContext';

export default function App() {


const [theme, setTheme] = useState({mode: "light"})

const updateTheme = (newTheme) =>{
  let mode;
if(!newTheme){
  mode = theme.mode === 'dark' ? 'light' : 'dark';
  newTheme = {mode};
}
setTheme(newTheme);
}

  return (

    <ThemeContext.Provider value={{theme, updateTheme}}>
    {/* <View style={[styles.container,{backgroundColor:activeColors.bgcolor}]}> */}
    <Navigation/>
    <StatusBar style={theme.mode == "dark" ? "light" : "dark"} />
    {/* </View> */}
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    
  },
});





