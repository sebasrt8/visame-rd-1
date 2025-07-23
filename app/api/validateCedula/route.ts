// app/api/validateCedula/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id || !/^\d+$/.test(id)) {
    return NextResponse.json(
      { error: 'sin guiones ni letras' },
      { status: 400 }
    )
  }

  try {
    const res = await fetch(
      `https://api.digital.gob.do/v3/cedulas/${encodeURIComponent(id)}/validate`,
      { headers: { accept: 'application/json' } }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error('Junta API respondió error:', res.status, text)
      return NextResponse.json(
        { error: `Cedula Incorrecta` },
        { status: 502 }
      )
    }

    const data = await res.json()
    // data.valid === true | false
    return NextResponse.json({ valid: Boolean(data.valid) })
  } catch (e) {
    console.error('Error interno validando cédula:', e)
    return NextResponse.json(
      { error: 'Error interno al validar cédula.' },
      { status: 500 }
    )
  }
}
