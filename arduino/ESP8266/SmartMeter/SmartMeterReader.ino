#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>
// https://www.youtube.com/watch?v=cTfjqNFAkZ8

#define LED 2 // Define blinking LED pin
#define DELAY  15000
#define DELAY2 2000
#define DELAY3 10
#define LIGHT_ON 350

#define XENX_API_VERSION "https://xxxxx"
#define XENX_API_PULSE   "https://xxxxx"
#define WIFI_AP "XXX"
#define WIFI_PWD "XXXXXXX"
#define API_KEY "XXXXXXXXXX"

#define VERSION "1.1"

#define ANALOG_PORT A0 /* ESP8266 Analog Pin ADC0 = A0 */

int adcValue = 0;  /* Variable to store Output of ADC */

void setup() {
  pinMode(LED, OUTPUT); // Initialize the LED pin as an output
  Serial.begin(115200);
  Serial.println(F("\n\r*** ESP01 BOOT ***"));
  Serial.println(F(VERSION));
  
  Serial.println(F("WiFi Begin"));
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_AP, WIFI_PWD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    toggleLed();
  }
  Serial.println(F("\n\rWiFi connected!"));
  Serial.println(F("\n\rVersion: "));
  Serial.println(F(VERSION));
}

void getVersion() {
  std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
  client->setInsecure();
  
  HTTPClient https;
  String url = XENX_API_VERSION;
  
  if (https.begin(*client, url )) {
    int httpCode = https.GET();

    // httpCode will be negative on error
    if (httpCode > 0) {
      toggleLed();
      if (httpCode == HTTP_CODE_OK) {
        String payload = https.getString();
        Serial.println(String(payload));
      }
    } else {
      Serial.printf("[HTTPS] GET... failed, error: %s\n\r", https.errorToString(httpCode).c_str());
    }
    https.end();
  } else  {
    Serial.printf("[HTTPS] Unable to connect\n\r");
  }
}

void postPulse(char *api) {
  std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
  client->setInsecure();
  
  HTTPClient https;
  if (https.begin(*client, api )) {
    // Specify content-type header
    https.addHeader("x-api-key", API_KEY);
    int httpCode = https.POST("");

    // httpCode will be negative on error
    if (httpCode > 0) {
      toggleLed();
      if (httpCode == HTTP_CODE_OK) {
        String payload = https.getString();
        Serial.println(String(payload));
      }
    } else {
      Serial.printf("[HTTPS] GET... failed, error: %s\n\r", https.errorToString(httpCode).c_str());
    }
    https.end();
  } else  {
    Serial.printf("[HTTPS] Unable to connect\n\r");
  }
}


void loop() {
  // getVersion();    
  delay(DELAY3);
  
  /* Read the Analog Input value */
  adcValue = analogRead(ANALOG_PORT);
  Serial.println(adcValue);
  /*
  if(adcValue > LIGHT_ON) {
    Serial.print("ADC Value = ");
    Serial.println(adcValue);
    postPulse(XENX_API_PULSE);
  } 
  */ 
}

void toggleLed() {
  digitalWrite(LED, LOW);   // Turn the LED on (Note that LOW is the voltage level)
  delay(50);                // Wait for a second
  digitalWrite(LED, HIGH);  // Turn the LED off by making the voltage HIGH
  delay(50);                // Wait for two seconds
}
