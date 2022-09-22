#include <EEPROM.h>

#define _XENX_API_SCHEME       "https"
#define _XENX_API_SUBDOMAIN    "xx-xxxxxxxx-xxxx-xxxxx"
#define _XENX_API_DOMAIN       "cloudfunctions.net"
#define _XENX_API_SUBDIR       "xxxx"
#define _XENX_API_VERSION_PATH "version"

#define _XENX_API_PULSE_PATH   "v1/event"
#define _XENX_API_KEY          "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
#define _WIFI_SSID             "vodafoneA8E74D"
#define _WIFI_PWD              "MXdmFfNfGbEetCme"

#define MAX_WIFI_PROPERTY_DEFAULT 30

#define MAX_API_SCHEME_LENGTH     6
#define MAX_API_SUBDOMAIN_LENGTH  40
#define MAX_API_DOMAIN_LENGTH     40
#define MAX_API_SUBDIR_LENGTH     10
#define MAX_API_KEY_LENGTH        40

#define WR_DATA_MODE 0
#define RD_DATA_MODE 1

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

CONFIG gConfig;

unsigned int gMode = WR_DATA_MODE;
// unsigned int gMode = RD_DATA_MODE;

void setup() {
  // Start the serial output
  Serial.begin(115200); 
  Serial.println("Setup....");

  if(WR_DATA_MODE == gMode) {
    EEPROM.begin(sizeof(CONFIG));

    // Clear Structure
    memset(&gConfig, 0x0, sizeof(gConfig));

    // Setup Wifi Data
    strcpy(gConfig.wifi.ssid,WIFI_SSID);
    strcpy(gConfig.wifi.pwd,WIFI_PWD);

    // Setup Host Data
    strcpy(gConfig.service.scheme,XENX_API_SCHEME);
    strcpy(gConfig.service.subdomain,XENX_API_SUBDOMAIN);
    strcpy(gConfig.service.domain,XENX_API_DOMAIN);
    strcpy(gConfig.service.subdir,XENX_API_SUBDIR);  
    strcpy(gConfig.service.apiKey,XENX_API_KEY);

    // Write data to array in ram 
    EEPROM.put(0, gConfig); 
    // Write data from ram to flash memory. 
    // Do nothing if there are no changes to EEPROM data in ram
    EEPROM.commit();
    EEPROM.end();
  }
}

CONFIG rConfig;
void loop() {
  EEPROM.begin(sizeof(CONFIG));

  gMode = RD_DATA_MODE;
  
  switch(gMode) {
    case RD_DATA_MODE: {
      memset(&rConfig, 0x0, sizeof(rConfig));
      EEPROM.get(0, rConfig); // Read Config
      
      Serial.println("ssid: " + String(rConfig.wifi.ssid) + ", pwd: " + String(rConfig.wifi.pwd));
      String api = String(rConfig.service.scheme) + "://" 
                    + String(rConfig.service.subdomain) + "." 
                    + String(rConfig.service.domain) + "/" 
                    + String(rConfig.service.subdir);
      Serial.println("host: " + api);  
      Serial.println("apiKey: " + String(rConfig.service.apiKey));  
    } break;
    default:
      Serial.println("Do Nothing!");      
  }      
  delay(5000);
}
