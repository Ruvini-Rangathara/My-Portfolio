//load data to table
function loadOrderDetailsTable() {
    $('#orderDetailTable').empty();

    for (var d of orderDetails) {
        let row1 = `<tr><td>${d.orderID}</td><td>${d.date}</td><td>${d.customerId}</td><td>${d.customerName}</td><td>${d.itemCode}</td><td>${d.itemName}</td><td>${d.orderQty}</td><td>${d.discount}</td><td>${d.fullTotal}</td></tr>`;

        $('#orderDetailTable').append(row1);
    }
}

//Customer Search Bar
$('#orderdetailsmyInput').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#orderDetailTable>tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});