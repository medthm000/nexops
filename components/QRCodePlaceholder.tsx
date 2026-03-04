'use client'

interface QRCodeProps {
  size?: number
}

const SITE_URL = "https://nexopsai.vercel.app/"

export default function QRCodePlaceholder({ size = 200 }: QRCodeProps) {
  const encodedUrl = encodeURIComponent(SITE_URL)
  // High error-correction (H) so the centre logo doesn't break scanning
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedUrl}&bgcolor=ffffff&color=1e40af&ecc=H&qzone=1&margin=0&format=svg`
  const logoBox  = Math.round(size * 0.24)   // white backing square
  const iconBox  = Math.round(logoBox * 0.68) // blue rounded square inside

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* QR code image */}
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

      {/* ── Centred brand-logo overlay ─────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: logoBox, height: logoBox,
        background: '#ffffff',
        borderRadius: '28%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 14px rgba(30,64,175,0.22)',
        border: '2px solid #dbeafe',
      }}>
        {/* Blue rounded square matching Navbar logo */}
        <div style={{
          width: iconBox, height: iconBox,
          background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
          borderRadius: '28%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(37,99,235,0.45)',
        }}>
          {/* NexOps diamond SVG — same as Navbar */}
          <svg
            width={Math.round(iconBox * 0.58)}
            height={Math.round(iconBox * 0.58)}
            viewBox="0 0 18 18"
            fill="none"
          >
            <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.55"/>
            <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
