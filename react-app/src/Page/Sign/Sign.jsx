import './Sign.css'
import Log from './../../assets/img/login.jpg'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase-config';
import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { FetchSpecGET, FetchSpec } from '../../Fetch';

// export function SignIn() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigation = useNavigate();

// useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if (user) {
//             navigation('/message');
//         }
//     });

//     return () => unsubscribe();
// }, [navigation]);


// const handleSignIn = async () => {
//     try {
//         setLoading(true);
//         setError(null);

//         await signInWithEmailAndPassword(auth, email, password);

//     } catch (error) {
//         console.error(error.message);
//         setError(error.message); // Afficher l'erreur à l'utilisateur
//     } finally {
//         setLoading(false);
//     }
// };

// const employer = {
//     email: e.target.querySelector(".email").value,
//     password: e.target.querySelector(".mdp").value
//   }
// FetchSpec({ path: "/auth/authenticate", method: "POST", requestBody: employer }).then((data) => {
//     if (data.length === 0) {
//       alert("Veuillez verifier vos informations")
//     } else {
//       console.log(data.token);
//       localStorage.setItem("token", data.token);
//       // window.location = '/Home';
//       navigation('/home')
//     }
//   });



//     return (
//         <>
//             <div className='box-sign'>
//                 <img className='left' src={Log} alt="" />
//                 <form className='right'>
//                     <div className='title'>Sign In</div>
//                     <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
//                     <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
//                     <div className='box-button'>
//                         <div className='button-sign' onClick={handleSignIn}>
//                             {loading ? 'Signing in...' : 'Sign in'}
//                         </div>
//                     </div>
//                     {error && <div className="error-message">{error}</div>} {/* Afficher l'erreur */}
//                     <div className='switch-sign' onClick={() => {
//                         navigation('/')
//                     }}>
//                         <span> {`<`} </span>
//                         <span>Home</span>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// }


export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const employer = {
            email: e.target.querySelector(".email").value,
            password: e.target.querySelector(".mdp").value
        }
        FetchSpec({ path: "/auth/authenticate", method: "POST", requestBody: employer }).then((data) => {
            if (data.length === 0) {
                alert("Veuillez verifier vos informations")
            } else {
                console.log(data.token);
                // localStorage.setItem("token", data.token);
                // window.location = '/Home';
                // navigation('/home')
            }
        });
    }




    return (
        <>
            <div className='box-sign'>
                <img className='left' src={Log} alt="" />
                <form className='right' onSubmit={handleSubmit}>
                    <div className='title'>Sign In</div>
                    <input value={"heja@gmail.com"} type="email" placeholder='Email' onChange={handleChange} />
                    <input value={"0000"} type="password" placeholder='Password' onChange={handleChange} />
                    <div className='box-button'>
                        <div className='button-sign'>
                            Sign in
                        </div>
                    </div>
                    {error && <div className="error-message">{error}</div>} {/* Afficher l'erreur */}
                    <div className='switch-sign' onClick={() => {
                        navigation('/')
                    }}>
                        <span> {`<`} </span>
                        <span>Home</span>
                    </div>
                </form>
            </div>
        </>
    );
}


//deconnexion
// const signOut = () => {
//     localStorage.removeItem("up");
//     auth.signOut();
// }


