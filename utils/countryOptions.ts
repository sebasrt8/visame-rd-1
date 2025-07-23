// src/utils/countryOptions.ts
import countries from 'i18n-iso-countries'
import esLocale from 'i18n-iso-countries/langs/es.json'

// Registra el locale español
countries.registerLocale(esLocale)

// Obtenemos un objeto { "US": "Estados Unidos", "DO": "República Dominicana", ... }
const paisesEnEspanol = countries.getNames('es', { select: 'official' })

// Lo convertimos a un array de opciones para react-select
export const OPCIONES_PAISES = Object.entries(paisesEnEspanol)
  .map(([codigo, nombre]) => ({
    value: codigo,    // aquí guardamos el código ISO (por ej. "DO")
    label: nombre     // aquí el nombre en español
  }))
  .sort((a, b) => a.label.localeCompare(b.label))
