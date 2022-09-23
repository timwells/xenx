#include <Arduino.h>
#include <EEPROM.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>
// https://www.youtube.com/watch?v=cTfjqNFAkZ8


/*
1000 pulses = 1kWh; then 1 pulse = 1Wh = 3600 Ws
Measure the time between two pulses, "t" in seconds.
Then the approximate power at a given time is:
P = 3600 Ws / t

Example: t=10 s
P = 3600 Ws / 10 s = 360 W.

So the estimated power consumption Qh for one hour becomes:
Qh = P x 1h = 360 W x 1h = 360 Wh = 0.36 kWh

And the estimated power consumption Qd for one day becomes:
Qd = P x 24h = 360 W x 24h = 8640 Wh = 8.64 kWh

edit: A comment - hard to find a formula ? As soon as you get your SI units right, watt, seconds, meters, degrees, then you dont need to look up any formula. You just have to get the SI units to arrive at the "right places".

*/

#define LED 2 // Define blinking LED pin
#define DELAY  15000
#define DELAY__5 50
#define DELAY_5 500
#define DELAY1 1000
#define DELAY2 2000
#define DELAY5 5000
#define LIGHT_ON 200
#define VERSION "1.0"

#define MAX_WIFI_PROPERTY_DEFAULT 30
#define MAX_API_SCHEME_LENGTH     6
#define MAX_API_SUBDOMAIN_LENGTH  40
#define MAX_API_DOMAIN_LENGTH     40
#define MAX_API_SUBDIR_LENGTH     10
#define MAX_API_KEY_LENGTH        40

typedef struct { 
  char ssid[MAX_WIFI_PROPERTY_DEFAULT];
  char pwd[MAX_WIFI_PROPERTY_DEFAULT];
} WIFI;

typedef struct { 
  char scheme[MAX_API_SCHEME_LENGTH];
  char subdomain[MAX_API_SUBDOMAIN_LENGTH];
  char domain[MAX_API_DOMAIN_LENGTH];
  char subdir[MAX_API_SUBDIR_LENGTH];
  char apiKey[MAX_API_KEY_LENGTH];
} SERVICE;

typedef struct {
  WIFI wifi;
  SERVICE service;
} CONFIG;


#define ANALOG_PORT A0 /* ESP8266 Analog Pin ADC0 = A0 */

int adcValue = 0;  /* Variable to store Output of ADC */
CONFIG gConfig;
String gAPI;

void setup() {
  pinMode(LED, OUTPUT); // Initialize the LED pin as an output
  Serial.begin(115200);

  // Read Config from EEPROM
  memset(&gConfig, 0x0, sizeof(gConfig));
  
  EEPROM.begin(sizeof(CONFIG));
  EEPROM.get(0, gConfig); 

  gAPI = String(gConfig.service.scheme) + "://" 
           + String(gConfig.service.subdomain) + "." 
           + String(gConfig.service.domain) + "/" 
           + String(gConfig.service.subdir);

  WiFi.mode(WIFI_STA);
  WiFi.begin(gConfig.wifi.ssid, gConfig.wifi.pwd);

  while(WiFi.status() != WL_CONNECTED) {
    delay(DELAY_5);    
    // Serial.println("ssid: " + String(gConfig.wifi.ssid) + ", pwd: " + String(gConfig.wifi.pwd));
    // Serial.println("host: " + gAPI);  
    // Serial.println("apiKey: " + String(gConfig.service.apiKey));  
    pulseLed();
  }

  Serial.println("WiFi Connected");
}

void getVersion(String api) {
  std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
  client->setInsecure();  
  HTTPClient https;

  String versionAPI = api + "/version";
  
  if (https.begin(*client, versionAPI )) {
    int httpCode = https.GET();

    // httpCode will be negative on error
    if (httpCode > 0) {
      pulseLed();
      if (httpCode == HTTP_CODE_OK) {
        String payload = https.getString();
        Serial.println(String(payload));
      }
    } else {
      Serial.println("GET error: " + String(https.errorToString(httpCode).c_str()));
    }
    https.end();
  } else  {
    Serial.println("[HTTPS] Unable to connect");
  }
}

void postEvent(String api) {
  std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
  client->setInsecure();  
  
  String eventAPI = api + "/v1/event";
  HTTPClient https;
  
  if (https.begin(*client, eventAPI )) {
    // Specify content-type header
    https.addHeader("x-api-key", gConfig.service.apiKey);

    int httpCode = https.POST("");

    // httpCode will be negative on error
    if (httpCode > 0) {
      pulseLed();
      if (httpCode == HTTP_CODE_OK) {
        String payload = https.getString();
        Serial.println(String(payload));
      }
    } else {
      Serial.println("POST error: " + String(https.errorToString(httpCode).c_str()));
    }
    https.end();
  } else  {
    Serial.println("Unable to connect");
  }
}

void loop() {
  delay(DELAY__5);
  adcValue = analogRead(ANALOG_PORT);
  if(adcValue < LIGHT_ON) {
    postEvent(gAPI);
  } 
}

void pulseLed() {
  digitalWrite(LED, LOW);   // Turn the LED on (Note that LOW is the voltage level)
  delay(DELAY__5);          // Wait ...
  digitalWrite(LED, HIGH);  // Turn the LED off by making the voltage HIGH
}
