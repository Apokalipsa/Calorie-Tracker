// MODEL PATTERN
// Storage Controller

// Item Controller represent backend state
const ItemController = (function(){  // I.F.I. Function = self invoked
   // create item Constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
    // Create state of data
    const data = {
        // add manueli some item data objects that can work with
        items: [
            // {
            //     id : 0,
            //     name:'Pizza',
            //     calories: '300'
            // },
            // {
            //     id : 1,
            //     name:'Burek',
            //     calories: '600'
            // },
            // {
            //     id : 2,
            //     name:'Cake',
            //     calories: '200'
            // }
        ],
        currentItem : null,
        totalCalories: 0
    }
     // Public methods
  return {
    getItems: function(){
      return data.items;
    },
    addItem: function(name, calories){
      let ID;
      // Create ID
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getTotalCalories : function(){
        let total = 0;
        // loop through the data arry 
        data.items.forEach( function(item){
            total += item.calories;
        });
        // set total calculation in data structure
        data.totalCalories = total;
        // Return total 
        return data.totalCalories;
        
    },
    getItemById: function (id){
        let found = 0;
        data.items.forEach(function(item){
            if(item.id === id){
                found = item;
            }
        });
        return found;
    },
    // update current item in the data structure not UI
    updateItem: function(name, calories){
        // Calories to number
        calories = parseInt(calories);
  
        let found = null;
  
        data.items.forEach(function(item){
          if(item.id === data.currentItem.id){
            item.name = name;
            item.calories = calories;
            found = item;
          }
        });
        return found;
      },
      deleteItem : function(id){
        // get ids
        ids = data.items.map(function(item){
          return item.id;
        });
        // get the actual index
        const index = ids.indexOf(id);
        // remove item
        data.items.splice(index,1);
      },
      clearAllItems: function(){
      data.items = [];
      },
    setCurrentItem : function(item){
    data.currentItem = item;
    },
    geCurrentItem : function(){
        return data.currentItem;

    },

    logData: function(){
      return data;
    }
  }
})();

  // UI Contoller represent the frontend state
const UIController = (function(){  // I.F.I. Function
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories : '.total-calories',
        updateBtn : '.update-btn',
        deleteBtn : '.delete-btn',
        backtBtn : '.back-btn',
        listItems : '#item-list li',
        clearAllBtn : '.clear-btn'

      }
      
      // Public methods
      return {
        addItemToList: function(items){
          let html = '';
    
          items.forEach(function(item){
            html += `<li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
            <i class="edit-item material-icons">border_color</i>
            </a>
          </li>`;
          });
    
          // Insert list items
          document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function(){
          return {
            name:document.querySelector(UISelectors.itemNameInput).value,
            calories:document.querySelector(UISelectors.itemCaloriesInput).value
          }
        },
        addNewItemInList: function(item){
            // Show the list if is not empty
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // add class to li
            li.className = 'collection-item';
            // add id to li
            li.id =`item-${item.id}`;
            // add to html
            li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
            <i class="edit-item material-icons">border_color</i>
            </a>
            `;
           // insert item 
           document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li)
        },
        //
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);
      
            // Turn Node list into array
            listItems = Array.from(listItems);
      
            listItems.forEach(function(listItem){
              const itemID = listItem.getAttribute('id');
      
              if(itemID === `item-${item.id}`){
                document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item material-icons">border_color</i>
                </a>`;
              }
            });
          },
          deleteListItem : function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();

          },
        clearInput : function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';

        },
        // add item in form when is edit state is activ
        addItemToForm : function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemController.geCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemController.geCurrentItem().calories;
            UIController.showEditState();
        },
        removeAll: function(){
          let listItems = document.querySelectorAll(UISelectors.listItems);
          // Turn Node list into array
          listItems = Array.from(listItems);
      
          listItems.forEach(function(item){
            item.remove();

          });
        },
        // function that will hide the line below the heading if list is empty
        hideList : function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories : function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;

        },
        
        clearEditState : function(){
            UIController.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backtBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';


        },
        // Add buttons ti UI when is edit state is active
        showEditState : function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backtBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';

        },
        getSelectors: function(){
          return UISelectors;
        }
      }
    })();

