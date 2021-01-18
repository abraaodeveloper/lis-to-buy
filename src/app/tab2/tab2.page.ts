import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Item } from 'src/util/models/Item';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  cart: Item[] = [];

  constructor(private actionSheetController:ActionSheetController) {
    let stotageCart = localStorage.getItem("cart");
    if (stotageCart != null) {
      this.cart = JSON.parse(stotageCart);
    }
  }

  async itemOptions(item: any) {

    const actionSheet = await this.actionSheetController.create({
      header: item.title,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          for (let i: number = 0; i < this.cart.length; i++) {
            if (this.cart[i].id === item.id) {
              this.cart.splice(i, 1);
            }
          }
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
