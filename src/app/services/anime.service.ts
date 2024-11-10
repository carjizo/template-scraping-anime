import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { AnimeInfoList } from '../interfaces/AnimeInfoList';
import { AnimeInfoRequest } from '../interfaces/AnimeInfoRequest';
import { AnimeDetalle } from '../interfaces/AnimeDetalle';
import { AnimeLinks } from '../interfaces/AnimeLinks';


@Injectable({
     providedIn: 'root'
})
export class AnimeService {

     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;

     constructor() { }

     animeSearch(objeto: AnimeInfoRequest): Observable<AnimeInfoList> {
          return this.http.post<AnimeInfoList>(`${this.baseUrl}/anime/search`, objeto)
     }

     animeDetail(idAnime: string): Observable<AnimeDetalle> {
        return this.http.get<AnimeDetalle>(`${this.baseUrl}/anime/info/${idAnime}`)
     }

     getLinks(objeto: AnimeLinks): Observable<[]> {
          return this.http.post<[]>(`${this.baseUrl}/anime/links`, objeto)
     }
}