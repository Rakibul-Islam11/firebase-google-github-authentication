import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, GithubAuthProvider } from "firebase/auth";
import app from "./../firebageConfig";
import { useState } from "react";

const FromAuth = () => {
    const [logedIndUser, setLogedIndUser] = useState(null)//authentic data store state
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();//এটা google provider
    const githubProvider = new GithubAuthProvider();//এটা github provider

    const handleGGleSign = () => {
        signInWithPopup(auth, googleProvider)//(11)
            .then((result) => {//(22)
                const getLogIndUser = result.user;
                console.log(getLogIndUser);
                
                setLogedIndUser(getLogIndUser)
            })
            .catch((error) => {
                console.error("Error code:", error.code);
                console.error("Error message:", error.message);
            });
    };
    const handleGiteSign = () => {
        signInWithPopup(auth, githubProvider)// same as (11)
            .then(result => {//same as(22)
                const getLogIndUser = result.user;
                console.log(getLogIndUser);

                setLogedIndUser(getLogIndUser)
            })
            .catch((error) => {
                console.error("Error code:", error.code);
                console.error("Error message:", error.message);
            });
    }
    const handleSignOut = () => {
        signOut(auth)//(33)
            .then(result => {
                console.log(result);
                setLogedIndUser(null)
            })
            .catch(error => console.log(error)
            )
    }
   
    return (
        <div>
            <div>
                {
                    logedIndUser ? 
                        <button onClick={handleSignOut} className="py-2 px-4 bg-green-300 text-black">log out </button> :
                        <div>
                            <button onClick={handleGGleSign} className="py-2 px-4 bg-green-300 text-black"> log in google</button>
                            <button onClick={handleGiteSign} className="py-2 px-4 bg-green-300 text-black"> log in github</button>
                       </div>
                }
                {
                    logedIndUser ?
                    <div>
                            <p>name: {logedIndUser.displayName}</p>
                            <p>email: {logedIndUser.email}</p>
                            <div><img src={logedIndUser.photoURL} alt="" /></div>
                    </div> : ''
                }
            </div>
        </div>
    );
};

export default FromAuth;


// (11) ==> auth: এটি Firebase Authentication এর জন্য ইনিশিয়ালাইজড অবজেক্ট, যা আপনার Firebase অ্যাপের সাথে যুক্ত।
// googleProvider: এটি GoogleAuthProvider থেকে তৈরি করা প্রোভাইডার অবজেক্ট, যা Google সাইন - ইনের জন্য ব্যবহৃত হয়।



// (22) ==> then ব্লক:

// এটি সাইন - ইন সফল হলে কার্যকর হয়। আর এটার মদ্ধে
// result হলো একটি অবজেক্ট, যা লগইন করা ব্যবহারকারীর সমস্ত ডেটা ধারণ করে।
// result.user: লগইন করা ব্যবহারকারীর ইনফরমেশন যেমন নাম, ইমেল, প্রোফাইল ছবি ইত্যাদি ধারণ করে।



// (33) ==> Firebase সাইন - আউট
// javascript
// Copy code
// signOut(auth)
// signOut: এটি Firebase Authentication থেকে একটি ফাংশন, যা নির্দিষ্ট auth অবজেক্ট ব্যবহার করে লগইন থাকা ব্যবহারকারীকে সাইন আউট করে।
// auth: এটি Firebase এর ইনিশিয়ালাইজড Authentication অবজেক্ট, যা আপনার অ্যাপ্লিকেশনের লগইন সিস্টেম পরিচালনা করে।