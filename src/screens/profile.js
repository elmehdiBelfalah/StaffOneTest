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
  ActivityIndicator,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {RadioButton} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {redirect, styles, url, urlPhotos} from '../config';

const Profile = (props) => {
  const [loadingPhoto, setLoadingPhoto] = useState(true);
  const [urlPhoto, setUrlPhoto] = useState();
  const [user, setUser] = useState({});
  useEffect(() => {
    const {user} = props.route.params;

    reset({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      city: user.ville,
      address: user.adresse,
    });
    setGender(user?.civilite);
    setUrlPhoto(urlPhotos+'/'+user.photo)
    setUser(user)
  console.log(urlPhoto) 
  }, []);

  useEffect(() => {
  }, [user]);

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
  const uploadProfileImage = () => {
    launchImageLibrary(
      {
        title: 'AppMobile',
        takePhotoButtonTitle: 'Prendre une photo avec votre appareil photo',
        chooseFromLibraryButtonTitle: 'Chosir une photo de la bibliothèque',
        cancelButtonTitle: 'Annuler',
        noData: true,
        mediaType: 'photo',
        quality: 0.7,
        allowsEditing: true,
      },
      async response => {
        console.log(response);
        if (response.didCancel) {
          //   console.log('Error: User cancelled image picker');
        } else if (response.error) {
          //   console.log('ImagePicker Error: ' + response.error);
        } else if (response.customButton) {
          //   console.log('User tapped custom button: ' + response.customButton);
        } else {
          console.log(response.assets[0].uri);
          let imageData = new FormData();
          imageData.append('file', {
            type: 'image/jpg',
            uri: response.assets[0].uri,
            name: 'uploadimagetmp.jpg',
          });
          imageData.append('id', user.id);
          console.log(imageData);
          setLoadingPhoto(!loadingPhoto)
          fetch(`${url}/api_photo_profil.php`, {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: imageData,
          })
            .then(res => res.json())
            .then(responseJson => {
              setUrlPhoto(response.assets[0].uri);
              alert("success")
              setLoadingPhoto(!loadingPhoto)
              console.log(JSON.stringify(responseJson));
            })
            .catch(error => {
              console.error(error);
            });
        }
      },
    );
  };
  return (
    <ScrollView
      contentContainerStyle={{marginHorizontal: 10, paddingBottom: 50}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={{fontSize: 22, marginVertical: 14}}>
            Vos informations personnelles
          </Text>
          <TouchableOpacity onPress={uploadProfileImage}>
        {loadingPhoto && <ActivityIndicator />}
        <View
          style={{
          alignItems: 'center',
            justifyContent: 'center',
            width: loadingPhoto ? 0 : '100%',
            height: loadingPhoto ? 0 : 100,
            marginBottom:20
          }}>
          <Image
            source={{
              uri: urlPhoto,
            }}
            onLoadStart={() => setLoadingPhoto(true)}
            onLoad={() => setLoadingPhoto(false)}
            style={{width:100 , height:100 , borderRadius:100/2}}
            onPress={() => console.log('hello')}
          />
        </View>
      </TouchableOpacity>
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
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
 
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
          {errors.email && errors.email.type == 'required'  && (
              <Text style={styles.errorText}>Email est requis.</Text>
            )}
            {errors.email && errors.email.type == 'pattern' && (
              <Text style={styles.errorText}>Email invalide.</Text>
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
          <TouchableOpacity style={{
            padding:10 , backgroundColor:'#2596be' , borderRadius:10
          }} onPress={handleSubmit(onSubmit)} >
                <Text style={{textAlign:'center' , color:'#fff'}}>Enregistrer</Text> 
            </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={()=>{redirect(props.navigation,'login')  }}>
          <Text style={styles.redirect}>se deconnecter !</Text> 
      </TouchableOpacity>
    </ScrollView>
  );
};


export default Profile;
