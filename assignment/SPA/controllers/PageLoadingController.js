$(window).on('load', function () {
    $('#loader').fadeOut(1000);
});


// Start Hide Other Sections When Webpage Load
$(document).ready(function () {
    $('#dashboard').show();
    $('#customerSection').hide();
    $('#itemSection').hide();
    $('#orderSection').hide();
    $('#orderDetailsSection').hide();

});

//Start When home click other section hide
$('#home').click(function () {
    $('#dashboard').css('display', 'block')
    $('#customerSection').css('display', 'none');
    $('#itemSection').css('display', 'none');
    $('#orderSection').css('display', 'none');
    $('#orderDetailsSection').css('display', 'none');
});
// End When home click other section hide


// Start When customer click other section hide
$('#customer,#linkCustomer2').click(function () {
    $('#dashboard').css('display', 'none')
    $('#customerSection').css('display', 'block');
    $('#itemSection').css('display', 'none');
    $('#orderSection').css('display', 'none');
    $('#orderDetailsSection').css('display', 'none');

    generateCustomerID();
});
// End When customer click other section hide

// Start When item click other section hide
$('#item,#linkItem2').click(function () {
    $('#dashboard').css('display', 'none')
    $('#customerSection').css('display', 'none');
    $('#itemSection').css('display', 'block');
    $('#orderSection').css('display', 'none');
    $('#orderDetailsSection').css('display', 'none');

    generateItemID();
});
// End When item click other section hide

// Start When order click other section hide
$('#order,#linkOrder2').click(function () {
    $('#dashboard').css('display', 'none')
    $('#customerSection').css('display', 'none');
    $('#itemSection').css('display', 'none');
    $('#orderSection').show();
    $('#orderDetailsSection').hide();

    generateOrderID();
});
// End When order click other section hide

// Start When order-details click other section hide
$('#orderDetails,#linkOrderDetails2').click(function () {
    $('#dashboard').css('display', 'none')
    $('#customerSection').css('display', 'none');
    $('#itemSection').css('display', 'none');
    $('#orderSection').hide();
    $('#orderDetailsSection').css('display', 'block');
});
// End When order click other section hide


//set Save Customers Count in dashboard
function setCusCount(){
    let cusCount=0;
    for (let customer of customers) {
        cusCount=cusCount+1;
    }
    $('#customersCount').text(cusCount);
}

//set Save Items Count in dashboard
function setItemsCount(){
    let itemsCount=0;
    for (let item of items) {
        itemsCount=itemsCount+1;
    }
    $('#itemsCount').text(itemsCount);
}

//set Place Orders Count in dashboard
function setOrdersCount(){
    let ordersCount=0;
    for (let orde of orderDetails) {
        ordersCount=ordersCount+1;
    }
    $('#ordersCount').text(ordersCount);
}


