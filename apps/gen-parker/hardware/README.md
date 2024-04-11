# Readme

This instructions will help you install prerequisites components to work with Arduino Releaf dongle

## Setup dependencies

1. Go to Arduino website to install Arduino IDE

    `https://www.arduino.cc/en/software`

2. Install Legacy IDE `v 1.8.X` (highiest version)

    `Arduino`

3. Install version for you OS (Windows 7 +)

    ![install image](docs/install.jpg)

4. Start the installer and follow steps to install USB Driver and Arduino IDE.

    ![use ide](docs/ide.jpg)

5. Accept firewall for Arduino IDE

    ![firewall](docs/firewall.jpg)

6. Open project

    ![open ide](docs/open.jpg)

7. Then open project in path:

    `./apps\gen-parker\hardware\philanthropy-arduino.ino\philanthropy-arduino.ino.ino`

    ![project](docs/select-project.jpg)

## Install dependencies

Some sensor need specific dependencies

1. Install DHT_U library from Adafruit.

**With Library Manager:**

  ![library manager](docs/library-manager.jpg)
  ![dhl lib](docs/dhl-sensor-library.jpg)
  ![dhl lib deps](docs/dhl-sensor-library-dependencies.jpg)

**Manually:**

- https://www.arduino.cc/reference/en/libraries/dht-sensor-library/
- https://github.com/adafruit/Adafruit_DHT_Unified

## Setup hardware

**Hardware description**

  ![open ide](docs/hardware.jpg)

  a. Arduino dongle: used to coordonation other dongles (🧠 brain)

  b. Wifi dongle: used to communicate with server

  c. Luminosity sensor: used to get light info

  d. Moisture sensor: used to get moisture info

  e. Temperature sensor: used to get temperature info

  f. Usb cable: used to upload new code and debug. (IMPORTANT: don't use with power cable)

  g. Power cable: used when releaf hardware is used in autonomus mode (IMPORTANT: don't use with usb cable)

**steps**

1. Connect USB Cable (without Power Cable) to connect with Arduino IDE. See part `f)`

2. Choose Arduino version: `Arduino Nano`

3. Choose Processor: `ATmega328P (Old Bootloader)`

4. Choose Port: `COM3` (can be another on your computer)

    ![arduino version](docs/arduino-version.jpg)

5. Change Wifi credentials for tests

    ![arduino version](docs/wifi-info.jpg)

## Upload new code

NOTE: USB Cable upload is NOT available when Wifi dongle is running. Serial port of Arduino Nano is used to communicate from component A) to B).

![arduino version](docs/hardware.jpg)

To be able to run new code:

1. Unplug Wifi dongle

    ![arduino version](docs/hardware-wifi.jpg)

2. Upload code

    ![arduino version](docs/arduino-upload.jpg)

3. Reconnect Wifi dongle

## Setup VS Code intellisense

1. Install "Arduino" VS Code Extention

    ![arduino version](docs/vs-code-arduino-ext.jpg)

2. Add `include path` to load dependencies definition

    > note: paths may vary depending on your setup
    >
    > install libraries
    > - [user path]/Documents/Arduino/libraries/**",
    >
    > arduino standard library
    > - C:/Program Files (x86)/Arduino/**

    ![arduino version](docs/include-path.jpg)
