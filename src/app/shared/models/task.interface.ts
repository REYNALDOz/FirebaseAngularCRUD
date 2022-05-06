export interface Task {
  id?: string;
  title: string;
  description: string;
  owner: string;
  startDate: Date;
  finishDate: Date;
}
