  // export type Drawing ={
  //   id: number,
  //   name: string,
  //   path: string,
  //   category: string,
  //   artist_name: string,
  //   target_age: number;
  //   width: number|undefined;
  //   height: number|undefined;
  //   // Add other properties if needed
  // }
  export interface Drawing {
  id: string
  name: string
  path: string
  category?: string
  width: number
  height: number
  artist_name?: string
  target_age?: number
  // Add other properties if needed
}