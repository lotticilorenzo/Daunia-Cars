'use client'

import { useRef, useEffect } from 'react'

const CAPTURE_FPS = 12

export default function CarScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video   = videoRef.current
    const canvas  = canvasRef.current
    if (!section || !video || !canvas) return

    let rafId: number
    let objectUrl = ''
    let frames: ImageBitmap[] = []
    let sectionTop  = 0
    let scrollRange = 0
    let seeking     = false
    let targetTime  = 0
    let useCanvas   = false

    const updateGeo = () => {
      sectionTop  = section.getBoundingClientRect().top + window.scrollY
      scrollRange = section.offsetHeight - window.innerHeight
    }

    const getProgress = () =>
      scrollRange > 0 ? Math.max(0, Math.min(1, (window.scrollY - sectionTop) / scrollRange)) : 0

    // Video onseeked chain — prevents seek-queue buildup
    video.onseeked = () => {
      seeking = false
      if (!useCanvas && Math.abs(video.currentTime - targetTime) > 0.033) {
        seeking = true
        video.currentTime = targetTime
      }
    }

    const drawCanvas = (p: number) => {
      if (frames.length === 0) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const frame = frames[Math.round(p * (frames.length - 1))]
      if (!frame) return
      const fw = frame.width, fh = frame.height
      const cw = canvas.width,  ch = canvas.height
      const s  = Math.min(cw / fw, ch / fh)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, cw, ch)
      ctx.drawImage(frame, (cw - fw * s) / 2, (ch - fh * s) / 2, fw * s, fh * s)
    }

    const tick = () => {
      const p = getProgress()
      if (useCanvas) {
        drawCanvas(p)
      } else if (video.duration > 0) {
        targetTime = p * video.duration
        if (!seeking && Math.abs(video.currentTime - targetTime) > 0.033) {
          seeking = true
          video.currentTime = targetTime
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    // Extracts frames from a dedicated video using rVFC (fast) or seeks (fallback)
    const extractFrames = async (src: string, fw: number, fh: number, duration: number): Promise<ImageBitmap[]> => {
      const total = Math.ceil(duration * CAPTURE_FPS)
      const step  = duration / Math.max(1, total - 1)
      const exVid = document.createElement('video')
      exVid.muted = true
      exVid.playsInline = true
      exVid.src = src
      exVid.load()

      await new Promise<void>((ok, fail) => {
        exVid.addEventListener('loadedmetadata', () => ok(),   { once: true })
        exVid.addEventListener('error',          () => fail(), { once: true })
      })

      const snapshots: OffscreenCanvas[] = []

      if ('requestVideoFrameCallback' in exVid) {
        await new Promise<void>((resolve) => {
          const onFrame = (_: DOMHighResTimeStamp, meta: { mediaTime: number }) => {
            // Capture every frame we've reached
            while (snapshots.length < total && meta.mediaTime >= snapshots.length * step - 0.02) {
              const oc = new OffscreenCanvas(fw, fh)
              oc.getContext('2d')!.drawImage(exVid, 0, 0, fw, fh)
              snapshots.push(oc)
            }
            if (snapshots.length < total) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ;(exVid as any).requestVideoFrameCallback(onFrame)
            } else {
              exVid.pause()
              resolve()
            }
          }

          // Safety: when video ends, fill any missing frames with the last frame
          exVid.addEventListener('ended', () => {
            while (snapshots.length < total) {
              const last = snapshots[snapshots.length - 1]
              if (last) snapshots.push(last)
              else break
            }
            resolve()
          }, { once: true })

          exVid.playbackRate = 4
          exVid.currentTime  = 0
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(exVid as any).requestVideoFrameCallback(onFrame)
          void exVid.play()
        })
      } else {
        // Fallback: seek-based
        const offscreen = new OffscreenCanvas(fw, fh)
        const octx      = offscreen.getContext('2d')!
        const v = exVid as HTMLVideoElement
        for (let i = 0; i < total; i++) {
          v.currentTime = (i / Math.max(1, total - 1)) * duration
          await new Promise<void>(res => v.addEventListener('seeked', () => res(), { once: true }))
          octx.drawImage(v, 0, 0, fw, fh)
          snapshots.push(new OffscreenCanvas(fw, fh))
          snapshots[snapshots.length - 1].getContext('2d')!.drawImage(offscreen, 0, 0)
        }
      }

      return Promise.all(snapshots.map(oc => createImageBitmap(oc)))
    }

    fetch('/videos/bmw-scomponimento.mp4')
      .then(res => { if (!res.ok) throw new Error(); return res.blob() })
      .then(async (blob) => {
        objectUrl = URL.createObjectURL(blob)

        // 1. Start scrubbing immediately with video element
        await new Promise<void>((ok, fail) => {
          video.addEventListener('loadedmetadata', () => ok(),   { once: true })
          video.addEventListener('error',          () => fail(), { once: true })
          video.src = objectUrl
          video.load()
        })

        updateGeo()
        window.addEventListener('resize', updateGeo)
        rafId = requestAnimationFrame(tick)

        // 2. Set up canvas dimensions
        const dpr   = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width  = window.innerWidth  * dpr
        canvas.height = window.innerHeight * dpr

        const maxW  = 1280
        const scale = Math.min(1, maxW / video.videoWidth)
        const fw    = Math.round(video.videoWidth  * scale)
        const fh    = Math.round(video.videoHeight * scale)

        // 3. Extract frames silently in background
        const extracted = await extractFrames(objectUrl, fw, fh, video.duration)
        frames    = extracted
        useCanvas = true
        // Crossfade from video to canvas
        canvas.style.opacity = '1'
        video.style.opacity  = '0'
      })
      .catch(console.error)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateGeo)
      frames.forEach(f => f.close())
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '400vh' }}
      aria-label="BMW — video scomponimento"
    >
      <div
        className="sticky top-0 w-full bg-black overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Immediate video scrubbing — visible right away */}
        <video
          ref={videoRef}
          muted playsInline preload="auto" disablePictureInPicture
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'contain', transition: 'opacity 0.6s', willChange: 'opacity' }}
        />

        {/* Canvas takes over silently once frames are extracted */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ width: '100%', height: '100%', display: 'block', opacity: 0, transition: 'opacity 0.6s', transform: 'translate3d(0,0,0)', willChange: 'opacity' }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: '14%', background: 'linear-gradient(to top, #09090D 0%, transparent 100%)' }}
        />
      </div>
    </section>
  )
}
