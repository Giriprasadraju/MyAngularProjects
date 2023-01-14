import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './Product';
import { ProductService } from './products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy{

  pageTitle: string ="ProdManagement";
  showImage : boolean =false;
  imageWidth : number =50;
  imageMargin : number =10;
  errorMessage : string ="";
  sub!: Subscription;
  filteredProducts: IProduct[] = [];

  products: IProduct[] = [];

  showImageEvent(): void
{
  this.showImage = !this.showImage;
}

private _filterText : string = '';

get filterText() : string {
  return this._filterText;
}
set filterText(value : string){
this._filterText=value;
this.filteredProducts = this.performFilter(value);
}

constructor(private productService : ProductService) {

}


performFilter(filterBy: string): IProduct[] {
  filterBy = filterBy.toLocaleLowerCase();
  return this.products.filter((product: IProduct) =>
    product.productName.toLocaleLowerCase().includes(filterBy));
}

ngOnInit(): void {
  this.sub = this.productService.getProducts().subscribe({
    next: products => {
      this.products = products;
      this.filteredProducts = this.products
    },
    error: err => this.errorMessage =err

});
this.filteredProducts = this.products;
}
ngOnDestroy(): void {
  this.sub.unsubscribe();
}

onRatingClicked(message : string): void {
  this.pageTitle = 'ProductList:  ' + message;
}

}
