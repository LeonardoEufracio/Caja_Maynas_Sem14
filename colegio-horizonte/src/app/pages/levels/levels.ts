import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeader } from '../../components/page-header/page-header';

interface LevelCard {
  name: string;
  ages: string;
  grades: string;
  description: string;
  benefits: string[];
}

@Component({
  selector: 'app-levels',
  imports: [PageHeader, RouterLink],
  templateUrl: './levels.html',
  styleUrl: './levels.scss',
})
export class Levels {
  protected readonly levels: LevelCard[] = [
    {
      name: 'Inicial',
      ages: '3 a 5 años',
      grades: '3, 4 y 5 años',
      description: 'Ambientes lúdicos y seguros que favorecen la curiosidad, la expresión y la autonomía.',
      benefits: ['Desarrollo psicomotor', 'Inicio de lectoescritura', 'Socialización guiada'],
    },
    {
      name: 'Primaria',
      ages: '6 a 11 años',
      grades: '1.° a 6.° grado',
      description: 'Fortalecimiento de competencias básicas con proyectos interdisciplinarios.',
      benefits: ['Comunicación y matemática', 'Ciencia y tecnología', 'Formación en valores'],
    },
    {
      name: 'Secundaria',
      ages: '12 a 16 años',
      grades: '1.° a 5.° año',
      description: 'Preparación académica exigente con orientación vocacional y liderazgo estudiantil.',
      benefits: ['Pensamiento crítico', 'Preparación universitaria', 'Proyectos de emprendimiento'],
    },
  ];
}
