import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: any[] = [{}];
  arrayTest: any[] = [];

  constructor(
    private charService: CharactersService,
    private router: Router) { }

  ngOnInit() {
    this.charService.getAllCharacters().subscribe(response =>
      {
        this.characters = response;

        console.log("Response: ");
        console.log(response);
      },
      function(error) {
        console.log("Error: " + error);
      },
      function() {
        console.log("Subscription complete!");
        console.log(this.characters);
      }
    );


  }


}
