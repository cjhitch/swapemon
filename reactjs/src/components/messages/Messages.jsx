/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../API';
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
	const [activeId, setActiveId] = useState(
		sessionStorage.getItem('activeId') || null
	);
	const [chat, setChat] = useState([
		{
			id: '',
			from: '',
			message: '',
			conversationId: '',
		},
	]);
	useEffect(() => {
		if (!chats.isLoading) {
			console.log('not loading');
			if (sessionStorage.getItem('convo')) {
				if (chats.byId[sessionStorage.getItem('convo')]) {
					setChat(
						chats.byId[sessionStorage.getItem('convo')].data
							.Messages
					);
				}
			}
		}
	}, [chats]);
	const submitHandler = async (e, input) => {
		e.preventDefault();
		const newChats = chat;
		if (input !== '') {
			const post = {
				id: v4(),
				from: id,
				message: input,
				conversationId: chat[0].conversationId,
			};
			newChats.push(post);
			setChat(newChats);
			await API.post('/messages', { post });
			window.location.reload(false);
		} else {
			alert('you must enter a value!');
		}
	};
	const userClickHandler = (userId, convo) => {
		setChat(chats.byId[convo].data.Messages);
		setActiveId(userId);
		sessionStorage.setItem('activeId', userId);
		sessionStorage.setItem('convo', convo);
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
			<Chat submitHandler={submitHandler} chat={chat} />
		</section>
	);
};

export default Messages;
