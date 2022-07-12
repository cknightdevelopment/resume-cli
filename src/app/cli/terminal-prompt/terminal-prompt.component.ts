// eslint-disable-next-line max-len
import { Component, OnInit, ViewChild, ElementRef, NgZone, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation, HostListener } from '@angular/core';
import { CONSTANTS } from 'src/app/models/constants';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, FormControl } from '@angular/forms';
import { TerminalNgStyle } from 'src/app/models/terminal-ng-style.model';
import { InitializedCommand } from '../store/command/command.reducers';

@Component({
  selector: 'app-terminal-prompt',
  templateUrl: './terminal-prompt.component.html',
  styleUrls: ['./terminal-prompt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TerminalPromptComponent implements OnInit {
  @ViewChild('terminalInput', { static: true }) terminalInput: ElementRef;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  @Input() styles: TerminalNgStyle;
  @Input() history: InitializedCommand[];
  @Output() commandInitiated = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  commandCtrl: FormControl<string>;

  private historyOrdinal: number = null;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.terminalInput.nativeElement.focus();
    this.commandCtrl = this.fb.control<string>(null);
  }

  @HostListener('document:keydown', ['$event'])
  globalKeydownEventHandler(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    // if target of keydown event is not the textarea, change focus to the text area
    // this will bring us to that location of the page & make the event occur on that element too
    if (this.terminalInput && this.terminalInput.nativeElement && (!target || !target.isSameNode(this.terminalInput.nativeElement))) {
      this.terminalInput.nativeElement.focus();
    }
  }

  onKeydown(event: KeyboardEvent) {
    // using key here because it is available is all browsers
    switch (event.key) {
      case CONSTANTS.KEY_CODES.TAB:
        event.preventDefault();
        break;
      case CONSTANTS.KEY_CODES.ENTER:
        this.onEnter();
        event.preventDefault();
        break;
      case CONSTANTS.KEY_CODES.UP:
        this.onUp();
        event.preventDefault();
        break;
      case CONSTANTS.KEY_CODES.DOWN:
        this.onDown();
        event.preventDefault();
        break;
      case 'k':
        if (event.metaKey) {
          this.onMetaK();
          event.preventDefault();
        }
        break;
      default:
        break;
    }
  }

  private onEnter() {
    this.resetHistoryPosition();
    this.commandInitiated.emit(this.commandCtrl.value);
    this.commandCtrl.reset();
  }

  private onUp() {
    if (!this.history || !this.history.length) {
      return;
    }

    if (this.historyOrdinal < this.history.length - 1) {
      this.historyOrdinal = this.historyOrdinal == null ? 0 : this.historyOrdinal + 1;
    } else {
      // shouldn't happen, but just in case
      this.historyOrdinal = this.history.length - 1;
    }

    this.commandCtrl.patchValue(this.history[this.historyOrdinal].text);
  }

  private onDown() {
    if (!this.history || !this.history.length) {
      return;
    }

    if (this.historyOrdinal > 0) {
      this.historyOrdinal = this.historyOrdinal == null ? this.history.length - 1 : this.historyOrdinal - 1;
      this.commandCtrl.patchValue(this.history[this.historyOrdinal].text);
    } else {
      this.resetHistoryPosition();
      this.commandCtrl.patchValue(null);
    }
  }

  private onMetaK() {
    this.cleared.emit();
  }

  private resetHistoryPosition() {
    this.historyOrdinal = null;
  }
}
