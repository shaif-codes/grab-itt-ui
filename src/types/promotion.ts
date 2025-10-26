export interface Promotion {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText?: string;
  buttonAction?: string;
  type: 'banner' | 'offer' | 'news';
  active: boolean;
  priority: number;
}


