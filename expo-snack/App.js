import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Depois do deploy no Render, substitua pelo URL real da sua API.
const API_URL = 'https://SEU-SERVICO.onrender.com/api/clientes';

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState('');

  const carregarClientes = useCallback(async (pullToRefresh = false) => {
    if (API_URL.includes('SEU-SERVICO')) {
      setErro('Substitua SEU-SERVICO pelo endereço do Web Service criado no Render.');
      setCarregando(false);
      setAtualizando(false);
      return;
    }

    if (pullToRefresh) setAtualizando(true);
    else setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch(API_URL, {
        headers: { Accept: 'application/json' }
      });
      if (!resposta.ok) throw new Error(`A API respondeu com HTTP ${resposta.status}.`);
      const dados = await resposta.json();
      if (!Array.isArray(dados)) throw new Error('A resposta da API não é uma lista JSON.');
      setClientes(dados);
    } catch (error) {
      setErro(error.message || 'Não foi possível carregar os clientes.');
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  useEffect(() => {
    carregarClientes();
  }, [carregarClientes]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#123047" />
      <View style={styles.header}>
        <Text style={styles.eyebrow}>API REST • NODE.JS + EXPRESS</Text>
        <Text style={styles.title}>Clientes</Text>
        <Text style={styles.subtitle}>Lista carregada do servidor Render</Text>
      </View>

      {carregando ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1677a8" />
          <Text style={styles.message}>A carregar clientes...</Text>
        </View>
      ) : erro ? (
        <View style={styles.center}>
          <Text style={styles.errorTitle}>Não foi possível carregar</Text>
          <Text style={styles.errorText}>{erro}</Text>
          <TouchableOpacity style={styles.button} onPress={() => carregarClientes()}>
            <Text style={styles.buttonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={clientes}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={atualizando} onRefresh={() => carregarClientes(true)} />
          }
          ListHeaderComponent={
            <Text style={styles.count}>
              {clientes.length} {clientes.length === 1 ? 'cliente encontrado' : 'clientes encontrados'}
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{(item.nome || '?').charAt(0).toUpperCase()}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.name}>{item.nome}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.id}>ID: {item.id}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Ainda não existem clientes cadastrados.</Text>}
          ListFooterComponent={
            <TouchableOpacity style={styles.refreshButton} onPress={() => carregarClientes(true)}>
              <Text style={styles.refreshText}>Atualizar lista</Text>
            </TouchableOpacity>
          }
        />
      )}
      <Text style={styles.footer}>Projeto académico • CRUD de Clientes</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f3f6f8' },
  header: { backgroundColor: '#123047', paddingHorizontal: 24, paddingTop: 28, paddingBottom: 26 },
  eyebrow: { color: '#7ed2ee', fontSize: 11, fontWeight: '700', letterSpacing: 1.3 },
  title: { color: '#fff', fontSize: 32, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#d2e0e7', fontSize: 14, marginTop: 5 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28 },
  message: { color: '#5a6b75', marginTop: 12, fontSize: 15 },
  errorTitle: { color: '#173449', fontSize: 20, fontWeight: '700', textAlign: 'center' },
  errorText: { color: '#a33a3a', textAlign: 'center', marginTop: 10, lineHeight: 21 },
  button: { marginTop: 18, backgroundColor: '#1677a8', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: '700' },
  list: { padding: 18, paddingBottom: 14 },
  count: { color: '#647782', fontSize: 13, fontWeight: '600', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e4ebef' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#e3f4fa', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  avatarText: { color: '#1677a8', fontSize: 20, fontWeight: '800' },
  details: { flex: 1 },
  name: { color: '#173449', fontSize: 17, fontWeight: '700' },
  email: { color: '#526875', fontSize: 14, marginTop: 4 },
  id: { color: '#91a0a8', fontSize: 11, marginTop: 6 },
  empty: { color: '#647782', textAlign: 'center', padding: 28 },
  refreshButton: { alignSelf: 'center', marginTop: 6, paddingVertical: 12, paddingHorizontal: 18 },
  refreshText: { color: '#1677a8', fontWeight: '700' },
  footer: { textAlign: 'center', color: '#91a0a8', fontSize: 11, padding: 12 }
});
