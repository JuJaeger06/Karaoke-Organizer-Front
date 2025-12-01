import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../models/funcionario';
import { ActivatedRoute, Router } from '@angular/router';
import { env } from '../../environment/enviorenment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  login(login: string, senha: string) {
    return this.httpClient.post<any>(env.apiUrl + "/login", {login, senha});
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    const user = this.userFromToken(token);
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  getFunc(): Funcionario | null {
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Funcionario;
    } catch {
      return null;
    }
  }

  private userFromToken(token: string): Funcionario | null {
    try {
      const payload = token.split('.')[1];
      if (!payload) return null;
      const decoded = JSON.parse(atob(payload));
      console.log('Decoded JWT payload:', decoded);
      return {
        id: decoded.sub ?? undefined,
        nome: decoded.sub ?? undefined,
        email: decoded.sub ?? undefined,
        senha: decoded.sub ?? undefined,
      } as Funcionario;
    } catch (e) {
      return null;
    }
  }

  redirect() {
    this.route.queryParams.subscribe(params => {
      const returnUrl = params['returnUrl'] || '/home';
      this.router.navigateByUrl(returnUrl);
    });
  }
}
