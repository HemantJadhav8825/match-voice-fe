react-native.config.js
module.exports = {
  assets: ['./assets/fonts'],
};
mkdir -p assets/fonts
cp ./node_modules/react-native-vector-icons/Fonts/* ./assets/fonts/
npx react-native-asset
cd android
./gradlew clean
cd ..
npx react-native run-android



#console.log command
npx react-native log-android

ENVFILE=.env.development npx react-native run-android

#for release android
cd android && ENVFILE=.env.production ./gradlew assembleRelease