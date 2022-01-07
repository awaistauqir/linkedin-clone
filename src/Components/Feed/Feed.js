import React, { useEffect, useState, useRef } from 'react';
import './Feed.css';
import CreateIcon from '@material-ui/icons/Create';
import InputOption from '../UI/InputOption';
import PhotoIcon from '@material-ui/icons/Photo';
import PlayFilledIcon from '@material-ui/icons/PlayCircleFilled';
import EventIcon from '@material-ui/icons/Event';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Post from '../Post/Post';
import { db } from '../Firebase/Firebase';
import {
	doc,
	setDoc,
	onSnapshot,
	collection,
	query,
	orderBy,
} from 'firebase/firestore';
import { serverTimestamp } from '@firebase/firestore';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

function Feed() {
	const [posts, setPosts] = useState([]);
	const [inputMessage, setInputMessage] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const messageInputRef = useRef();
	const user = useSelector((state) => state.user.user);

	useEffect(() => {
		console.log('useEffect running');

		onSnapshot(
			query(collection(db, 'posts'), orderBy('timeStamp', 'desc')),
			(snapShot) => {
				setPosts(
					snapShot.docs.map((doc) => {
						return {
							id: doc.id,
							data: doc.data(),
						};
					})
				);
				setIsLoading(false);
			}
		);
	}, []);
	const formSubmitHandler = async (event) => {
		event.preventDefault();
		// await setDoc(doc(db, 'posts', 'awais'), {
		//   name: 'awais',
		//   description: 'this is a test',
		//   message: messageInputRef.value,
		// });
		console.log(messageInputRef.current.value);
		const newPostRef = doc(collection(db, 'posts'));
		if (messageInputRef.current.value.trim().length > 0) {
			await setDoc(newPostRef, {
				name: user.displayName,
				description: 'LinkedIn Web',
				message: messageInputRef.current.value.trim() || 'Empty Post',
				photoUrl: user.photoURL,
				timeStamp: serverTimestamp(),
			});
			messageInputRef.current.value = '';
			setInputMessage('');
		}
	};
	return (
		<div className='feed'>
			<div className='feed__inputContainer'>
				<div className='feed__input'>
					<CreateIcon />
					<form>
						<input
							type='text'
							ref={messageInputRef}
							onChange={(e) => {
								console.log(e.target.value);
								setInputMessage(e.target.value);
							}}
							value={inputMessage}
						/>
						<button type='submit' onClick={formSubmitHandler}>
							Send
						</button>
					</form>
				</div>
				<div className='feedInput__Options'>
					<InputOption title='Photo' Icon={PhotoIcon} color='#70B5F9' />
					<InputOption title='Video' Icon={PlayFilledIcon} color='#7FC15E' />
					<InputOption title='Event' Icon={EventIcon} color='#E7A33E' />
					<InputOption
						title='Write Article'
						Icon={CalendarViewDayIcon}
						color='#FC9295'
					/>
				</div>
			</div>
			{isLoading && (
				<div className='feed__Loading'>
					<CircularProgress />
				</div>
			)}

			{!isLoading &&
				posts.map(({ id, data: { name, message, description, photoUrl } }) => (
					<Post
						key={id}
						name={name}
						message={message}
						description={description}
						photoURL={photoUrl}
					/>
				))}
		</div>
	);
}

export default Feed;
