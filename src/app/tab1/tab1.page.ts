import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Item } from 'src/util/models/Item';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  items: Item[] = [];
  cart: Item[] = [];

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private toastCtrl: ToastController
  ) {
    let stotageTasks = localStorage.getItem("items");
    if (stotageTasks != null) {
      this.items = JSON.parse(stotageTasks);
    }

    let stotageCart = localStorage.getItem("cart");
    if (stotageCart != null) {
      this.cart = JSON.parse(stotageCart);
    }
  }

  async incrQtditem(item) {
    for (let i: number = 0; i < this.items.length; i++) {
      if (this.items[i].id === item.id) {
        this.items[i].qtd++;
        this.updateData();
      }
    }
  }

  async decrQtditem(item) {
    for (let i: number = 0; i < this.items.length; i++) {
      if (this.items[i].id === item.id) {
        if (this.items[i].qtd > 0) this.items[i].qtd--;
        this.updateData();
      }
    }
  }

  async removeItem(item) {
    for (let i: number = 0; i < this.items.length; i++) {
      if (this.items[i].id === item.id) {
        this.items.splice(i, 1);
        this.updateData();
      }
    }
  }

  async addToCart(item) {
    for (let i: number = 0; i < this.items.length; i++) {
      if (this.items[i].id === item.id) {
        if (this.items[i].qtd > 0) {
          this.cart.push(item);
          localStorage.setItem('cart', JSON.stringify(this.items))
          this.items.splice(i, 1);
        }

        this.updateData();
      }
    }
  }

  async addTask() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'New item',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Item name'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Description'
        },
        {
          name: 'value',
          type: 'number',
          placeholder: 'Value'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Add',
          handler: async (newItem) => {
            if (newItem.name.trim().length < 1) {
              const toast = await this.toastCtrl.create({
                message: "You need to add text if you want to add a new task",
                duration: 2000,
                position: "top"
              });

              toast.present();
            } else {
              console.log(typeof newItem.value);

              this.items.push(new Item(newItem.name, newItem.description, parseFloat(newItem.value)));
              this.updateData();
            }
          }
        }
      ]
    });

    await alert.present()
  }

  async checkIsDone(task: any) {
    for (let i: number = 0; i < this.items.length; i++) {
      if (this.items[i].id === task.id) {
        this.items[i].done = !this.items[i].done;
        this.updateData();
      }
    }
  }
  updateData() {
    localStorage.setItem('items', JSON.stringify(this.items));
  }
}