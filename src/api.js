import { initializeApp} from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc, 
  doc,
  setDoc,
  where,
  query,
  getCountFromServer,
  orderBy,
  updateDoc
} from "firebase/firestore"
import { 
  getAuth, 
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  AuthErrorCodes
} from "firebase/auth";

  // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh38zGD5mkZSlaDE1qc6asr_7NHZRDmBU",
  authDomain: "react-van-life.firebaseapp.com",
  projectId: "react-van-life",
  storageBucket: "react-van-life.appspot.com",
  messagingSenderId: "170214849018",
  appId: "1:170214849018:web:c85f0d2d1a02a971a24c43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const vansCollectionRef = collection(db, "vans")
const userCollectionRef = collection(db, "user")
const auth = getAuth(app);
//connectAuthEmulator(auth, "http://localhost:9099") //run auth locally and does not disturb production data.

export async function getVans(){
    console.log("get vans : called")
    const snapShot = await getDocs(vansCollectionRef)
    const dataArr = snapShot.docs.map(doc=>({
            id: doc.id, 
            ...doc.data()
        }))
    console.log(dataArr)
    return dataArr;
}

export async function getVan(id){
  console.log("get van : called", id)
  const docRef = doc(db, "vans", id)
  try{
    const docSnap = await getDoc(docRef)
    if(!docSnap.exists()) throw new Error("Van not found")
    const data = {
      id: docSnap.id,
      ...docSnap.data()
    }
    return data
  }catch(error){
    console.log(error)
    throw new Error(error.message)
  }
}

export async function getUserVans(uid){
  console.log("get user vans : called on uid:", uid)
  const q = query(vansCollectionRef, where("hostId","==",uid))
  const snapShot = await getDocs(q)
  const dataArr = snapShot.docs.map(doc=>({
        id: doc.id, 
        ...doc.data()
      }))
  console.log(dataArr)
  return dataArr;
}

export async function getUserReviews(uid){
  console.log("get reviews : called on uid:", uid)
  const reviewsRef = collection(db, `/user/${uid}/Reviews`)
  const q = query(reviewsRef)
  const snapShot = await getDocs(q)
  const dataArr = snapShot.docs.map(doc=>({
    id: doc.id,
    ...doc.data()
  }))
  console.log(dataArr)
  return dataArr;
}

export async function getUserReviewsStats(uid){
  const reviewsRef = collection(db, `/user/${uid}/Reviews`)
  const dataArr = []
  for (let index = 0; index < 5; index++) {
    const q = query(reviewsRef, where("rating","==",5-index))
    const snapShot = await getCountFromServer(q)
    dataArr.push(snapShot.data().count)
  }
  console.log(dataArr)
  return dataArr;
}

export async function getUserOverviewStats(uid){
  console.log("get overview stats : called on uid:", uid)
  const userRef = doc(db, "user", uid)
  const snapShot = await getDoc(userRef)
  console.log(snapShot.data())
  return snapShot.data()
}

export async function getUserIncome(uid){
  console.log("getUserIncome: called on uid:", uid)
  const incomeCollection = collection(db, `/user/${uid}/Transcations`)
  const q = query(incomeCollection, orderBy("time","desc"))
  const snapShot = await getDocs(q)
  const dataArr = snapShot.docs.map(transaction=>({
    id: transaction.id,
    ...transaction.data()
  }))
  console.log(dataArr)
  return dataArr
}

export async function writeVanData(vanId, name, type, description, visibility ){
  const docRef = doc(db, "vans", vanId)
  console.log("write called: vanID:",vanId,`name ${name} type${type} visibility${visibility} description${description}`)
  const response = await updateDoc(docRef, {
      name,
      type, 
      description,
      visibility
    }
  )
  return response
}

export async function loginEmailPassword(loginEmail, loginPassword){
  try{
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential);
    return userCredential
  //  return userCredential
  }catch(error){
    if (error.code == AuthErrorCodes.INVALID_PASSWORD)
      throw new Error("Incorrect Email or Password")
    else 
      throw new Error("Login Failed")
  }
}

export async function signUpEmailPassword(signUpEmail,signUpPassword){
  try{
    const result = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    return result
  }catch(error){
    console.log(error)
    throw new Error(error.code)
  }
}

export function monitorAuthState(setUserState){
  return onAuthStateChanged(auth, user=>{
    if(user){
      setUserState(user)
    }else{
      setUserState(null)
    }
  })
}

export async function logout(){
  try{
    await signOut(auth)
    return true
  }catch(error){
    throw new Error("fail to log out")
  }
}