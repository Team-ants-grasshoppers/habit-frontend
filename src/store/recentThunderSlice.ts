import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveToLocalStorage, loadFromLocalStorage } from '../common/components/utils/localStorage';
import { Thunder } from '../features/user/types';

const STORAGEKEY = 'recentThunders';

const initialState: Thunder[] = loadFromLocalStorage<Thunder[]>(STORAGEKEY, []);
/**
 * recentThundersSlice
 *
 * 사용자가 최근에 본 번개 모임 목록을 Redux 상태로 관리하는 슬라이스입니다.
 * - 최대 10개의 최근 본 번개 모임을 저장하며, 중복 클릭 시 가장 앞으로 이동됩니다.
 * - 상태는 localStorage에 동기화되어 브라우저를 새로고침하거나 재방문해도 유지됩니다.
 *
 * ✅ 상태 초기화
 * - localStorage에서 'recentThunders' 키로 저장된 데이터를 기반으로 초기 상태를 설정합니다.
 *
 * ✅ reducer 목록
 * @function addRecentThunder
 * - 새로운 번개 모임을 최근 본 목록에 추가
 * - 기존 목록에 해당 ID가 존재하면 중복 제거 후 가장 앞으로 이동
 * - 최대 10개까지 유지 (최신순)
 * - localStorage에 상태를 저장하여 지속성 확보
 *
 * @function removeRecentThunder
 * - 전달된 ID와 일치하는 번개 모임 항목을 목록에서 제거
 * - 제거 후 localStorage에도 반영하여 동기화
 *
 * @constant STORAGEKEY - localStorage 저장 키 ('recentThunders')
 * @returns Redux reducer 함수
 */
const recentThundersSlice = createSlice({
  name: 'recentThunders',
  initialState,
  reducers: {
    addRecentThunder: (state, action: PayloadAction<Thunder>) => {
      if (!action.payload.id) return state;
      const filtered = state.filter((t) => t.id !== action.payload.id);
      const updated = [action.payload, ...filtered].slice(0, 10);
      saveToLocalStorage(STORAGEKEY, updated);
      return updated;
    },
    removeRecentThunder: (state, action: PayloadAction<string>) => {
      const updated = state.filter((t) => t.id !== action.payload);
      saveToLocalStorage(STORAGEKEY, updated);
      return updated;
    },
  },
});

export const { addRecentThunder, removeRecentThunder } = recentThundersSlice.actions;
export default recentThundersSlice.reducer;
