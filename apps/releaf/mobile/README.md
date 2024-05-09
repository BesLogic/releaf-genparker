# Environment setup

## Android

1. Android studio installed
2. Ensure you have JAVA_HOME in your environment variables
3. Ensure you have a place for the ANDROID_HOME && ANDROID_SDK_ROOT in the environment variables
4. Ensure you have adb installed
5. Setup your android phone
   1. Set the developer mode
   2. Allow usb debugging
   3. Connect your phone to the computer
   4. There will be an authorization popup to be approved

To ensure all has properly been installed, you can run the following command:
`npx @react-native-community/cli doctor`

Ideally you will see the following checks to be good:

- Node.js
- npm
- Adb
- JDK
- Android Studio
- ANDROID_HOME

## Apple

:|

# Project Setup

Before starting the application, make sure to have installed the necessary packages directly within the mobile project.

This means to open the folder `/apps/releaf/mobile` to the mobile app and perform a `npm install`.

Once down you should see a a node_module folder appear.

# Runing the project

With everything setup you can run the proper NX command:

- `npx nx run releaf-mobile-app:run-android` For Android
- `npx nx run releaf-mobile-app:run-ios` For IOS
