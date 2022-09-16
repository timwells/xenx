#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>
// https://www.youtube.com/watch?v=cTfjqNFAkZ8

// https://buger.dread.cz/simple-esp8266-https-client-without-verification-of-certificate-fingerprint.html

// Const CG_PRICE_API As String = "https://api.coingecko.com/api/v3/simple/price"
// Dim PriceReq As String: PriceReq = CG_PRICE_API & "?ids=" & coinList & "&vs_currencies=gbp"
// coins = Array("ethereum", "bitcoin", "litecoin", "chainlink", "ripple", _
//                    "algorand", "polkadot", "cardano", "celo", "bitcoin-cash", _
//                    "uma", "filecoin", "omisego", "compound-governance-token", "stellar", _
//                    "basic-attention-token", "maker", "band-protocol", "eos", _
//                    "the-graph", "nucypher", "cosmos", "numeraire")

#define LED       2 // Define blinking LED pin
#define GEKCO_API "https://api.coingecko.com/api/v3/simple/price"
#define DELAY     15000

#define WIFI_AP "NG24"
#define WIFI_PWD "PASSWORD"

void setup() {
  pinMode(LED, OUTPUT); // Initialize the LED pin as an output

  Serial.begin(115200);
  Serial.println(F("\n\r***ESP BOOT ***"));
  Serial.println(F("WiFi begin"));
  WiFi.mode(WIFI_STA);  
  WiFi.begin(WIFI_AP, WIFI_PWD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    toggleLed();
  }
  Serial.println(F("\n\rWiFi connected!"));
}

void getPrice() {
  std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
  client->setInsecure();
  HTTPClient https;
  String url = "https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=gbp";
  
  if (https.begin(*client, url )) {
    int httpCode = https.GET();

    // httpCode will be negative on error
    if (httpCode > 0) {
      toggleLed();
      // HTTP header has been send and Server response header has been handled
      // Serial.printf("[HTTPS] GET... code: %d\n", httpCode);
      // file found at server?
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
  getPrice();
  delay(DELAY);
}

void toggleLed() {
  digitalWrite(LED, LOW);   // Turn the LED on (Note that LOW is the voltage level)
  delay(50);                // Wait for a second
  digitalWrite(LED, HIGH);  // Turn the LED off by making the voltage HIGH
  delay(50);                // Wait for two seconds
}
