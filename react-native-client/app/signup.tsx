import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { auth_styles } from './signin';
import { clientUserSignUp } from '@/api';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    const res = await clientUserSignUp(username, email, password);
    if (res) {
      router.replace('/signin');
    }
  };

  function toSignIn() {
    router.replace('/signin');
  }

  return (
    <KeyboardAvoidingView
      style={auth_styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={auth_styles.innerContainer}>
        <Text style={auth_styles.title}>회원가입</Text>

        <TextInput
          style={auth_styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />

        <TextInput
          style={auth_styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={auth_styles.button} onPress={handleSignUp}>
          <Text style={auth_styles.buttonText}>회원가입</Text>
        </TouchableOpacity>

        <Text style={auth_styles.footer}>신촌하나교회</Text>
      </View>
      <Pressable onPress={toSignIn}>
        <Text style={auth_styles.footer}>로그인하러 가기</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}