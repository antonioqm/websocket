import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { catchError, delayWhen, retryWhen, take, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any> | undefined;
  private connectionUrl = environment.connectionUrl;
  private messages$ = new BehaviorSubject<any>([]);
  private connectionStatus$ = new BehaviorSubject<boolean>(false);
  private manualClose = false;
  private maxReconnectAttempts = 5;

  constructor() {}

  connect() {
    if (this.socket$ && !this.socket$.closed) {
      return;
    }

    this.manualClose = false;
    this.createWebSocket();

    this.socket$?.pipe(
      catchError(err => {
        return throwError(err);
      }),
      retryWhen(errors =>
        errors.pipe(
          delayWhen(() => timer(5000)),
          take(this.maxReconnectAttempts),
          tap(() => {
            if (this.manualClose) {
              throw new Error('Manual close');
            }
          })
        )
      )
    ).subscribe({
      next: (msg: any) => this.handleMessage(msg),
      error: (err: any) => {
        this.connectionStatus$.next(false);
      },
      complete: () => this.handleClose()
    });

    this.connectionStatus$.next(true);
  }

  private createWebSocket() {
    this.socket$ = webSocket(this.connectionUrl);
  }

  private handleMessage(msg: any) {
    if (msg.e === 'trade') {
      this.messages$.next([msg]);
    }
  }

  private handleClose() {
    this.connectionStatus$.next(false);
    if (!this.manualClose) {
      this.socket$ = undefined;
      this.connect();
    }
  }

  getMessages(): Observable<any[]> {
    return this.messages$.asObservable();
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus$.asObservable();
  }

  sendMessage(msg: any) {
    if (this.socket$) {
      this.socket$.next(msg);
    }

  }

  close() {
    this.manualClose = true;
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = undefined;
    }
    this.connectionStatus$.next(false);
  }
}
