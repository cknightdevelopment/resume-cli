export interface InitializedCommand<T> {
  input: string;
  command: Command<T>;
}

export abstract class Command<T> {
  data: T;
}
