import { DocumentData } from "firebase/firestore";

// TYPE FOR DATA IMPORT FROM FIRESTORE
interface Book {
  id: string;
  doc: DocumentData;
}

// INTERFACE FOR LIKES
interface Likes {
  baseLike?: number;
}

export type { Book, Likes };
