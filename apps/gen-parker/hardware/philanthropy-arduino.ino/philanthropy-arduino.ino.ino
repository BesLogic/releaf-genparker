/*
* Arduino (obtenir info senseur) et ESP-01 (envoie information par Wifi)
*
 */
// Attention entrée votre SSID et mot de passe
char cSSID[33] = "Leon!!";
char cPassw[21] = "!!Leon!!";
 
// include et define temperature et humidité ambiante
#include <DHT_U.h>
#define DHTPIN 5                  // Pin température/humidité
#define DHTTYPE    DHT11          // DHT 11
DHT_Unified dht(DHTPIN, DHTTYPE);
 
#define MOD_HW 0         // 0 = UNO ou NANO, 1 = test with MEGA
#define TESTMODE 0       // 0 = production mode, 1 = test mode
#define DEBUG 0          // 0 = production mode, enlève commentaires pour debuger, 1 = commentaires pour debugger
 
// /////////////////////////////////////
#if MOD_HW == 1
#define LogSerial Serial  //V4.8
#define EspSerial Serial1 // test avec Mega
#define Megalogln(x) LogSerial.println(x)
#define Megadelay(x) delay(x)
#else
#define LogSerial Serial  //V4.8
#define EspSerial Serial //
#define Megalogln(x)
#define Megadelay(x)
#endif
 
// /////////////////////////////////////
#if DEBUG == 1
#define mlog(x) LogSerial.print(x)
#define mlogln(x) LogSerial.println(x)
#define mdelay(x) delay(x)
#else
#define mlog(x)
#define mlogln(x)
#define mdelay(x)
#endif
 
// Définir les PINs UNO
#define dHUMIDTESOL A1      // Pin humidité sol
#define dPHOTO A0           // Pin photocell
 
// Variable globale à usage multiple. Faire attention
String sG1; String sG2;
int iHu = 0;    // Humidité
int iTe = 0;    // Température
int iPhoto = 0; // Photocell
int iHuSol = 0; // Humidité du sol
 
void setup() {
  Serial.begin(74880);
  mlogln("");
  mlogln("Debut Set-up ");
  mlogln(__FILE__);
  mlogln("");
  pinMode(LED_BUILTIN, OUTPUT);      // LED du Arduino
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
 
  // Note: ESP-01 envoie message 191 après 5 secondes de power-up assurer que Arduino écoute
  delay(1500);
  vClignote(2,500);
 
  boolean bExit = false;
  boolean bRecu = false;
 
  // Écoute ESP-01, une fois code 191 reçu, envoie SSID et mot de passe
  // Note: Ne pas activer "mlog" lors de synchronisation avec ESP-01.  
  while(!bExit){
    while (Serial.available()) {
      sG1 = Serial.readString();
      mlog("a-sG1 :");mlog(sG1); mlog(" lengh :");mlogln((String)sG1.length());
      if(sG1.length() > 2){bRecu = true;}
      if(bRecu){
        sG2 = sG1.substring(0,3);
        int iG1 = sG2.toInt();
        mlog("b-iGl :");mlogln(iG1);
        switch (iG1) {     // G.1.5 prendre action selon code reçu
        case 191:
          // envoie SSID
          sG1 = "292:" + (String)cSSID;
          mlog("c-sG1 :");mlogln(sG1);
          Serial.println(sG1);
          delay(2000);
          // Envoie mot de passe
          sG1 = "293:" + (String)cPassw;
          mlog("d-sG1 :");mlogln(sG1);
          Serial.println(sG1);
          delay(2000);
          bExit=true; // sortir de l'initialisation
          break;
         default:
          break;
        } // end switch
 
       } // endif(bRecu)
      
    } //  while (Serial.available()
    bRecu = false;      
  } // while (!bExit)
 
 
  // Attends confirmation connection pour se synchroniser
  bRecu = false;
  bExit = false;
 
    while(!bExit){
      while (Serial.available()) {
        sG1 = Serial.readString();
        if(sG1.length() > 2){bRecu = true;}
        if(bRecu){
          sG2 = sG1.substring(0,3);
          int iG1 = sG2.toInt();
          switch (iG1) {     // G.1.5 prendre action selon code reçu
            case 192:
                bExit = true;
              break;
            default:
              break;
         } // end switch             
        } // enf if reçu
      } // end while (Serial.available())
      bRecu = false;
    } // while(!bExit){
 
  vClignote(6,500);
  delay(10000);
} // end set-up
 
 
void loop() {
 
  // A - Obtenir valeur des senseurs
  // A1 - Température et humidité ambiante
  if(true){
    uint32_t delayMS;
    dht.begin();
    sensor_t sensor;
    dht.temperature().getSensor(&sensor);
    delayMS = sensor.min_delay / 1000;    
 
    delay(delayMS); // Delay between measurements.
 
    // Get temperature event and print its value.
    sensors_event_t event;
    dht.temperature().getEvent(&event);
    if (isnan(event.temperature)) {
       iTe = -99;
    }
    else {
      iTe = event.temperature;
    }
    // Get humidity event and print its value.
    dht.humidity().getEvent(&event);
    if (isnan(event.relative_humidity)) {
       iHu = -1;
    }
    else {
       iHu = event.relative_humidity;
    }
  } // if(true)
 
  // A2 - Humidité Sol
//    iHuSol = 30;
  int iVal = analogRead(dHUMIDTESOL);
  mlogln("Valeur analog :" + String(iVal));
  int igCM_V12_sec = 450; // calibration
  int igCM_V12_eau = 928; // calibration
  iHuSol = map(iVal,igCM_V12_sec,igCM_V12_eau,0,100);
  mlog("iHuSol :");  mlogln(iHuSol); 
 
 
  // A2 - Photosensible
//    iPhoto = 67;
  iPhoto =  analogRead(dPHOTO);
  mlog("iPhoto :");  mlogln(iPhoto); 
//  convertion en lux...

  // Il faut envoyer 4 valeurs (301, 302, 304 & 399)
  // B - Envoyer valeur au ESP-01
  delay(3000);
  sG1 = "301:" + (String)iTe;
  LogSerial.println(sG1);
  delay(3000);
  sG1 = "302:" + (String)iHu;
  LogSerial.println(sG1);
  delay(3000);
  sG1 = "303:" + (String)iHuSol;
  LogSerial.println(sG1);
  delay(3000);
  sG1 = "304:" + (String)iPhoto;
  LogSerial.println(sG1);
  delay(3000); 
  sG1 = "399:Fin.";
  LogSerial.println(sG1);
  vClignote(3,1000);
 
  // Attendre avant de renvoyer l'info
  delay(50000);
 
} // void loop()
 
// /////////////////////////////////
void vClignote(int nF, int nTemps){
 
  if(nF >0){
    for(int i=0; i<nF; i++){
      digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
      delay(nTemps);                       // wait for a second
      digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
      delay(nTemps);                       // wait for a second   
    }
  } // end if(nF >0)
 
} // end vClignote(int nF, int nTemps)
