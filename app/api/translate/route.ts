import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { RateLimit } from "@/app/lib/rate-limit"

// Using a different free translation API
const TRANSLATE_API = "https://api.mymemory.translated.net/get"
const rateLimit = new RateLimit(60 * 1000, 100)

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous"
    const allowed = await rateLimit.check(ip)
    
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      )
    }

    const { text, sourceLang, targetLang } = await request.json()

    // Validate input
    if (!text?.trim()) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      )
    }

    if (!sourceLang || !targetLang) {
      return NextResponse.json(
        { error: "Source and target languages are required" },
        { status: 400 }
      )
    }

    try {
      // Call MyMemory Translation API
      const langPair = `${sourceLang}|${targetLang}`
      const url = `${TRANSLATE_API}?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langPair)}`
      
      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Translation API error:', errorData)
        throw new Error(errorData.error?.message || 'Translation API error')
      }

      const data = await response.json()
      
      if (!data.responseData?.translatedText) {
        throw new Error('Invalid response from translation service')
      }

      const translation = data.responseData.translatedText

      // Save the translation to the database
      const savedTranslation = await prisma.translation.create({
        data: {
          sourceText: text,
          translatedText: translation,
          sourceLang: sourceLang,
          targetLang: targetLang,
          type: 'text'
        },
      })

      return NextResponse.json({
        translatedText: translation,
        id: savedTranslation.id
      })
    } catch (error) {
      console.error('Translation service error:', error)
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Translation service error' },
        { status: 503 }
      )
    }
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    )
  }
} 