import { SeparatedMembers } from '../utils/separateMembersByRole';

export interface ThunderFormData {
  thunderName: string;
  description: string;
  category: string;
  region: string;
  date: string;
  time: string;
  image: {
    url?: string;
    file?: File;
  };
}

export interface ThunderDetailModel extends SeparatedMembers {
  thunderName: string;
  description: string;
  category: string;
  region: string;
  imageUrl?: string;
  date: string;
  time: string;
}

export interface ThunderListItem {
  thunderId: string;
  thunderName: string;
  imageUrl: string;
}

export interface ThunderList {
  thunderListItems: ThunderListItem[];
}
