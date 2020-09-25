import { Subject } from 'rxjs';
import { Vjezba } from './vjezba.model';

export class VjezbeService {
  vjezbaPromjenaStanja = new Subject<Vjezba>();
  private availableExercises: Vjezba[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  private trenutnaVjezba: Vjezba;  // pratimo koja je trenutna vjezba

  // inicijalno povlacimo podatke postojecih vjezbi
  getAvailableExercises() {
    // vracamo kopiju polja
    return this.availableExercises.slice();
  }

  // pokrenuta je neka od vjezbi
  startVjezba(selektiranaVjezbaId: string) {
    // moramo pronaci vjezbu o kojoj se radi
    this.trenutnaVjezba = this.availableExercises.find((data) => {
      return data.id === selektiranaVjezbaId;
    });

    console.log('yyyy', this.trenutnaVjezba);

    // saljem u program kopiju odabrane vjezbe koja je odabrana
    this.vjezbaPromjenaStanja.next({ ...this.trenutnaVjezba });
  }
}
