import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../../store/users/actions';

const mapStateToProps = (state, props) => {
	const {
		match: {
			params: { id },
		},
	} = props;
	const {
		users: {
			byId: { [id]: { data: user } = {} },
		},
	} = state;
	return { user };
};

// set the actions we need in this component
const mapDispatchToProps = { fetchUser, updateUser };

export default connect(mapStateToProps, mapDispatchToProps);
