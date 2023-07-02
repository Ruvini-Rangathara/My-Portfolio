//Disable Add to cart Button
$('#btnAddToCart').attr("disabled", true);

// //Disable Place Order Button
$('#btnPlaceOrderButton').attr("disabled", true);

$('#btnClear').attr('disabled', true);

$('#txtBalance').attr('disabled', true);

$('#txtDate').val(getCurrentDate());


//Load Customers Ids Into ComboBox
function loadAllCustomersForOption() {
    $("#inputCustomerID").empty();
    $('#inputCustomerID').prepend('<option>Select Customer</option>');
    for (let customerElement of customers) {
        $("#inputCustomerID").append(`<option>${customerElement.id}</option>`);
    }
}


//Load Items Code Into ComboBox
function loadAllItemsForOption() {
    $('#inputItemID').empty();
    $('#inputItemID').prepend('<option>Select Item</option>');
    for (let itemElement of items) {
        $('#inputItemID').append(`<option>${itemElement.code}</option>`);
    }
}

//when select customer id fill other data
$('#inputCustomerID').change(function () {
    let cusID = $('#inputCustomerID').val();
    let customer = searchCustomer(cusID);
    if (customer != null) {

        $('#txtCusID').val(customer.id);
        $('#txtCusName').val(customer.name);
        $('#txtCusAddress').val(customer.address);
        $('#txtCusSalary').val(customer.salary);
    }
    emptyCustomerData();

});

//btn add to cart
$('#btnAddToCart').click(function () {
    let QtyOnHand = parseInt($('#itemonHand').val());
    let orderQty = parseInt($('#itemorderQty').val());
    if ($("#itemorderQty").val() != "") {

        if (QtyOnHand < orderQty) {
            alert("This Item No Available for this Quantity.")
        } else {
            updateQty();
            addToCart();
            loadAllCart();
            calculateTotal();
        }
    } else {
        alert("please Enter Order Quantity..");
    }

    $('#btnPlaceOrderButton').attr("disabled", false);
});

//txtCash function
$('#txtCash').on('keyup', function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
    }

    let cash = parseFloat($('#txtCash').val());
    let tot = $('#total').text();


    if (cash > tot) {
        let total = parseFloat($('#subTotal').text());
        let balance = cash - total;

        $('#txtBalance').val(balance);


    } else {

    }
});


//when double click table row delete
function removeItemInCart() {
    $("#tblCart>tr").on('dblclick', function () {
        $(this).remove();
        let totAfterRemove = $('#total').text();
        let newVal = totAfterRemove - parseFloat($($(this).children(this).get(5)).text());
        $('#total').text(newVal).append('.00');

        $('#txtCash').val('');
        $('#txtDiscount').val('');
        $('#txtBalance').val('');


        if ($("#txtDiscount").val() === "") {
            $('#subTotal').text(newVal);
        }
    });

}


//function add to cart
function addToCart() {
    let oid = $('#txtOrderID').val();
    let itm_code = $('#inputItemID').val();
    let itm_name = $('#itemName').val();
    let itm_price = $('#itemPrice').val();
    let order_qty = $('#itemorderQty').val();
    let total = itm_price * order_qty;


    for (let cartElement of cart) {
        if (cartElement.cartICode == itm_code) {
            var newQty = +cartElement.cartOrderQty + +order_qty;
            let newTotal = itm_price * newQty;
            cartElement.cartOrderQty = newQty;
            cartElement.cartTotal = newTotal;
            return;
        }
    }

    let cartOrder = cartModel(oid, itm_code, itm_name, itm_price, order_qty, total);

    cart.push(cartOrder);

    $("#txtBalance,#txtCash,#txtDiscount").val("");


    $('#btnAddToCart').attr("disabled", true);
    $('#btnClear').attr('disabled', true);
}

//load all data ro table
function loadAllCart() {
    $("#tblCart").empty();

    for (let cartItem of cart) {
        var cartRow = `<tr><td>${cartItem.CartOid}</td><td>${cartItem.cartICode}</td><td>${cartItem.cartIName}
        </td><td>${cartItem.cartIPrice}</td><td>${cartItem.cartOrderQty}</td><td>${cartItem.cartTotal}</td></tr>`;


        $("#tblCart").append(cartRow);
    }

    removeItemInCart();
}

//update qty after add order qty
function updateQty() {
    let qtyOnHand = $('#itemonHand').val();
    let order_qty = $('#itemorderQty').val();
    let newQty = qtyOnHand - order_qty;

    for (let item of items) {
        if ($("#inputItemID").val() === item.code) {
            item.qtyonhand = newQty;
            $('#itemonHand').val(item.qtyonhand);

            loadAllItems();
            // saveItemAlert().preventDefault();

        }
    }
}

