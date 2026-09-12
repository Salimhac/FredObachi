import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  increment,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDocFromServer,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { TributeNote } from '../types';
import { INITIAL_TRIBUTES } from '../data/machokaData';

// Initialize Firebase App
const app = !getApps().length
  ? initializeApp({
      projectId: firebaseConfig.projectId,
      appId: firebaseConfig.appId,
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId,
    })
  : getApp();

// Target provisioned Firestore Database
export const db = getFirestore(
  app,
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
    ? firebaseConfig.firestoreDatabaseId
    : '(default)'
);

// Health check connection test as required by Firebase skill
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, '_health', 'probe'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is currently offline or unreachable.');
      return false;
    }
    // Any permission/not-found error means server contacted successfully
    return true;
  }
}

// Subscribe in real-time to public tributes
export function subscribeToLiveTributes(
  callback: (tributes: TributeNote[]) => void,
  fallbackCallback?: (err: unknown) => void
) {
  try {
    const q = query(collection(db, 'tributes'), orderBy('createdAt', 'desc'), limit(100));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          // If Firestore collection is empty, seed with initial authentic tributes
          callback(INITIAL_TRIBUTES);
          return;
        }

        const items: TributeNote[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            name: d.author || d.name || 'Anonymous Contributor',
            location: d.location || 'Kenya',
            message: d.message || '',
            category: (d.category as any) || 'Congratulations',
            date: d.date || 'Recent Tribute',
            likes: typeof d.likes === 'number' ? d.likes : 0,
          };
        });

        // Merge initial tributes if they aren't in firestore yet
        const combined = [...items];
        for (const init of INITIAL_TRIBUTES) {
          if (!combined.some((c) => c.id === init.id || (c.name === init.name && c.message === init.message))) {
            combined.push(init);
          }
        }

        callback(combined);
      },
      (err) => {
        console.warn('Firestore snapshot error, falling back to local tributes:', err);
        if (fallbackCallback) fallbackCallback(err);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Failed to setup Firestore tributes subscription:', err);
    if (fallbackCallback) fallbackCallback(err);
    return () => {};
  }
}

// Add a live tribute to Firestore
export async function submitLiveTribute(note: {
  name: string;
  location: string;
  category: 'Congratulations' | 'Memory' | 'Gratitude';
  message: string;
  date: string;
}): Promise<string> {
  const categoryMap: Record<string, string> = {
    Congratulations: 'radio-fan',
    Memory: 'radio-fan',
    Gratitude: 'radio-fan',
  };

  const payload = {
    author: note.name.trim(),
    location: note.location.trim() || 'Kenya',
    category: categoryMap[note.category] || 'radio-fan',
    message: note.message.trim(),
    date: note.date,
    likes: 0,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, 'tributes'), payload);
  return docRef.id;
}

// Increment likes on a live tribute
export async function likeLiveTribute(tributeId: string): Promise<void> {
  // If it's a Firestore-stored doc
  if (!tributeId.startsWith('trib-seed-')) {
    try {
      const docRef = doc(db, 'tributes', tributeId);
      await updateDoc(docRef, {
        likes: increment(1),
      });
      return;
    } catch (e) {
      console.warn('Could not update like in Firestore:', e);
    }
  }
}
