import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'selector',
        loadComponent: () => import('./country/pages/selector-page/selector-page.component').then(m => m.SelectorPageComponent)
    },
    {
        path: '**',
        redirectTo: 'selector'
    }
];
