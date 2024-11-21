import { Component } from '@angular/core';

interface CatImage {
    url: string;
}

@Component({
  selector: 'app-imagenesgatos',
  standalone: true,
  templateUrl: './imagenesgatos.component.html',
  styleUrls: ['./imagenesgatos.component.css']
})
export class ImagenesgatosComponent {
  catImageUrl: string = '';

  constructor() {
    this.fetchCatImage(); // Cargar una imagen de gato al inicio
  }

  async fetchCatImage(): Promise<void> {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data: CatImage[] = await response.json();
      this.catImageUrl = data[0].url; // Actualiza la URL de la imagen
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  }

  onNewCatButtonClick(): void {
    this.fetchCatImage(); // Cargar una nueva imagen al hacer clic
  }
}