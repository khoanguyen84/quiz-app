import React from "react";
import firebase, { auth, db } from "../../firebase/config";
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const googleProvider = new firebase.auth.GoogleAuthProvider();

function Login() {
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(googleProvider);
        console.log(user);
        if(additionalUserInfo?.isNewUser){
            await addDoc(collection(db, 'users'), {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo?.providerId
            })
        }
        navigate('/setting')
    }
    return (
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <div className="row col-sm-6 mt-5 border border-success py-5 px-3">
                <h1 className="text-center text-success">QUIZ APP</h1>
                <button type="button" className="btn btn-success btn-block my-4" onClick={handleGoogleLogin}>
                    <i className="fab fa-google me-2"/>
                    Login With Google
                </button>
            </div>
        </div>
    )
}

export default Login;