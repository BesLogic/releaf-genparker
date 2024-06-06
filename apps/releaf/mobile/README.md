# Environment setup

## Android

1. Android studio installed
   1. Download Android 34
   2. Download the UpsideDownCake API
2. Ensure you have JAVA_HOME in your environment variables
  1. Make sure the path to java executable is in your environment variable
  2. Same path should be under the JAVA_HOME key
3. Ensure you have a place for the ANDROID_HOME in the environment variables
   1. The ANDROID_HOME value can be found in the sdk manager SDK location
4. Ensure you have adb installed
   1. Setup the path to the adb executable (C:/.../Android/Sdk/platform-tools)
   2. Running the command `adb` should return a list of options
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
