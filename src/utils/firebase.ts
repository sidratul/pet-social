// https://firebase.google.com/docs/auth/admin/errors

const messages: Record<string, string> = {
  "auth/email-already-in-use": "User already exists",
  "auth/email-already-exists": "User already exists",
  "auth/user-not-found": "User not found",
  "auth/invalid-credential": "Wrong email or password",
  "auth/wrong-password": "Wrong email or password",
  "auth/invalid-id-token": "invalid user",

}

export const getFirebaseMessage = (code: string = '') => {
  return code && messages[code] || "Internal Error";
}