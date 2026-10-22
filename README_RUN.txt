SREGRR55 LOCAL FRONTEND RECOVERY (PARTIAL)

HOW TO RUN ON WINDOWS
1. Extract this ZIP into a normal folder.
2. Install Node.js LTS if it is not already installed: https://nodejs.org/
3. Double-click RUN_ME.bat.
4. The site should open at http://127.0.0.1:4173. Keep the black terminal window open while using it.

IMPORTANT LIMITATIONS
- This is a partial frontend recovery from a browser HAR capture, not the original project ZIP.
- It includes the files actually captured by the browser, plus a small local static server.
- The main JavaScript bundle references 541 additional JS/CSS files that were not present in the HAR capture. Pages/features that need those files may fail to open.
- The page configuration points to a remote API (api.api55clubapi.com). The original backend source and database are not included; login, wallet, games, and other server-dependent features may not work locally.
- This capture is for sregrr55.com, not ReferKro. It is kept separate as requested.
- The HAR response title was “lottery”. This ZIP does not recreate missing backend code or claim to be a complete website backup.

MISSING FILE REPORT
See MISSING_ASSETS.txt for the referenced asset paths that were not captured.

For GitHub + Render deployment, follow README_RENDER_GITHUB.txt.
