/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import { fetchConversations } from '../../store/conversations/actions';
import User from '../user';
import Chat from '../chat';
import './Messages.scss';

const Messages = () => {
	const id = useSelector((state) => state.auth.id);
	const chats = useSelector((state) => state.conversations);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchConversations(id));
		// this should only run once to run similar to componentDidMount()
		// eslint-disable-next-line
	}, []);
	const [activeId, setActiveId] = useState(null);
	const [chat, setChat] = useState([
		{
			id: '',
			from: '',
			message: '',
		},
	]);
	const userClickHandler = (userId, convo) => {
		setChat(chats.byId[convo].data.Messages);
		setActiveId(userId);
	};
	return (
		<section className="Messages">
			<h1>Messages</h1>
			<div className="users">
				{Object.values(chats.byId).map((byId) => (
					<User
						activeChat={activeId}
						key={byId.data.id}
						username={byId.data.username}
						image={`${byId.data.otherUserId}.jpg`}
						userClickHandler={userClickHandler}
						conversationId={byId.data.id}
					/>
				))}
			</div>
			<Chat chat={chat} />
		</section>
	);
};

export default Messages;