//Calculate function
function calculateTotal() {
    let tot = 0;
    $('#tblCart>tr').each(function () {
        tot = tot + parseFloat($($(this).children().get(5)).text());
        $('#total').text(tot).append('.00');

        if ($("#txtDiscount").val() === "") {

            $('#subTotal').text(tot);
        }
    });
    tempTot = tot;

}

//discount function
$('#txtDiscount').on('keyup', function () {
    if ($("#txtDiscount").val() === "") {
        $('#subTotal').text($('#total').text());
    } else {
        let tot = parseFloat(tempTot);
        let dis = tot / 100 * parseFloat($("#txtDiscount").val());

        $('#subTotal').text(tot - dis);

        let cash = parseInt($("#txtCash").val());
        let subTot = parseInt($("#subTotal").text());
        $("#txtBalance").val(cash - subTot);
    }
});


//when select item id fill other data
$('#inputItemID').change(function () {
    let code = $('#inputItemID').val();
    let item = searchItem(code);

    if (item != null) {

        $('#itemName').val(item.name);
        $('#itemPrice').val(item.price);
        $('#itemonHand').val(item.qtyonhand);
    }
    emptyItemData();
    updateQty();
    $('#btnAddToCart').attr("disabled", false);
    $('#btnClear').attr("disabled", false);

});


$('#btnPlaceOrderButton').click(function () {
    placeOrder();
    generateOrderID();
    setOrdersCount();
    cart.splice(0, cart.length);
    $('#tblCart').empty();

    $("#itemName,#itemPrice,#itemonHand,#itemorderQty,#txtCusSalary,#txtCusName,#txtCusAddress,#txtCash,#txtBalance,#txtDiscount").val("");
    $("#total ,#subTotal").text("00");

    $('#btnPlaceOrderButton').attr('disabled', true);
    clearField();

});


function saveOrder() {
    let oid = $('#txtOrderID').val();
    let cid = $('#inputCustomerID').val();
    let date;
    if ($("#txtDate").val() === "") {
        // date = $("#currentDate").text();
    } else {
        date = $("#txtDate").val();
    }
    let fullTot = $('#total').val();

    let NewOrder = orderModel(oid, cid, date, fullTot);
    let isSaved = order.push(NewOrder);

    if (isSaved) {
        return true;
    } else {
    }
}

function placeOrder() {
    if (saveOrder()) {
        let date;
        if ($("#txtDate").val() === "") {

        } else {
            date = $("#txtDate").val();
        }
        let discount = $('#txtDiscount').val();
        let cname = $('#txtCusName').val();
        // let cid = $('#txtCusID').val();
        let cid = $('#inputCustomerID').val();

        for (let c of cart) {
            let odeetails = orderDetailsModel(c.CartOid, date, cid, cname, c.cartICode, c.cartIName, c.cartOrderQty, discount, c.cartTotal);
            orderDetails.push(odeetails);

        }
        alert("Successfully place order..");
    } else {
        alert("UnSuccessfully..Something went Wrong !!!")
    }
}


//Generate Order ID
function generateOrderID() {
    try {
        let lastOId = order[order.length - 1].ordID;
        let newOId = parseInt(lastOId.substring(4, 7)) + 1;
        if (newOId < 10) {
            $("#txtOrderID").val("OID-00" + newOId);
        } else if (newOId < 100) {
            $("#txtOrderID").val("OID-0" + newOId);
        } else {
            $("#txtOrderID").val("OID-" + newOId);
        }
    } catch (e) {
        $("#txtOrderID").val("OID-001");
    }
}


function clearField() {
    $('#inputCustomerID').val('');
    $('#txtCusID').val('');
    $('#txtCusName').val('');
    $('#txtCusAddress').val('');
    $('#txtCusSalary').val('');

    $('#inputItemID').val('');
    $('#itemName').val('');
    $('#itemonHand').val('');
    $('#itemPrice').val('');
    $('#itemorderQty').val('');

}


$('#btnClear').click(function () {
    $('#inputItemID').val('');
    $('#itemName').val('');
    $('#itemonHand').val('');
    $('#itemPrice').val('');
    $('#itemorderQty').val('');
});


//when select "Select Customer" clear data fields
function emptyCustomerData() {
    let cusId = $('#inputCustomerID').val();
    if (cusId === 'Select Customer') {

        clearSetDetails($("#inputCustomerID"), $("#txtCusName"), $("#txtCusAddress"), $("#txtCusSalary"));

    }
}

//when select "Select Item" clear data fields
function emptyItemData() {
    let itemId = $('#inputItemID').val();
    if (itemId === 'Select Item') {

        clearSetDetails($("#inputItemID"), $("#itemName"), $("#itemonHand"), $("#itemPrice"));

    }
}


function clearSetDetails(param1, param2, param3, param4) {
    param1.val("");
    param2.val("");
    param3.val("");
    param4.val("");


}

//get Date
function getCurrentDate() {

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date = new Date()) {
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }

    return formatDate();
}
