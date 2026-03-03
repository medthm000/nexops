'use client'

interface QRCodeProps {
  size?: number
}

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdVACVvb77ihqKCbtk730DR-Kc8TH9btA5OFrf3G3QxGhwS1Q/viewform?usp=preview"

export default function QRCodePlaceholder({ size = 200 }: QRCodeProps) {
  const encodedUrl = encodeURIComponent(FORM_URL)
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedUrl}&bgcolor=ffffff&color=1e3a8a&qzone=1&margin=0&format=svg`

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="bg-white rounded-xl overflow-hidden border border-blue-100"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrSrc}
          alt="Scan to access NexOps AI Google Form"
          width={size}
          height={size}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
