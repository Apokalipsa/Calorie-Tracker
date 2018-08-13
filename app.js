// MODEL PATTERN
// Storage Controller

// Item Controller
const ItemController = (function(){  // I.F.I. Function = self invoked
    // Create a constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    // Create state of data
    const data = {
        // add some item data objects
        items: [
            {
                id : 0,
                name:'Pizza',
                calories: '300'
            },
            {
                id : 1,
                name:'Burek',
                calories: '600'
            },
            {
                id : 3,
                name:'Cake',
                calories: '200'
            }
        ],
        currentItem : null,
        totalCalories: 0
    }
    // public function
return {

    logData: function(){
        return data;
    },
    getItems: function(){
        return data.items;

    }
}
})();

// UI Contoller
const UIController = (function(){  // I.F.I. Function
    // any class is stored in this object that can be changed on 1 place
    const UISelectors= {
        itemList : '#item-list'
    }
    // public function
    return{
        addItemList: function(items){
            let html = '';
            items.forEach(function(item){
            // using templatestring
           html += ` <li class="collection-item" id="item-${item.id}">
           <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
           <a href="#" class="secondary-content">
              <i class="material-icons ">border_color</i>
            </a>
          </li> `;
            });
            // add html to the index page
            document.querySelector(UISelectors.itemList).innerHTML = html;
          
        }
    }

})();

// App Controller
const App = (function(ItemController, UIController){  // I.F.I. Function
    // public function
    return{
        init: function(){
            console.log('Initializinh App...')
            // get items from data state
            const items = ItemController.getItems();

             // add items to list
            UIController.addItemList(items);

        }
    }
})(ItemController, UIController);
//Run App
App.init();