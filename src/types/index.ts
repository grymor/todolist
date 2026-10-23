export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export type Card = {
  id: number;
  title: string;
  tasks: Task[];
};