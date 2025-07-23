// components/Termometro/Sections.constants.ts
export type YesNo         = 'Si' | 'No'
export type Gender        = 'Hombre' | 'Mujer'
export type EstadoCivil   = 'Soltero/a' | 'Casado/a' | 'Unión Libre' | 'Divorciado/a' | 'Viudo/a'
export type Lodging       = 'Familiar' | 'Amigo' | 'Hotel' | 'Airbnb'
export type Relation      = 'No' | 'Familia' | 'Amigos' | 'Empresa' | 'Otro'
export type EducationLevel =
  | 'Ninguno' | 'Primaria' | 'Secundaria' | 'Técnico'
  | 'Universidad' | 'Maestría' | 'Doctorado'

// listas de opciones
export const YES_NO: YesNo[]               = ['Si','No']
export const GENDERS: Gender[]             = ['Hombre','Mujer']
export const CIVIL_STATUS: EstadoCivil[]   = ['Soltero/a','Casado/a','Unión Libre','Divorciado/a','Viudo/a']
export const LODGING_OPTIONS: Lodging[]    = ['Familiar','Amigo','Hotel','Airbnb']
export const RELATIONS: Relation[]         = ['No','Familia','Amigos','Empresa','Otro']
export const EDUCATION_LEVELS: EducationLevel[] =
  ['Ninguno','Primaria','Secundaria','Técnico','Universidad','Maestría','Doctorado']
