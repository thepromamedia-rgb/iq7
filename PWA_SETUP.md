# ReferKro PWA setup

PWA support is integrated without changing the existing website design or other app features.

## Included behavior
- Only the Profile screen shows a compact **Download App** / **Open App** action. No floating/global install button appears on other screens. The Profile action remains visible after installation.
- When installation is detected, the action changes to **Open App**. In an installed standalone app it navigates to the app home; from a browser it opens the same-origin app URL in a new top-level tab so Android can hand it to the installed PWA when link capture is enabled.
- The floating install shortcut also remains available and changes its label based on installation state.
- The manifest declares separate standard and maskable 192x192 and 512x512 icons. Maskable artwork keeps the logo inside the safe area.
- Legacy icon URLs point to the canonical ReferKro icon artwork to avoid stale shortcut branding.
- Service worker precaches all four PWA icons, uses a bumped cache version, and does not cache API responses or user-specific HTML.

## Verify after deployment
Check these HTTPS URLs return HTTP 200 with the expected content types:
- `/manifest.json`
- `/sw.js`
- `/icons/icon-192.png` and `/icons/icon-512.png`
- `/icons/icon-192-maskable.png` and `/icons/icon-512-maskable.png`

On Android Chrome, install the app from the browser menu if needed. If Android does not hand an Open App link to the installed PWA, check Android Settings → Apps → ReferKro → Open by default / supported links; OS link-capture behavior varies by Android and browser version.


## Profile install button behavior
- The compact **Download App** button is rendered only inside the Profile screen.
- Its label always remains **Download App**, including after installation; there is no **Open App** mode or launch-app action.
- On supported Android Chrome and desktop Chromium browsers, tapping it opens the native PWA install prompt when the browser supplies `beforeinstallprompt`.
- If the browser does not supply that event, the button gives platform-specific installation steps: Android browser menu, desktop Chrome/Edge install menu, or iPhone/iPad Safari Share → Add to Home Screen.
- If the PWA is already running in standalone mode, the button explains that it is already installed. The label remains **Download App**; there is no Open App action.
- iOS does not allow a website button to force the native installation prompt. Users must confirm Add to Home Screen in Safari.
- This is a website-installed PWA, not a downloadable APK file.
