import api from './api.js'

/** Historial / tablero de solicitudes del asesor. GET /solicitudes */
export async function listarSolicitudes() {
  try {
    const { data } = await api.get('/solicitudes')
    return data
  } catch (error) {
    try {
      const { data } = await api.get('/solicitudes/demo')
      return data
    } catch (_) {
      // Sin Core/autenticacion: deja visible el catalogo del PDF como respaldo.
    }
    const casos = await api.get('/casos')
    return casos.data.map((c) => ({
      id: c.numero_expediente,
      numero_expediente: c.numero_expediente,
      cliente_nombre: `${c.nombres} ${c.apellidos}`,
      monto_solicitado: c.monto_solicitado,
      monto_aprobado: c.monto_aprobado,
      estado: c.estado_final,
      created_at: '2026-06-17',
    }))
  }
}

/** Crea una solicitud de crédito. POST /solicitudes */
export async function crearSolicitud(payload) {
  const { data } = await api.post('/solicitudes', payload)
  return data
}

/** Notas internas de una solicitud. GET /solicitudes/{id}/notas */
export async function listarNotas(solicitudId) {
  const { data } = await api.get(`/solicitudes/${solicitudId}/notas`)
  return data
}

/** Agrega una nota interna. POST /solicitudes/{id}/notas */
export async function agregarNota(solicitudId, contenido) {
  const { data } = await api.post(`/solicitudes/${solicitudId}/notas`, { contenido })
  return data
}

export async function decidirComite(solicitudId, payload) {
  const { data } = await api.post(`/solicitudes/demo/${solicitudId}/comite`, payload)
  return data
}

export async function desembolsarSolicitud(solicitudId, payload = {}) {
  const { data } = await api.post(`/solicitudes/demo/${solicitudId}/desembolso`, payload)
  return data
}
