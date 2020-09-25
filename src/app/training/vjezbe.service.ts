import { Subject } from 'rxjs';
import { Vjezba } from './vjezba.model';

export class VjezbeService {
  // pratimo promjenu stanja koja je je vjezba u tijeku
  vjezbaPromjenaStanja = new Subject<Vjezba>();

  // popis svih vjezbi koje su definirane
  private availableExercises: Vjezba[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  private trenutnaVjezba: Vjezba; // pratimo koja je trenutna vjezba
  private listaSvihVjezbi: Vjezba[] = []; // inicijalno prazno polje za sve vjezbe

  // ************************************************
  // inicijalno povlacimo podatke postojecih vjezbi
  getAvailableExercises() {
    // vracamo kopiju polja
    return this.availableExercises.slice();
  }

  //*******************************************
  // pokrenuta je neka od vjezbi
  startVjezba(selektiranaVjezbaId: string) {
    // moramo pronaci vjezbu o kojoj se radi
    this.trenutnaVjezba = this.availableExercises.find((data) => {
      return data.id === selektiranaVjezbaId;
    });
    // saljem u program kopiju odabrane vjezbe koja je odabrana
    this.vjezbaPromjenaStanja.next({ ...this.trenutnaVjezba });

    console.log('startVjezba = ',this.listaSvihVjezbi);
  }

  // ***************************************
  // vjezba je gotova, izvrsena je 100$
  gotovaVjezba() {
    this.listaSvihVjezbi.push({
      ...this.trenutnaVjezba,
      date: new Date(),
      state: 'completed',
    });
    this.vjezbaPromjenaStanja.next(null); // vjezba je gotova
    this.trenutnaVjezba = null; // vjezba je gotova

    console.log('this.listaSvihVjezbi=',this.listaSvihVjezbi);

  }

  //***************************************
  // vjezba je bila prekinuta
  prekinutaVjezba(progres: number) {
    this.listaSvihVjezbi.push({
      ...this.trenutnaVjezba,
      duration: this.trenutnaVjezba.duration * (progres / 100),
      calories: this.trenutnaVjezba.duration * (progres / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.vjezbaPromjenaStanja.next(null); // vjezba je prekinuta
    this.trenutnaVjezba = null; // vjezba je prekinuta
  }

  //***************************************
  // vjezba koja se trenutno izvodi
  getTrenutnaVjezba() {
    return { ...this.trenutnaVjezba };
  }
}
