import { Component, OnInit, ViewChild, ElementRef, NgZone, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CONSTANTS } from 'src/app/models/constants';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { TerminalNgStyle } from 'src/app/models/terminal-ng-style.model';
import { of, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-terminal-prompt',
  templateUrl: './terminal-prompt.component.html',
  styleUrls: ['./terminal-prompt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerminalPromptComponent implements OnInit {
  @ViewChild('terminalInput', { static: true }) terminalInput: ElementRef;
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  @Input() styles: TerminalNgStyle;
  @Output() commandInitiated = new EventEmitter<string>();

  commandCtrl: FormControl;

  constructor(private ngZone: NgZone, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.terminalInput.nativeElement.focus();
    this.commandCtrl = this.fb.control(null);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === CONSTANTS.KEY_CODES.TAB) {
      event.preventDefault();
    } else if (event.key === CONSTANTS.KEY_CODES.ENTER) {
      this.onEnter();
      event.preventDefault();
    }
  }

  private onEnter() {
    this.commandInitiated.emit(this.commandCtrl.value);
    this.commandCtrl.reset();
  }

  private triggerResize() {
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
