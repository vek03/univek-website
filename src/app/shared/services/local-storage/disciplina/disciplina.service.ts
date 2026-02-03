import { Injectable } from '@angular/core';
import { Disciplina } from '../../../models/disciplina.model';
import { IService } from '../../service.interface';

@Injectable({ providedIn: 'root' })
export class DisciplinaService implements IService {
  create(disciplina: Disciplina): void {
    const storedDisciplinas = this.readAll();
    storedDisciplinas.push(disciplina);
    localStorage.setItem('disciplinas', JSON.stringify(storedDisciplinas));
  }

  read(key: any): Disciplina {
    return this.readAll().find((char: Disciplina) => char.id === key)!;
  }

  readAll(filter?: Disciplina): Disciplina[] {
    const stored = localStorage.getItem('disciplinas');
    let disciplinas = stored ? JSON.parse(stored) : [];

    return disciplinas;
  }

  update(updatedDisciplina: Disciplina): void {
    const storedDisciplinas = this.readAll();
    const index = storedDisciplinas.findIndex(char => char.id === updatedDisciplina.id);

    if (index !== -1) {
      storedDisciplinas[index] = updatedDisciplina;
      localStorage.setItem('disciplinas', JSON.stringify(storedDisciplinas));
    }
  }

  delete(id: number): void {
    const storedDisciplinas = this.readAll();
    const updatedDisciplinas = storedDisciplinas.filter(char => char.id !== id);
    localStorage.setItem('disciplinas', JSON.stringify(updatedDisciplinas));
  }

  clear(): void {
    localStorage.removeItem('disciplinas');
  }
}
