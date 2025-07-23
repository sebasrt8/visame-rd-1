// app/api/zipinfo/route.ts
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const zip = searchParams.get('zip')
  if (!zip) {
    return NextResponse.json({ error: 'ZIP es requerido' }, { status: 400 })
  }

  const key = process.env.GOOGLE_MAPS_API_KEY
  const geo = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${key}`
  )
  const data = await geo.json()
  if (!data.results?.length) {
    return NextResponse.json({ error: 'ZIP no encontrado' }, { status: 404 })
  }

  // Busca el administrative_area_level_1 (estado)
  const comp = data.results[0].address_components.find((c: any) =>
    c.types.includes('administrative_area_level_1')
  )
  if (!comp) {
    return NextResponse.json({ error: 'Estado no encontrado' }, { status: 404 })
  }

  return NextResponse.json({
    stateCode: comp.short_name,
    // ojo: aquí sacamos el formatted_address
    formattedAddress: data.results[0].formatted_address
  })
}
