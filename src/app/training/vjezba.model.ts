export interface Vjezba {
  name: string;
  duration: number;
  calories: number;
  date?: Date;    // ? omogućava opcionalno nije obavezan podatak
  state?: 'completed' | 'cancelled' | null; // ? omogućava opcionalno nije obavezan podatak
}
