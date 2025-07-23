// components/Termometro/Sections.ts

// 1) Estados de EE.UU.
import { US_STATES } from '../../utils/usStates'

// 2) Constantes y tipos reutilizables
import {
  YES_NO,
  GENDERS,
  CIVIL_STATUS,
  LODGING_OPTIONS,
  RELATIONS,
  EDUCATION_LEVELS,
  YesNo,
  Gender,
  EstadoCivil,
  Lodging,
  Relation,
  EducationLevel,
} from './Sections.constants'

// 3) Tipos genéricos para preguntas y secciones
export type QuestionType = 'text' | 'date' | 'select' | 'radio-horizontal' | 'country'

export interface Question {
  id: string
  label: string
  type: QuestionType
  options?: readonly string[]
  weight: number
  condition?: (form: Record<string, string>) => boolean
}

export interface Section {
  id: number
  title: string
  questions: Question[]
}

// 4) Definición completa de las secciones
export const sections: Section[] = [
  // 1. Datos Personales
  {
    id: 1,
    title: 'Datos Personales',
    questions: [
      { id: 'firstName',    label: 'Nombre Completo',              type: 'text',   weight: 1 },
      { id: 'lastName',     label: 'Apellido Completo',            type: 'text',   weight: 1 },
      { id: 'email',        label: 'Correo Electrónico',           type: 'text',   weight: 2 },
      { id: 'cellphone',    label: 'Celular',                      type: 'text',   weight: 2 },
      { id: 'ID',           label: 'Cédula de Identidad Nacional', type: 'text',   weight: 3 },
      { id: 'birth',        label: 'Fecha de Nacimiento',          type: 'date',   weight: 3 },
      { id: 'estadocivil',  label: 'Estado Civil',                 type: 'select', options: CIVIL_STATUS,  weight: 2 },
      { id: 'Sex',          label: 'Sexo',                         type: 'select', options: GENDERS,       weight: 1 },
      { id: 'nationality',  label: 'Nacionalidad',                 type: 'country',                     weight: 3 },
      { id: 'birthCountry', label: 'País de Nacimiento',           type: 'country',                     weight: 3 },
    ],
  },

  // 2. Contacto Migratorio
  {
    id: 2,
    title: 'Contacto Migratorio',
    questions: [
      { id: 'departureDate', label: 'Fecha de Inicio del Viaje',    type: 'date',   weight: 4 },
      { id: 'returnDate',    label: 'Fecha de Regreso',             type: 'date',   weight: 4 },
      {
        id:      'whoPays',
        label:   '¿Quién costea el viaje?',
        type:    'select',
        options: ['Yo','Familiar','Empresa','Otro'],
        weight:  2
      },
      {
        id:        'namewhoPays',
        label:     'Nombre del Patrocinador',
        type:      'text',
        weight:    2,
        condition: f => ['Familiar','Empresa','Otro'].includes(f.whoPays)
      },
      {
        id:      'contactInUSA',
        label:   '¿Dónde se quedará?',
        type:    'select',
        options: LODGING_OPTIONS,
        weight:  3
      },
      {
        id:        'LocationUSA',
        label:     'Dirección',
        type:      'text',
        weight:    3,
        condition: f => LODGING_OPTIONS.includes(f.contactInUSA as Lodging)
      },
      {
        id:        'State',
        label:     'Estado (EE.UU.)',
        type:      'select',
        options:   US_STATES,
        weight:    2,
        condition: f => LODGING_OPTIONS.includes(f.contactInUSA as Lodging)
      },
      {
        id: 'zipCode',
        label: 'Código Postal',
        type: 'text',
        weight: 2,
        condition: f => LODGING_OPTIONS.includes(f.contactInUSA as Lodging),
      }
      
    ],
  },

  // 3. Información Familiar
  {
    id: 3,
    title: 'Información Familiar',
    questions: [
      { id: 'fatherInfo',    label: 'Padre Nombre Completo',      type: 'text',   weight: 1 },
      { id: 'motherInfo',    label: 'Madre Nombre Completo',      type: 'text',   weight: 1 },
      {
        id:        'wife',
        label:     'Nombre de su Esposa/o',
        type:      'text',
        weight:    2,
        condition: f => f.estadocivil === 'Casado/a'
      },
      {
        id:      'travelsWith',
        label:   '¿Viaja con alguien más?',
        type:    'select',
        options: RELATIONS,
        weight:  2
      },
      {
        id:        'nameCompagnion',
        label:     'Nombre de acompañante',
        type:      'text',
        weight:    2,
        condition: f => f.travelsWith !== 'No',
      },
      { 
        id: 'son',      
        label: '¿Tiene Hijos?',              
        type: 'select',
        options: YES_NO, weight: 2 
      },
      {
        id:        'sonName',
        label:     'Nombre del Hijo',
        type:      'text',
        weight:    2,
        condition: f => f.son === 'Si'
      },
      {
        id:        'numberofSons',
        label:     'Cantidad de Hijos',
        type:      'select',
        options:   ['1','2','3','Más de 3'],
        weight:    2,
        condition: f => f.son === 'Si'
      },
      { id: 'vehicle',       label: '¿Tiene vehículo propio?',     type: 'select', options: YES_NO, weight: 2 },
      {
        id:        'vehicleBrand',
        label:     'Marca',
        type:      'text',
        weight:    2,
        condition: f => f.vehicle === 'Si'
      },
      {
        id:        'vehicleModel',
        label:     'Modelo',
        type:      'text',
        weight:    2,
        condition: f => f.vehicle === 'Si'
      },
      {
        id:        'vehicleYear',
        label:     'Año',
        type:      'text',
        weight:    2,
        condition: f => f.vehicle === 'Si'
      },
      { id: 'home',          label: '¿Tiene Casa Propia?',         type: 'select', options: YES_NO, weight: 2 },
      {
        id:        'addresHome',
        label:     'Dirección',
        type:      'text',
        weight:    2,
        condition: f => f.home === 'Si'
      },
      {
        id:        'cityHome',
        label:     'Ciudad',
        type:      'text',
        weight:    2,
        condition: f => f.home === 'Si'
      },
    ],
  },

  // 4. Experiencia Laboral
  {
    id: 4,
    title: 'Experiencia Laboral',
    questions: [
      {
        id:      'employed',
        label:   'Situación Laboral',
        type:    'select',
        options: ['Empleado','Independiente','Desempleado'],
        weight:  3
      },
      {
        id:        'lastdayemployed',
        label:     'Último día laborando',
        type:      'date',
        weight:    2,
        condition: f => f.employed === 'Desempleado'
      },
      {
        id:        'nameOfLastdayemployer',
        label:     'Nombre de la última empresa',
        type:      'text',
        weight:    2,
        condition: f => f.employed === 'Desempleado'
      },
      {
        id:        'companyName',
        label:     'Nombre de la Empresa',
        type:      'text',
        weight:    3,
        condition: f => f.employed === 'Empleado'
      },
      {
        id:        'employmentStart',
        label:     'Fecha de inicio',
        type:      'date',
        weight:    3,
        condition: f => f.employed === 'Empleado'
      },
      {
        id:        'legalCompany',
        label:     '¿Tiene empresa propia?',
        type:      'select',
        options:   YES_NO,
        weight:    2,
        condition: f => f.employed === 'Independiente'
      },
      {
        id:        'timeEmployer',
        label:     '¿Cuándo inició su empresa?',
        type:      'date',
        weight:    2,
        condition: f => f.legalCompany === 'Si'
      },
      {
        id:        'personalCompany',
        label:     'Nombre de la Empresa',
        type:      'text',
        weight:    2,
        condition: f => f.legalCompany === 'Si'
      },
    ],
  },

  // 5. Información Migratoria
  {
    id: 5,
    title: 'Información Migratoria',
    questions: [
      { id: 'passport',      label: '¿Tiene pasaporte?',          type: 'select', options: YES_NO, weight: 3 },
      {
        id:        'passportNumber',
        label:     'Número de Pasaporte',
        type:      'text',
        weight:    2,
        condition: f => f.passport === 'Si'
      },
      {
        id:        'dateOfPreviousPassport',
        label:     'Fecha de vencimiento Pasaporte',
        type:      'date',
        weight:    2,
        condition: f => f.passport === 'Si'
      },
      { id: 'hasPetition',   label: '¿Petición de residencia?',  type: 'select', options: YES_NO, weight: 3 },
      {
        id:        'petitionCase',
        label:     'Número de Petición',
        type:      'text',
        weight:    2,
        condition: f => f.hasPetition === 'Si'
      },
      { id: 'hasPreviousVisa', label: '¿Ha tenido visa antes?', type: 'select', options: YES_NO, weight: 3 },
      {
        id:        'dateOfPreviousVisa',
        label:     'Fecha de vencimiento de visa',
        type:      'date',
        weight:    2,
        condition: f => f.hasPreviousVisa === 'Si'
      },
      { id: 'visaDenied',    label: '¿Le han negado visa?',      type: 'select', options: YES_NO, weight: 3 },
      {
        id:        'visaDeniedDate',
        label:     'Fecha de negación',
        type:      'date',
        weight:    2,
        condition: f => f.visaDenied === 'Si'
      },
      { id: 'hasTravelHistory', label: '¿Ha viajado fuera?',     type: 'select', options: YES_NO, weight: 2 },
      {
        id:        'whereHasTraveled',
        label:     'Último destino viajado',
        type:      'text',
        weight:    2,
        condition: f => f.hasTravelHistory === 'Si'
      },
      {
        id:        'whenHasTraveled',
        label:     'Fecha último viaje',
        type:      'date',
        weight:    2,
        condition: f => f.hasTravelHistory === 'Si'
      },
    ],
  },

  // 6. Persona Peligrosa
  {
    id: 6,
    title: 'Persona Peligrosa',
    questions: [
      { id: 'militaryService', label: '¿Sirvió en el ejército?',    type: 'select', options: YES_NO, weight: 2 },
      {
        id:        'whenMilitaryService',
        label:     'Fecha de servicio',
        type:      'date',
        weight:    2,
        condition: f => f.militaryService === 'Si'
      },
      { id: 'hasBeenArrested', label: '¿Ha sido arrestado?',       type: 'select', options: YES_NO, weight: 3 },
      {
        id:        'arrestDate',
        label:     'Fecha de arresto',
        type:      'date',
        weight:    2,
        condition: f => f.hasBeenArrested === 'Si'
      },
      { id: 'deported',       label: '¿Ha sido deportado?',       type: 'select', options: YES_NO, weight: 3 },
      {
        id:        'deportDate',
        label:     'Fecha de deportación',
        type:      'date',
        weight:    2,
        condition: f => f.deported === 'Si'
      },
    ],
  },

  // 7. Información Educativa
  {
    id: 7,
    title: 'Información Educativa',
    questions: [
      {
        id:      'lastStudie',
        label:   'Nivel estudios',
        type:    'select',
        options: EDUCATION_LEVELS,
        weight:  2
      },
      {
        id:        'schoolName',
        label:     'Centro de Estudios',
        type:      'select',
        options:   ['UASD','PUCMM','UNIBE','UTESA','INTEC','Otros'],
        weight:    2,
        condition: f => f.lastStudie !== 'Ninguno'
      },
      {
        id:        'career',
        label:     'Carrera',
        type:      'select',
        options:   ['Administración','Ingeniería','Derecho','Medicina','Educación','Otros'],
        weight:    2,
        condition: f => ['Universidad','Maestría','Doctorado'].includes(f.lastStudie as EducationLevel)
      },
      {
        id:      'languages',
        label:   'Idioma Principal',
        type:    'select',
        options: ['Español','Inglés','Francés','Alemán','Portugués','Otros'],
        weight:  1
      },
      {
        id:        'whichotherLanguages',
        label:     '¿Qué otro idioma?',
        type:      'text',
        weight:    1,
        condition: f => f.languages === 'Otros'
      },
    ],
  },

  // 8. Finanzas Personales
  {
    id: 8,
    title: 'Finanzas Personales',
    questions: [
      { id: 'Bank',            label: '¿Tiene cuenta bancaria?', type: 'select', options: YES_NO, weight: 2 },
      {
        id:        'ammountBank',
        label:     'Saldo bancario',
        type:      'select',
        options:   ['0-20,000','20,001-50,000','50,001-100,000','+100,000'],
        weight:    2,
        condition: f => f.Bank === 'Si'
      },
      { id: 'hasinvestments',  label: '¿Tiene inversiones?',    type: 'select', options: YES_NO, weight: 2 },
      {
        id:        'investments',
        label:     'Tipo de inversiones',
        type:      'select',
        options:   ['Inmuebles','Mercado de Valores','Otros'],
        weight:    2,
        condition: f => f.hasinvestments === 'Si'
      },
      {
        id:      'liquidnetworth',
        label:   'Patrimonio líquido',
        type:    'select',
        options: ['0-20,000','20,001-50,000','50,001-100,000','+100,000'],
        weight:  2
      },
      {
        id:      'totalnetworth',
        label:   'Patrimonio Total',
        type:    'select',
        options: ['0-20,000','20,001-50,000','50,001-100,000','+100,000'],
        weight:  2
      },
    ],
  },

  // 9. Persona Expuesta Políticamente
  {
    id: 9,
    title: 'Persona Expuesta Políticamente',
    questions: [
      { id: 'ilegalactivities', label: '¿Antecedentes penales?',  type: 'select', options: YES_NO, weight: 3 },
      { id: 'relationPEP',      label: '¿Relación PEP?',          type: 'select', options: YES_NO, weight: 3 },
      {
        id:        'funcionario',
        label:     'Cargo o Distinción',
        type:      'text',
        weight:    2,
        condition: f => f.relationPEP === 'Si'
      },
    ],
  },

  // 10. Resumen del Termómetro
  {
    id: 10,
    title: 'Resumen del Termómetro',
    questions: []
  }
]
