import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'CookingBeluga',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
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
