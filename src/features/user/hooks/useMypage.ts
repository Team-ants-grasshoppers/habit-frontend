import axios from '../../../lib/axios';

export const fetchJoinedMyClubList = async (
  id: string,
): Promise<
  {
    club_id: number;
    title: string;
    imgUrl: string | null;
  }[]
> => {
  const response = await axios.get(`/api/joinedclub/${id}`);
  return response.data.joinedMyClubs;
};
export const fetchMyClubList = async (
  id: string,
): Promise<
  {
    club_id: number;
    title: string;
    imgUrl: string | null;
  }[]
> => {
  const response = await axios.get(`/api/myclub/${id}`);
  return response.data.MyClubs;
};
export const fetchJoinedMyThunderClubList = async (
  id: string,
): Promise<
  {
    club_id: number;
    title: string;
    imgUrl: string | null;
  }[]
> => {
  const response = await axios.get(`/api/joinedthunderclub/${id}`);
  return response.data.joinedMyThunders;
};
