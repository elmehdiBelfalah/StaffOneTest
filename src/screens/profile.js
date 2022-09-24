import React, {useEffect, useState} from 'react';
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
  Image,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {RadioButton} from 'react-native-paper';
import axios from 'axios';
import {url} from '../config';

const Profile = (props, navigation) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const {user} = props.route.params;
    console.log(user);
    reset({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      city: user.ville,
      address: user.adresse,
    });
    setGender(user?.civilite);
  }, []);

  useEffect(() => {}, [user]);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      address: '',
    },
  });
  const [gender, setGender] = React.useState(user.civilite);
  console.log(user.civilite);
  const onSubmit = data => {
    let dataForm = {
      ...data,
      gender,
    };
    axios
      .post(url + 'api_update_profil.php', dataForm)
      .then(res => {
        //console.log(res)
        const {status} = res.data.data;
        if (status == 'valide') {
          alert('Success');
        }
      })
      .catch(res => {
        const {status} = res.response.data.data;
        alert(status);
      });
  };
  return (
    <ScrollView
      contentContainerStyle={{marginHorizontal: 10, paddingBottom: 50}}>
         <TouchableOpacity onPress={uploadProfileImage}>
        {loadingPhoto && <ActivityIndicator />}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: loadingPhoto ? 0 : '100%',
            height: loadingPhoto ? 0 : 100,
          }}>
          <Image
            source={{
              uri: urlPhoto,
            }}
            onLoadStart={() => setLoadingPhoto(true)}
            onLoad={() => setLoadingPhoto(false)}
            style={styles.Pimage}
            onPress={() => console.log('hello')}
          />
        </View>
      </TouchableOpacity>
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
                placeholder={user.first_name}
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
                placeholder={user.last_name}
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
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                // placeholder={user.email}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles.errorText}>Email est requis.</Text>
          )}

          {/* <Controller
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
                  placeholder={user.password}
                />
              )}
              name="password"
            /> */}
          {/* {errors.password && <Text style={styles.errorText}>Password est requis.</Text>} */}
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
                // placeholder={user.ville}
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
                // placeholder={user.adresse}
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
          <Button title="Enregistrer" onPress={handleSubmit(onSubmit)} />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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

export default Profile;
