
import {StyleSheet} from 'react-native';
export const url = "http://192.168.0.175/api/"
export const urlPhotos = "http://192.168.0.175/api/photos"
export const redirect = (navigation,path) => {
    navigation.navigate(path);
  };

 export const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom:10,
    },
    input: {
      borderWidth: 0.4,
      borderColor: '#ccc',
      borderRadius: 6,
      paddingLeft: 8,
      marginBottom: 8,
    },
    errorText: {
      color: 'red',
      marginBottom: 8,
    },
    redirect: {
      color: '#5874F3',
      alignSelf: 'center',
      marginVertical: 10,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    inputStyle: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 6,
    },
  });