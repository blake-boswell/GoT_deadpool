import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CharactersService {
  character: any;
  characters: any[];

  constructor(private http: Http) { }

  getAllCharacters() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:8000/api/characters', {headers: headers})
      .map(res => res.json());
  }

  getCharacter(id: number) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/api/characters/${id}',  {headers: headers})
      .map(res => res.json());
  }

  addCharacter(character) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/api/characters/', character,  {headers: headers})
      .map(res => res.json());
  }

  updateCharacter(id: number) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:8000/api/characters/${id}',  {headers: headers})
      .map(res => res.json());
  }

  deleteCharacter(id: number) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.delete('http://localhost:8000/api/characters/${id}', {headers: headers})
      .map(res => res.json());
  }

  addImage(image) {
    let formData = new FormData();
    formData.append("photo", image);
    return this.http.post("http://localhost:8000/api/image/", formData)
      .map(res => res.json());
  }

  getImage(character) {
    // let headers = new Headers();
    // headers.append('Content-Type','application/json');
    let name = character.imageName;
    console.log("imageName: " + name);
    return this.http.get('http://localhost:8000/api/image/${name}');
  }

}
