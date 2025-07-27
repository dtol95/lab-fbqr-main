"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useDebouncedCallback } from "use-debounce"
import { useHistory } from "@/hooks/use-history"
import ConfigPanel from "@/components/config-panel"
import PreviewPanel from "@/components/preview-panel"
import CollectionPanel from "@/components/collection-panel"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import AuthModal from "@/components/auth-modal"
import { VerticalDivider } from "@/components/vertical-divider"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { QRCodeResult, QRStyleOptions } from "@/types"
import { PageHeader } from "@/components/page-header"

const defaultGradient = {
  type: "linear" as const,
  rotation: 45,
  colorStops: [
    { offset: 0, color: "#ff0000" },
    { offset: 1, color: "#0000ff" },
  ],
}

const defaultOptions: QRStyleOptions = {
  width: 300,
  dotsOptions: {
    type: "square",
    color: "#1c1c1c",
    useGradient: false,
    gradient: defaultGradient,
  },
  backgroundOptions: {
    color: "transparent",
    useGradient: false,
    gradient: defaultGradient,
  },
  cornersSquareOptions: {
    type: "square",
    color: "#1c1c1c",
    useGradient: false,
    gradient: defaultGradient,
  },
  cornersDotOptions: {
    type: "inherit",
    color: "#1c1c1c",
    useGradient: false,
    gradient: defaultGradient,
  },
  qrOptions: { errorCorrectionLevel: "H" },
  imageOptions: {
    src: null,
    hideBackgroundDots: true,
    imageSize: 0.2,
    margin: 10,
  },
}

