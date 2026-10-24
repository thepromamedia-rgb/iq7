REFERKRO ANDROID APK SOURCE

Important:
- This is Android app source code, not a compiled APK file.
- It opens the live website URL configured in MainActivity.java:
  https://www.sregrr55.com/
- App requires internet and the website must remain online.
- This does not copy your website backend or database into the APK.
- Do not publish/install for real users until the website domain, login, wallet,
  referral, bonus, payments, and Android device behaviour have been tested.

Build APK using GitHub Actions (free for many personal public repositories):
1. Create/sign in to GitHub and create a NEW private repository named referkro-apk.
2. Upload all files/folders from this ZIP into the repository (not the ZIP file itself).
3. Open the repository's Actions tab and enable Actions if prompted.
4. Select "Build ReferKro APK" and press "Run workflow" (or push to main).
5. After it finishes successfully, open the workflow run and download the
   "ReferKro-Android-APK" artifact. It is a ZIP containing app-debug.apk.
6. Extract that ZIP and transfer app-debug.apk to the Android phone.
7. Tap the APK and follow Android's install prompt. Android may ask to allow
   installation from that source; only do so for a file you trust.

Before build, if your current Hostinger domain is NOT https://www.sregrr55.com/,
change HOME_URL in app/src/main/java/com/referkro/app/MainActivity.java to the
correct live HTTPS domain, then commit the change.

This is a debug APK for testing, not a signed release APK for Play Store.
