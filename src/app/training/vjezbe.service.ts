import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { Vjezba } from './vjezba.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class VjezbeService {
  // pratimo promjenu stanja koja je vjezba u tijeku
  vjezbaPromjenaStanja = new Subject<Vjezba>();

  // pratimo promjenu stanja popisa vjezbe iz baze (jednom se koristi, kod prvog ucitavanja)
  vjezbaPromjenaStanjaBaza = new Subject<Vjezba[]>();

  // popis svih vjezbi koje su definirane
  private availableExercisesFile: Vjezba[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];


  private availableExercisesBase: Vjezba[] = [];

  private trenutnaVjezba: Vjezba; // pratimo koja je trenutna vjezba
  private listaSvihVjezbi: Vjezba[] = []; // inicijalno prazno polje za sve vjezbe

  constructor(private db: AngularFirestore) {}

  // ************************************************
  // inicijalno povlacimo podatke postojecih vjezbi
  getAvailableExercisesFile() {
    // vracamo kopiju polja
    return this.availableExercisesFile.slice();
  }

  // ************************************************
  // inicijalno povlacimo podatke postojecih vjezbi
  fetchAvailableExercisesBase() {
    // Za vježbu,  povlacimo samo podatke vjezbeDB iz BAZE
    //   .valueChanges() - ovim nacinom ne mogi dobiti id!!!
    this.db
      .collection('ang10treningizborvjezbi')
      .valueChanges()
      .subscribe((dataDB) => {
        console.log('valueChanges()=', dataDB);
      });

    // spajamo se na bazu
    this.db
      .collection('ang10treningizborvjezbi')
      .snapshotChanges()
      .pipe(
        // medukorak....
        map((data) => {
          console.log(data);
          return data;
        })
      )
      .pipe(
        map((docArray) => {
          console.log('aaa', docArray);
          return docArray.map((data) => {
            // console.log('data=', data);
            // console.log('data.payload=', data.payload);
            // console.log('data.payload.doc=', data.payload.doc);
            // console.log('data.payload.doc.data()=', data.payload.doc.data());

            return {
              id: data.payload.doc.id,
              name: data.payload.doc.data()['name'],
              duration: data.payload.doc.data()['duration'],
              calories: data.payload.doc.data()['calories'],
            };
          });
        })
      )
      .subscribe((dataDB) => {
        this.availableExercisesBase = dataDB;
        this.vjezbaPromjenaStanjaBaza.next([...this.availableExercisesBase])
      });
  }

  //*******************************************
  // pokrenuta je neka od vjezbi
  startVjezba(selektiranaVjezbaId: string) {
    // moramo pronaci vjezbu o kojoj se radi
    this.trenutnaVjezba = this.availableExercisesFile.find((data) => {
      // return data.id === selektiranaVjezbaId;
      return data.name === selektiranaVjezbaId;
    });
    // saljem u program kopiju odabrane vjezbe koja je odabrana
    this.vjezbaPromjenaStanja.next({ ...this.trenutnaVjezba });
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

    console.log('this.listaSvihVjezbi=', this.listaSvihVjezbi);
  }

  //***************************************
  // vjezba je bila prekinuta
  prekinutaVjezba(progres: number) {
    this.listaSvihVjezbi.push({
      ...this.trenutnaVjezba,
      duration: this.trenutnaVjezba.duration * (progres / 100),
      calories: this.trenutnaVjezba.calories * (progres / 100),
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

  //***************************************
  // popis svih vjezbi
  getSveZapisaneVjezbe() {
    console.log('this.listaSvihVjezbi.slice()=', this.listaSvihVjezbi.slice());

    return this.listaSvihVjezbi.slice();
  }
}
