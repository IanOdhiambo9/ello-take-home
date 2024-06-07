import { Book } from "./books.interface";

// Defines a student record
export interface Student {
  id: number,
  name: string;
  label?: string;
  readingList: Book[];
}