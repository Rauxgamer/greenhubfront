// Importa Firebase Functions
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Función para asignar el rol de "admin"
exports.setAdminRole = functions.https.onCall(async (data, context) => {
  const uid = data.uid;
  try {
    // Asigna el rol "admin" al usuario
    await admin.auth().setCustomUserClaims(uid, {role: "admin"});
    return {message: "Rol de admin asignado"};
  } catch (error) {
    console.error("Error al asignar el rol:", error);
    throw new functions.https.HttpsError("internal", "Error al asignar el rol");
  }
});
