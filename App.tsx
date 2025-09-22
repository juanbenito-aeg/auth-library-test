// import {
//   GoogleAuthProvider,
//   getAuth,
//   signInWithCredential,
//   onAuthStateChanged,
// } from "@react-native-firebase/auth";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { Button, Text, View } from "react-native";
// import { useEffect, useState } from "react";

// GoogleSignin.configure({
//   webClientId:
//     "899168277615-uhsavqa1i80ui8dk08cggm9q8g99ld0j.apps.googleusercontent.com",
// });

// function GoogleSignIn() {
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   function handleAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
//     return subscriber;
//   }, []);

//   async function onGoogleButtonPress() {
//     // Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     // Get the users ID token
//     const signInResult = await GoogleSignin.signIn();
//     console.log(signInResult);
//     const idToken = signInResult.data?.idToken;

//     // Create a Google credential with the token
//     const googleCredential = GoogleAuthProvider.credential(idToken);

//     // Sign-in the user with the credential
//     return signInWithCredential(getAuth(), googleCredential);
//   }

//   if (initializing) return null;

//   if (!user) {
//     return (
//       <View style={{ marginTop: 100 }}>
//         <Button
//           title="Google Sign-In"
//           onPress={() =>
//             onGoogleButtonPress().then(() =>
//               console.log("Signed in with Google!")
//             )
//           }
//         />
//       </View>
//     );
//   } else {
//     return (
//       <View>
//         <Text>Hey, {user.displayName}!</Text>
//       </View>
//     );
//   }
// }

// export default GoogleSignIn;

import { GoogleAuth, GoogleAuthScopes } from "react-native-google-auth";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    configureGoogleAuth();
  }, []);

  const configureGoogleAuth = async () => {
    try {
      await GoogleAuth.configure({
        webClientId:
          "899168277615-uhsavqa1i80ui8dk08cggm9q8g99ld0j.apps.googleusercontent.com",
        scopes: [GoogleAuthScopes.EMAIL, GoogleAuthScopes.PROFILE],
      });
      console.log("Google Auth configured successfully");
    } catch (error) {
      console.error("Google Auth configuration failed:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await GoogleAuth.signIn();
      console.log(response);
      if (response.type === "success") {
        console.log("User signed in:", response.data.user);
        // Handle successful sign-in
        setUser(response.data.user);
      } else if (response.type === "cancelled") {
        console.log("Sign in cancelled by user");
      }
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  if (!user) {
    return (
      <View style={{ marginTop: 100 }}>
        <Button title="Log in" onPress={handleGoogleSignIn} />
      </View>
    );
  } else {
    return <Text>Hey, {user.name}</Text>;
  }
}
