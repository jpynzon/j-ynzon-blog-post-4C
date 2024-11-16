import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router'; // Import provideRouter
import { routes } from './app/app.routes'; // Import your routes
import { provideZoneChangeDetection } from '@angular/core'; // Import provideZoneChangeDetection
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Import provideAnimationsAsync
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
  ]
}).catch((err) => console.error(err));
