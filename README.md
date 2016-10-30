# Path Timer
Displays what time you need to leave to make the PATH on time.

## Development Environment Setup
 - Install Android Studio and make sure the SDKs are installed as well
 - Add `ANDROID_HOME` to your path. E.g. `export ANDROID_HOME=/home/me/Android/Sdk`
 - Make sure react-native is installed globally `npm install -g react-native`
 - Install node dependencies `npm install`
 - Launch the packager via `npm start`
 - Start the emulator and run `react-native run-android` to push the app to the emulator

## Development Server
To start the development server:

```
cd server/
./gradlew run
```

## Fetching Schedule Information
To fetch a schedule, follow the template below:

```
GET api/schedule?from=WORLD_TRADE_CENTER&to=JOURNAL_SQUARE&departAt=2016-10-29T23:03:27.845Z
```

Note: the `departAt` parameter is optional. It will assume the current time if omitted.

Here is the list of valid `from` and `to` parameters.
```
HOBOKEN
CHRISTOPHER_STREET
NINTH_STREET
FOURTEENTH_STREET
TWENTY_THIRD_STREET
THIRTY_THIRD_STREET
NEWPORT
EXCHANGE_PLACE
NEWARK
JOURNAL_SQUARE
GROVE_STREET
WORLD_TRADE_CENTER
HARRISON
```
