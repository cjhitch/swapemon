import React from 'react';
// eslint-disable-next-line
import { default as ProfComp } from '../../components/profile';
import Messages from '../../components/messages';
import './Profile.scss';

const Profile = () => {
	return (
		<section className="ProfilePage">
			<ProfComp />
			<Messages />
		</section>
	);
};

export default Profile;
