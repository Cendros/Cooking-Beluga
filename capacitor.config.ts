import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.beluga.cookingbeluga',
    appName: 'Cooking Beluga',
    webDir: 'dist',
    server: {
        url: "http://192.168.1.12:8100",
        cleartext: true
    },
    plugins: {
        CapacitorSQLite: {
            iosDatabaseLocation: 'Library/CapacitorDatabase',
            iosIsEncryption: true,
            iosKeychainPrefix: 'angular-sqlite-app-starter',
            iosBiometric: {
                biometricAuth: false,
                biometricTitle : "Biometric login for capacitor sqlite"
            },
            androidIsEncryption: true,
            androidBiometric: {
                biometricAuth : false,
                biometricTitle : "Biometric login for capacitor sqlite",
                biometricSubTitle : "Log in using your biometric"
            }
        }
    }
};

export default config;
