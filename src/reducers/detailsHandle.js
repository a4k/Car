export default function(state = [], action) {
	switch(action.type) {
		case 'add_detail':
			return [...state,
				{
					id: action.id,
					name: action.name,
				}
			];
		break;
		case 'delete_detail' :
			return state.map((detail, i) => {
				if (detail.id == action.id) {
					return false;
				}
				return detail;
			});
		break;
		default: 
			return state;
	}
}