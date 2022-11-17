# Pingheng

A React Native iOS and Android app for Misskey.

Android build instuctions:

```sh
corepack enable
yarn install
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
cd android
./gradlew assembleDebug
```