import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LayoutComponent } from './layout.component';

// Mock components to avoid dependencies
@Component({
  selector: 'app-nav',
  template: '<nav>Mock Nav</nav>',
  standalone: false
})
class MockNavComponent {}

@Component({
  selector: 'app-footer',
  template: '<footer>Mock Footer</footer>',
  standalone: false
})
class MockFooterComponent {}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        MockNavComponent,
        MockFooterComponent
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
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
    it('should render the main container', () => {
      const containerElement = compiled.querySelector('.container');
      expect(containerElement).toBeTruthy();
    });

    it('should render nav component', () => {
      const navComponent = compiled.querySelector('app-nav');
      expect(navComponent).toBeTruthy();
    });

    it('should render router outlet', () => {
      const routerOutlet = compiled.querySelector('router-outlet');
      expect(routerOutlet).toBeTruthy();
    });

    it('should render footer component', () => {
      const footerComponent = compiled.querySelector('app-footer');
      expect(footerComponent).toBeTruthy();
    });

    it('should render all main components in correct order', () => {
      const container = compiled.querySelector('.container');
      expect(container).toBeTruthy();

      const children = Array.from(container?.children || []);
      expect(children.length).toBe(3);

      // Check order: nav, router-outlet, footer
      expect(children[0]?.tagName.toLowerCase()).toBe('app-nav');
      expect(children[1]?.tagName.toLowerCase()).toBe('router-outlet');
      expect(children[2]?.tagName.toLowerCase()).toBe('app-footer');
    });
  });

  describe('Component Structure', () => {
    it('should have proper HTML structure hierarchy', () => {
      const container = compiled.querySelector('.container');
      expect(container).toBeTruthy();

      // All main components should be direct children of container
      const directChildren = container?.children;
      expect(directChildren?.length).toBe(3);

      const childrenTags = Array.from(directChildren || []).map(child =>
        child.tagName.toLowerCase()
      );
      expect(childrenTags).toEqual(['app-nav', 'router-outlet', 'app-footer']);
    });

    it('should have container as root element', () => {
      const firstChild = compiled.firstElementChild;
      expect(firstChild?.classList.contains('container')).toBe(true);
    });

    it('should render all expected UI elements', () => {
      // Main structural element
      expect(compiled.querySelector('.container')).toBeTruthy();

      // Child components
      expect(compiled.querySelector('app-nav')).toBeTruthy();
      expect(compiled.querySelector('router-outlet')).toBeTruthy();
      expect(compiled.querySelector('app-footer')).toBeTruthy();

      // Should have exactly one of each
      expect(compiled.querySelectorAll('.container').length).toBe(1);
      expect(compiled.querySelectorAll('app-nav').length).toBe(1);
      expect(compiled.querySelectorAll('router-outlet').length).toBe(1);
      expect(compiled.querySelectorAll('app-footer').length).toBe(1);
    });
  });

  describe('CSS Classes', () => {
    it('should have correct CSS classes applied', () => {
      expect(compiled.querySelector('.container')).toBeTruthy();
    });

    it('should only have one container class', () => {
      const containers = compiled.querySelectorAll('.container');
      expect(containers.length).toBe(1);
    });
  });

  describe('Router Integration', () => {
    it('should have RouterTestingModule configured', () => {
      const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
      expect(routerOutlet).toBeTruthy();
    });

    it('should contain router-outlet directive', () => {
      const routerOutlets = fixture.debugElement.queryAll(By.css('router-outlet'));
      expect(routerOutlets.length).toBe(1);
    });
  });

  describe('Child Components Integration', () => {
    it('should include navigation component', () => {
      const navComponent = fixture.debugElement.query(By.css('app-nav'));
      expect(navComponent).toBeTruthy();
      expect(navComponent.componentInstance).toBeInstanceOf(MockNavComponent);
    });

    it('should include footer component', () => {
      const footerComponent = fixture.debugElement.query(By.css('app-footer'));
      expect(footerComponent).toBeTruthy();
      expect(footerComponent.componentInstance).toBeInstanceOf(MockFooterComponent);
    });

    it('should render mock content from child components', () => {
      // Check that mock components are rendering their content
      const navContent = compiled.querySelector('app-nav');
      const footerContent = compiled.querySelector('app-footer');

      expect(navContent).toBeTruthy();
      expect(footerContent).toBeTruthy();
    });
  });

  describe('Layout Structure Validation', () => {
    it('should have a proper layout structure for a typical web application', () => {
      const container = compiled.querySelector('.container');
      expect(container).toBeTruthy();

      // Should have header (nav), main content area (router-outlet), and footer
      const nav = container?.querySelector('app-nav');
      const main = container?.querySelector('router-outlet');
      const footer = container?.querySelector('app-footer');

      expect(nav).toBeTruthy();
      expect(main).toBeTruthy();
      expect(footer).toBeTruthy();
    });

    it('should maintain consistent component order', () => {
      const container = compiled.querySelector('.container');
      const elements = Array.from(container?.children || []);

      // Navigation should come first
      expect(elements[0]?.tagName.toLowerCase()).toBe('app-nav');

      // Router outlet (main content) should be in the middle
      expect(elements[1]?.tagName.toLowerCase()).toBe('router-outlet');

      // Footer should come last
      expect(elements[2]?.tagName.toLowerCase()).toBe('app-footer');
    });
  });

  describe('Template Content', () => {
    it('should not have any direct text content in the layout', () => {
      // Layout should only contain components and structure, no direct text
      const containerText = compiled.querySelector('.container')?.textContent?.trim() || '';
      const hasOnlyWhitespace = /^\s*$/.test(
        containerText.replace('Mock Nav', '').replace('Mock Footer', '')
      );
      expect(hasOnlyWhitespace).toBe(true);
    });

    it('should be a pure structural component', () => {
      // Should not have any form inputs, buttons, or interactive elements
      expect(compiled.querySelector('input')).toBeFalsy();
      expect(compiled.querySelector('button')).toBeFalsy();
      expect(compiled.querySelector('form')).toBeFalsy();

      // Should only contain structural divs and component tags
      const allElements = compiled.querySelectorAll('*');
      const allowedTags = ['div', 'app-nav', 'router-outlet', 'app-footer', 'nav', 'footer'];

      Array.from(allElements).forEach(element => {
        expect(allowedTags).toContain(element.tagName.toLowerCase());
      });
    });
  });
});
