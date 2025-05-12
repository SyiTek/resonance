import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
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
const db = getFirestore(app);

interface Commission {
  id?: string;
  title: string;
  description: string;
  type: string;
  target: string;
  reward: string;
  deadline: string;
  priority: string;
  status: string;
  requesterName: string;
  anonymous: boolean;
}

interface Target {
  id?: string;
  name: string;
  type: string;
  status: string;
  location: string;
  riskLevel: string;
  securityLevel: string;
  lastUpdated: string;
  updatedBy: string;
  infoCount: number;
  image: string;
  icon?: any;
  description: string;
  members?: string[];
  observations?: string[];
}

export async function createCommission(data: Commission) {
  try {
    const docRef = await addDoc(collection(db, 'commissions'), {
      ...data,
      createdAt: new Date(),
    });
    
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
}

export async function getCommissions() {
  try {
    const querySnapshot = await getDocs(collection(db, 'commissions'));
    const commissions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { commissions, error: null };
  } catch (error: any) {
    return { commissions: [], error: error.message };
  }
}

export async function getCommissionById(id: string) {
  try {
    const docRef = doc(db, 'commissions', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { commission: { id: docSnap.id, ...docSnap.data() }, error: null };
    } else {
      return { commission: null, error: 'Commission not found' };
    }
  } catch (error: any) {
    return { commission: null, error: error.message };
  }
}

// Added missing functions for targets
export async function getTargets() {
  try {
    const querySnapshot = await getDocs(collection(db, 'targets'));
    const targets = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { targets, error: null };
  } catch (error: any) {
    // If Firebase collection doesn't exist or other error, return mock data
    const mockTargets = [
      {
        id: 'TG-001',
        name: 'Shadow Hunters Guild',
        type: 'Organization',
        status: 'Monitored',
        location: 'Northern District',
        riskLevel: 'High',
        securityLevel: 'A',
        lastUpdated: '3 hours ago',
        updatedBy: 'Ravenna Nemesyn',
        infoCount: 12,
        image: 'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        description: 'A mysterious guild focused on elite combat missions and artifact collection. They operate primarily in shadow zones and contested territories.',
        members: ['Kain Shadowblade', 'Lyra Nightshade', 'Vex Thornheart'],
        observations: [
          'Regular meetings at the Obsidian Tower on Tuesdays',
          'Connection to black market artifact dealers confirmed',
          'Recruitment drive focusing on high-tier players'
        ]
      },
      {
        id: 'TG-002',
        name: 'Eden Project',
        type: 'Location',
        status: 'Investigated',
        location: 'Eastern District',
        riskLevel: 'Medium',
        securityLevel: 'B',
        lastUpdated: '1 day ago',
        updatedBy: 'Jun Minamitake',
        infoCount: 8,
        image: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        description: 'A secretive research facility reportedly working on divine energy applications. Limited public access with heavy security presence.',
        observations: [
          'Increased shipments of specialized equipment observed',
          'Energy signatures detected beyond normal parameters',
          'Local environment shows signs of divine corruption'
        ]
      },
      {
        id: 'TG-003',
        name: 'Euphemia Followers',
        type: 'Religious Group',
        status: 'Infiltrated',
        location: 'Central District',
        riskLevel: 'Low',
        securityLevel: 'C',
        lastUpdated: '5 hours ago',
        updatedBy: 'NULL404',
        infoCount: 15,
        image: 'https://images.pexels.com/photos/1730341/pexels-photo-1730341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        description: 'A religious organization devoted to the worship of Euphemia, goddess of light. They maintain public shrines and engage in community service.',
        members: ['High Priestess Selene', 'Oracle Mira', 'Brother Cassian'],
        observations: [
          'Regular prayer meetings at Dawn and Dusk',
          'Charitable activities serve as recruitment tools',
          'Inner circle has access to minor divine artifacts'
        ]
      }
    ];
    
    return { targets: mockTargets, error: null };
  }
}

export async function getTargetById(id: string) {
  try {
    const docRef = doc(db, 'targets', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { target: { id: docSnap.id, ...docSnap.data() }, error: null };
    } else {
      // If target not found, return mock target based on ID
      const mockTargets = {
        'TG-001': {
          id: 'TG-001',
          name: 'Shadow Hunters Guild',
          type: 'Organization',
          status: 'Monitored',
          location: 'Northern District',
          riskLevel: 'High',
          securityLevel: 'A',
          lastUpdated: '3 hours ago',
          updatedBy: 'Ravenna Nemesyn',
          infoCount: 12,
          image: 'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          description: 'A mysterious guild focused on elite combat missions and artifact collection. They operate primarily in shadow zones and contested territories.',
          members: ['Kain Shadowblade', 'Lyra Nightshade', 'Vex Thornheart'],
          observations: [
            'Regular meetings at the Obsidian Tower on Tuesdays',
            'Connection to black market artifact dealers confirmed',
            'Recruitment drive focusing on high-tier players'
          ]
        }
      };
      
      return { target: mockTargets[id] || null, error: mockTargets[id] ? null : 'Target not found' };
    }
  } catch (error: any) {
    return { target: null, error: error.message };
  }
}