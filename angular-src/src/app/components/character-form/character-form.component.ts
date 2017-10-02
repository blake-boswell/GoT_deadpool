import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements OnInit {

  characterName: String;
  imagePath: String;
  image: any;
  value: Number;

  constructor(
    private charService: CharactersService,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
  }

  onCharacterSubmit() {

    let character = {
      name: this.characterName,
      imagePath: this.imagePath,
      value: this.value
    };

    this.charService.addCharacter(character).subscribe(data =>{
      console.log("subscription data: " + JSON.stringify(data));
      console.log(this.image);
      let tempChar = data;
      this.charService.addImage(this.image).subscribe(data =>{
        console.log("[Image posted] The deed is done m'lord.");
        console.log(data);
      }, err =>{
        console.log("Image posting failed.");
      });
      this.flashMessage.show("Character created!", {cssClass: 'alert-success', timeout: 3000});
    }, err =>{
      this.flashMessage.show("Something went wrong", {cssClass: 'alert-danger', timeout: 3000});
    });
  }

  fileChange(event) {
    console.log(event);
    this.imagePath = "/assets/uploads/" + event.path[0].files[0].name;
    this.image = event.path[0].files[0];
    console.log("Image:");
    console.log(this.image);
  }

}
