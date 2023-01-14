import { Component, OnInit } from '@angular/core';
import { IProduct } from './Product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{

  pageTitle: string ="ProdManagement";
  showImage : boolean =false;
  imageWidth : number =50;
  imageMargin : number =10;
  filteredProducts: IProduct[] = [];

  products: any[] = [
    {
      "productId": 2,
      "productName": "Garden Cart",
      "productCode": "GDN-0023",
      "releaseDate": "March 18, 2021",
      "description": "15 gallon capacity rolling garden cart",
      "price": 32.99,
      "starRating": 3,
      "imageUrl": "./assets/images/garden_cart.png"
    },
    {
      "productId": 5,
      "productName": "Hammer",
      "productCode": "TBX-0048",
      "releaseDate": "May 21, 2021",
      "description": "Curved claw steel hammer",
      "price": 8.9,
      "starRating": 4.5,
      "imageUrl": "./assets/images/hammer.png"
    }
  ];

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


performFilter(filterBy: string): IProduct[] {
  filterBy = filterBy.toLocaleLowerCase();
  return this.products.filter((product: IProduct) =>
    product.productName.toLocaleLowerCase().includes(filterBy));
}

ngOnInit(): void {
  this.filterText= "";
}
onRatingClicked(message : string): void {
  this.pageTitle = 'ProductList:  ' + message;
}

}
