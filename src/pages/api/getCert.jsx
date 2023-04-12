import { db } from '@/confic/firebase';
import { getDocs, collection } from 'firebase/firestore';

const getCert = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'Cert'));
    const certData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return certData;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getCertById = async (certId) => {
  try {
    const snapshot = await getDocs(collection(db, 'Cert'));
    const cert = snapshot.docs.find(doc => doc.id === certId);
    return cert?.data();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { getCert, getCertById };