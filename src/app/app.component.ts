import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  users: any[]=[];

  constructor (private db: AngularFireDatabase){

    db.list('/Users').valueChanges()
      .subscribe(recs => {
        console.log(recs);
        this.users = recs;
      })

  }
}
