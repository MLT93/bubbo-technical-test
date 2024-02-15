import { DocumentData } from "firebase/firestore";

//* Interfaces */

// INTERFACE FOR BOOKS
interface InputForDoc {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
}

// INTERFACE FOR DATA IMPORT FROM FIRESTORE
interface Doc {
  id: string;
  doc: DocumentData;
}
// INTERFACE FOR LIKES
interface Likes {
  baseLike?: number;
}

export type { InputForDoc, Doc, Likes };
