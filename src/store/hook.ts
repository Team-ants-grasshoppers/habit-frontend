import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Redux dispatch 헬퍼 - AppDispatch 타입 자동 적용
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Redux selector 헬퍼 - RootState 타입 자동 적용
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
