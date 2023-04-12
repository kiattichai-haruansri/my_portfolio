import { db } from '@/confic/firebase';
import { getDocs, collection } from 'firebase/firestore';

const getSkilled = async() => {
    try {
        const snapshot = await getDocs(collection(db, "Skilled"));
        const skilledData = snapshot.docs.map(doc => ({ id: doc.id , ...doc.data() }));
        return skilledData;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export default getSkilled;
