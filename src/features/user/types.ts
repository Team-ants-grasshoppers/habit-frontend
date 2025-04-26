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
