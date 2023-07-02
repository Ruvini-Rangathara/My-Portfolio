$('#item').click(function () {
    $('#txtItemCode').focus();
});


//Save Item
$('#btnSaveItem').click(function () {
    saveItem();
});

function saveItem() {
    let itemCode = $('#txtItemCode').val();
    let itemName = $('#txtItemName').val();
    let itemQtyOnHand = $('#txtItemQTYOnHand').val();
    let itemPrice = $('#txtItemPrice').val();


    var itemObject = ItemModel(itemCode, itemName, itemQtyOnHand, itemPrice);

    //add the item object to the array
    items.push(itemObject);

    loadAllItems();

    bindItemRowClickEvents();

    clearItemTextField();

    $('#txtItemCode').focus();

    generateItemID();

    setItemsCount();

    //load itemCode to combo box
    loadAllItemsForOption();

}


//function for add data to table
function loadAllItems() {
    $('#tblItem').empty();

    for (item of items) {
        var row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.qtyonhand}</td><td>${item.price}</td></tr>`

        //then add it to the table body of item table
        $('#tblItem').append(row);
    }

    // saveItemAlert();

}

//Btn Delete Item
$("#btnItemDelete").click(function () {
    let deleteItemID = $("#txtItemCode").val();
    if (deleteItem(deleteItemID)) {
        deleteItemAlert();
        clearItemTextField();
        generateItemID();
        $('#txtItemCode').focus();
    } else {
        deleteErrorItemAlert();
        $('#txtItemCode').focus();
    }

});


//Btn Update Item
$("#btnItemUpdate").click(function () {
    let itemID = $("#txtItemCode").val();
    let response = updateItem(itemID);
    if (response) {
        updateItemAlert();
        clearItemTextField();
        generateItemID();
        $('#txtItemCode').focus();
    } else {
        updateErrorItemAlert();
        $('#txtItemCode').focus();
    }
});


//Item Search Bar
$('#itemmyInput').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#tblItem>tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});


//btn Clear Text Field Data
$('#btnClearItem').click(function () {
    clearItemTextField();
    generateItemID();
    $('#txtItemCode').focus();
});


//Save Alert
function saveItemAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item saved',
        showConfirmButton: false,
        timer: 1500
    })
}

//update Alert
function updateItemAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item Updated',
        showConfirmButton: false,
        timer: 1500
    })
}

//error Alert
function updateErrorItemAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
    })
}

//delete alert
function deleteItemAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item Deleted',
        showConfirmButton: false,
        timer: 1500
    })
}

//delete error Alert
function deleteErrorItemAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
    })
}


//when click table row data auto fill into text fields
function bindItemRowClickEvents() {
    $('#tblItem>tr').click(function () {
        let code = $(this).children(':eq(0)').text();
        let name = $(this).children(':eq(1)').text();
        let qtyonhand = $(this).children(':eq(2)').text();
        let price = $(this).children(':eq(3)').text();

        $('#txtItemCode').val(code);
        $('#txtItemName').val(name);
        $('#txtItemQTYOnHand').val(qtyonhand);
        $('#txtItemPrice').val(price);

    });
}


$("#txtItemCode").on('keydown', function (event) {
    if (event.which == 13) {
        let itemId = $("#txtItemCode").val();
        let item = searchItem(itemId);
        if (item != null) {
            setItemTextFieldValues(item.code, item.name, item.qtyonhand, item.price);
        } else {
            alert("There is no item available For That " + itemId);
            $('#txtItemName').val('');
            $('#txtItemQTYOnHand').val('');
            $('#txtItemPrice').val('');
        }
    }
});

//Search Item function
function searchItem(itemCode) {
    for (let item of items) {
        if (item.code == itemCode) {
            return item;
        }
    }
    return null;
}


function setItemTextFieldValues(code, name, qtyonhand, price) {
    $('#txtItemCode').val(code);
    $('#txtItemName').val(name);
    $('#txtItemQTYOnHand').val(qtyonhand);
    $('#txtItemPrice').val(price);
}

//Clear text field Function
function clearItemTextField() {
    $('#txtItemCode').val('');
    $('#txtItemName').val('');
    $('#txtItemQTYOnHand').val('');
    $('#txtItemPrice').val('');
}


//Delete item function
function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        let itemIndexNumber = items.indexOf(item);
        items.splice(itemIndexNumber, 1);
        loadAllItems();
        return true;
    } else {
        return false;
    }

}


//update Item function
function updateItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        item.code = $("#txtItemCode").val();
        item.name = $("#txtItemName").val();
        item.qtyonhand = $("#txtItemQTYOnHand").val();
        item.price = $("#txtItemPrice").val();
        loadAllItems();
        return true;
    } else {
        return false;
    }
}


//Validation
// item regular expressions
const itemIDRegEx = /^(IID-)[0-9]{3}$/;
const itemNameRegEx = /^[A-z ]{4,20}$/;
const itemQtyOnHandRegEx = /^[1-9][0-9]*$/;
const itemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let itemValidations = [];

itemValidations.push({
    reg: itemIDRegEx,
    field: $('#txtItemCode'),
    error: 'Item Code Pattern is Wrong : IID-001'
});

itemValidations.push({
    reg: itemNameRegEx,
    field: $('#txtItemName'),
    error: 'Item Name Pattern is Wrong : A-z 5-20'
});

itemValidations.push({
    reg: itemQtyOnHandRegEx,
    field: $('#txtItemQTYOnHand'),
    error: 'Item Salary Pattern is Wrong : 1 or 100'
});

itemValidations.push({
    reg: itemPriceRegEx,
    field: $('#txtItemPrice'),
    error: 'Item  Pattern is Wrong : 1 or 100.00'
});


//disable tab key of all four text fields using grouping selector in CSS
$("#txtItemCode,#txtItemName,#txtItemQTYOnHand,#txtItemPrice").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtItemCode,#txtItemName,#txtItemQTYOnHand,#txtItemPrice").on('keyup', function (event) {
    checkItemValidity();
});

$("#txtItemCode,#txtItemName,#txtItemQTYOnHand,#txtItemPrice").on('blur', function (event) {
    checkItemValidity();
});


$("#txtItemCode").on('keydown', function (event) {
    if (event.key == "Enter" && checkItem(itemIDRegEx, $("#txtItemCode"))) {
        $("#txtItemName").focus();
    } else {
        focusItemText($("#txtItemCode"));
    }
});


$("#txtItemName").on('keydown', function (event) {
    if (event.key == "Enter" && checkItem(itemNameRegEx, $("#txtItemName"))) {
        $("#txtItemQTYOnHand").focus();
    }
});


$("#txtItemQTYOnHand").on('keydown', function (event) {
    if (event.key == "Enter" && checkItem(itemQtyOnHandRegEx, $("#txtItemQTYOnHand"))) {
        $("#txtItemPrice").focus();
    }
});


$("#txtItemPrice").on('keydown', function (event) {
    if (event.key == "Enter" && checkItem(itemPriceRegEx, $("#txtItemPrice"))) {
        let res = confirm("Do you want to add this item.?");
        if (res) {
            $('#btnSaveItem').click();
        }
    }
});


function checkItemValidity() {
    let errorCount = 0;
    for (let validation of itemValidations) {
        if (validation.reg.test(validation.field.val())) {
            textItemSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setItemTextError(validation.field, validation.error);
        }
    }
    setItemButtonState(errorCount);
}

function checkItem(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setItemTextError(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultItemText(txtField, "");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
        txtField.parent().children('span').css('color', 'red');
    }
}

function textItemSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultItemText(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}


function defaultItemText(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusItemText(txtField) {
    txtField.focus();
}

function setItemButtonState(value) {
    if (value > 0) {
        $("#btnSaveItem").attr('disabled', true);
    } else {
        $("#btnSaveItem").attr('disabled', false);
    }
}

//Generate Order ID
function generateItemID() {
    try {
        let lastOId = items[items.length - 1].code;
        let newOId = parseInt(lastOId.substring(4, 7)) + 1;
        if (newOId < 10) {
            $("#txtItemCode").val("IID-00" + newOId);
        } else if (newOId < 100) {
            $("#txtItemCode").val("IID-0" + newOId);
        } else {
            $("#txtItemCode").val("IID-" + newOId);
        }
    } catch (e) {
        $("#txtItemCode").val("IID-001");
    }
}