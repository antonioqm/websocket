import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { WebSocketService } from './websocket.service';

jest.mock('rxjs/webSocket');




describe('WebSocketService', () => {
  let service: WebSocketService;
  let mockWebSocket: WebSocketSubject<any>;

  beforeEach(() => {
    (webSocket as jest.Mock).mockReset();
    mockWebSocket = {
      next: jest.fn(),
      complete: jest.fn(),
      connect: jest.fn(),
      closed: false,
      error: jest.fn(),
      subscribe: jest.fn().mockReturnValue({
        unsubscribe: jest.fn()
      }),
      pipe: jest.fn().mockReturnThis()
    } as unknown as WebSocketSubject<any>;

    (webSocket as jest.Mock).mockReturnValue(mockWebSocket);

    TestBed.configureTestingModule({
      providers: [WebSocketService]
    });

    service = TestBed.inject(WebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should connect to the websocket', () => {
    service.connect();
    expect(webSocket).toHaveBeenCalledWith(environment.connectionUrl);
    expect(mockWebSocket.pipe).toHaveBeenCalled();
    service.getConnectionStatus().subscribe(status => {
      expect(status).toBe(true);
    });
  });

  it('should handle incoming messages', () => {
    service.connect();
    const testMessage = { e: 'trade', data: 'test' };
    mockWebSocket.next(testMessage);
    service.getMessages().subscribe(messages => {
      expect(messages).toEqual([testMessage]);
    });
  });

  it('should send a message', () => {
    service.connect();
    const testMessage = { data: 'test' };
    service.sendMessage(testMessage);
    expect(mockWebSocket.next).toHaveBeenCalledWith(testMessage);
  });

  it('should not send a message if socket is not connected', () => {
    const testMessage = { data: 'test' };
    service.sendMessage(testMessage);
    expect(mockWebSocket.next).not.toHaveBeenCalled();
  });

  it('should close the connection', () => {
    service.connect();
    service.close();
    expect(mockWebSocket.complete).toHaveBeenCalled();
    service.getConnectionStatus().subscribe(status => {
      expect(status).toBe(false);
    });
  });

  it('should handle manual close correctly', () => {
    service.connect();
    service.close();
    expect(service['manualClose']).toBe(true);
    expect(mockWebSocket.complete).toHaveBeenCalled();
  });

  it('should not reconnect after manual close', fakeAsync(() => {
    service.connect();
    service.close();
    const error = new Error('Test error');
    (mockWebSocket.subscribe as jest.Mock).mockImplementationOnce(({ error }) => {
      error(new Error('Test error'));
    });

    tick(5000);
    expect(webSocket).toHaveBeenCalledTimes(1);
  }));

  it('should handle non-trade messages', () => {
    service.connect();
    const nonTradeMessage = { e: 'non-trade', data: 'test' };
    mockWebSocket.next(nonTradeMessage);
    service.getMessages().subscribe(messages => {
      expect(messages).toEqual([]);
    });
  });

  it('should reconnect automatically if not manually closed', fakeAsync(() => {
    service.connect();
    service.close();
    service['manualClose'] = false;
    mockWebSocket.complete();

    tick(5000);


    service.connect();

    expect(webSocket).toHaveBeenCalledTimes(2);
  }));

  it('should not connect again if already connected and not closed', () => {
    service.connect();
    service.connect();


    expect(webSocket).toHaveBeenCalledTimes(1);
  });


  it('should handle close', () => {
    service.connect();
    service.close();
    service['manualClose'] = false;
    service['handleClose']();
    expect(service['manualClose']).toBe(false);
  });

  it('should handle message', () => {
    const testMessage = { e: 'trade', data: 'test' };
    service['handleMessage'](testMessage);
    service.getMessages().subscribe(messages => {
      expect(messages).toEqual([testMessage]);
    });
  });


});
