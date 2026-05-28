import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/app/libs/prismaDB'
import { authOptions } from '@/app/libs/authOptions'

export async function POST(req: Request) {
  try {
    const { score, formData } = await req.json()

    if (typeof score !== 'number' || score < 0 || score > 100) {
      return NextResponse.json({ error: 'Score inválido' }, { status: 400 })
    }

    const session = await getServerSession(authOptions)
    const userId = (session?.user as { id?: string } | undefined)?.id ?? null

    const result = await prisma.termometroResult.create({
      data: { score, formData, userId },
    })

    return NextResponse.json({ id: result.id })
  } catch {
    return NextResponse.json({ error: 'Error guardando resultado' }, { status: 500 })
  }
}
