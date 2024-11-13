import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common'; 
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import { ErrorDialogComponent } from '../error_dialog/error-dialog.component';

import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { AnimeDetalle } from '../../interfaces/AnimeDetalle';
import { AnimeLinks } from '../../interfaces/AnimeLinks';

interface Shoes {
     value: string;
     name: string;
}

@Component({
     selector: 'app-detalle',
     standalone: true,
     imports: [
          MatCardModule, 
          MatTableModule,
          CommonModule,
          MatFormFieldModule,
          MatInputModule,
          FormsModule,
          ReactiveFormsModule,
          MatButtonModule,
          MatTooltipModule,
          MatListModule
     ],
     templateUrl: './detalle.component.html',
     styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {
     // value = 'Nombre anime';
     private responseAnimeSearch = inject(AnimeService)
     private router = inject(Router);
     // showDelay = new FormControl(1);
     public listLinks = [] 
     showDelay = new FormControl(1, [Validators.min(0)]);
     public animeDetalle: AnimeDetalle = {
          title: '',
          imagenUrl: '',
          description: '',
          genres: [],
          status: '',
          votes: ''
     };
     private dialog = inject(MatDialog);

     animeId: string | null = null;

     constructor(private route: ActivatedRoute) {}

     ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
          this.animeId = params.get('id');
          if (this.animeId !== null) {
               this.responseAnimeSearch.animeDetail(this.animeId).subscribe({
                    next: (data) => {
                         if (data) {
                              this.animeDetalle = data;
                         }
                    },
                    error: (err) => {
                         console.log(err.message);
                    }
               })
          }
         
     });
     }

     getLinks(){
          if(!this.animeId) return;

          const objeto:AnimeLinks = {
               id: this.animeId,
               cap: String(this.showDelay.value)
          }

          this.responseAnimeSearch.getLinks(objeto).subscribe({
               next: (data) => {
                    if (data.isSucces == true) {
                         this.listLinks = data.links;
                    } else {
                         this.openErrorDialog(data.message);
                    }
               },
               error: (err) => {
                    // console.log(err.message);
                    this.openErrorDialog('Error al registrarse: ' + err.message);
               }
          })
     }

     openErrorDialog(message: string): void {
          this.dialog.open(ErrorDialogComponent, {
            data: { message },
          });
     }
}
