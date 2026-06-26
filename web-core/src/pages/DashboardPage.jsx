import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Briefcase, FileText, ShieldCheck, HandCoins, BarChart3, MapPin,
  CheckCircle2, AlertTriangle, TrendingUp, ArrowRight, PlusCircle,
  Database, Server,
} from 'lucide-react'
import PageHead from '../components/layout/PageHead.jsx'
import Card from '../components/ui/Card.jsx'
import Loader from '../components/ui/Loader.jsx'
import Alert from '../components/ui/Alert.jsx'
import Money from '../components/ui/Money.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { listarCartera } from '../services/carteraService.js'
import { listarSolicitudes } from '../services/solicitudesService.js'
import { diagnosticoConexion, resumenCasos } from '../services/casosService.js'
import { extractError, formatDateTime } from '../utils/format.js'

const ACCESOS = [
  { to: '/cartera', icon: Briefcase, color: '#e2132b', t: 'Cartera del día', d: 'Clientes asignados para visitar hoy' },
  { to: '/solicitudes/nueva', icon: PlusCircle, color: '#00a9a5', t: 'Nueva solicitud', d: 'Registrar una solicitud de crédito' },
  { to: '/evaluacion', icon: ShieldCheck, color: '#8e24aa', t: 'Pre-evaluar / Buró', d: 'Capacidad de pago y listas negras' },
  { to: '/cobranza', icon: HandCoins, color: '#f7941e', t: 'Cobranza', d: 'Gestión de mora del día' },
  { to: '/solicitudes', icon: FileText, color: '#e6398b', t: 'Mis solicitudes', d: 'Tablero de estado de expedientes' },
  { to: '/reportes', icon: BarChart3, color: '#4caf50', t: 'Reportes', d: 'Productividad del equipo' },
  { to: '/casos', icon: Database, color: '#e30613', t: 'Casos PDF', d: 'Sembrar y revisar los 30 casos' },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [cartera, setCartera] = useState([])
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [conexion, setConexion] = useState(null)
  const [casos, setCasos] = useState(null)

  useEffect(() => {
    let alive = true
    Promise.allSettled([listarCartera(), listarSolicitudes(), diagnosticoConexion(), resumenCasos()])
      .then(([c, s, cnx, resumen]) => {
        if (!alive) return
        if (c.status === 'fulfilled') setCartera(c.value || [])
        if (s.status === 'fulfilled') setSolicitudes(s.value || [])
        if (cnx.status === 'fulfilled') setConexion(cnx.value)
        if (resumen.status === 'fulfilled') setCasos(resumen.value)
        if (c.status === 'rejected' && s.status === 'rejected') {
          setError(extractError(c.reason, 'No se pudieron cargar los datos.'))
        }
      })
      .finally(() => alive && setLoading(false))
    return () => { alive = false }
  }, [])

  const pendientes = cartera.filter((c) => c.estado_visita === 'pendiente').length
  const visitados = cartera.filter((c) => c.estado_visita && c.estado_visita !== 'pendiente').length
  const montoCartera = cartera.reduce((acc, c) => acc + (c.monto_credito || 0), 0)
  const aprobadas = solicitudes.filter((s) => ['aprobado', 'desembolsado'].includes(s.estado)).length

  return (
    <>
      <PageHead
        title={`Hola, ${user?.nombres || 'asesor'}`}
        subtitle="Este es el resumen de tu jornada en campo."
      />

      {error && <Alert tipo="error">{error}</Alert>}

      {loading ? (
        <Loader text="Cargando tu panel…" />
      ) : (
        <>
          <div className="cm-kpis">
            <div className="cm-kpi">
              <span className="cm-kpi-ico" style={{ background: '#fde8eb', color: '#e2132b' }}><MapPin size={24} /></span>
              <div>
                <div className="cm-kpi-label">Visitas pendientes</div>
                <span className="cm-kpi-val">{pendientes}</span>
                <small>de {cartera.length} en cartera</small>
              </div>
            </div>
            <div className="cm-kpi" style={{ borderLeftColor: '#00a9a5' }}>
              <span className="cm-kpi-ico" style={{ background: '#e6f7f6', color: '#00a9a5' }}><CheckCircle2 size={24} /></span>
              <div>
                <div className="cm-kpi-label">Gestionadas hoy</div>
                <span className="cm-kpi-val">{visitados}</span>
                <small>visitas registradas</small>
              </div>
            </div>
            <div className="cm-kpi" style={{ borderLeftColor: '#f7941e' }}>
              <span className="cm-kpi-ico" style={{ background: '#fef3e2', color: '#f7941e' }}><TrendingUp size={24} /></span>
              <div>
                <div className="cm-kpi-label">Monto en cartera</div>
                <span className="cm-kpi-val" style={{ fontSize: 20 }}><Money value={montoCartera} /></span>
                <small>colocación gestionada</small>
              </div>
            </div>
            <div className="cm-kpi" style={{ borderLeftColor: '#8e24aa' }}>
              <span className="cm-kpi-ico" style={{ background: '#f3e6f7', color: '#8e24aa' }}><FileText size={24} /></span>
              <div>
                <div className="cm-kpi-label">Solicitudes aprobadas</div>
                <span className="cm-kpi-val">{aprobadas}</span>
                <small>de {solicitudes.length} este mes</small>
              </div>
            </div>
          </div>

          <h2 className="cm-section-title">Conexion del ecosistema</h2>
          <div className="cm-kpis">
            <div className="cm-kpi">
              <span className="cm-kpi-ico" style={{ background: '#ffe5e8', color: '#e30613' }}><Server size={24} /></span>
              <div>
                <div className="cm-kpi-label">Backend Railway</div>
                <span className="cm-kpi-val">{conexion?.api || (casos ? 'ok' : '...')}</span>
                <small>Verificado {formatDateTime(conexion?.fecha_hora)}</small>
              </div>
            </div>
            <div className="cm-kpi" style={{ borderLeftColor: '#00a9a5' }}>
              <span className="cm-kpi-ico" style={{ background: '#e6f7f6', color: '#00a9a5' }}><Database size={24} /></span>
              <div>
                <div className="cm-kpi-label">Base de datos</div>
                <span className="cm-kpi-val">{conexion?.bd_core_mobile || 'verificando'}</span>
                <small>bd_core_mobile + sync_outbox</small>
              </div>
            </div>
            <div className="cm-kpi" style={{ borderLeftColor: '#f7941e' }}>
              <span className="cm-kpi-ico" style={{ background: '#fef3e2', color: '#f7941e' }}><FileText size={24} /></span>
              <div>
                <div className="cm-kpi-label">Casos PDF</div>
                <span className="cm-kpi-val">{casos?.total_casos || 30}</span>
                <small>24 desembolsados, 3 condicionados, 3 rechazados</small>
              </div>
            </div>
            <div className="cm-kpi" style={{ borderLeftColor: '#8e24aa' }}>
              <span className="cm-kpi-ico" style={{ background: '#f3e6f7', color: '#8e24aa' }}><TrendingUp size={24} /></span>
              <div>
                <div className="cm-kpi-label">Monto aprobado</div>
                <span className="cm-kpi-val" style={{ fontSize: 20 }}><Money value={casos?.monto_aprobado || 0} /></span>
                <small>sobre el catálogo completo</small>
              </div>
            </div>
          </div>

          <h2 className="cm-section-title">Accesos rápidos</h2>
          <div className="cm-quick-grid">
            {ACCESOS.map((a) => {
              const Icon = a.icon
              return (
                <button key={a.to} className="cm-quick" onClick={() => navigate(a.to)}>
                  <span className="cm-quick-ico" style={{ background: `${a.color}1a`, color: a.color }}>
                    <Icon size={24} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <h3>{a.t}</h3>
                    <p>{a.d}</p>
                  </div>
                  <ArrowRight size={18} color="#9ca3af" />
                </button>
              )
            })}
          </div>

          {pendientes > 0 && (
            <Card title="Próxima visita prioritaria" icon={AlertTriangle} style={{ marginTop: 22 }}>
              {(() => {
                const top = [...cartera]
                  .filter((c) => c.estado_visita === 'pendiente')
                  .sort((a, b) => (b.score_prioridad || 0) - (a.score_prioridad || 0))[0]
                if (!top) return null
                return (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                    <div>
                      <strong style={{ fontSize: 16 }}>{top.cliente_nombre}</strong>
                      <div style={{ color: 'var(--hb-muted)', fontSize: 13 }}>
                        DNI {top.documento} · Prioridad {top.prioridad} (score {top.score_prioridad})
                      </div>
                    </div>
                    <button className="hb-btn" onClick={() => navigate('/cartera')}>
                      Ir a la cartera <ArrowRight size={16} />
                    </button>
                  </div>
                )
              })()}
            </Card>
          )}
        </>
      )}
    </>
  )
}
