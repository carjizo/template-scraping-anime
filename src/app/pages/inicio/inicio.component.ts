import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { AnimeInfoRequest } from '../../interfaces/AnimeInfoRequest';
import { AnimeInfo } from '../../interfaces/AnimeInfo';

@Component({
    selector: 'app-inicio',
    standalone: true,
    imports: [MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatPaginatorModule],
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css'
})
export class InicioComponent {
    value = 'Naruto';
    pageSize: number = 12;
    currentPage: number = 1;  // Inicializamos en la página 1
    totalAnimes: number = 0;
    private responseAnimeSearch = inject(AnimeService);
    private router = inject(Router);
    public listaAnimes: AnimeInfo[] = [];
    public displayedColumns: string[] = ['id', 'title', 'description'];

    ngOnInit(): void {
        this.buscarAnime();
    }

    buscarAnime(page: number = 1): void {
        if (!this.value) return;

        const objeto: AnimeInfoRequest = {
            text: this.value,
            page: String(page),  // Asegúrate de pasar el valor correcto para la página
        };

        this.responseAnimeSearch.animeSearch(objeto).subscribe({
            next: (data) => {
                if (data.animes.length > 0) {
                    this.listaAnimes = data.animes;
                    this.totalAnimes = data.pages * this.pageSize;  // Asegúrate de que la API devuelva el total de animes
                }
            },
            error: (err) => {
                console.log(err.message);
            }
        });
    }

    onPageChange(event: PageEvent): void {
        this.currentPage = event.pageIndex + 1;  // Asegúrate de sumar 1 para que empiece desde la página 1
        this.buscarAnime(this.currentPage);  // Llamar a la API con el número correcto de página
    }

    goToDetails(id: number) {
        this.router.navigate(['/detalle', id]);
    }
}
