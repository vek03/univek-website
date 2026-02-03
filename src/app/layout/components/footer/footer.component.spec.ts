import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
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
    it('should render the footer element', () => {
      const footerElement = compiled.querySelector('footer.footer');
      expect(footerElement).toBeTruthy();
    });

    it('should render the footer container', () => {
      const footerContainer = compiled.querySelector('.footer-container');
      expect(footerContainer).toBeTruthy();
    });

    it('should render footer content with all sections', () => {
      const footerContent = compiled.querySelector('.footer-content');
      expect(footerContent).toBeTruthy();

      const footerSections = compiled.querySelectorAll('.footer-section');
      expect(footerSections.length).toBe(3);
    });

    describe('Brand Section', () => {
      it('should render brand section with logo and title', () => {
        const brandSection = compiled.querySelector('.footer-brand');
        expect(brandSection).toBeTruthy();

        const logoImg = brandSection?.querySelector('img.brand-icon-img');
        expect(logoImg).toBeTruthy();
        expect(logoImg?.getAttribute('src')).toBe('assets/images/Rick_and_Morty.svg');
        expect(logoImg?.getAttribute('alt')).toBe('Victor RickMorty UI');
        expect(logoImg?.getAttribute('width')).toBe('200');

        const title = brandSection?.querySelector('.footer-title');
        expect(title?.textContent).toBe('Victor RickMorty UI');

        const description = brandSection?.querySelector('.footer-description');
        expect(description?.textContent).toBe('Frontend para API do Rick and Morty');
      });
    });

    describe('Technologies Section', () => {
      it('should render technologies section with correct links', () => {
        const techSection = compiled.querySelector('.footer-section:nth-child(2)');
        expect(techSection).toBeTruthy();

        const heading = techSection?.querySelector('.footer-heading');
        expect(heading?.textContent).toBe('Tecnologias');

        const techLinks = techSection?.querySelectorAll('.footer-link');
        expect(techLinks?.length).toBe(3);
        expect(techLinks?.[0].textContent).toBe('Angular 19');
        expect(techLinks?.[1].textContent).toBe('Angular Material');
        expect(techLinks?.[2].textContent).toBe('Rick And Morty API');
      });
    });

    describe('Developer Section', () => {
      it('should render developer section with social links', () => {
        const devSection = compiled.querySelector('.footer-section:nth-child(3)');
        expect(devSection).toBeTruthy();

        const heading = devSection?.querySelector('.footer-heading');
        expect(heading?.textContent).toBe('Desenvolvedor');

        const collabName = devSection?.querySelector('.collab-name');
        expect(collabName?.textContent).toBe('Victor Cardoso');

        const socialLinks = devSection?.querySelectorAll('.icon-link');
        expect(socialLinks?.length).toBe(2);

        // LinkedIn link
        const linkedInLink = socialLinks?.[0] as HTMLAnchorElement;
        expect(linkedInLink?.href).toBe('https://www.linkedin.com/in/victorncardoso');
        expect(linkedInLink?.getAttribute('target')).toBe('_blank');
        expect(linkedInLink?.getAttribute('rel')).toBe('noopener noreferrer');
        expect(linkedInLink?.getAttribute('title')).toBe('LinkedIn');

        // GitHub link
        const githubLink = socialLinks?.[1] as HTMLAnchorElement;
        expect(githubLink?.href).toBe('https://github.com/vek03');
        expect(githubLink?.getAttribute('target')).toBe('_blank');
        expect(githubLink?.getAttribute('rel')).toBe('noopener noreferrer');
        expect(githubLink?.getAttribute('title')).toBe('GitHub');
      });

      it('should render SVG icons for social links', () => {
        const socialLinks = compiled.querySelectorAll('.collab-icons .icon-link');

        socialLinks.forEach(link => {
          const svg = link.querySelector('svg');
          expect(svg).toBeTruthy();
          expect(svg?.getAttribute('width')).toBe('18');
          expect(svg?.getAttribute('height')).toBe('18');
        });
      });
    });

    describe('Footer Bottom Section', () => {
      it('should render footer divider', () => {
        const divider = compiled.querySelector('.footer-divider');
        expect(divider).toBeTruthy();
      });

      it('should render footer bottom with copyright and social link', () => {
        const footerBottom = compiled.querySelector('.footer-bottom');
        expect(footerBottom).toBeTruthy();

        const copyright = footerBottom?.querySelector('.footer-copyright p');
        expect(copyright?.textContent).toBe('© 2025 Victor RickMorty UI. Todos os direitos reservados.');

        const socialSection = footerBottom?.querySelector('.footer-social');
        expect(socialSection).toBeTruthy();

        const githubSocialLink = socialSection?.querySelector('.social-link') as HTMLAnchorElement;
        expect(githubSocialLink?.href).toBe('https://github.com/vek03/victor-rickmorty-ui');
        expect(githubSocialLink?.getAttribute('target')).toBe('_blank');
        expect(githubSocialLink?.getAttribute('title')).toBe('GitHub');

        const socialSvg = githubSocialLink?.querySelector('svg');
        expect(socialSvg).toBeTruthy();
        expect(socialSvg?.getAttribute('width')).toBe('20');
        expect(socialSvg?.getAttribute('height')).toBe('20');
      });
    });
  });

  describe('Link Attributes and Accessibility', () => {
    it('should have proper external link attributes for security', () => {
      const externalLinksWithRel = compiled.querySelectorAll('a[rel="noopener noreferrer"]');
      expect(externalLinksWithRel.length).toBeGreaterThan(0);

      // Check specifically the developer social links that should have rel attribute
      const devSocialLinks = compiled.querySelectorAll('.collab-icons .icon-link[target="_blank"]');
      devSocialLinks.forEach(link => {
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      });

      // Check the footer social link
      const footerSocialLink = compiled.querySelector('.footer-social .social-link[target="_blank"]');
      expect(footerSocialLink?.getAttribute('target')).toBe('_blank');
    });

    it('should have title attributes for accessibility', () => {
      const socialLinks = compiled.querySelectorAll('.icon-link, .social-link');

      socialLinks.forEach(link => {
        expect(link.getAttribute('title')).toBeTruthy();
      });
    });

    it('should have proper alt text for images', () => {
      const images = compiled.querySelectorAll('img');

      images.forEach(img => {
        expect(img.getAttribute('alt')).toBeTruthy();
      });
    });
  });

  describe('Component Structure', () => {
    it('should have correct CSS classes applied', () => {
      expect(compiled.querySelector('.footer')).toBeTruthy();
      expect(compiled.querySelector('.footer-container')).toBeTruthy();
      expect(compiled.querySelector('.footer-content')).toBeTruthy();
      expect(compiled.querySelector('.footer-brand')).toBeTruthy();
      expect(compiled.querySelector('.footer-bottom')).toBeTruthy();
    });

    it('should render all expected UI elements', () => {
      // Main structural elements
      expect(compiled.querySelector('footer')).toBeTruthy();
      expect(compiled.querySelectorAll('.footer-section').length).toBe(3);
      expect(compiled.querySelector('.footer-divider')).toBeTruthy();
      expect(compiled.querySelector('.footer-bottom')).toBeTruthy();

      // Content elements
      expect(compiled.querySelector('img.brand-icon-img')).toBeTruthy();
      expect(compiled.querySelector('.footer-title')).toBeTruthy();
      expect(compiled.querySelector('.footer-description')).toBeTruthy();
      expect(compiled.querySelector('.footer-copyright')).toBeTruthy();
    });
  });
});
