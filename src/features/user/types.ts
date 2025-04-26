
export interface MyPageItem {
  Club_id: number;
  title: string;
  imgUrl: string | null;
}

export type MyPageList = MyPageItem[];

export interface JoinedClubItem {
  Club_id: number;
  title: string;
  imgUrl: string | null;
}

export type JoinedClubList = JoinedClubItem[];

export interface ManagedClubItem {
  Club_id: number;
  title: string;
  imgUrl: string | null;
}

export type ManagedClubList = ManagedClubItem[];

export interface JoinedThunderItem {
  Club_id: number;
  title: string;
  imgUrl: string | null;
}

export type JoinedThunderList = JoinedThunderItem[];

// 모임(클럽) 타입
export interface Club {
  id: string;
  name: string;
  imageUrl: string;
}

// 번개모임(썬더) 타입
export interface Thunder {
  id: string;
  name: string;
  imageUrl: string;
  region: string;
  time: string;
}

