// var customerDB = []; //literal base array
$('#saveCusBtn').click(function () {

    let customerId = $("#txtCustomerId").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerContact = $("#txtCustomerContact").val();

    let customer = [customerId, customerName, customerAddress, customerContact];

    let customerOb = {
        id: customerId,
        name: customerName,
        address: customerAddress,
        contact: customerContact
    }

    console.log(customerId, customerName, customerAddress, customerContact);

    let row = `<tr>
        <td>${customerId}</td>
        <td>${customerName}</td>
        <td>${customerAddress}</td>
        <td>${customerContact}</td>
        </tr>`;

    $("#tblCustomer").append(row);
    customerDB.push(customerOb);
});


$("#tblCustomer").on("click", "tr", function () {
    let customerId = $(this).find('td:eq(0)').text();
    let customerName = $(this).find('td:eq(1)').text();
    let customerAddress = $(this).find('td:eq(2)').text();
    let customerContact = $(this).find('td:eq(3)').text();

    //set value to textField
    $("#txtCustomerId").val(customerId);
    $("#txtCustomerName").val(customerName);
    $("#txtCustomerAddress").val(customerAddress);
    $("#txtCustomerContact").val(customerContact);
});


$('#getAllItmBtn').click(function () {
    getAllCustomer();
});


$('#deleteCusBtn').click(function () {
    let id = $("#txtCustomerId").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteCustomer(id);
        if (response) {
            alert("Customer Deleted");
            getAllCustomer();
        } else {
            alert("Customer Not Removed..!");
        }
    }
});


$('#updateCusBtn').click(function () {
    let id = $("#txtCustomerId").val();
    updateCustomer(id);
});


function deleteCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            customerDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

function updateCustomer(id) {
    if (searchCustomer(id) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this customer.?");
        if (consent) {
            let customer = searchCustomer(id);
            //if the customer available can we update.?

            let customerName = $("#txtCustomerName").val();
            let customerAddress = $("#txtCustomerAddress").val();
            let customerContact = $("#txtCustomerContact").val();

            customer.name = customerName;
            customer.address = customerAddress;
            customer.contact = customerContact;

            getAllCustomer();
        }
    }

}

function searchCustomer(id) {
    return customerDB.find(function (customer) {
        return customer.id == id;
    });
}

//bind table tr events
function bindTrEvents() {
    $('#tblCustomer>tr').click(function () {
        //get the selected rows data
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#txtCustomerId").val(id);
        $("#txtCustomerName").val(name);
        $("#txtCustomerAddress").val(address);
        $("#txtCustomerContact").val(contact);
    })
}


function getAllCustomer() {
    $("#tblCustomer").empty();

    //get all customers
    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;
        let name = customerDB[i].name;
        let address = customerDB[i].address;
        let contact = customerDB[i].contact;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${address}</td>
                     <td>${contact}</td>
                    </tr>`;

        // //and then append the row to tableBody
        $("#tblCustomer").append(row);

        bindTrEvents();
    }
}

