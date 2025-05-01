import axios from '../../../lib/axios';
import { MyPageList } from '../types';

export const fetchJoinedMyClubList = async (id: string): Promise<MyPageList> => {
  const response = await axios.get(`/api/joinedclub/${id}`);
  return response.data.joinedMyClubs;
};
export const fetchMyClubList = async (id: string): Promise<MyPageList> => {
  const response = await axios.get(`/api/myclub/${id}`);
  return response.data.MyClubs;
};
export const fetchJoinedMyThunderClubList = async (id: string): Promise<MyPageList> => {
  const response = await axios.get(`/api/joinedthunderclub/${id}`);
  return response.data.joinedMyThunders;
};
