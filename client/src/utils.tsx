import { DocumentData } from "firebase/firestore";

// TYPE FOR DATA IMPORT FROM FIRESTORE
interface Book {
  id: string;
  doc: DocumentData;
}

export type { Book };
