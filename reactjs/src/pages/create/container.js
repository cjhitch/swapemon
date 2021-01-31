import { connect } from 'react-redux';
import { fetchUser, createUser, updateUser } from '../../store/users/actions';

const mapStateToProps = (state, props) => {
	console.log('state: ', state, 'props: ', props);
	const {
		match: {
			params: { id },
		},
	} = props;
	const {
		items: {
			byId: { [id]: { data: item } = {} },
		},
	} = state;
	return { item };
};

// set the actions we need in this component
const mapDispatchToProps = { fetchUser, createUser, updateUser };

export default connect(mapStateToProps, mapDispatchToProps);
