import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfig } from '../config/app-config';
import { Article as ArticleModel } from '../models/article.model';

interface ArticlesResponse {
  status: string;
  results: number;
  data: ArticleModel[];
}

interface ArticleResponse {
  status: string;
  data: ArticleModel;
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly apiUrl = `${appConfig.apiBaseUrl}/posts`;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<ArticlesResponse> {
    return this.http.get<ArticlesResponse>(this.apiUrl);
  }

  createArticle(payload: { title: string; content: string; images: File[]; group?: string }): Observable<ArticleResponse> {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('content', payload.content);
    if (payload.group) {
      formData.append('group', payload.group);
    }
    payload.images.forEach((image) => formData.append('images', image));

    return this.http.post<ArticleResponse>(this.apiUrl, formData);
  }

  updateArticle(id: string, payload: { title: string; content: string; group?: string }): Observable<ArticleResponse> {
    return this.http.put<ArticleResponse>(`${this.apiUrl}/${id}`, payload);
  }

  deleteArticle(id: string): Observable<{ status: string; message: string }> {
    return this.http.delete<{ status: string; message: string }>(`${this.apiUrl}/${id}`);
  }
}
