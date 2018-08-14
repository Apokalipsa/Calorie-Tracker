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
        itemCaloriesInput: '#item-calories'
      }
      
      // Public methods
      return {
        addItemToList: function(items){
          let html = '';
    
          items.forEach(function(item){
            html += `<li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
            <i class="material-icons ">border_color</i>
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
            <i class="material-icons ">border_color</i>
            </a>
            `;
           // insert item 
           document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li)
        },
        clearInput : function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';

        },
        // function that will hide the line below the heading if list is empty
        hideList :function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        getSelectors: function(){
          return UISelectors;
        }
      }
    })();

// App Controller represent application runtime state

const App = (function(ItemCtrl, UICtrl){
    // Load event listeners
    const loadEventListeners = function(){
      // Get UI selectors
      const UISelectors = UICtrl.getSelectors();
  
      // Add item event
      document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }
  
    // Add item submit
    const itemAddSubmit = function(e){
      // Get form input from UI Controller
      const input = UICtrl.getItemInput();
  
      // Check for name and calorie input
      if(input.name !== '' && input.calories !== ''){
        // Add item
        const newItem = ItemController.addItem(input.name, input.calories);
        // Add item in UI list
        UIController.addNewItemInList(newItem);
      }

      // clear input fields
      UIController.clearInput();
  
      e.preventDefault();
    }
  
    // Public methods
    return {
      init: function(){
        // Fetch items from data structure
        const items = ItemCtrl.getItems();

        // Chack if eny items
        if(items.length === 0){
            UIController.hideList();

        }else{
               // Populate list with items
       UIController.addItemToList(items);

        }
        // Load event listeners
        loadEventListeners();
      }
    }
    
  })(ItemController, UIController);
  
  // Initialize App
  App.init();
