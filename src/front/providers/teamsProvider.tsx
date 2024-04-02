// 'use client';
// import { addTeams } from '../../store/features/teamsSlice';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import axios from 'axios';
//
// const TeamsProvider = ({ children }) => {
// 	const dispatch = useDispatch();
//
// 	useEffect(() => {
// 		(async () => {
// 			try {
// 				const response = await axios.get(
// 					'http://localhost:8080/api/v1/teams'
// 				);
// 				dispatch(addTeams(response.data));
// 			} catch (err) {
// 				if (axios.isAxiosError(err)) {
// 					console.error(err.response.data);
// 				}
// 			}
// 		})();
// 	}, [dispatch]);
//
// 	return children;
// };
// export default TeamsProvider;