export default function QRGeneratorPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [text, setText] = useState("https://lab.factory.black")
  const [originalUrl, setOriginalUrl] = useState<string | undefined>(undefined)
  const [qrCodes, setQrCodes] = useState<QRCodeResult[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isShortening, setIsShortening] = useState(false)
  const [isCollectionLoaded, setIsCollectionLoaded] = useState(false)
  const [configPanelKey, setConfigPanelKey] = useState(Date.now())
  const supabase = createClient()
  const { toast } = useToast()

  const saveCollectionDebounced = useDebouncedCallback(async (codesToSave: QRCodeResult[]) => {
    if (!user) return

    try {
      const response = await fetch("/api/save-collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrCodes: codesToSave }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to save")
      }
      toast({ title: "Collection auto-saved!", variant: "success" })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Cloud Save Failed", description: error.message })
    }
  }, 2000)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (!currentUser) {
        setQrCodes([])
        setIsCollectionLoaded(false)
      }
    })

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  useEffect(() => {
    const loadCollection = async () => {
      if (user && !isCollectionLoaded) {
        try {
          const response = await fetch("/api/get-collections")
          if (response.ok) {
            const data = await response.json()
            const allQrCodes = data.collections.flatMap((c: any) => c.qr_codes)
            setQrCodes(allQrCodes)
          } else {
            toast({ variant: "destructive", title: "Failed to load your collection." })
          }
        } catch (error) {
          toast({ variant: "destructive", title: "An error occurred while loading collection." })
        } finally {
          setIsCollectionLoaded(true)
        }
      }
    }
    loadCollection()
  }, [user, isCollectionLoaded, toast])

  // Use history hook for style management with undo/redo
  const {
    state: style,
    set: setStyle,
    undo: undoStyle,
    redo: redoStyle,
    canUndo,
    canRedo
  } = useHistory<QRStyleOptions>(defaultOptions, {
    maxHistorySize: 50,
    debounceMs: 300
  })

  // Ensure style is always properly structured (defensive programming)
  const safeStyle = {
    ...defaultOptions,
    ...style,
    dotsOptions: { ...defaultOptions.dotsOptions, ...style?.dotsOptions },
    backgroundOptions: { ...defaultOptions.backgroundOptions, ...style?.backgroundOptions },
    cornersSquareOptions: { ...defaultOptions.cornersSquareOptions, ...style?.cornersSquareOptions },
    cornersDotOptions: { ...defaultOptions.cornersDotOptions, ...style?.cornersDotOptions },
    imageOptions: { ...defaultOptions.imageOptions, ...style?.imageOptions },
    qrOptions: { ...defaultOptions.qrOptions, ...style?.qrOptions }
  }

  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const handleStyleChange = useCallback((newOptions: Partial<QRStyleOptions>) => {
    setStyle((prev) => ({ ...prev, ...newOptions }))
  }, [setStyle])

  const handleSizeChange = useCallback((size: number) => {
    setStyle((prev) => {
      if (prev.width === size) return prev
      return { ...prev, width: size }
    })
  }, [setStyle])

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setLogoPreview(e.target?.result as string)
      reader.readAsDataURL(file)
      setStyle((prev) => ({ ...prev, qrOptions: { ...prev.qrOptions, errorCorrectionLevel: "H" } }))
      toast({ title: "Logo Added", description: "Error correction boosted for best scanning.", variant: "success" })
    }
  }

  const handleRemoveLogo = () => {
    setLogoPreview(null)
    toast({ title: "Logo Removed" })
  }

  const handleShortenUrl = async () => {
    if (!user) {
      toast({ variant: "destructive", title: "Please log in to create a short link." })
      setIsAuthModalOpen(true)
      return
    }
    setIsShortening(true)
    try {
      const response = await fetch("/api/short-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: text }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to create short link.")
      }
      setOriginalUrl(text)
      setText(data.shortUrl)
      setConfigPanelKey(Date.now()) // Force remount of ConfigPanel
      toast({
        variant: "success",
        title: "URL shortened!",
        description: `Your new link is: ${data.shortUrl}`,
      })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Shortening Failed", description: error.message })
    } finally {
      setIsShortening(false)
    }
  }

  const handleGenerateClick = async () => {
    if (!text.trim()) {
      toast({ variant: "destructive", title: "Error", description: "Content cannot be empty." })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-qr-svg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...safeStyle,
          width: 64,
          data: text,
          image: logoPreview,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate QR code thumbnail")

      const { svg: svgString } = await response.json()
      const thumbnailDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`

      const newQrCode: QRCodeResult = {
        id: Date.now().toString(),
        text: text,
        originalUrl: originalUrl,
        qrConfig: { ...safeStyle, data: text, image: logoPreview },
        thumbnail: thumbnailDataUrl,
        createdAt: new Date().toISOString(),
      }

      const newQrCodes = [newQrCode, ...qrCodes]
      setQrCodes(newQrCodes)
      if (user) {
        saveCollectionDebounced(newQrCodes)
      }

      setOriginalUrl(undefined)
      toast({ title: "QR Code Added", description: "Added to your local collection." })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Generation Failed", description: error.message })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleLoadQrCode = (qrCodeToLoad: QRCodeResult) => {
    const { qrConfig, text, originalUrl } = qrCodeToLoad
    const { data, image, ...styleOptions } = qrConfig

    setText(text)
    setOriginalUrl(originalUrl)
    setStyle(styleOptions as QRStyleOptions)
    setLogoPreview(image || null)
    setConfigPanelKey(Date.now()) // Force remount of ConfigPanel

    toast({ title: "Style Loaded", description: "Configuration has been applied from your collection." })
  }

  const handleRemoveQrCode = (id: string) => {
    const newQrCodes = qrCodes.filter((qr) => qr.id !== id)
    setQrCodes(newQrCodes)
    if (user) {
      saveCollectionDebounced(newQrCodes)
    }
    toast({ title: "Removed from collection" })
  }

  const handleTextChange = useCallback((newText: string) => {
    setText(newText)
  }, [])

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if we're in an input field
      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        return
      }

      if ((event.metaKey || event.ctrlKey) && !event.shiftKey && event.key === 'z') {
        event.preventDefault()
        if (canUndo) {
          undoStyle()
          toast({ 
            title: "Undone", 
            description: "Reverted to previous design state",
            variant: "default"
          })
        }
      } else if (((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'z') || 
                 ((event.metaKey || event.ctrlKey) && event.key === 'y')) {
        event.preventDefault()
        if (canRedo) {
          redoStyle()
          toast({ 
            title: "Redone", 
            description: "Restored next design state",
            variant: "default"
          })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [canUndo, canRedo, undoStyle, redoStyle, toast])

  return (
    <>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} redirectTo="/fbqr" />
      <div className="p-4 sm:p-6 md:p-8">
        <main
          className="bg-[#EAEAEA] border-2 border-[#1c1c1c] flex flex-col min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]"
          style={{ boxShadow: `8px 8px 0px #1c1c1c` }}
        >
          <PageHeader 
            title="FBQR" 
            user={user} 
            onLoginClick={() => setIsAuthModalOpen(true)}
            canUndo={canUndo}
            canRedo={canRedo}
            onUndo={undoStyle}
            onRedo={redoStyle}
          />

          {/* Mobile Layout */}
          <div className="lg:hidden flex-1 min-h-0">
            <ScrollArea className="h-full">
              <div className="flex flex-col">
                <div className="border-b-2 border-[#1c1c1c]">
                  <PreviewPanel text={text} style={safeStyle} logoPreview={logoPreview} onSizeChange={handleSizeChange} />
                </div>
                <div className="border-b-2 border-[#1c1c1c]">
                  <ConfigPanel
                    key={configPanelKey}
                    text={text}
                    onTextChange={handleTextChange}
                    styleOptions={safeStyle}
                    onStyleChange={handleStyleChange}
                    onGenerateClick={handleGenerateClick}
                    isGenerating={isGenerating}
                    onLogoUpload={handleLogoUpload}
                    logoPreview={logoPreview}
                    onRemoveLogo={handleRemoveLogo}
                    onShortenUrl={handleShortenUrl}
                    isShortening={isShortening}
                  />
                </div>
                <CollectionPanel
                  qrCodes={qrCodes}
                  onRemove={handleRemoveQrCode}
                  onLoad={handleLoadQrCode}
                  user={user}
                  isLoading={!isCollectionLoaded}
                />
              </div>
            </ScrollArea>
          </div>

          {/* 2-Column Tablet/Medium Desktop Layout */}
          <div className="hidden lg:grid xl:hidden flex-1 lg:grid-cols-[500px_1fr] min-h-0 w-full">
            <ConfigPanel
              key={configPanelKey}
              text={text}
              onTextChange={handleTextChange}
              styleOptions={safeStyle}
              onStyleChange={handleStyleChange}
              onGenerateClick={handleGenerateClick}
              isGenerating={isGenerating}
              onLogoUpload={handleLogoUpload}
              logoPreview={logoPreview}
              onRemoveLogo={handleRemoveLogo}
              onShortenUrl={handleShortenUrl}
              isShortening={isShortening}
            />
            <div className="flex flex-col border-l-2 border-[#1c1c1c]">
              <div className="border-b-2 border-[#1c1c1c]">
                <PreviewPanel text={text} style={safeStyle} logoPreview={logoPreview} onSizeChange={handleSizeChange} />
              </div>
              <div className="flex-1 min-h-0">
                <CollectionPanel
                  qrCodes={qrCodes}
                  onRemove={handleRemoveQrCode}
                  onLoad={handleLoadQrCode}
                  user={user}
                  isLoading={!isCollectionLoaded}
                />
              </div>
            </div>
          </div>

          {/* 3-Column Large Desktop Layout */}
          <div className="hidden xl:grid flex-1 xl:grid-cols-[500px_auto_1fr_auto_500px] min-h-0 w-full">
            <ConfigPanel
              key={configPanelKey}
              text={text}
              onTextChange={handleTextChange}
              styleOptions={safeStyle}
              onStyleChange={handleStyleChange}
              onGenerateClick={handleGenerateClick}
              isGenerating={isGenerating}
              onLogoUpload={handleLogoUpload}
              logoPreview={logoPreview}
              onRemoveLogo={handleRemoveLogo}
              onShortenUrl={handleShortenUrl}
              isShortening={isShortening}
            />
            <VerticalDivider />
            <PreviewPanel text={text} style={safeStyle} logoPreview={logoPreview} onSizeChange={handleSizeChange} />
            <VerticalDivider />
            <CollectionPanel
              qrCodes={qrCodes}
              onRemove={handleRemoveQrCode}
              onLoad={handleLoadQrCode}
              user={user}
              isLoading={!isCollectionLoaded}
            />
          </div>
        </main>
      </div>
    </>
  )
}
