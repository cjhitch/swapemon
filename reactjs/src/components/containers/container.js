import { connect } from 'react-redux';
import { fetchItems } from '../../store/items/actions';

const mapStateToProps = (state) => {
	const {
		items: { byId, allIds },
	} = state;
	return { items: allIds.map((id) => byId[id].data) };
};

// set the actions we need in this component
const mapDispatchToProps = { fetchItems };

export default connect(mapStateToProps, mapDispatchToProps);
