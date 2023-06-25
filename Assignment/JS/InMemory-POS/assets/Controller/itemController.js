
// var itemDB = [];
$("#saveItmBtn").click(function () {

    let itemId = $("#txtItemId").val();
    let itemDescription = $("#txtItemDescription").val();
    let itemUnitPrice = $("#txtItemUnitprice").val();
    let itemQty = $("#txtItemQty").val();

    let item = [itemId, itemDescription, itemUnitPrice, itemQty];

    let itemOb = {
        id: itemId,
        description: itemDescription,
        unitPrice: itemUnitPrice,
        qty: itemQty
    }

    console.log(itemId, itemDescription, itemUnitPrice, itemQty);

    let row = `<tr>
        <td>${itemId}</td>
        <td>${itemDescription}</td>
        <td>${itemUnitPrice}</td>
        <td>${itemQty}</td>
        </tr>`;

    $("#tblItem").append(row);
    itemDB.push(itemOb);
});

//set value to textField
$("#tblItem").on("click", "tr", function () {
    let itemId = $(this).find('td:eq(0)').text();
    let itemDescription = $(this).find('td:eq(1)').text();
    let itemUnitPrice = $(this).find('td:eq(2)').text();
    let itemQty = $(this).find('td:eq(3)').text();

    $("#txtItemId").val(itemId);
    $("#txtItemDescription").val(itemDescription);
    $("#txtItemUnitprice").val(itemUnitPrice);
    $("#txtItemQty").val(itemQty);
});

$('#updateItmBtn').click(function () {
    let id = $("#txtItemId").val();
    updateItem(id);
});


$('#deleteItmBtn').click(function () {
    let id = $("#txtItemId").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteItem(id);
        if (response) {
            alert("Item Deleted");
            getAllItem();
        } else {
            alert("Item Not Removed..!");
        }
    }
});


function deleteItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].id == id) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false;
}


function searchItem(id) {
    return itemDB.find(function (item) {
        return item.id == id;
    });
}


function updateItem(id) {
    if (searchItem(id) == undefined) {
        alert("No such Item..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this item.?");
        if (consent) {
            let item = searchItem(id);
            //if the item available can we update.?

            let itemDescription = $("#txtItemDescription").val();
            let itemUnitPrice = $("#txtItemUnitprice").val();
            let itemQty = $("#txtItemQty").val();

            item.description = itemDescription;
            item.unitPrice = itemUnitPrice;
            item.qty = itemQty;

            getAllItem();
        }
    }

}


function getAllItem() {
    $("#tblItem").empty();

    //get all items
    for (let i = 0; i < itemDB.length; i++) {
        let id = itemDB[i].id;
        let description = itemDB[i].description;
        let unitPrice = itemDB[i].unitPrice;
        let qty = itemDB[i].qty;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${description}</td>
                     <td>${unitPrice}</td>
                     <td>${qty}</td>
                    </tr>`;

        // //and then append the row to tableBody
        $("#tblItem").append(row);

        bindTrEvents();
    }
}


//bind table tr events
function bindTrEvents() {
    $('#tblItem>tr').click(function () {
        //get the selected rows data
        let id = $(this).children().eq(0).text();
        let description = $(this).children().eq(1).text();
        let unitPrice = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#txtItemId").val(id);
        $("#txtItemDescription").val(description);
        $("#txtItemUnitprice").val(unitPrice);
        $("#txtItemQty").val(qty);
    })
}

