import React from 'react';
import {Button, StyleSheet,ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text, TextInput, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import {redirect, styles, url} from '../config';

const Register = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
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
  });
  const [gender, setGender] = React.useState('Homme');

  const onSubmit = data => {
    let dataForm = {
      ...data,
      gender
    };
    axios.post(url + "api_inscription.php", dataForm).then(res => {
      //console.log(res)
      const {status} = res.data.data;
      if (status == "valide") {
        alert('Success')
        redirect(navigation,'login')
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
                  placeholder="Prenom"
                />
              )}
              name="firstName"
            />
            {errors.firstName && <Text style={styles.errorText}>Prenom est requis.</Text>}

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
            {errors.lastName && <Text style={styles.errorText}>Nom est requis.</Text>}

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
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && <Text style={styles.errorText}>Confirm Password est requis.</Text>}

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
            {errors.city && <Text style={styles.errorText}>Ville est requis.</Text>}

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
            {errors.address && <Text style={styles.errorText}>Adresse est requis.</Text>}

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
            <Button title="Enregistrer" onPress={handleSubmit(onSubmit)} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={()=>{redirect(navigation,'login')}}>
        <Text style={styles.redirect}>Vous etes deja inscrit ? se connecter !</Text>
      </TouchableOpacity>
      </ScrollView>
    </>
  );
};


export default Register;

// const styles = StyleSheet.
