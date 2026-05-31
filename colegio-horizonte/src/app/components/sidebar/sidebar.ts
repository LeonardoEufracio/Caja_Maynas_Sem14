import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarLink {
  label: string;
  route?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly links: SidebarLink[] = [
    { label: 'Dashboard', route: '/admin/dashboard' },
    { label: 'Perfil', disabled: true },
    { label: 'Notas', disabled: true },
    { label: 'Horarios', disabled: true },
    { label: 'Tareas', disabled: true },
    { label: 'Recursos', disabled: true },
    { label: 'Asistencia', disabled: true },
    { label: 'Estudiantes', disabled: true },
    { label: 'Docentes', disabled: true },
    { label: 'Cursos', disabled: true },
    { label: 'Configuración', disabled: true },
  ];
}
