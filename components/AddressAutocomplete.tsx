// components/AddressAutocomplete.tsx
'use client'

import { useRef } from 'react'
import { useLoadScript, Autocomplete } from '@react-google-maps/api'

export type PlaceInfo = {
  formattedAddress: string
  zipCode: string
  stateCode: string
}

type Props = {
  value: string
  onChange: (address: string) => void
  onSelect?: (info: PlaceInfo) => void
}

export default function AddressAutocomplete({ value, onChange, onSelect }: Props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  })
  const autoRef = useRef<google.maps.places.Autocomplete | null>(null)

  const handleLoad = (auto: google.maps.places.Autocomplete) => {
    autoRef.current = auto
  }

  const handlePlaceChanged = () => {
    const place = autoRef.current?.getPlace()
    if (!place) return

    const formattedAddress = place.formatted_address || value
    let zipCode = ''
    let stateCode = ''
    place.address_components?.forEach(c => {
      if (c.types.includes('postal_code')) zipCode = c.long_name
      if (c.types.includes('administrative_area_level_1')) stateCode = c.short_name
    })

    onSelect?.({ formattedAddress, zipCode, stateCode })
    onChange(formattedAddress)
  }

  // 1) Si falla la carga de la librería -> input manual
  if (loadError) {
    return (
      <input
        type="text"
        value={value}
        placeholder="Escribe tu dirección manualmente"
        onChange={e => onChange(e.target.value)}
        className="border rounded p-2 w-full"
      />
    )
  }
  // 2) Si aún está cargando la librería -> spinner / mensaje
  if (!isLoaded) {
    return (
      <div className="border rounded p-2 w-full text-gray-500">
        Cargando…
      </div>
    )
  }
  // 3) Cuando ya cargó -> Autocomplete
  return (
    <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Escribe tu dirección en EE. UU."
        className="border rounded p-2 w-full"
      />
    </Autocomplete>
  )
}
