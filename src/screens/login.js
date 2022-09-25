
import React, { useEffect, useState } from 'react';
import {Button, StyleSheet,ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text, TextInput, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import {redirect, styles, url} from '../config';


const Login = ({navigation}) => {
  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  // useEffect(() => {
  //   console.log('ffff')


  // }, []);
  
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset
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
       reset({email:'', password:''})
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
                  secureTextEntry={true}
                  
                />
              )}
              name="password"
            />
            {errors.password && <Text style={styles.errorText}>Password est requis.</Text>}

            <Button title="Enregistrer" onPress={handleSubmit(onSubmit)} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={()=>{redirect(navigation,'register')}}>
        <Text style={styles.redirect}>Vous etes pas inscrit ? s'inscrire !</Text>
      </TouchableOpacity>
      </ScrollView>
    </>
  );
};


export default Login;

// const styles = StyleSheet.
