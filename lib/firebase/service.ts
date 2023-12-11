import { collection, doc, getDocs, getDoc, getFirestore, query, where, addDoc } from "firebase/firestore";
import app from "./init"
import bcrypt from "bcrypt"

const firestore = getFirestore(app)


export async function signUp(userData: {
    email : string, 
    fullname:string, 
    password:string,
  }) { 
    const q = query(
      collection(firestore, "users"), 
      where("email", "==", userData.email)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
    }))
    if(data.length > 0){
      return {status:false,message:"Email sudah terdaftar", statusCode:400}
    }else{
      userData.password = await bcrypt.hash(userData.password, 10);
      await addDoc(collection(firestore, "users"), userData)
       .then(()=>{
        return {status:true,message:"Berhasil", statusCode:200}
       })
       .catch((error)=>{
        return {status:false,message:error.message, statusCode:400 }
       })
    }
} 

export async function signIn(userData : {email : string}){
  const q = query(
    collection(firestore, "users"), 
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc)=>({
      id: doc.id,
      ...doc.data(),
  }))

  if (data) {
    return data[0];
  } else {
    return null;
  }
}
