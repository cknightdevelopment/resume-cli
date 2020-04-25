import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockCommandFacade } from 'src/test-helpers/mock/command-facade.mock';
import { By } from '@angular/platform-browser';
import { SELECTORS } from 'src/test-helpers/common-selectors';
import { TestModule } from 'src/test-helpers/test.modules';
import { CommandFacade } from '../../store/command/command.facade';
import { ChangeDetectionStrategy } from '@angular/core';
import { ContactExecuted } from '../../store/command/command.actions';
import { ContactComponent } from './contact.component';
import { contactModel } from 'src/test-helpers/factory/models';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let dispatchSpy: jasmine.Spy;
  let mockCommandFacade: MockCommandFacade;

  function getElements() {
    const output = fixture.debugElement.query(By.css(`${SELECTORS.TERMINAL_OUTPUT} .contact-container`));

    return {
      email: {
        link: output.query(By.css('.contact-email a')),
        icon: output.query(By.css('.contact-email a i'))
      },
      phone: {
        link: output.query(By.css('.contact-phone a')),
        icon: output.query(By.css('.contact-phone a i'))
      }
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: CommandFacade, useClass: MockCommandFacade }
      ],
      declarations: [ContactComponent]
    }).overrideComponent(ContactComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;

    component.params = {};
    mockCommandFacade = TestBed.get(CommandFacade);
    dispatchSpy = spyOn(mockCommandFacade, 'dispatch');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch contact execution', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(new ContactExecuted(component.params));
  });

  it('should display output for contact', () => {
    const contact = contactModel({
      email: 'test@email.com',
      phone: '1234567890'
    });

    mockCommandFacade.commandData.contact$.next({ contact });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.email.link.nativeElement.innerText).toEqual(contact.email);
    expect(elements.email.link.nativeElement.getAttribute('href')).toEqual(`mailto:${contact.email}`);

    const emailIconClasses = elements.email.icon.nativeElement.classList;
    expect(emailIconClasses).toContain('far');
    expect(emailIconClasses).toContain('fa-envelope');

    expect(elements.phone.link.nativeElement.innerText).toEqual(contact.phone);
    expect(elements.phone.link.nativeElement.getAttribute('href')).toEqual(`tel:${contact.phone}`);

    const phoneIconClasses = elements.phone.icon.nativeElement.classList;
    expect(phoneIconClasses).toContain('fas');
    expect(phoneIconClasses).toContain('fa-phone');
  });

  it('should not display phone when no phone provided', () => {
    const contact = contactModel({ email: 'test@email.com', phone: null });

    mockCommandFacade.commandData.contact$.next({ contact });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.email.link).toBeTruthy();
    expect(elements.phone.link).toBeFalsy();
  });

  it('should not display email when no email provided', () => {
    const contact = contactModel({ email: null, phone: '1234567890' });

    mockCommandFacade.commandData.contact$.next({ contact });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.email.link).toBeFalsy();
    expect(elements.phone.link).toBeTruthy();
  });
});
