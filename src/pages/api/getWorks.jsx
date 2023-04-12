import { db } from '@/confic/firebase';
import { getDocs, collection } from 'firebase/firestore';

const getWorks = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'Projects'));
    const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projectsData;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getProjectById = async (projectId) => {
  try {
    const snapshot = await getDocs(collection(db, 'Projects'));
    const project = snapshot.docs.find(doc => doc.id === projectId);
    return project?.data();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { getWorks, getProjectById };