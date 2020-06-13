import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css'],
})
export class GroceryListComponent implements OnInit {
  //Declare variable corresponding to [ngModel] in template
  item = { name: '', id: 0 };
  //Declare array to store user list items
  list = [];

  //Decalre variables for validation messages to store validation status
  duplicateMsg: string;
  hideDuplicateMsg: boolean;

  validDataMsg: string;
  hideValidDataMsg: boolean;

  delItemSuccessMsg: string;
  hideDelItemSuccessMsg: boolean;

  clearItemMsg: string;
  hideClearItemMsg: boolean;

  strikeThroughMessage: string;
  hideStrikeThroughMsg: boolean;

  clearAllText: string;
  hideClearAllText: boolean;

  constructor() {}

  ngOnInit(): void {}

  //Set initial values of booleans and set validation messages
  private messageValues() {
    this.hideDuplicateMsg = true;
    this.hideValidDataMsg = true;
    this.hideDelItemSuccessMsg = true;
    this.hideClearAllText = true;
    this.hideClearItemMsg = true;
    this.hideStrikeThroughMsg = true;
    //Set Validation Messages
    this.clearAllText = 'Clear All';
    this.strikeThroughMessage =
      'Click on the Icon at the end of each item to enable/disable strikethrough.';
  }

  //Invalid Item Error Message
  private enterValidItem(list) {
    if (this.list.length == 0) {
      this.hideStrikeThroughMsg = true;
    }
    this.hideStrikeThroughMsg = false;
    this.hideValidDataMsg = false;
    this.hideClearAllText = false;
    this.validDataMsg = ' * Enter a Valid  item to be added to the list.';
  }

  //Delete Success message
  private delSuccessMessages(item) {
    this.hideDelItemSuccessMsg = false;
    this.delItemSuccessMsg = ` * The item "${item}" was successfully deleted`;
  }

  //Clear All Item Success Message
  private clearAllItemsMessages() {
    this.clearItemMsg = '* All items have been successfully cleared!';
    this.hideClearAllText = true;
    this.hideStrikeThroughMsg = true;
  }

  //No item in list settings
  private noItemInListSettings() {
    this.hideStrikeThroughMsg = true;
    this.hideClearAllText = true;
  }

  //Add an item to list[]
  addItemToList() {
    this.messageValues();
    if (this.item.name.trim() != '') {
      //Check if the item already exists
      if (
        this.list.some(
          (li) =>
            (li.name.trim() === this.item.name ||
              li.name.trim() === this.item.name + 's' ||
              li.name.trim() === this.item.name.slice(0, -1) ||
              li.name.trim() === this.item.name.slice(0, -2) ||
              li.name.trim() === this.item.name + 'es') &&
            this.item.id == 0
        )
      ) {
        this.hideDuplicateMsg = false;
        this.duplicateMsg = `* The entered item "${this.item.name}" already exists in the list`;
      } else {
        if (this.item.id == 0) {
          this.hideDuplicateMsg = true;
          this.list.push({
            name: this.item.name.trim(),
            id: new Date().getTime(),
          });
          console.log(this.list);
        }
      }
      this.item = {
        name: '',
        id: 0,
      };
    } else {
      this.enterValidItem(this.list);
      this.hideStrikeThroughMsg = true;
    }
  }

  //Edit an existing item
  editListItem(item) {
    this.messageValues();
    this.item = item;
  }

  //Delete an existing item
  delListItem(item) {
    this.messageValues();
    for (let i = 0; i < this.list.length; i++) {
      if (item.id == this.list[i].id) {
        //delete the item from list
        this.list.splice(i, 1);
        if (this.item) {
          this.item = {
            name: '',
            id: 0,
          };
        }
        this.delSuccessMessages(item.name);
        break;
      }
    }
    if (this.list.length == 0) {
      this.noItemInListSettings();
    }
  }

  //Clear all items from list
  clearAllItemsFromList() {
    this.messageValues();
    this.hideClearItemMsg = false;
    if (this.list.length > 0) {
      for (let i = this.list.length; i >= 0; i--) {
        this.list.pop();
      }
      this.clearAllItemsMessages();
      this.list.length == 0;
    }
    let myitem = localStorage.getItem('itemName');
    let myitemlist = JSON.parse(myitem);
    localStorage.setItem('itemName', JSON.stringify(myitemlist));
    let myitemafterclearall = localStorage.getItem('itemName');
    console.log(myitemafterclearall);
    let myitemlistafterclearallitems = JSON.parse(myitemafterclearall);
  }

  //Strike/Unstrike the list item
  strikeListItem(item) {
    this.messageValues();
    for (let i = 0; i < this.list.length; i++) {
      if (item.id == this.list[i].id) {
        if (this.list[i].strike) {
          this.list[i].strike = false;
        } else {
          this.list[i].strike = true;
        }
        break;
      }
    }
  }
}
