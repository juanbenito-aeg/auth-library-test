import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Button, Text, View } from "react-native";
import { useEffect, useState } from "react";

GoogleSignin.configure({
  webClientId:
    "899168277615-uhsavqa1i80ui8dk08cggm9q8g99ld0j.apps.googleusercontent.com",
});

function GoogleSignIn() {
  const [user, setUser] = useState();

  function handleAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
  }, []);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();

    const idToken = signInResult.data?.idToken;

    // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return signInWithCredential(getAuth(), googleCredential);
  }

  if (!user) {
    return (
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log("Signed in with Google!")
          )
        }
      />
    );
  } else {
    return (
      <View>
        <Text>Hey, {user.displayName}!</Text>
      </View>
    );
  }
}

export default GoogleSignIn;
