import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { login } from '../../features/user/userSlice';
import './Login.css';
import { useDispatch } from 'react-redux';

function Login() {
	const dispatch = useDispatch();

	const signInWithGoogle = function (e) {
		e.preventDefault();
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;
				dispatch(
					login({
						email: user.email,
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					})
				);
				console.log(user);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className='wrapper'>
			<div className='login'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg'
					alt='not found'
				/>

				<button onClick={signInWithGoogle}>Sign In with Google</button>
			</div>
		</div>
	);
}

export default Login;
