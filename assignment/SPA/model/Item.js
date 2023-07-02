function ItemModel(itemCode,itemName,itemQtyOnHand,itemPrice) {
    return{
        code: itemCode,
        name: itemName,
        qtyonhand: itemQtyOnHand,
        price: itemPrice
    };
}