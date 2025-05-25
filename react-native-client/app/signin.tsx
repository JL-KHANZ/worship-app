import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { responsiveStyleSheet } from '@/components/ui/responsive';
import { clientUserSignIn } from '@/api';
import { useUser } from '@/context/userContext';
import { primaryColor, tertiaryColor } from '@/components/ui/PrefStyles';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isWrongCredentials, setIsWrongCredentials] = useState<boolean>(false);

  const { user, saveUser } = useUser();
  const handleSignIn = async () => {
    const res = await clientUserSignIn(email, password);
    if (res != null) {
      const saveU : USERCLIENT = {
        uid: "1234",
        username: "josh",
        role: "Leader",
        teamId: "1",
        email: "joshuahanlim777@gmail.com",
      };
      saveUser(saveU);
      router.replace('/(app)');
    } else {
      Alert.alert("로그인 실패", "아이디와 비밀번호를 확인해 주세요");
      setIsWrongCredentials(true);
    }
  };

  function toSignUp() {
    router.replace('/signup');
  }

  return (
    <KeyboardAvoidingView
      style={auth_styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={auth_styles.innerContainer}>
        <Text style={auth_styles.title}>로그인</Text>

        <TextInput
          style={isWrongCredentials? [auth_styles.input, {borderColor: primaryColor}] : auth_styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />

        <TextInput
          style={isWrongCredentials? [auth_styles.input, {borderColor: primaryColor}] : auth_styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={auth_styles.button} onPress={handleSignIn}>
          <Text style={auth_styles.buttonText}>로그인</Text>
        </TouchableOpacity>

        {isWrongCredentials ? 
        <Pressable>
          <Text style={[auth_styles.footer, {color: primaryColor, textDecorationLine: "underline"}]}>비밀번호를 잊으셨나요?</Text>
        </Pressable>
        :
        <Text style={auth_styles.footer}>신촌하나교회</Text>
        }
      </View>
      <Pressable onPress={toSignUp}>
        <Text style={auth_styles.footer}>회원가입하러 가기</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

export const auth_styles = responsiveStyleSheet({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    color: primaryColor,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#F3F4F6',
  },
  button: {
    backgroundColor: primaryColor,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    marginTop: 24,
    textAlign: 'center',
    color: tertiaryColor,
    fontSize: 14,
  },
});