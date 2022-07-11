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
      name: {
        span: output.query(By.css('.contact-name span')),
        icon: output.query(By.css('.contact-name span i'))
      },
      email: {
        link: output.query(By.css('.contact-email a')),
        icon: output.query(By.css('.contact-email a i'))
      },
      phone: {
        link: output.query(By.css('.contact-phone a')),
        icon: output.query(By.css('.contact-phone a i'))
      },
      address: {
        span: output.query(By.css('.contact-address span')),
        icon: output.query(By.css('.contact-address span i'))
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
    mockCommandFacade = TestBed.inject(CommandFacade) as any;
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
      fullName: 'Test Name',
      email: 'test@email.com',
      phone: '1234567890',
      address: '123 Main Street'
    });

    mockCommandFacade.commandData.contact$.next({ contact });
    fixture.detectChanges();

    const elements = getElements();

    const nameIconClasses = elements.name.icon.nativeElement.classList;
    expect(elements.name.span.nativeElement.innerText).toEqual(contact.fullName);
    expect(nameIconClasses).toContain('far');
    expect(nameIconClasses).toContain('fa-user');

    const emailIconClasses = elements.email.icon.nativeElement.classList;
    expect(elements.email.link.nativeElement.innerText).toEqual(contact.email);
    expect(elements.email.link.nativeElement.getAttribute('href')).toEqual(`mailto:${contact.email}`);
    expect(emailIconClasses).toContain('far');
    expect(emailIconClasses).toContain('fa-envelope');

    const phoneIconClasses = elements.phone.icon.nativeElement.classList;
    expect(elements.phone.link.nativeElement.innerText).toEqual(contact.phone);
    expect(elements.phone.link.nativeElement.getAttribute('href')).toEqual(`tel:${contact.phone}`);
    expect(phoneIconClasses).toContain('fas');
    expect(phoneIconClasses).toContain('fa-phone');

    const addressIconClasses = elements.address.icon.nativeElement.classList;
    expect(elements.address.span.nativeElement.innerText).toEqual(contact.address);
    expect(addressIconClasses).toContain('fas');
    expect(addressIconClasses).toContain('fa-map-marker-alt');
  });

  it('should not display name when no name provided', () => {
    const contact = contactModel({ fullName: null, email: 'test@email.com', phone: '1234567890', address: '123 Main St' });

    mockCommandFacade.commandData.contact$.next({ contact });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.name.span).toBeFalsy();
    expect(elements.email.link).toBeTruthy();
    expect(elements.phone.link).toBeTruthy();
    expect(elements.address.span).toBeTruthy();
  });

  it('should not display phone when no phone provided', () => {
    const contact = contactModel({ fullName: 'Test Name', email: 'test@email.com', phone: null, address: '123 Main St' });

    mockCommandFacade.commandData.contact$.next({ contact });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.name.span).toBeTruthy();
    expect(elements.email.link).toBeTruthy();
    expect(elements.phone.link).toBeFalsy();
    expect(elements.address.span).toBeTruthy();
  });

  it('should not display email when no email provided', () => {
    const contact = contactModel({ fullName: 'Test Name', email: null, phone: '1234567890', address: '123 Main St' });

    mockCommandFacade.commandData.contact$.next({ contact });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.name.span).toBeTruthy();
    expect(elements.email.link).toBeFalsy();
    expect(elements.phone.link).toBeTruthy();
    expect(elements.address.span).toBeTruthy();
  });

  it('should not display address when no address provided', () => {
    const contact = contactModel({ fullName: 'Test Name', email: 'test@email.com', phone: '1234567890', address: null });

    mockCommandFacade.commandData.contact$.next({ contact });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.name.span).toBeTruthy();
    expect(elements.email.link).toBeTruthy();
    expect(elements.phone.link).toBeTruthy();
    expect(elements.address.span).toBeFalsy();
  });
});
