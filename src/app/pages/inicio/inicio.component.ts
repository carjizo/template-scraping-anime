import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { Router } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { AnimeInfoRequest } from '../../interfaces/AnimeInfoRequest';
import { AnimeInfo } from '../../interfaces/AnimeInfo';

@Component({
     selector: 'app-inicio',
     standalone: true,
     imports: [MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
     templateUrl: './inicio.component.html',
     styleUrl: './inicio.component.css'
})
export class InicioComponent {
     value = 'Naruto';
     private responseAnimeSearch = inject(AnimeService)
     private router = inject(Router);
     public listaAnimes: AnimeInfo[] = []
     public displayedColumns: string[] = ['id', 'title', 'description'];

     buscarAnime(){
          if(!this.value) return;

          const objeto:AnimeInfoRequest = {
               text: this.value,
               page: "1"
          }

          this.responseAnimeSearch.animeSearch(objeto).subscribe({
               next: (data) => {
                    if (data.animes.length > 0) {
                         this.listaAnimes = data.animes;
                    }
               },
               error: (err) => {
                    console.log(err.message);
               }
          })
     }

     goToDetails(id: number) {
          this.router.navigate(['/detalle', id]);
     }

}
