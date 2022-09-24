import React from 'react';
import {Button, StyleSheet,ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text, TextInput, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import {url} from '../config';


const Login = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
     
      email: '',
      password: '',
     
    },
  });

  const onSubmit = data => {
    let dataForm = {
      ...data,
    };
    axios.post(url + "api_login.php", dataForm).then(res => {
        const {status} = res.data.data;
        const {user} = res.data.data;
        if (status == "valide") {
        console.log(user);
       navigation.navigate('profile',{user});
    }
    }).catch(res => {
      const {status} = res.response.data.data;
      alert(status);
    });
  }
//   const redirect = () => {
//     navigation.navigate('home');
//   };


  return (
    <>
      <ScrollView
        contentContainerStyle={{marginHorizontal: 10, paddingBottom: 50}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={{ fontSize: 22, marginVertical: 14}}>Vos informations personnelles</Text>
      
       

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Email"
                />
              )}
              name="email"
            />
            {errors.email && <Text style={styles.errorText}>Email est requis.</Text>}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Password"
                />
              )}
              name="password"
            />
            {errors.password && <Text style={styles.errorText}>Password est requis.</Text>}

            <Button title="Enregistrer" onPress={handleSubmit(onSubmit)} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
export default Login;

// const styles = StyleSheet.
