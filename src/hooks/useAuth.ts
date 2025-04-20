import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../features/user/hooks/useUser';

/**
 * useAuth 훅
 * - 현재 로그인한 유저 정보를 가져온다.
 * - isLoading, error 상태도 함께 반환한다.
 */
export const useAuth = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMyInfo,
    retry: false,
  });

  return {
    user: data,
    isLoading,
    error,
  };
};
