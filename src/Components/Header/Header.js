import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HeaderOption from './HeaderOption';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useDispatch } from 'react-redux';
import { logout, selectUser } from '../../features/user/userSlice';
import { getAuth, signOut } from '@firebase/auth';
import { useSelector } from 'react-redux';

function Header() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	console.log(user);
	const logoutToApp = function () {
		dispatch(logout());
		const auth = getAuth();
		signOut(auth);
	};
	return (
		<header className='header'>
			<div className='header__left'>
				<img
					src='https://cdn-icons-png.flaticon.com/512/174/174857.png'
					alt='linkedin'
				/>
				<div className='header__search'>
					<SearchIcon />
					<input type='text' name='' id='' placeholder='Search' />
				</div>
			</div>
			<div className='header__right'>
				<HeaderOption title={'Home'} Icon={HomeIcon} />
				<HeaderOption title={'My Network'} Icon={SupervisorAccountIcon} />
				<HeaderOption title={'Jobs'} Icon={BusinessCenterIcon} />
				<HeaderOption title={'Messaging'} Icon={ChatIcon} />
				<HeaderOption title={'Notification'} Icon={NotificationsIcon} />
				<HeaderOption
					title={'Me'}
					AvatarTitle={user ? user.displayName.toUpperCase() : '?'}
					onClick={logoutToApp}
				/>
			</div>
		</header>
	);
}

export default Header;
