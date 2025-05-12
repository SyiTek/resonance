// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, query, where, orderBy } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWWtvJa3e41liC7PfORvPzXTg1-CDO8Us",
  authDomain: "resonance-fa2ae.firebaseapp.com",
  projectId: "resonance-fa2ae",
  storageBucket: "resonance-fa2ae.firebasestorage.app",
  messagingSenderId: "216338807249",
  appId: "1:216338807249:web:33d352d7ccdf7d5180c8f0",
  measurementId: "G-NMRSZ0V5XP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
let db;

// Only initialize analytics on the client side
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
  db = getFirestore(app);
} else {
  db = getFirestore(app);
}

// Commission-related functions
export async function getCommissions() {
  try {
    const commissionsRef = collection(db, "commissions");
    const commissionsQuery = query(commissionsRef, orderBy("deadline", "asc"));
    const snapshot = await getDocs(commissionsQuery);
    
    const commissions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { commissions, error: null };
  } catch (error) {
    console.error("Error getting commissions:", error);
    return { commissions: [], error: error.message };
  }
}

export async function createCommission(commissionData) {
  try {
    const commissionsRef = collection(db, "commissions");
    const docRef = await addDoc(commissionsRef, {
      ...commissionData,
      createdAt: new Date(),
    });
    
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error("Error creating commission:", error);
    return { id: null, error: error.message };
  }
}

// Target-related functions
export async function getTargets() {
  try {
    const targetsRef = collection(db, "targets");
    const snapshot = await getDocs(targetsRef);
    
    const targets = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { targets, error: null };
  } catch (error) {
    console.error("Error getting targets:", error);
    return { targets: [], error: error.message };
  }
}

export async function getTargetById(targetId) {
  try {
    const targetRef = doc(db, "targets", targetId);
    const snapshot = await getDoc(targetRef);
    
    if (!snapshot.exists()) {
      return { target: null, error: "Target not found" };
    }
    
    return { 
      target: {
        id: snapshot.id,
        ...snapshot.data()
      }, 
      error: null 
    };
  } catch (error) {
    console.error("Error getting target:", error);
    return { target: null, error: error.message };
  }
}

export { app, analytics, db }; 