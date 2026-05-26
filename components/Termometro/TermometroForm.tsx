// components/Termometro/TermometroForm.tsx
'use client'

import { useState } from 'react'
import Select from 'react-select'
import Confetti from 'react-confetti'
import { sections } from './Sections'
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
  const [sectionIndex, setSectionIndex] = useState(0)
  const [formData, setFormData] = useState<FormDataType>(initialState)
  const [result, setResult] = useState(0)
  const [rec, setRec] = useState<Recommendation | null>(null)

  const [idValid, setIdValid] = useState<boolean | null>(null)
  const [idError, setIdError] = useState('')
  const [birthValid, setBirthValid] = useState<boolean | null>(null)
  const [birthError, setBirthError] = useState('')
  const [departureValid, setDepartureValid] = useState<boolean | null>(null)
  const [departureError, setDepartureError] = useState('')
  const [returnValid, setReturnValid] = useState<boolean | null>(null)
  const [returnError, setReturnError] = useState('')
  const [firstNameValid, setFirstNameValid] = useState<boolean | null>(null)
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameValid, setLastNameValid] = useState<boolean | null>(null)
  const [lastNameError, setLastNameError] = useState('')
  const [sponsorValid, setSponsorValid] = useState<boolean | null>(null)
  const [sponsorError, setSponsorError] = useState('')
  const [emailValid, setEmailValid] = useState<boolean | null>(null)
  const [emailError, setEmailError] = useState('')

  const onChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }))
    switch (id) {
      case 'ID':           setIdValid(null);        setIdError('');        break
      case 'birth':        setBirthValid(null);      setBirthError('');     break
      case 'departureDate':
        setDepartureValid(null); setDepartureError('')
        setReturnValid(null);    setReturnError('')
        break
      case 'returnDate':   setReturnValid(null);     setReturnError('');    break
      case 'firstName':    setFirstNameValid(null);  setFirstNameError(''); break
      case 'lastName':     setLastNameValid(null);   setLastNameError('');  break
      case 'namewhoPays':  setSponsorValid(null);    setSponsorError('');   break
      case 'email':        setEmailValid(null);      setEmailError('');     break
    }
  }

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
    const limit = new Date(today)
    limit.setMonth(limit.getMonth() + 6)
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
    if (ret < dep) {
      setReturnValid(false)
      setReturnError('La fecha no puede ser anterior a la de inicio')
      return
    }
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
    const err =
      id === 'firstName' ? 'Nombre inválido'
      : id === 'lastName' ? 'Apellido inválido'
      : 'Nombre de patrocinador inválido'
    if (!ok) {
      if (id === 'firstName')    { setFirstNameValid(false); setFirstNameError(err) }
      if (id === 'lastName')     { setLastNameValid(false);  setLastNameError(err) }
      if (id === 'namewhoPays')  { setSponsorValid(false);   setSponsorError(err) }
    } else {
      if (id === 'firstName')   setFirstNameValid(true)
      if (id === 'lastName')    setLastNameValid(true)
      if (id === 'namewhoPays') setSponsorValid(true)
    }
  }

  const validateEmail = () => {
    const val = formData.email.trim()
    if (!val) return
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    if (!ok) {
      setEmailValid(false)
      setEmailError('Correo electrónico inválido')
    } else {
      setEmailValid(true)
    }
  }

  const handleCalculate = async () => {
    const score = calculateVisaScore(formData)
    setResult(score)
    setRec(getRecommendation(score))
    setSectionIndex(sections.length - 1)
    try {
      await fetch('/api/termometro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, formData }),
      })
    } catch { /* non-blocking */ }
  }

  const handleRestart = () => {
    setFormData(initialState)
    setResult(0); setRec(null)
    setSectionIndex(0)
    setIdValid(null); setBirthValid(null)
    setDepartureValid(null); setReturnValid(null)
    setFirstNameValid(null); setLastNameValid(null)
    setSponsorValid(null); setEmailValid(null)
    setIdError(''); setBirthError(''); setDepartureError(''); setReturnError('')
    setFirstNameError(''); setLastNameError(''); setSponsorError(''); setEmailError('')
  }

  const noErrors = [
    idValid, birthValid, departureValid, returnValid,
    firstNameValid, lastNameValid, sponsorValid, emailValid,
  ].every(v => v !== false)

  if (sectionIndex === sections.length - 1) {
    const isHigh  = result >= 75
    const isMid   = result >= 50
    const ringCls = isHigh ? 'bg-green-500' : isMid ? 'bg-yellow-500' : 'bg-red-500'
    const barCls  = isHigh ? 'bg-green-500' : isMid ? 'bg-yellow-500' : 'bg-red-500'
    const label   = isHigh
      ? '¡Excelente! Alta probabilidad de aprobación'
      : isMid ? 'Probabilidad media – estás cerca'
      : 'Probabilidad baja – necesitas mejorar'

    return (
      <>
        <div className="max-w-6xl mx-auto mt-10 mb-10 bg-white rounded-2xl shadow-lg overflow-visible flex lg:flex-row flex-col">
          <Sidebar sections={sections} currentSectionIndex={sectionIndex} />
          <main className="w-full lg:w-2/3 p-8">
            <h2 className="text-2xl font-bold mb-8 text-center">{sections[sectionIndex].title}</h2>
            <div className="flex flex-col items-center mb-6">
              <div className={`w-36 h-36 rounded-full flex items-center justify-center text-white text-5xl font-extrabold shadow-lg mb-4 ${ringCls}`}>
                {result}%
              </div>
              <p className="text-lg font-semibold text-gray-700 text-center">{label}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
              <div className={`h-4 rounded-full transition-all duration-1000 ${barCls}`} style={{ width: `${result}%` }} />
            </div>
            {rec && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">{rec.title}</h3>
                <ul className="space-y-3">
                  {rec.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${ringCls}`}>{i + 1}</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-center">
              <button onClick={handleRestart} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                Empezar de Nuevo
              </button>
            </div>
          </main>
        </div>
        {result > 80 && (
          <Confetti recycle={false} numberOfPieces={250} gravity={0.3}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 999 }} />
        )}
      </>
    )
  }

  const current = sections[sectionIndex]
  const visible = current.questions.filter(q => !q.condition || q.condition(formData))
  const isComplete = visible.every(q => formData[q.id] !== '')
  const progress = Math.round(((sectionIndex + 1) / sections.length) * 100)

  return (
    <div className="max-w-6xl mx-auto mt-35 mb-10 bg-white rounded-2xl shadow-lg overflow-visible flex lg:flex-row flex-col">
      <Sidebar sections={sections} currentSectionIndex={sectionIndex} />
      <main className="w-full lg:w-2/3 p-8">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Sección {sectionIndex + 1} de {sections.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6">{current.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map(q => {
            if (q.id === 'firstName') return (
              <div key="firstName">
                <label htmlFor="firstName" className="block mb-1 font-medium">{q.label}</label>
                <input id="firstName" type="text" value={formData.firstName}
                  onChange={e => onChange('firstName', e.target.value)}
                  onBlur={() => validateTextField('firstName')} className="border rounded p-2 w-full" />
                {firstNameValid === false && <p className="mt-1 text-red-600 text-sm">{firstNameError}</p>}
              </div>
            )
            if (q.id === 'lastName') return (
              <div key="lastName">
                <label htmlFor="lastName" className="block mb-1 font-medium">{q.label}</label>
                <input id="lastName" type="text" value={formData.lastName}
                  onChange={e => onChange('lastName', e.target.value)}
                  onBlur={() => validateTextField('lastName')} className="border rounded p-2 w-full" />
                {lastNameValid === false && <p className="mt-1 text-red-600 text-sm">{lastNameError}</p>}
              </div>
            )
            if (q.id === 'email') return (
              <div key="email">
                <label htmlFor="email" className="block mb-1 font-medium">{q.label}</label>
                <input id="email" type="email" value={formData.email}
                  onChange={e => onChange('email', e.target.value)}
                  onBlur={validateEmail} className="border rounded p-2 w-full" />
                {emailValid === false && <p className="mt-1 text-red-600 text-sm">{emailError}</p>}
              </div>
            )
            if (q.id === 'ID') return (
              <div key="ID">
                <label htmlFor="ID" className="block mb-1 font-medium">{q.label}</label>
                <input id="ID" type="text" value={formData.ID}
                  onChange={e => onChange('ID', e.target.value)}
                  onBlur={validateCedula} className="border rounded p-2 w-full" />
                {idValid === false && <p className="mt-1 text-red-600 text-sm">{idError}</p>}
              </div>
            )
            if (q.id === 'birth') return (
              <div key="birth">
                <label htmlFor="birth" className="block mb-1 font-medium">{q.label}</label>
                <input id="birth" type="date" value={formData.birth}
                  onChange={e => onChange('birth', e.target.value)}
                  onBlur={validateBirth} className="border rounded p-2 w-full" />
                {birthValid === false && <p className="mt-1 text-red-600 text-sm">{birthError}</p>}
              </div>
            )
            if (q.options && ['estadocivil', 'Sex', 'whoPays', 'contactInUSA'].includes(q.id)) return (
              <div key={q.id}>
                <label className="block mb-1 font-medium">{q.label}</label>
                <select id={q.id} value={formData[q.id]} onChange={e => onChange(q.id, e.target.value)} className="border rounded p-2 w-full">
                  <option value="" disabled>– Seleccione –</option>
                  {q.options!.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            )
            if (q.id === 'nationality' || q.id === 'birthCountry') {
              const sel = OPCIONES_PAISES.find(o => o.value === formData[q.id]) || null
              return (
                <div key={q.id}>
                  <label className="block mb-1 font-medium">{q.label}</label>
                  <Select options={OPCIONES_PAISES} value={sel}
                    onChange={opt => onChange(q.id, opt?.value || '')}
                    isClearable placeholder="Busca o selecciona…"
                    styles={{ container: base => ({ ...base, width: '100%' }) }} />
                </div>
              )
            }
            if (q.id === 'departureDate') return (
              <div key="departureDate">
                <label className="block mb-1 font-medium">{q.label}</label>
                <input id="departureDate" type="date" value={formData.departureDate}
                  onChange={e => onChange('departureDate', e.target.value)}
                  onBlur={validateDeparture} className="border rounded p-2 w-full" />
                {departureValid === false && <p className="mt-1 text-red-600 text-sm">{departureError}</p>}
              </div>
            )
            if (q.id === 'returnDate') return (
              <div key="returnDate">
                <label className="block mb-1 font-medium">{q.label}</label>
                <input id="returnDate" type="date" value={formData.returnDate}
                  min={formData.departureDate || undefined}
                  disabled={!formData.departureDate}
                  onChange={e => onChange('returnDate', e.target.value)}
                  onBlur={validateReturn}
                  className={`border rounded p-2 w-full ${!formData.departureDate ? 'bg-gray-100 cursor-not-allowed' : ''}`} />
                {returnValid === false && <p className="mt-1 text-red-600 text-sm">{returnError}</p>}
              </div>
            )
            if (q.id === 'namewhoPays') return (
              <div key="namewhoPays">
                <label className="block mb-1 font-medium">{q.label}</label>
                <input id="namewhoPays" type="text" value={formData.namewhoPays}
                  onChange={e => onChange('namewhoPays', e.target.value)}
                  onBlur={() => validateTextField('namewhoPays')} className="border rounded p-2 w-full" />
                {sponsorValid === false && <p className="mt-1 text-red-600 text-sm">{sponsorError}</p>}
              </div>
            )
            if (q.id === 'LocationUSA') return (
              <div key="LocationUSA" className="relative">
                <label className="block mb-1 font-medium">{q.label}</label>
                <AddressAutocomplete value={formData.LocationUSA}
                  onChange={val => onChange('LocationUSA', val)}
                  onSelect={info => {
                    onChange('LocationUSA', info.formattedAddress)
                    setFormData(prev => ({ ...prev, zipCode: info.zipCode, State: info.stateCode }))
                  }} />
              </div>
            )
            if (q.id === 'State') return (
              <div key="State">
                <label className="block mb-1 font-medium">{q.label}</label>
                <select id="State" value={formData.State} onChange={e => onChange('State', e.target.value)} className="border rounded p-2 w-full">
                  <option value="" disabled>– Seleccione –</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )
            if (q.type === 'radio-horizontal') return (
              <div key={q.id} className="col-span-2">
                <p className="mb-2 font-medium">{q.label}</p>
                <div className="flex gap-4">
                  {q.options!.map(opt => (
                    <label key={opt} className="inline-flex items-center gap-2">
                      <input type="radio" name={q.id} value={opt}
                        checked={formData[q.id] === opt} onChange={() => onChange(q.id, opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            )
            if (q.options) return (
              <div key={q.id}>
                <label className="block mb-1 font-medium">{q.label}</label>
                <select id={q.id} value={formData[q.id]} onChange={e => onChange(q.id, e.target.value)} className="border rounded p-2 w-full">
                  <option value="" disabled>– Seleccione –</option>
                  {q.options!.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            )
            return (
              <div key={q.id}>
                <label className="block mb-1 font-medium">{q.label}</label>
                <input id={q.id} type="text" value={formData[q.id]}
                  onChange={e => onChange(q.id, e.target.value)} className="border rounded p-2 w-full" />
              </div>
            )
          })}
        </div>
        <div className="flex justify-between pt-6 border-t mt-6">
          <button onClick={() => setSectionIndex(i => Math.max(0, i - 1))} disabled={sectionIndex === 0}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded disabled:opacity-50">Atrás</button>
          {sectionIndex < sections.length - 2 ? (
            <button onClick={() => setSectionIndex(i => i + 1)} disabled={!isComplete || !noErrors}
              className={`px-6 py-2 text-white rounded ${isComplete && noErrors ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}>
              Continuar
            </button>
          ) : (
            <button onClick={handleCalculate} disabled={!isComplete || !noErrors}
              className={`px-6 py-2 text-white rounded ${isComplete && noErrors ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}>
              Calcular
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
