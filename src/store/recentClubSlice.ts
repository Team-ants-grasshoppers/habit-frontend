import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveToLocalStorage, loadFromLocalStorage } from '../common/components/utils/localStorage';
import { Club } from '../features/user/types';

const STORAGEKEY = 'recentClubs';

const initialState: Club[] = loadFromLocalStorage<Club[]>(STORAGEKEY, []);
/**
 * recentClubsSlice
 *
 * 사용자가 최근에 본 모임(클럽) 목록을 Redux 상태로 관리하는 슬라이스입니다.
 * - 최대 10개의 최근 본 클럽 정보를 관리하며, 중복 클릭 시 기존 항목을 가장 앞으로 이동시킵니다.
 * - 상태는 localStorage를 통해 브라우저에 지속적으로 저장되어 새로고침 후에도 유지됩니다.
 *
 * ✅ 상태 초기화
 * - localStorage에 저장된 값을 기반으로 초기 상태를 설정합니다.
 *
 * ✅ reducer 목록
 * @function addRecentClub
 * - 새로운 클럽을 최근 본 목록에 추가
 * - 이미 존재하는 경우 중복 제거 후 가장 앞에 추가
 * - 최대 10개까지만 유지되며 초과 시 오래된 항목은 제거
 * - 추가 후 localStorage에 동기화 저장
 *
 * @function removeRecentClub
 * - 특정 클럽 ID를 가진 항목을 목록에서 제거
 * - 제거 후 localStorage에 동기화 저장
 *
 * @constant STORAGEKEY - localStorage 저장 키 ('recentClubs')
 * @returns Redux reducer 함수
 */
const recentClubsSlice = createSlice({
  name: 'recentClubs',
  initialState,
  reducers: {
    addRecentClub: (state, action: PayloadAction<Club>) => {
      const filtered = state.filter((c) => c.id !== action.payload.id);
      const updated = [action.payload, ...filtered].slice(0, 10);
      saveToLocalStorage(STORAGEKEY, updated);
      return updated;
    },
    removeRecentClub: (state, action: PayloadAction<string>) => {
      const updated = state.filter((c) => c.id !== action.payload);
      saveToLocalStorage(STORAGEKEY, updated);
      return updated;
    },
  },
});

export const { addRecentClub, removeRecentClub } = recentClubsSlice.actions;
export default recentClubsSlice.reducer;
