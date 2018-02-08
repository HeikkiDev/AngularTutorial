import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // Propiedad de tipo Hero, y con inicialización
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  // Listado de heroes
  heroes: Hero[];

  // selectedHero: Hero;

  // Este parametro privado será la dependencia inyectada por Angular
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    // put initialization logic here!
    this.getHeroes();
  }

  // click event handler
  // onSelect(hero: Hero): void{
  //   this.selectedHero = hero;
  // }

  // Usando el servicio HeroServices, obtenido por inyeccion de dependencias, obtenemos el listado de heroes
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  // Add a new Hero
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  // Delete a Hero
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
