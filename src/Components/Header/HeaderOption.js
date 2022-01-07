import React from 'react';
import './HeaderOption.css';
import Avatar from '@material-ui/core/Avatar';

function HeaderOption({ Icon, title, AvatarTitle, onClick }) {
	return (
		<div className='headerOption' onClick={onClick}>
			{Icon && <Icon className='headerOption__icon' />}
			{AvatarTitle && (
				<Avatar className='headerOption__icon' alt={AvatarTitle} src='./sa' />
			)}
			<h3 className='headerOption__title'>{title}</h3>
		</div>
	);
}

export default HeaderOption;
