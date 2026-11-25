export interface Task {
  id: number;
  text: string;
  completed: boolean;
};

export interface Card {
  id: number;
  title: string;
  tasks: Task[];
};

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Receipt {
  id: number;
  title: string;
};