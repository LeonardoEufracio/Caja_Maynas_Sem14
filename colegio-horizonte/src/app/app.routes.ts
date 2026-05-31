import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { About } from './pages/about/about';
import { Admission } from './pages/admission/admission';
import { Announcements } from './pages/announcements/announcements';
import { Contact } from './pages/contact/contact';
import { Dashboard } from './pages/dashboard/dashboard';
import { Gallery } from './pages/gallery/gallery';
import { Home } from './pages/home/home';
import { Levels } from './pages/levels/levels';
import { Login } from './pages/login/login';
import { News } from './pages/news/news';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Home },
      { path: 'nosotros', component: About },
      { path: 'niveles', component: Levels },
      { path: 'admision', component: Admission },
      { path: 'noticias', component: News },
      { path: 'comunicados', component: Announcements },
      { path: 'galeria', component: Gallery },
      { path: 'contacto', component: Contact },
      { path: 'login', component: Login },
    ],
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
