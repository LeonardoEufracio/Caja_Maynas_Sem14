import api from './api.js'

/** Cartera del día del asesor autenticado. GET /cartera?fecha=YYYY-MM-DD */
export async function listarCartera(fecha) {
  const params = fecha ? { fecha } : {}
  try {
    const { data } = await api.get('/cartera', { params })
    return data
  } catch (_) {
    const { data } = await api.get('/cartera/demo', { params })
    return data
  }
}

/** Registra el resultado de una visita. POST /cartera/{id}/visita */
export async function marcarVisita(carteraId, payload) {
  try {
    const { data } = await api.post(`/cartera/${carteraId}/visita`, payload)
    return data
  } catch (_) {
    const { data } = await api.post(`/cartera/demo/${carteraId}/visita`, payload)
    return data
  }
}
