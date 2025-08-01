import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Morango do Amor',
  description: 'Ganhe até 10 mil reais com morangos do amor!'  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://load.stb.essenciadocuidado.site/1tyidohuuz.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','5h9kyz=aWQ9R1RNLVRDTFNER0Qy&jyvu=cgEeG4');`,
          }}
        />
        {/* End Google Tag Manager */}

        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://load.stb.essenciadocuidado.site/ns.html?id=GTM-TCLSDGD2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager */}

        {children}
      </body>
    </html>
  )
}
