
// добавление детали в список
export const selectDetail = (id, name) => {
	return {
		type: 'add_detail',
		id: id,
		name: name,
	}
};

// удаление детали из списка
export const deleteDetail = (id) => {
	return {
		type: 'delete_detail',
		id: id,
	}
}