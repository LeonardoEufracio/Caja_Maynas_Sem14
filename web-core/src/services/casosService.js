import api from './api.js'

export async function listarCasos() {
  const { data } = await api.get('/casos')
  return data
}

export async function resumenCasos() {
  const { data } = await api.get('/casos/dashboard')
  return data
}

export async function diagnosticoConexion() {
  const { data } = await api.get('/casos/conexion')
  return data
}

export async function sembrarCasos() {
  const { data } = await api.post('/casos/sembrar')
  return data
}
