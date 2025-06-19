import firebaseAdmin from './firebase-init.js';

const db = firebaseAdmin.firestore();
const doges = db.collection('doges');

const getDogeCounter = async (userId: string): Promise<number> => {
  const snap = await doges.doc(userId).get();
  return typeof snap.get('dogeCounter') === 'number' ? snap.get('dogeCounter') : 0;
};

const setDogeCounter = async (userId: string, userName: string): Promise<void> => {
  await doges
    .doc(userId)
    .set({ username: userName, dogeCounter: firebaseAdmin.firestore.FieldValue.increment(1) }, { merge: true });
};

export { getDogeCounter, setDogeCounter };
