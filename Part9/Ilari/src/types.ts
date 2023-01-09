export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

//Type that ommits the comment field fro DiaryEntry interface type
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
