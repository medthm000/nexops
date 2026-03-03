import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NexOps AI — Intelligent Business Solutions',
  description: 'Enterprise-grade AI solutions for marketing, customer service, operations and analytics.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">
        {/* Custom cursor */}
        <div id="cursor-dot" />
        <div id="cursor-ring" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            const dot = document.getElementById('cursor-dot');
            const ring = document.getElementById('cursor-ring');
            let mx = 0, my = 0, rx = 0, ry = 0;
            document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
            function loop() {
              if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
              rx += (mx - rx) * 0.12;
              ry += (my - ry) * 0.12;
              if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
              requestAnimationFrame(loop);
            }
            loop();
          })();
        `}} />
        {children}
      </body>
    </html>
  )
}
