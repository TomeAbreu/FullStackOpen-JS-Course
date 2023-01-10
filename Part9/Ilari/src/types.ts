export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}
export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
//Type that ommits id when adding a Diary Entry
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

//Type that ommits the comment field fro DiaryEntry interface type
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
