import React, {useEffect, useState} from 'react';

import {StyleSheet, StatusBar, View, LogBox, ToastAndroid} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../utils/reference';
import api from '../utils/api';
import {encode} from 'base-64';
import Colors from '../utils/color';
import LoginScreenComponent from 'react-native-login-screen';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   LogBox.ignoreAllLogs();
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       api.defaults.headers.common['Authorization'] = user;
  //       api.defaults.headers.common['UserId'] = `${encode(user.email)}`;
  //       navigation.navigate('Home');
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const showToastWithGravity = message => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const handleLogin = () => {
    if (username === '' || password === '') {
      alert('Usuário ou Senha Inválidos!');
    } else {
      //setLoading(true);
      navigation.navigate('Home');
      // signInWithEmailAndPassword(auth, username, password)
      //   .then(userCredential => {
      //     const user = userCredential.user;
      //     const encodedEmail = encode(user.email);
      //     api.defaults.headers.common['Authorization'] = user;
      //     api.defaults.headers.common['UserId'] = `${encodedEmail}`;
      //     setLoading(false);
      //     navigation.navigate('Home');
      //   })
      //   .catch(error => {
      //     setLoading(false);
      //     showToastWithGravity('Erro ao logar! ' + error.message);
      //   });
    }
  };

  const handleSiginUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <>
      <LoginScreenComponent
        logoImageSource={require('../resources/logotipo.png')}
        onLoginPress={handleLogin}
        onSignupPress={handleSiginUp}
        onEmailChange={setUsername}
        onPasswordChange={setPassword}
        passwordPlaceholder="Senha"
        signupText="Criar uma conta"
        enablePasswordValidation
        disablePasswordTooltip
        loginButtonStyle={{backgroundColor: Colors.dark}}
        disableSocialButtons
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
    opacity: 0.8,
  },
  textField: {
    height: 60,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    height: 45,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#F3F3F3',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 240,
    height: 320,
    marginBottom: 15,
  },
});

export default LoginScreen;
