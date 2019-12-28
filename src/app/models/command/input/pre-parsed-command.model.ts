export interface ValidPreParsedCommand {
  name?: string;
  params?: string[];
}

export interface PreParsedCommand extends ValidPreParsedCommand {
  unknownCli?: boolean;
  unknownCliName?: string;
  noCommand?: boolean;
  empty?: boolean;
  clear?: boolean;
}
