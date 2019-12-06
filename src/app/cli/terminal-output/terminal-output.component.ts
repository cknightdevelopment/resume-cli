import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-terminal-output',
  templateUrl: './terminal-output.component.html',
  styleUrls: ['./terminal-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerminalOutputComponent {
  @Input() success: boolean;
  @Input() info: boolean;
  @Input() warn: boolean;
  @Input() error: boolean;

  constructor() { }
}
