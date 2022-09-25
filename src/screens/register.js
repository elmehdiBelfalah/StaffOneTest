import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import {redirect, styles, url} from '../config';
// import * as yup from 'yup';
// import {yupResolver} from '@hookform/resolvers/yup';



const Register = ({navigation}) => {
  // const formSchema = yup.object().shape({
  //   firstName: yup.string().required('First Name is required'),
  //   lastName: yup.string().required('Last Name is required'),
  //   email: yup.string().required('Email is required').email('Email is invalid'),
  //   password: yup.string().required('Password is required'),
  //   confirmPassword: yup
  //     .string()
  //     .required('The confirmation password is required')
  //     .oneOf([yup.ref('password'), null], 'Confirm Password does not match'),
  //   city: yup.string().required('City is required'),
  //   address: yup.string().required('address is required'),
  // });
  // const formOptions = { resolver: yupResolver(formSchema) }
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    watch
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      city: '',
      address: '',
    },
    // resolver: yupResolver(formSchema),
  });
  const [gender, setGender] = React.useState('Homme');
  const password = watch('password', '')

  const onSubmit = data => {
    let dataForm = {
      ...data,
      gender,
    };
    axios
      .post(url + 'api_inscription.php', dataForm)
      .then(res => {
        //console.log(res)
        const {status} = res.data.data;
        if (status == 'valide') {
          alert('Success');
          redirect(navigation, 'login');
        }
      })
      .catch(res => {
        const {status} = res.response.data.data;
        alert(status);
      });
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{marginHorizontal: 10, paddingBottom: 50}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={{fontSize: 22, marginVertical: 14}}>
              Vos informations personnelles
            </Text>
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
                  placeholder="Prenom"
                 
                />
              )}
              name="firstName"
            />
            {errors.firstName && (
              <Text style={styles.errorText}>Prenom est requis.</Text>
            )}

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
                  placeholder="Nom"
                />
              )}
              name="lastName"
            />
            {errors.lastName && (
              <Text style={styles.errorText}>Nom est requis.</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
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
            {errors.email && errors.email.type == 'required'  && (
              <Text style={styles.errorText}>Email est requis.</Text>
            )}
            {errors.email && errors.email.type == 'pattern' && (
              <Text style={styles.errorText}>Email invalide.</Text>
            )}

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
            {errors.password && (
              <Text style={styles.errorText}>Password est requis.</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                validate:
                   (value) => {
                      return value ===  password  || "the password doesnt match"
                   } 
                
                
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && errors.confirmPassword.type == 'required' && (
              <Text style={styles.errorText}>Confirm Password est requis.</Text>
            )}
            {errors.confirmPassword && errors.confirmPassword.type == 'validate' && (
              <Text style={styles.errorText}>password unmatched.</Text>
            )}

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
                  placeholder="Ville"
                />
              )}
              name="city"
            />
            {errors.city && (
              <Text style={styles.errorText}>Ville est requis.</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, name, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Adresse"
                />
              )}
              name="address"
            />
            {errors.address && (
              <Text style={styles.errorText}>Adresse est requis.</Text>
            )}

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => setGender('Homme')}>
                <RadioButton
                  value="Homme"
                  status={gender === 'Homme' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('Homme')}
                />
                <Text>Homme</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.row}
                onPress={() => setGender('Femme')}>
                <RadioButton
                  value="Femme"
                  status={gender === 'Femme' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('Femme')}
                />
                <Text>Femme</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{
            padding:10 , backgroundColor:'#2596be' , borderRadius:10
          }} onPress={handleSubmit(onSubmit)} >
                <Text style={{textAlign:'center' , color:'#fff'}}>Créer votre compte</Text> 
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() => {
            redirect(navigation, 'login');
          }}>
          <Text style={styles.redirect}>
            Vous êtes déja inscrit ? se connecter !
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Register;

// const styles = StyleSheet.
