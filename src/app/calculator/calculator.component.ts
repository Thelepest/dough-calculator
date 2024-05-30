import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  form = {
    shape: '',
    length: null,
    depth: null,
    diameter: null,
    product: '',
    quantity: null,
    season: '',
    hydration: 80
  };

  recipe: any = null;

  isFormValid(): boolean {
    if (this.form.shape === '' || this.form.product === '' || this.form.quantity! <= 0 || this.form.season === '') {
      return false;
    }
    if (this.form.shape === 'rectangular' && (this.form.length! <= 0 || this.form.depth! <= 0)) {
      return false;
    }
    if (this.form.shape === 'circular' && this.form.diameter! <= 0) {
      return false;
    }
    return true;
  }

  calculateRecipe() {
    const numProducts = this.form.quantity;
    const hydratation = this.form.hydration/100;
    const isSummer = this.form.season === 'summer';

    let M = 0;
    if (this.form.shape === 'circular') {
      const diameter = this.form.diameter;
      M = 3.14 * Math.pow(diameter! / 2, 2);
    } else if (this.form.shape === 'rectangular') {
      const length = this.form.length;
      const depth = this.form.depth;
      M = length! * depth!;
    }

    let F = 0;
    if (this.form.product === 'focaccia') {
      F = M * 1.5;
    } else if (this.form.product === 'pizza') {
      F = M * 0.6;
    }

    const flour = numProducts! * (1 / (1 + hydratation + 0.02 + (isSummer ? 0.1 : 0.2)));
    const water = numProducts! * (hydratation * flour);
    const salt = numProducts! * (0.02 *flour);
    const levain = numProducts! * ((isSummer ? 0.1 : 0.2) * flour);

    this.recipe = {
      product: this.form.product.charAt(0).toUpperCase() + this.form.product.slice(1),
      quantity: numProducts,
      flour: Math.ceil(flour*F),
      water: Math.ceil(water*F),
      salt: Math.ceil(salt*F),
      levain: Math.ceil(levain*F)
    };
  }

  resetForm() {
    this.form = {
      shape: '',
      length: null,
      depth: null,
      diameter: null,
      product: '',
      quantity: null,
      season: '',
      hydration: 80
    };
    this.recipe = null;
  }
}
