import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { Vjezba } from './vjezba.model';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/UIservice';

@Injectable()
export class VjezbeService {
  vjezbaDoc: AngularFirestoreDocument<any>;
  vjezbaCollection: AngularFirestoreCollection<any>;

  // pratimo promjenu stanja koja je vjezba u tijeku
  vjezbaPromjenaStanjaFile = new Subject<Vjezba>();

  // pratimo promjenu stanja popisa vjezbe iz baze (jednom se koristi, kod prvog ucitavanja)
  vjezbaPromjenaStanjaBaza = new Subject<Vjezba[]>();

  // spremanje liste vjezbi  u bazu
  finishedExerciseChanged = new Subject<Vjezba[]>();

  // inicijalno prazno polje za sve vjezbe iz baze
  private availableExercisesBase: Vjezba[] = [];

  // pratimo koja je trenutna vjezba
  private trenutnaVjezba: Vjezba;

  constructor(private db: AngularFirestore, private uiService: UIService) {
    console.log('Vjezbe.service pokrenuto');
  }

  // ************************************************
  // inicijalno povlacimo podatke postojecih vjezbi
  fetchAvailableExercisesBase() {
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
          // za ispitivanje programa
          // throw new Error();
          // console.log('aaa', docArray);
          return docArray.map((data) => {
            return {
              // id: data.payload.doc.id,
              name: data.payload.doc.data()['name'],
              duration: data.payload.doc.data()['duration'],
              calories: data.payload.doc.data()['calories'],
            };
          });
        })
      )
      .subscribe(
        (dataDB) => {
          this.availableExercisesBase = dataDB;
          this.vjezbaPromjenaStanjaBaza.next([...this.availableExercisesBase]);
        },
        (err) => {
          this.uiService.showSnackbar(
            'Greška kod učitavanja baze,  molim pokušajte ponovo',
            null,
            3000
          );
          this.vjezbaPromjenaStanjaBaza.next(null);
        }
      );
  }

  //*******************************************
  // pokrenuta je neka od vjezbi
  startVjezba(selektiranaVjezbaId: string) {
    // moramo pronaci vjezbu o kojoj se radi
    this.trenutnaVjezba = this.availableExercisesBase.find((data) => {
      // return data.id === selektiranaVjezbaId;
      return data.name === selektiranaVjezbaId;
    });
    // saljem u program kopiju odabrane vjezbe koja je odabrana
    this.vjezbaPromjenaStanjaFile.next({ ...this.trenutnaVjezba });
  }

  // ***************************************
  // vjezba je gotova, izvrsena je 100%
  gotovaVjezba() {
    // dodavanje lokalono u bazu
    this.addDataToDatabase({
      ...this.trenutnaVjezba,
      date: new Date(),
      state: 'completed',
    });

    this.vjezbaPromjenaStanjaFile.next(null); // vjezba je gotova
    this.trenutnaVjezba = null; // vjezba je gotova
  }

  //***************************************
  // vjezba je bila prekinuta
  prekinutaVjezba(progres: number) {
    // dodavanje u bazu
    this.addDataToDatabase({
      ...this.trenutnaVjezba,
      duration: this.trenutnaVjezba.duration * (progres / 100),
      calories: this.trenutnaVjezba.calories * (progres / 100),
      date: new Date(),
      state: 'cancelled',
    });

    this.vjezbaPromjenaStanjaFile.next(null); // vjezba je prekinuta
    this.trenutnaVjezba = null; // vjezba je prekinuta
  }

  //***************************************
  // vjezba koja se trenutno izvodi
  getTrenutnaVjezba() {
    return { ...this.trenutnaVjezba };
  }

  //***************************************
  // popis svih vjezbi
  fetchSveZapisaneVjezbe() {
    this.db
      .collection('ang10listavjezbi')
      .snapshotChanges()
      .pipe(
        map((data) => {
          console.log('..medukorak...', data);
          return data;
        })
      )
      .pipe(
        map((docArray) => {
          return docArray.map((data) => {
            return {
              id: data.payload.doc.id,
              name: data.payload.doc.data()['name'],
              duration: data.payload.doc.data()['duration'],
              calories: data.payload.doc.data()['calories'],
              date: data.payload.doc.data()['date'],
              state: data.payload.doc.data()['state'],
            };
          });
        })
      )
      .subscribe(
        (dataDB) => {
          this.finishedExerciseChanged.next(dataDB);
        },
        (err) => {
          console.log('tu je greska..', err);
        }
      );
  }

  // dodavanje podataka u database
  addDataToDatabase(listaVjezbi: Vjezba) {
    this.db.collection('ang10listavjezbi').add(listaVjezbi);
  }

  // dodavanje podataka u database
  deleteDataToDatabase(id: string) {
    this.vjezbaDoc = this.db.doc(`ang10listavjezbi/${id}`);
    this.vjezbaDoc.delete();
  }
}
