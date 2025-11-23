import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { authService } from '../../services/authService';

const LoginScreen = ({ navigation, route }) => {
  const { role = 'parent' } = route.params || {};
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi');
      return;
    }

    setIsLoading(true);
    try {
      const loginFn = role === 'teacher' ? authService.loginTeacher : authService.loginParent;
      const result = await loginFn(email, password);

      await signIn({
        token: result.token,
        user: result.user,
      });
    } catch (error) {
      Alert.alert('Login Gagal', error?.message || 'Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleText = () => {
    return role === 'teacher' ? 'Guru' : 'Orang Tua';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Login sebagai {getRoleText()}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="masukkan email Anda"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="masukkan password Anda"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Masuk</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Belum punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register', { role })}>
            <Text style={styles.footerLink}>Daftar di sini</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#0B3869',
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  form: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#0D58AB',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  footerLink: {
    color: '#0D58AB',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
