import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZendeskBodyComponent } from './zendesk-body.component';

describe('ZendeskBodyComponent', () => {
  let component: ZendeskBodyComponent;
  let fixture: ComponentFixture<ZendeskBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZendeskBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZendeskBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
