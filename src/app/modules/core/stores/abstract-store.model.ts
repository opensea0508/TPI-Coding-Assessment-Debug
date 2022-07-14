import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export abstract class AbstractStore<T> {
  protected state: T;
  protected stateSource: BehaviorSubject<T>;

  constructor(initialState: T) {
    this.state = this._deepFreeze(initialState);
    this.stateSource = new BehaviorSubject<T>(this.state);
  }

  public setState(state: T): void {
    this.state = this._deepFreeze(state);
    this.stateSource.next(this.state);
  }

  public select<R>(fn: (state: T) => R): Observable<R> {
    return this.stateSource
      .asObservable()
      .pipe(map(fn), distinctUntilChanged());
  }

  private _deepFreeze<T>(obj: T): T {
    const propNames = Object.getOwnPropertyNames(obj || {}) || [];
    for (let name of propNames) {
      let value = (obj as any)[name];
      if (value && typeof value === 'object') {
        this._deepFreeze(value);
      }
    }
    return Object.freeze(obj);
  }
}
