// components/Termometro/TermometroForm.tsx
'use client'

import { useEffect, useState } from 'react'
import Select from 'react-select'
import Modal from 'react-modal'
import Confetti from 'react-confetti'
import { sections, Section } from './Sections'
import Sidebar from './Sidebar'
import { calculateVisaScore } from '../../utils/scoreCalculator'
import { getRecommendation, Recommendation } from '../../utils/recommendations'
import AddressAutocomplete from '../AddressAutocomplete'
import { OPCIONES_PAISES } from '../../utils/countryOptions'
import { US_STATES } from '../../utils/usStates'


type FormDataType = Record<string, string>
const initialState: FormDataType = sections
  .flatMap(s => s.questions)
  .reduce((acc, q) => {
    if (q.id === 'nationality' || q.id === 'birthCountry') {
      return { ...acc, [q.id]: 'DO' }
    }
    return { ...acc, [q.id]: '' }
  }, {} as FormDataType)

export default function TermometroForm() {
  // ─── Estados básicos ────────────────────────────────────────────
  const [sectionIndex, setSectionIndex] = useState(0)
  const [formData, setFormData] = useState<FormDataType>(initialState)
  const [modalOpen, setModalOpen] = useState(false)
  const [result, setResult] = useState(0)
  const [rec, setRec] = useState<Recommendation | null>(null)

  // ─── Estados de validación ──────────────────────────────────────
  const [idValid, setIdValid] = useState<boolean | null>(null)
  const [idError, setIdError] = useState<string>('')
  const [birthValid, setBirthValid] = useState<boolean | null>(null)
  const [birthError, setBirthError] = useState<string>('')
  const [departureValid, setDepartureValid] = useState<boolean | null>(null)
  const [departureError, setDepartureError] = useState<string>('')
  const [returnValid, setReturnValid] = useState<boolean | null>(null)
  const [returnError, setReturnError] = useState<string>('')

  // ─── Validaciones de texto ───────────────────────────────────────
  const [firstNameValid, setFirstNameValid] = useState<boolean | null>(null)
  const [firstNameError, setFirstNameError] = useState<string>('')
  const [lastNameValid, setLastNameValid] = useState<boolean | null>(null)
  const [lastNameError, setLastNameError] = useState<string>('')
  const [sponsorValid, setSponsorValid] = useState<boolean | null>(null)
  const [sponsorError, setSponsorError] = useState<string>('')

  // ─── Setup Modal ──────────────────────────────────────────────────
  useEffect(() => {
    Modal.setAppElement('body')
  }, [])

  // ─── onChange genérico ────────────────────────────────────────────
  const onChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }))
    switch (id) {
      case 'ID': setIdValid(null); setIdError(''); break
      case 'birth': setBirthValid(null); setBirthError(''); break
      case 'departureDate':
        setDepartureValid(null); setDepartureError('')
        setReturnValid(null); setReturnError('')
        break
      case 'returnDate': setReturnValid(null); setReturnError(''); break
      case 'firstName': setFirstNameValid(null); setFirstNameError(''); break
      case 'lastName': setLastNameValid(null); setLastNameError(''); break
      case 'namewhoPays': setSponsorValid(null); setSponsorError(''); break
    }
  }

  // ─── Validaciones individuales ────────────────────────────────────
  const validateCedula = async () => {
    const ced = formData.ID.trim()
    if (!ced) return
    try {
      const res = await fetch(`/api/validateCedula?id=${encodeURIComponent(ced)}`)
      const data = await res.json()
      if (!res.ok || !data.valid) {
        setIdValid(false)
        setIdError(data.error || 'Cédula inválida')
      } else {
        setIdValid(true)
      }
    } catch {
      setIdValid(false)
      setIdError('No se pudo validar cédula')
    }
  }

  const validateBirth = () => {
    const val = formData.birth
    if (!val) return
    const today = new Date(), dob = new Date(val)
    let age = today.getFullYear() - dob.getFullYear()
    const m = today.getMonth() - dob.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--
    if (age < 18) {
      setBirthValid(false)
      setBirthError('Debes tener al menos 18 años')
    } else {
      setBirthValid(true)
    }
  }

  const validateDeparture = () => {
    const val = formData.departureDate
    if (!val) return
    const today = new Date()
    const limit = new Date(today); limit.setMonth(limit.getMonth() + 6)
    if (new Date(val) < limit) {
      setDepartureValid(false)
      setDepartureError('Estimado de cita disponible: 6 meses')
    } else {
      setDepartureValid(true)
    }
  }

  const validateReturn = () => {
    const retVal = formData.returnDate
    const depVal = formData.departureDate
    if (!retVal || !depVal) return
  
    const dep = new Date(depVal)
    const ret = new Date(retVal)
  
    // 1) Si es anterior al inicio
    if (ret < dep) {
      setReturnValid(false)
      setReturnError('La fecha no puede ser anterior a la de inicio')
      return
    }
  
    // 2) Luego comprobamos el máximo de +6 meses
    const limit = new Date(dep)
    limit.setMonth(limit.getMonth() + 6)
    if (ret > limit) {
      setReturnValid(false)
      setReturnError('La fecha de regreso no puede superar los 6 meses tras el inicio')
    } else {
      setReturnValid(true)
    }
  }
  

  const validateTextField = (id: 'firstName' | 'lastName' | 'namewhoPays') => {
    const val = formData[id].trim()
    const ok = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]+$/.test(val) && val.length >= 2
    if (!ok) {
      const err =
        id === 'firstName' ? 'Nombre inválido'
        : id === 'lastName'  ? 'Apellido inválido'
        :                      'Nombre de patrocinador inválido'
      if (id === 'firstName') { setFirstNameValid(false); setFirstNameError(err) }
      if (id === 'lastName')  { setLastNameValid(false);  setLastNameError(err) }
      if (id === 'namewhoPays') { setSponsorValid(false); setSponsorError(err) }
    } else {
      if (id === 'firstName') setFirstNameValid(true)
      if (id === 'lastName')  setLastNameValid(true)
      if (id === 'namewhoPays') setSponsorValid(true)
    }
  }

  // ─── Calcular y mostrar Modal ──────────────────────────────────────
  const handleCalculate = () => {
    const score = calculateVisaScore(formData)
    setResult(score)
    setRec(getRecommendation(score))
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSectionIndex(sections.length - 1)
  }

  const handleRestart = () => {
    setFormData(initialState)
    setResult(0); setRec(null); setModalOpen(false)
    setSectionIndex(0)
    setIdValid(null); setBirthValid(null)
    setDepartureValid(null); setReturnValid(null)
    setFirstNameValid(null); setLastNameValid(null); setSponsorValid(null)
    setIdError(''); setBirthError(''); setDepartureError(''); setReturnError('')
    setFirstNameError(''); setLastNameError(''); setSponsorError('')
  }

  const noErrors = [
    idValid, birthValid, departureValid, returnValid,
    firstNameValid, lastNameValid, sponsorValid
  ].every(v => v !== false)

  // ─── Estilos inline para Modal ────────────────────────────────────
  const modalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
    },
    content: {
      top: '20%', left: '50%', transform: 'translateX(-50%)',
      width: '350px', height: '175px', padding: 0,
      borderRadius: '8px', overflow: 'visible', zIndex: 1001,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    },
  }

  // ─── Sección de resumen final ─────────────────────────────────────
  if (sectionIndex === sections.length - 1) {
    return (
      <>
        <div className="max-w-6xl mx-auto mt-10 mb-10 bg-white rounded-2xl shadow-lg overflow-visible flex lg:flex-row flex-col">
          <Sidebar sections={sections} currentSectionIndex={sectionIndex} />
          <main className="w-full lg:w-2/3 p-8">
            <h2 className="text-2xl font-bold mb-6">
              {sections[sectionIndex].title}
            </h2>
            <p className="mb-4 text-lg">
              Tu probabilidad estimada de aprobación es del <strong>{result}%</strong>.
            </p>
            {rec && (
              <div className="mt-6 text-left">
                <h3 className="text-xl font-semibold mb-2">{rec.title}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {rec.tips.map((tip,i) => <li key={i}>{tip}</li>)}
                </ul>
              </div>
            )}
            <button
              onClick={handleRestart}
              className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Empezar de Nuevo
            </button>
          </main>
        </div>

        {/* confetti full-screen */}
        {!modalOpen && result > 80 && (
          <Confetti
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
            style={{
              position: 'fixed', top: 0, left: 0,
              width: '100vw', height: '100vh',
              pointerEvents: 'none', zIndex: 999
            }}
          />
        )}
      </>
    )
  }

  // ─── Render formulario secciones 0–N-1 ─────────────────────────────
  const current = sections[sectionIndex]
  const visible = current.questions.filter(q => !q.condition || q.condition(formData))
  const isComplete = visible.every(q => formData[q.id] !== '')

  return (
    <>
      <div className="max-w-6xl mx-auto mt-35 mb-10 bg-white rounded-2xl shadow-lg overflow-visible flex lg:flex-row flex-col">
        <Sidebar sections={sections} currentSectionIndex={sectionIndex} />
        <main className="w-full lg:w-2/3 p-8">
          <h2 className="text-2xl font-bold mb-6">{current.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visible.map(q => {
              // — Nombre
              if (q.id === 'firstName') {
                return (
                  <div key="firstName">
                    <label htmlFor="firstName" className="block mb-1 font-medium">
                      {q.label}
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={e => onChange('firstName', e.target.value)}
                      onBlur={() => validateTextField('firstName')}
                      className="border rounded p-2 w-full"
                    />
                    {firstNameValid === false && (
                      <p className="mt-1 text-red-600">{firstNameError}</p>
                    )}
                  </div>
                )
              }

              // — Apellido
              if (q.id === 'lastName') {
                return (
                  <div key="lastName">
                    <label htmlFor="lastName" className="block mb-1 font-medium">
                      {q.label}
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={e => onChange('lastName', e.target.value)}
                      onBlur={() => validateTextField('lastName')}
                      className="border rounded p-2 w-full"
                    />
                    {lastNameValid === false && (
                      <p className="mt-1 text-red-600">{lastNameError}</p>
                    )}
                  </div>
                )
              }

              // — Cédula
              if (q.id === 'ID') {
                return (
                  <div key="ID">
                    <label htmlFor="ID" className="block mb-1 font-medium">
                      {q.label}
                    </label>
                    <input
                      id="ID"
                      type="text"
                      value={formData.ID}
                      onChange={e => onChange('ID', e.target.value)}
                      onBlur={validateCedula}
                      className="border rounded p-2 w-full"
                    />
                    {idValid === false && (
                      <p className="mt-1 text-red-600">{idError}</p>
                    )}
                  </div>
                )
              }

              // — Fecha nacimiento
              if (q.id === 'birth') {
                return (
                  <div key="birth">
                    <label htmlFor="birth" className="block mb-1 font-medium">
                      {q.label}
                    </label>
                    <input
                      id="birth"
                      type="date"
                      value={formData.birth}
                      onChange={e => onChange('birth', e.target.value)}
                      onBlur={validateBirth}
                      className="border rounded p-2 w-full"
                    />
                    {birthValid === false && (
                      <p className="mt-1 text-red-600">{birthError}</p>
                    )}
                  </div>
                )
              }

              // — select genéricos: estadocivil, Sex, etc.
              if (q.options && ['estadocivil','Sex','whoPays','contactInUSA'].includes(q.id)) {
                return (
                  <div key={q.id}>
                    <label className="block mb-1 font-medium">{q.label}</label>
                    <select
                      id={q.id}
                      value={formData[q.id]}
                      onChange={e => onChange(q.id, e.target.value)}
                      className="border rounded p-2 w-full"
                    >
                      <option value="" disabled>– Seleccione –</option>
                      {q.options!.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )
              }

              // — React Select para países
              if (q.id === 'nationality' || q.id === 'birthCountry') {
                const sel = OPCIONES_PAISES.find(o => o.value === formData[q.id]) || null
                return (
                  <div key={q.id}>
                    <label className="block mb-1 font-medium">{q.label}</label>
                    <Select
                      options={OPCIONES_PAISES}
                      value={sel}
                      onChange={opt => onChange(q.id, opt?.value||'')}
                      isClearable
                      placeholder="Busca o selecciona…"
                      styles={{ container: base=>({ ...base, width:'100%' }) }}
                    />
                  </div>
                )
              }

              // — Fecha inicio
              if (q.id === 'departureDate') {
                return (
                  <div key="departureDate">
                    <label className="block mb-1 font-medium">{q.label}</label>
                    <input
                      id="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={e => onChange('departureDate', e.target.value)}
                      onBlur={validateDeparture}
                      className="border rounded p-2 w-full"
                    />
                    {departureValid === false && (
                      <p className="mt-1 text-red-600">{departureError}</p>
                    )}
                  </div>
                )
              }

              // — Fecha regreso (bloqueado y min dinámico)
              if (q.id === 'returnDate') {
                return (
                  <div key="returnDate">
                    <label className="block mb-1 font-medium">{q.label}</label>
                    <input
                      id="returnDate"
                      type="date"
                      value={formData.returnDate}
                      min={formData.departureDate||undefined}
                      disabled={!formData.departureDate}
                      onChange={e=>onChange('returnDate',e.target.value)}
                      onBlur={validateReturn}
                      className={`border rounded p-2 w-full ${
                        !formData.departureDate?'bg-gray-100 cursor-not-allowed':''
                      }`}
                    />
                    {returnValid===false &&(
                      <p className="mt-1 text-red-600">{returnError}</p>
                    )}
                  </div>
                )
              }

              // — Dirección USA (Autocomplete)
              if (q.id==='LocationUSA') {
                return (
                  <div key="LocationUSA" className="relative">
                    <label className="block mb-1 font-medium">{q.label}</label>
                    <AddressAutocomplete
                      value={formData.LocationUSA}
                      onChange={val=>onChange('LocationUSA',val)}
                      onSelect={info=>{
                        onChange('LocationUSA',info.formattedAddress)
                        setFormData(prev=>({
                          ...prev,
                          zipCode: info.zipCode,
                          State: info.stateCode
                        }))
                      }}
                    />
                  </div>
                )
              }

              // — Estado (US_STATES)
              if (q.id==='State') {
                return (
                  <div key="State">
                    <label className="block mb-1 font-medium">{q.label}</label>
                    <select
                      id="State"
                      value={formData.State}
                      onChange={e=>onChange('State',e.target.value)}
                      className="border rounded p-2 w-full"
                    >
                      <option value="" disabled>– Seleccione –</option>
                      {US_STATES.map(s=>(
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                )
              }

              // — radio-horizontal
              if (q.type==='radio-horizontal') {
                return (
                  <div key={q.id} className="col-span-2">
                    <p className="mb-2 font-medium">{q.label}</p>
                    <div className="flex gap-4">
                      {q.options!.map(opt=>(
                        <label key={opt} className="inline-flex items-center gap-2">
                          <input
                            type="radio"
                            name={q.id}
                            value={opt}
                            checked={formData[q.id]===opt}
                            onChange={()=>onChange(q.id,opt)}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                )
              }

              // — cualquier otro select
              if (q.options) {
                return (
                  <div key={q.id}>
                    <label className="block mb-1 font-medium">{q.label}</label>
                    <select
                      id={q.id}
                      value={formData[q.id]}
                      onChange={e=>onChange(q.id,e.target.value)}
                      className="border rounded p-2 w-full"
                    >
                      <option value="" disabled>– Seleccione –</option>
                      {q.options!.map(opt=>(
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )
              }

              // — por defecto, input de texto
              return (
                <div key={q.id}>
                  <label className="block mb-1 font-medium">{q.label}</label>
                  <input
                    id={q.id}
                    type="text"
                    value={formData[q.id]}
                    onChange={e=>onChange(q.id,e.target.value)}
                    className="border rounded p-2 w-full"
                  />
                </div>
              )
            })}
          </div>

          {/* navegación */}
          <div className="flex justify-between pt-6 border-t mt-6">
            <button
              onClick={()=>setSectionIndex(i=>Math.max(0,i-1))}
              disabled={sectionIndex===0}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            >
              Atrás
            </button>
            {sectionIndex < sections.length - 2 ? (
              <button
                onClick={()=>setSectionIndex(i=>i+1)}
                disabled={!isComplete||!noErrors}
                className={`px-6 py-2 text-white rounded ${
                  isComplete&&noErrors
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Continuar
              </button>
            ) : (
              <button
                onClick={handleCalculate}
                disabled={!isComplete||!noErrors}
                className={`px-6 py-2 text-white rounded ${
                  isComplete&&noErrors
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Calcular
              </button>
            )}
          </div>
        </main>
      </div>

      {/* confetti en popup */}
      {modalOpen && result > 80 && (
        <Confetti
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          style={{
            position:'fixed',top:0,left:0,
            width:'100vw',height:'100vh',
            pointerEvents:'none',zIndex:999
          }}
        />
      )}

      {/* modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick
        style={modalStyles}
        ariaHideApp={false}
      >
        <div className="flex flex-col items-center text-center px-4">
          <h2 className="text-2xl font-bold mb-2">¡Resultado!</h2>
          <p className={`text-6xl font-extrabold mb-2 ${
            result>80 ? 'text-blue-600' : 'text-red-600'
          }`}>
            {result}%
          </p>
          {result>80 ? (
            <p className="text-lg">🎉 ¡Increíble! Tu probabilidad es alta.</p>
          ) : (
            <p className="text-lg">😢 Lo siento. Tu probabilidad es baja.</p>
          )}
        </div>
      </Modal>
    </>
  )
}
