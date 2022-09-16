#include <Arduino.h>

#define DELAY1 100

void setup() {
  pinMode(LED, OUTPUT); // Initialize the LED pin as an output
  Serial.begin(115200);
  Serial.println(F("\n\r*** ESP01 BOOT ***"));
}

void toggleLed() {
  digitalWrite(LED, LOW);   // Turn the LED on (Note that LOW is the voltage level)
  delay(DELAY1);                // Wait for a second
  digitalWrite(LED, HIGH);  // Turn the LED off by making the voltage HIGH
  delay(DELAY1);                // Wait for two seconds
}


void loop() {
toggleLed()
}

