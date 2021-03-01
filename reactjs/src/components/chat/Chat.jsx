import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BiTrash } from 'react-icons/bi';
import API from '../../API';
import FormControl from '../formControl';
import './Chat.scss';

const Chat = ({ chat, submitHandler }) => {
	const id = useSelector((state) => state.auth.id);
	const [input, setInput] = useState('');
	const [show, setShow] = useState(false);
	const [clicked, setClicked] = useState('');

	const update = (inId, val) => {
		setInput(val);
	};
	useEffect(() => {
		console.log(chat);
	}, [chat]);
	return (
		<>
			<div className="Chat">
				{chat[0].id !== '' &&
					chat.map((msg) => (
						<p
							key={msg.id}
							className={msg.from === id ? 'user' : ''}
						>
							{msg.message}
							<BiTrash
								onClick={() => {
									setClicked(msg.id);
									setShow(true);
								}}
							/>
						</p>
					))}
			</div>
			{chat[0].id !== '' && (
				<>
					<span>Send New Message: </span>
					<form onSubmit={(e) => submitHandler(e, input)}>
						<FormControl
							value={input}
							update={update}
							placeholder="new message"
						/>
					</form>
				</>
			)}
			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to delete?</Modal.Title>
				</Modal.Header>

				<Modal.Footer>
					<Button onClick={() => setShow(false)} variant="tertiary">
						Close
					</Button>
					<Button
						onClick={async () => {
							await API.delete(`/messages/${clicked}`);
							setShow(false);
							window.location.reload(false);
						}}
						variant="secondary"
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

Chat.propTypes = {
	chat: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			from: PropTypes.string,
			message: PropTypes.string,
		})
	).isRequired,
	submitHandler: PropTypes.func.isRequired,
};

export default Chat;
