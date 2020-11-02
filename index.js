const store = {
  items: [{
      id: cuid(),
      name: 'apples',
      checked: false,
      editing: false
    },
    {
      id: cuid(),
      name: 'oranges',
      checked: false,
      editing: false
    },
    {
      id: cuid(),
      name: 'milk',
      checked: true,
      editing: false
    },
    {
      id: cuid(),
      name: 'bread',
      checked: false,
      editing: false
    }
  ],
  hideCheckedItems: false
  //editListItems: false
};

const generateItemElement = function(item) {
  let itemTitle = `<span class='shopping-item shopping-item__checked'>${item.name}</span>`;
  let formForEditing = '';
  if (!item.checked) {
    itemTitle = `
     <span class='shopping-item'>${item.name}</span>
    `;
  }
  if (item.editing) {
    formForEditing =
      `<form class="js-edit-form edit-form">
    <input type="text" class="form-that-were-editing" value=${item.name}>
    <button type="submit">Submit</button>
  </form>`
  }


  return `
    <li class='js-item-element' data-item-id='${item.id}'>
      ${itemTitle}
      <div class='shopping-item-controls'>
        <button class='shopping-item-toggle js-item-toggle'>
          <span class='button-label'>check</span>
        </button>
        <button class='shopping-item-delete js-item-delete'>
          <span class='button-label'>delete</span>
        </button>
        <button class='shopping-item-edit js-item-edit'>
        <span class='button-label'>edit</span>
      </button>
      ${formForEditing}
      </div>
    </li>`;
};








const generateShoppingItemsString = function (shoppingList) {
  const items = shoppingList.map((item) => generateItemElement(item));
  return items.join('');
};

/**
 * Render the shopping list in the DOM
 */
const render = function () {
  
  let items = [...store.items];

  if (store.hideCheckedItems) {
    items = items.filter(item => !item.checked);
  }

  
  
  const shoppingListItemsString = generateShoppingItemsString(items);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
};

const addItemToShoppingList = function (itemName) {
  store.items.push({
    id: cuid(),
    name: itemName,
    checked: false
  });
};

const handleNewItemSubmit = function () {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    render();
  });
};

const toggleCheckedForListItem = function (id) {
  const foundItem = store.items.find(item => item.id === id);
  foundItem.checked = !foundItem.checked;
};

const handleItemCheckClicked = function () {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    render();
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
};


/**
 * Responsible for deleting a list item.
 
const deleteListItem = function (id) {
 
  const index = store.items.findIndex(item => item.id === id);
 
  store.items.splice(index, 1);
};

const handleDeleteItemClicked = function () {
  // Like in `handleItemCheckClicked`, 
  // we use event delegation.
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // Get the index of the item in store.items.
    const id = getItemIdFromElement(event.currentTarget);
    // Delete the item.
    deleteListItem(id);
    // Render the updated shopping list.
    render();
  });
};

// MY CODE HERE -> 

// //function for when I submit the edit button
const handleEditItemSubmit = function () {
  $('.js-shopping-list').on('submit', '.js-edit-form', function (event) {
    event.preventDefault();
    let entry = $('.form-that-were-editing').val();
    let id = getItemIdFromElement(event.currentTarget)
    for (i = 0; i < store.items.length; i++) {
      if (store.items[i].id === id) {
        store.items[i].name = entry;
      }
    }
    toggleEditButton(event.currentTarget);
    render()
  })
}

//helper function
const toggleEditButton = function (target) {
  let id = getItemIdFromElement(target)

  for (let i = 0; i < store.items.length; i++) {
    if (store.items[i].id === id) {
      store.items[i].editing = !store.items[i].editing;
    }
  }
}

//function for when I click edit button
const handleEditButtonClicked = function () {
  //event handler to listen for button clicked 
  $('.js-shopping-list').on('click', '.js-item-edit', function (event) {
    for (let i = 0; i < store.items.length; i++) {
      store.items[i].editing = false;
    }

    toggleEditButton(event.currentTarget)
    render()
  })
}




/**
 * Toggles the store.hideCheckedItems property
 */
const toggleCheckedItemsFilter = function () {
  store.hideCheckedItems = !store.hideCheckedItems;
};

/**
 * Places an event listener on the checkbox 
 * for hiding completed items.
 */
const handleToggleFilterClick = function () {
  $('.js-filter-checked').click(() => {
    toggleCheckedItemsFilter();
    render();
  });
};

/**
 * This function will be our callback when the
 * page loads. It is responsible for initially 
 * rendering the shopping list, then calling 
 * our individual functions that handle new 
 * item submission and user clicks on the 
 * "check" and "delete" buttons for individual 
 * shopping list items.
 */
const handleShoppingList = function () {
  render();
  handleNewItemSubmit();
  // add edit functions to list
  handleEditButtonClicked();
  handleEditItemSubmit();
  handleDeleteItemClicked();
  handleToggleFilterClick();
  handleItemCheckClicked();
};

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
