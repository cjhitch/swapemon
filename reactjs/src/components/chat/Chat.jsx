import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import { fetchConversations } from '../../store/conversations/actions';
import './Chat.scss';

const Chat = () => {
	const id = useSelector((state) => state.auth.id);
	const chat = useSelector((state) => state.conversations);
	// eslint-disable-next-line no-unused-vars
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchConversations(id));
		// dispatch();
	}, []);
	// this will be replaced by the store and db
	// const chat = [
	// 	{
	// 		id: 'a54aa11a-2597-41a4-965a-b96350261e24',
	// 		messages: [
	// 			{
	// 				user: 0,
	// 				msg: 'Hey do you have any dream balls to trade for?',
	// 			},
	// 			{
	// 				user: 1,
	// 				msg: 'No sorry is there anything else you want?',
	// 			},
	// 			{
	// 				user: 0,
	// 				msg: "I am at work I'll check when I get home",
	// 			},
	// 			{
	// 				user: 0,
	// 				msg: "Sorry I couldn't find any",
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: 'b9d2c918-ad14-41fe-8877-5143bff92463',
	// 		messages: [
	// 			{
	// 				user: 1,
	// 				msg: 'Hey do you have any safari balls to trade for?',
	// 			},
	// 			{
	// 				user: 0,
	// 				msg: 'Yes does tonight work?',
	// 			},
	// 			{
	// 				user: 1,
	// 				msg: "Yes! Let's trade when I get home tonight",
	// 			},
	// 			{
	// 				user: 1,
	// 				msg: 'Did you still have time to trade tonight?',
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: '36d314e3-03c9-4e1c-9e48-45f71642b8c7',
	// 		messages: [
	// 			{
	// 				user: 0,
	// 				msg: 'Hey do you have any moon balls to trade for?',
	// 			},
	// 			{
	// 				user: 1,
	// 				msg: "Here's my list let me know what you want",
	// 			},
	// 			{
	// 				user: 0,
	// 				msg: "Cool I'd like your charmander in the moon ball",
	// 			},
	// 			{
	// 				user: 0,
	// 				msg:
	// 					'Would you be willing to trade one of your Moon Bulbasaur?',
	// 			},
	// 		],
	// 	},
	// ];
	return (
		<div className="Chat">
			{!chat.isLoading &&
				// chat.byId[id].map(
				// 	(convo) =>
				// 		convo.id === conversationId &&
				// 		convo.messages.map((msg, index) => (
				// 			<p
				// 				// eslint-disable-next-line
				// 			key={`${convo.id}-msg-${index}`}
				// 				className={msg.user === 0 ? 'user' : ''}
				// 			>
				// 				{msg.msg}
				// 			</p>
				// 		))
				// )
				'hi'}
		</div>
	);
};

Chat.propTypes = {
	// conversationId: PropTypes.string,
};

Chat.defaultProps = {
	// conversationId: '',
};

export default Chat;
