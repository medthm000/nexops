'use client'

interface QRCodeProps {
  size?: number
}

const SITE_URL = "https://nexopsai.vercel.app/"

export default function QRCodePlaceholder({ size = 200 }: QRCodeProps) {
  const encodedUrl = encodeURIComponent(SITE_URL)
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedUrl}&bgcolor=ffffff&color=1e40af&ecc=H&qzone=1&margin=0&format=svg`

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div
        className="bg-white rounded-xl overflow-hidden border border-blue-100"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrSrc}
          alt="Scan to visit NexOps AI website"
          width={size}
          height={size}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
