import { connect } from 'react-redux';
import { fetchItem, createItem, updateItem } from '../../store/items/actions';

const mapStateToProps = (state, props) => {
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
const mapDispatchToProps = { fetchItem, createItem, updateItem };

export default connect(mapStateToProps, mapDispatchToProps);
