import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBQc0jsutl-ArLmAWkbab3Y9e8Y_lIQ-Vg',
  authDomain: 'buybusy-940c8.firebaseapp.com',
  projectId: 'buybusy-940c8',
  storageBucket: 'buybusy-940c8.appspot.com',
  messagingSenderId: '395412127225',
  appId: '1:395412127225:web:63e0e5073084a731555128',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
