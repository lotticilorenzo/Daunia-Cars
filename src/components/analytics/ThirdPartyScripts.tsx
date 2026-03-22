'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * ThirdPartyScripts
 * Centralized component for loading heavy third-party scripts.
 * Uses strategy="lazyOnload" to ensure they don't block the initial page load/LCP.
 */
export function ThirdPartyScripts() {
  const pathname = usePathname()

  // Meta Pixel ID from environment variable
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  useEffect(() => {
    // Track PageView on route change (for Meta Pixel)
    if (pixelId && window.fbq) {
      window.fbq('track', 'PageView')
    }
  }, [pathname, pixelId])

  return (
    <>
      {/* Meta Pixel */}
      {pixelId && (
        <>
          <Script
            id="fb-pixel"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* Google Maps (Placeholder infrastructure) */}
      {/* 
      <Script
        id="google-maps"
        strategy="lazyOnload"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
      />
      */}

      {/* Chat / Other scripts (Placeholder infrastructure) */}
      {/* 
      <Script
        id="external-chat"
        strategy="lazyOnload"
        src="https://embed.tawk.to/YOUR_ID/default"
      />
      */}
    </>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq: any
  }
}