// App Controller represent application runtime state

const App = (function(ItemController, UIController){
    // Load event listeners
    const loadEventListeners = function(){
      // Get UI selectors
      const UISelectors = UIController.getSelectors();
  
      // Add item event
      document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    
      // Disable submit on enter and alow only that buttons on UI has a submition right
    document.addEventListener('keypress', function(e){
        if(e.keyCode === 13 || e.which === 13){
            e.preventDefault();
            return false;
        }
    });
    
    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

      // Update item event
     document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
     
     // back btn event
     document.querySelector(UISelectors.backtBtn).addEventListener('click', UIController.clearEditState);
    
     // delete btn event
     document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
     
     // delete all btn event
     document.querySelector(UISelectors.clearAllBtn).addEventListener('click', clearAllItemsClick);
  
  
    }

    // Add item submit
    const itemAddSubmit = function(e){
      // Get form input from UI Controller
      const input = UIController.getItemInput();
  
      // Check for name and calorie input
      if(input.name !== '' && input.calories !== ''){
        // Add item
        const newItem = ItemController.addItem(input.name, input.calories);
        // Add item in UI list
        UIController.addNewItemInList(newItem);
      }
      // Get total caories
      const totalCalories = ItemController.getTotalCalories();
       
      // show up total calories to UI
      UIController.showTotalCalories(totalCalories);
       // clear input fields
      UIController.clearInput();
  
      e.preventDefault();
    }
  // click edit item
  const itemEditClick = function(e){
      if(e.target.classList.contains('edit-item')){
     // get list item id
     const listId = e.target.parentNode.parentNode.id;
     // break into array
     const listIdArray = listId.split('-');
     // get the actual id like number
     const id = parseInt(listIdArray[1]);
     // get item
     const itemToEdit = ItemController.getItemById(id);
     
     // set the current item
     ItemController.setCurrentItem(itemToEdit);
     // Add ite, to form when is edit mode state in action
     UIController.addItemToForm();

    }
    e.preventDefault();

  }
  // Update item submith btn 
  const itemUpdateSubmit = function(e){
      // get item input 
      const input = UIController.getItemInput();
      // update item
      const updatedItem = ItemController.updateItem(input.name, input.calories);
      // Update UI
      UIController.updateListItem(updatedItem);
         // Get total caories
         const totalCalories = ItemController.getTotalCalories();
       
         // show up total calories to UI
         UIController.showTotalCalories(totalCalories);
         
         UIController.clearEditState();
      
      e.preventDefault();

  }
  const itemDeleteSubmit = function(e){
    // get current item
    const currentItem = ItemController.geCurrentItem();

    // delete item from the data structure not UI
    ItemController.deleteItem(currentItem.id);

    // delete item from UI
    UIController.deleteListItem(currentItem.id);
   
    // Get total caories
    const totalCalories = ItemController.getTotalCalories();
       
    // show up total calories to UI
    UIController.showTotalCalories(totalCalories);
    
    UIController.clearEditState();
 
    e.preventDefault();

  }
  const clearAllItemsClick = function(){
    // clear all  items from the data structure not UI
    ItemController.clearAllItems();

    // Get total caories
    const totalCalories = ItemController.getTotalCalories();
       
    // show up total calories to UI
    UIController.showTotalCalories(totalCalories);

    // clear all items from UI
    UIController.removeAll();

    // hide the ul list afer all data has been clear
    UIController.hideList();


  }
    // Public methods
    return {
        
      init: function(){
        // Clear edit state
        UIController.clearEditState();
        // Fetch items from data structure
        const items = ItemController.getItems();

        // Chack if eny items
        if(items.length === 0){
            
            UIController.hideList();

        }else{
               // Fill list with items
       UIController.addItemToList(items);

        }
        // Get total caories
       const totalCalories = ItemController.getTotalCalories();
       
       // show up total calories to UI
       UIController.showTotalCalories(totalCalories);
        // Load event listeners
        loadEventListeners();
      }
    }
    
  })(ItemController, UIController);
  
  // Initialize App
  App.init();
