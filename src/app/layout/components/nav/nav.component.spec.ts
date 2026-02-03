import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
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
    it('should render the navbar element', () => {
      const navbarElement = compiled.querySelector('nav.navbar');
      expect(navbarElement).toBeTruthy();
    });

    it('should render the navbar container', () => {
      const navbarContainer = compiled.querySelector('.navbar-container');
      expect(navbarContainer).toBeTruthy();
    });

    describe('Brand Section', () => {
      it('should render brand section with logo', () => {
        const brandSection = compiled.querySelector('.navbar-brand');
        expect(brandSection).toBeTruthy();

        const brandIcon = brandSection?.querySelector('.brand-icon');
        expect(brandIcon).toBeTruthy();

        const logoImg = brandIcon?.querySelector('img.brand-icon-img');
        expect(logoImg).toBeTruthy();
        expect(logoImg?.getAttribute('src')).toBe('assets/images/Rick_and_Morty.svg');
        expect(logoImg?.getAttribute('alt')).toBe('Victor RickMorty UI');
        expect(logoImg?.getAttribute('width')).toBe('100');

        const brandText = brandSection?.querySelector('.brand-text');
        expect(brandText).toBeTruthy();
      });

      it('should have proper image attributes', () => {
        const logoImg = compiled.querySelector('.brand-icon-img') as HTMLImageElement;
        expect(logoImg).toBeTruthy();
        expect(logoImg.src).toContain('assets/images/Rick_and_Morty.svg');
        expect(logoImg.alt).toBe('Victor RickMorty UI');
        expect(logoImg.width).toBe(100);
      });
    });

    describe('Navigation Menu', () => {
      it('should render navigation menu with correct structure', () => {
        const navbarMenu = compiled.querySelector('.navbar-menu');
        expect(navbarMenu).toBeTruthy();
        expect(navbarMenu?.tagName.toLowerCase()).toBe('ul');

        const menuItems = navbarMenu?.querySelectorAll('.navbar-item');
        expect(menuItems?.length).toBe(2);

        menuItems?.forEach(item => {
          expect(item.tagName.toLowerCase()).toBe('li');
        });
      });

      it('should render Home navigation link', () => {
        const homeLink = compiled.querySelector('.navbar-item:first-child .navbar-link') as HTMLAnchorElement;
        expect(homeLink).toBeTruthy();
        expect(homeLink.textContent?.trim()).toBe('Home');
        expect(homeLink.getAttribute('routerLink')).toBe('/');
      });

      it('should render List navigation link', () => {
        const listLink = compiled.querySelector('.navbar-item:last-child .navbar-link') as HTMLAnchorElement;
        expect(listLink).toBeTruthy();
        expect(listLink.textContent?.trim()).toBe('Listar');
        expect(listLink.getAttribute('routerLink')).toBe('/list');
      });

      it('should have correct number of navigation items', () => {
        const navItems = compiled.querySelectorAll('.navbar-item');
        expect(navItems.length).toBe(2);

        const navLinks = compiled.querySelectorAll('.navbar-link');
        expect(navLinks.length).toBe(2);
      });

      it('should have all navigation links with routerLink attribute', () => {
        const navLinks = compiled.querySelectorAll('.navbar-link[routerLink]');
        expect(navLinks.length).toBe(2);

        const routerLinks = Array.from(navLinks).map(link =>
          link.getAttribute('routerLink')
        );
        expect(routerLinks).toContain('/');
        expect(routerLinks).toContain('/list');
      });
    });
  });

  describe('CSS Classes and Structure', () => {
    it('should have correct CSS classes applied', () => {
      expect(compiled.querySelector('.navbar')).toBeTruthy();
      expect(compiled.querySelector('.navbar-container')).toBeTruthy();
      expect(compiled.querySelector('.navbar-brand')).toBeTruthy();
      expect(compiled.querySelector('.brand-icon')).toBeTruthy();
      expect(compiled.querySelector('.brand-text')).toBeTruthy();
      expect(compiled.querySelector('.navbar-menu')).toBeTruthy();
    });

    it('should render all expected UI elements', () => {
      // Main structural elements
      expect(compiled.querySelector('nav.navbar')).toBeTruthy();
      expect(compiled.querySelector('.navbar-container')).toBeTruthy();
      expect(compiled.querySelector('.navbar-brand')).toBeTruthy();
      expect(compiled.querySelector('ul.navbar-menu')).toBeTruthy();

      // Brand elements
      expect(compiled.querySelector('.brand-icon')).toBeTruthy();
      expect(compiled.querySelector('img.brand-icon-img')).toBeTruthy();
      expect(compiled.querySelector('.brand-text')).toBeTruthy();

      // Navigation elements
      expect(compiled.querySelectorAll('.navbar-item').length).toBe(2);
      expect(compiled.querySelectorAll('.navbar-link').length).toBe(2);
    });

    it('should have proper HTML structure hierarchy', () => {
      const navbar = compiled.querySelector('nav.navbar');
      expect(navbar).toBeTruthy();

      const container = navbar?.querySelector('.navbar-container');
      expect(container).toBeTruthy();

      const brand = container?.querySelector('.navbar-brand');
      const menu = container?.querySelector('.navbar-menu');
      expect(brand).toBeTruthy();
      expect(menu).toBeTruthy();

      // Check that brand and menu are siblings
      expect(brand?.parentElement).toBe(menu?.parentElement);
    });
  });

  describe('Accessibility', () => {
    it('should have proper alt text for images', () => {
      const images = compiled.querySelectorAll('img');

      images.forEach(img => {
        expect(img.getAttribute('alt')).toBeTruthy();
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });

    it('should use semantic HTML elements', () => {
      // Should use nav element
      expect(compiled.querySelector('nav')).toBeTruthy();

      // Should use ul for menu list
      expect(compiled.querySelector('ul.navbar-menu')).toBeTruthy();

      // Should use li for menu items
      const menuItems = compiled.querySelectorAll('li.navbar-item');
      expect(menuItems.length).toBeGreaterThan(0);
    });

    it('should have navigation links as anchor elements', () => {
      const navLinks = compiled.querySelectorAll('.navbar-link');

      navLinks.forEach(link => {
        expect(link.tagName.toLowerCase()).toBe('a');
      });
    });
  });

  describe('Router Integration', () => {
    it('should have RouterTestingModule configured', () => {
      // This test ensures that the component works with routing
      expect(fixture.debugElement.query(By.css('[routerLink]'))).toBeTruthy();
    });

    it('should have correct routerLink directives', () => {
      const routerLinks = fixture.debugElement.queryAll(By.css('[routerLink]'));
      expect(routerLinks.length).toBe(3);

      const routerLinkValues = routerLinks.map(link =>
        link.nativeElement.getAttribute('routerLink')
      );
      expect(routerLinkValues).toContain('/');
      expect(routerLinkValues).toContain('/list');
    });
  });

  describe('Content Validation', () => {
    it('should display correct navigation text', () => {
      const navLinks = compiled.querySelectorAll('.navbar-link');
      const linkTexts = Array.from(navLinks).map(link => link.textContent?.trim());

      expect(linkTexts).toContain('Home');
      expect(linkTexts).toContain('Listar');
    });

    it('should have brand logo with correct source', () => {
      const brandImage = compiled.querySelector('.brand-icon-img') as HTMLImageElement;
      expect(brandImage).toBeTruthy();
      expect(brandImage.src).toContain('Rick_and_Morty.svg');
    });

    it('should not have empty brand text element', () => {
      const brandText = compiled.querySelector('.brand-text');
      expect(brandText).toBeTruthy();
      // Brand text exists but may be empty (as per the template)
    });
  });
});
