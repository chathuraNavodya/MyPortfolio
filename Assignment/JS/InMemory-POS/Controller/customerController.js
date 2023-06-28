
$(document).ready(function() {
    generateCustomerID();
});

$('#saveCusBtn').click(function () {

    let customerId = $("#txtCustomerId").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerContact = $("#txtCustomerContact").val();

    let customer = [customerId, customerName, customerAddress, customerContact];

    customerModel = {
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
    customerDB.push(customerModel);
    clearCustomerInputFields();
    console.log(customerDB);


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

    $("#deleteCusBtn").prop("disabled", false);
    $("#updateCusBtn").prop("disabled", false);
    $("#saveCusBtn").prop("disabled", true);
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

    });
}

$('#clearCusBtn').click(function () {
    $("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").val("");
    generateCustomerID();
    $("#deleteCusBtn").prop("disabled", true);
    $("#updateCusBtn").prop("disabled", true);
    $("#saveCusBtn").prop("disabled", false);
});

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

var cusIdCount = 1;

function generateCustomerID() {
    var cusId = 'C00-' + padNumber(cusIdCount, 3);
    $('#txtCustomerId').css({'color': '#0d6efd', 'font-weight': 'bold'});
    $('#txtCustomerId').val(cusId);
}

// Helper function to pad the number with leading zeros
function padNumber(number, length) {
    var str = number.toString();
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}


function incrementCusID() {
    cusIdCount++;
}


// validation for customer
const CusIdRegex = /^(C00-)[0-9]{6,}$/;
const CusNameRegex = /^[A-Za-z ]{5,}$/;
const CusAddressRegex = /^[A-Za-z0-9 ]{5,}$/;
const CusContactRegex = /^[0-9]{10,}$/;

//add validations set text fields
let cusValidateArray = new Array();
cusValidateArray.push({field: $("#txtCustomerId"), regEx: CusIdRegex});
cusValidateArray.push({field: $("#txtCustomerName"), regEx: CusNameRegex});
cusValidateArray.push({field: $("#txtCustomerAddress"), regEx: CusAddressRegex});
cusValidateArray.push({field: $("#txtCustomerContact"), regEx: CusContactRegex});


function clearCustomerInputFields() {
    $("#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").val("");
    $("#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").css("border", "1px solid #ced4da");
    incrementCusID();
    generateCustomerID();
    setBtn();
}

setBtn();




//disable tab
$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = cusValidateArray.indexOf(cusValidateArray.find((c) => c.field.attr("id") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    //check validations
    checkValidations(cusValidateArray[indexNo]);

    setBtn();

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.id != cusValidateArray[cusValidateArray.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidations(cusValidateArray[indexNo])) {
                cusValidateArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(cusValidateArray[indexNo])) {
                // saveCustomer();
            }
        }
    }
});


function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}


function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}


function checkAll() {
    for (let i = 0; i < cusValidateArray.length; i++) {
        if (!checkValidations(cusValidateArray[i])) return false;
    }
    return true;
}


function setBtn() {
    $("#deleteCusBtn").prop("disabled", true);
    $("#updateCusBtn").prop("disabled", true);
    $("#saveCusBtn").prop("disabled", false);

    // if (checkAll()) {
    //     $("#saveCusBtn").prop("disabled", false);
    // } else {
    //     $("#saveCusBtn").prop("disabled", true);
    // }

    // let id = $("#txtCustomerId").val();
    // if (searchCustomer(id) == undefined) {
    //     $("#deleteCusBtn").prop("disabled", true);
    //     $("#updateCusBtn").prop("disabled", true);
    // } else {
    //     $("#deleteCusBtn").prop("disabled", false);
    //     $("#updateCusBtn").prop("disabled", false);
    // }

}