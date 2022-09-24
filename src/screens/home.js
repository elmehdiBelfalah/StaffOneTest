import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';


function HomeScreen(props,navigation) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const {user}  = props.route.params
    setUser(user)
    console.log(user.first_name)
  }, []);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{user.first_name}</Text>
      </View>
    );
}

export default HomeScreen;