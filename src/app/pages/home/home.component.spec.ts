import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: HTMLElement;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'list', component: HomeComponent } // Mock route for testing
        ]),
        MatButtonModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct component selector', () => {
    expect(component).toBeDefined();
    const componentElement = fixture.debugElement.nativeElement;
    expect(componentElement).toBeTruthy();
  });

  describe('Template Rendering', () => {
    it('should render the home container', () => {
      const homeContainer = compiled.querySelector('.home-container');
      expect(homeContainer).toBeTruthy();
    });

    it('should render the welcome heading', () => {
      const welcomeHeading = compiled.querySelector('h1.welcome');
      expect(welcomeHeading).toBeTruthy();
      expect(welcomeHeading?.textContent?.trim()).toBe('Bem vindo ao Rick e Morty UI!');
    });

    it('should render the description paragraph', () => {
      const descriptionParagraph = compiled.querySelector('p.description');
      expect(descriptionParagraph).toBeTruthy();
      expect(descriptionParagraph?.textContent?.trim()).toBe('Explore o universo de Rick and Morty com nossa UI!');
    });

    it('should render the explore button', () => {
      const exploreButton = compiled.querySelector('button.explore-button');
      expect(exploreButton).toBeTruthy();
      expect(exploreButton?.textContent?.trim()).toBe('Explorar Personagens');
    });

    it('should render all main elements in correct order', () => {
      const container = compiled.querySelector('.home-container');
      expect(container).toBeTruthy();

      const children = Array.from(container?.children || []);
      expect(children.length).toBe(3);

      // Check order: h1, p, button
      expect(children[0]?.tagName.toLowerCase()).toBe('h1');
      expect(children[0]?.classList.contains('welcome')).toBe(true);

      expect(children[1]?.tagName.toLowerCase()).toBe('p');
      expect(children[1]?.classList.contains('description')).toBe(true);

      expect(children[2]?.tagName.toLowerCase()).toBe('button');
      expect(children[2]?.classList.contains('explore-button')).toBe(true);
    });
  });

  describe('Button Properties', () => {
    it('should have Material Design raised button', () => {
      const button = compiled.querySelector('button[mat-raised-button]');
      expect(button).toBeTruthy();
    });

    it('should have primary color', () => {
      const button = compiled.querySelector('button[color="primary"]');
      expect(button).toBeTruthy();
    });

    it('should have router link to list page', () => {
      const button = compiled.querySelector('button[routerLink="/list"]');
      expect(button).toBeTruthy();
      expect(button?.getAttribute('routerLink')).toBe('/list');
    });

    it('should have all required button attributes', () => {
      const button = compiled.querySelector('.explore-button') as HTMLButtonElement;
      expect(button).toBeTruthy();
      expect(button.hasAttribute('mat-raised-button')).toBe(true);
      expect(button.getAttribute('color')).toBe('primary');
      expect(button.getAttribute('routerLink')).toBe('/list');
      expect(button.classList.contains('explore-button')).toBe(true);
    });
  });

  describe('CSS Classes and Structure', () => {
    it('should have correct CSS classes applied', () => {
      expect(compiled.querySelector('.home-container')).toBeTruthy();
      expect(compiled.querySelector('.welcome')).toBeTruthy();
      expect(compiled.querySelector('.description')).toBeTruthy();
      expect(compiled.querySelector('.explore-button')).toBeTruthy();
    });

    it('should have proper HTML structure hierarchy', () => {
      const container = compiled.querySelector('.home-container');
      expect(container).toBeTruthy();

      // All elements should be direct children of container
      const welcomeHeading = container?.querySelector('h1.welcome');
      const description = container?.querySelector('p.description');
      const button = container?.querySelector('button.explore-button');

      expect(welcomeHeading).toBeTruthy();
      expect(description).toBeTruthy();
      expect(button).toBeTruthy();

      // Check that they are direct children
      expect(welcomeHeading?.parentElement).toBe(container);
      expect(description?.parentElement).toBe(container);
      expect(button?.parentElement).toBe(container);
    });

    it('should render all expected UI elements', () => {
      // Main structural element
      expect(compiled.querySelector('.home-container')).toBeTruthy();

      // Content elements
      expect(compiled.querySelector('h1.welcome')).toBeTruthy();
      expect(compiled.querySelector('p.description')).toBeTruthy();
      expect(compiled.querySelector('button.explore-button')).toBeTruthy();

      // Should have exactly one of each
      expect(compiled.querySelectorAll('.home-container').length).toBe(1);
      expect(compiled.querySelectorAll('h1.welcome').length).toBe(1);
      expect(compiled.querySelectorAll('p.description').length).toBe(1);
      expect(compiled.querySelectorAll('button.explore-button').length).toBe(1);
    });
  });

  describe('Content Validation', () => {
    it('should display correct welcome message in Portuguese', () => {
      const welcomeText = compiled.querySelector('h1.welcome')?.textContent?.trim();
      expect(welcomeText).toBe('Bem vindo ao Rick e Morty UI!');
    });

    it('should display correct description text in Portuguese', () => {
      const descriptionText = compiled.querySelector('p.description')?.textContent?.trim();
      expect(descriptionText).toBe('Explore o universo de Rick and Morty com nossa UI!');
    });

    it('should display correct button text in Portuguese', () => {
      const buttonText = compiled.querySelector('button.explore-button')?.textContent?.trim();
      expect(buttonText).toBe('Explorar Personagens');
    });

    it('should have meaningful and consistent Portuguese content', () => {
      const welcome = compiled.querySelector('h1.welcome')?.textContent;
      const description = compiled.querySelector('p.description')?.textContent;
      const buttonText = compiled.querySelector('button.explore-button')?.textContent;

      // Check that all text is in Portuguese and related to Rick and Morty
      expect(welcome).toContain('Rick e Morty');
      expect(description).toContain('Rick and Morty');
      expect(buttonText).toContain('Personagens');
    });
  });

  describe('Router Integration', () => {
    it('should have RouterTestingModule configured', () => {
      const routerLink = fixture.debugElement.query(By.css('[routerLink]'));
      expect(routerLink).toBeTruthy();
    });

    it('should have correct routerLink directive', () => {
      const routerLinks = fixture.debugElement.queryAll(By.css('[routerLink]'));
      expect(routerLinks.length).toBe(1);

      const routerLinkValue = routerLinks[0].nativeElement.getAttribute('routerLink');
      expect(routerLinkValue).toBe('/list');
    });
  });

  describe('Accessibility', () => {
    it('should use semantic HTML elements', () => {
      // Should use h1 for main heading
      expect(compiled.querySelector('h1')).toBeTruthy();

      // Should use p for description paragraph
      expect(compiled.querySelector('p')).toBeTruthy();

      // Should use button for action
      expect(compiled.querySelector('button')).toBeTruthy();
    });

    it('should have proper heading hierarchy', () => {
      const headings = compiled.querySelectorAll('h1, h2, h3, h4, h5, h6');
      expect(headings.length).toBe(1);
      expect(headings[0].tagName.toLowerCase()).toBe('h1');
    });

    it('should have descriptive button text', () => {
      const button = compiled.querySelector('button');
      const buttonText = button?.textContent?.trim();
      expect(buttonText).toBeTruthy();
      expect(buttonText?.length).toBeGreaterThan(5); // Should be descriptive
    });
  });

  describe('Material Design Integration', () => {
    it('should use Angular Material button', () => {
      const matButton = compiled.querySelector('button[mat-raised-button]');
      expect(matButton).toBeTruthy();
    });

    it('should have primary theme color', () => {
      const primaryButton = compiled.querySelector('button[color="primary"]');
      expect(primaryButton).toBeTruthy();
    });
  });

  describe('Component Structure Validation', () => {
    it('should be a simple presentational component', () => {
      // Should not have form inputs (except the button)
      expect(compiled.querySelector('input')).toBeFalsy();
      expect(compiled.querySelector('textarea')).toBeFalsy();
      expect(compiled.querySelector('select')).toBeFalsy();

      // Should have exactly one button
      expect(compiled.querySelectorAll('button').length).toBe(1);
    });

    it('should have container as root element', () => {
      const firstChild = compiled.firstElementChild;
      expect(firstChild?.classList.contains('home-container')).toBe(true);
    });

    it('should maintain proper content flow', () => {
      const container = compiled.querySelector('.home-container');
      const elements = Array.from(container?.children || []);

      // Should flow from heading -> description -> action (button)
      expect(elements[0]?.tagName.toLowerCase()).toBe('h1'); // Title first
      expect(elements[1]?.tagName.toLowerCase()).toBe('p');  // Description second
      expect(elements[2]?.tagName.toLowerCase()).toBe('button'); // Action last
    });
  });
});
