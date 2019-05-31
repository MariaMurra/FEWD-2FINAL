/*eslint-env browser*/
var i,
    $,
    total = 0,
    totallity,
    States = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

var DoughPrices = {
    handTossed: [["Small", 9.99], ["Medium", 12.99], ["Large", 14.99]],
    thinCrust: [["Medium", 11.99], ["Large", 13.99]],
    newYork: [["Large", 16.99], ["Extra Large", 19.99]],
    gluttenFree: [["Small", 10.99]]
    
};

/*var Cheese = [["normal", 0.00], ["Light", 0.00], ["Extra", 2.99], ["Double", 3.99]], Sauces = [["Regular Tomatoe", 0.00], ["Hearty Tomatoe", 0.99], ["BBQ", 1.99]];*/

$ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};


//-----------------------------DELIVERY INFORMATION---------------------------->

//Address Type Dropdown
function populateAddressType() {
    "use strict";
    var addressType = ["Home", "Appartment", "Business", "Campus", "Other"], opt, el;
    for (i = 0; i < addressType.length; i += 1) {
        opt = addressType[i];
        el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        $("addressT").appendChild(el);
    }
}


//State options on the dropdown menu 
function populateState() {
    "use strict";
    for (i = 0; i < States.length; i += 1) {
        var opt = States[i],
            el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        $("state").appendChild(el);
    }
}

//State options for the billing address:
function populateBillState() {
    "use strict";
    for (i = 0; i < States.length; i += 1) {
        var opt = States[i],
            el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        $("billState").appendChild(el);
    }
}
//--------------------VALIDATE DATA- OBJECT AND METHODS------------------->

function Validates() {
    "use strict";
    var nameRx = /^[A-Za-z\s]+$/,
        addressRegEx = /^[a-zA-Z0-9\s,.'\-]{3,}$/,
//        numRegExp = /^[0-9]+$/,
        phoneno = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/;
    this.name = function () {
        if (nameRx.test($("name").value) === true) {
            $("p2").innerText = " ";
            return true;
        } else {
            $("p2").innerText = "Please enter a correct name";
            $("name").focus();
            return false;
        }
    };
    this.adType = function () {
        if ($("addressT").value === "Other") {
            $("typeOther").style.display = "block";
            $("p2").innerText = " ";
            return true;
        } else {
            $("typeOther").style.display = "none";
        }
    };
    this.streetAd = function () {
        if (addressRegEx.test($("streetAd").value) === true) {
            $("p2").innerText = " ";
            return true;
        } else {
            $("p2").innerText = "Please write address ";
            $("streetAd").focus();
            return false;
        }
    };
    /*this.appSuitNumber = function () {
        if (numRegExp.test($("number")) === true) {
            $("p2").innerText = "* Please make sure you write a correct number";
            $("number").focus();
            return false;
        } else {
            $("p2").innerText = " ";
            return true;
        
    };}*/
    this.cityCheck = function () {
        if (nameRx.test($("city").value) === true) {
            $("p2").innerText = " ";
            return true;
        } else {
            $("p2").innerText = "Please enter a City";
            $("city").focus();
            return false;
        }
    };
    this.stateCheck = function () {
        if ($("state").value === " ") {
            $("p2").innerText = "* Please make sure you select a State";
            return false;
        } else {
            $("p2").innerText = " ";
            return true;
        }
    };
    this.zipCheck = function () {
        var z = $("zipCode").value;
        if (z.length > 5 || z.length < 5) {
            $("p2").innerText = "* Please make sure you write a correct zip number";
            $("zipCode").focus();
            return false;
        } else {
            $("p2").innerText = " ";
            return true;
        }
    };
    this.phoneCheck = function () {
        if (phoneno.test($("pNumber").value) === true) {
            $("p2").innerText = " ";
            return true;
        } else {
            $("p2").innerText = "Please make sure you write a correct phone number (000-000-0000)";
            $("pNumber").focus();
            return false;
        }
    };
    this.eMailCheck = function () {
        if (/^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/.test($("email").value) === true) {
            $("p2").innerText = " ";
            return true;
        } else {
            $("p2").innerText = " Please make sure you write a correct Email";
            $("email").focus();
            return false;
        }
    };
}

var Valid = new Validates();

//-----------------SHOW NEXT BUTTON  ------------------------------------>  
function showButton() {
    "use strict";
    var inputs = $("deliveryInfo").querySelectorAll('input'), empty = [];
    $("next1").disabled = true;
    empty = [inputs[0], inputs[2], inputs[4], inputs[5], inputs[6], inputs[7]];
    $("deliveryInfo").addEventListener("change", function () {
        for (i = 0; i < empty.length; i += 1) {
            if (empty[i].value === "") {
                $("next1").disabled = true;
            } else {
                $("next1").disabled = false;
            }
        }
    });
}
function showDeets() {
    "use strict";
    $("orderDeets").setAttribute("class", "hide");
  
    //------FIRST BUTTON SO THAT IT SHOWS THE ORDER DETAILS FIELDSET----------->
    $("next1").addEventListener("click", function () {
        
        $("orderDeets").removeAttribute("class");
        $("orderDeets").setAttribute("class", "show");
        $("deliveryInfo").disabled = true;
        window.location.hash = "orderDeets";
    });
}





//-----------------------POPULATING ORDER DETAILS----------------------->
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////--------------------------------------------->


function OrderDetails() {
    "use strict";
    //DOUGH SELECTION
    this.dough = function () {
        var radios, opt, el, element;
        radios = window.document.getElementsByName("Dough");
    
    // loop through list of radio buttons
        for (i = 0; i < radios.length; i += 1) {
            radios[i].onclick = function () {
                $("size").length = 0;
                if (radios[0].checked === true) {
                    for (element in DoughPrices.handTossed) {
                        opt = DoughPrices.handTossed[element];
                        el = document.createElement("option");
                        el.textContent = opt;
                        el.value = opt;
                        $("size").appendChild(el);
                    }
                } else if (radios[1].checked === true) {
                    for (element in DoughPrices.thinCrust) {
                        opt = DoughPrices.thinCrust[element];
                        el = document.createElement("option");
                        el.textContent = opt;
                        el.value = opt;
                        $("size").append(el);
                    }
                } else if (radios[2].checked === true) {
                    for (element in DoughPrices.newYork) {
                        opt = DoughPrices.newYork[element];
                        el = document.createElement("option");
                        el.textContent = opt;
                        el.value = opt;
                        $("size").append(el);
                    }
                } else if (radios[3].checked === true) {
                    for (element in DoughPrices.gluttenFree) {
                        opt = DoughPrices.gluttenFree[element];
                        el = document.createElement("option");
                        el.textContent = opt;
                        el.value = opt;
                        $("size").append(el);
                    }
                }
            };
            
        }
        
    };

    
//-----------SETTING THE DEFAULT SELECTIONS FOR BOTH CHEESE AND SAUCE
    this.cheese = function (s, num) {
        s.options[num - 1].selected = true;
        return;
    };
    
    this.sauce = function (s, num) {
        s.options[num - 1].selected = true;
        return;
    };
}


var Order = new OrderDetails();


//------------TOTAL PRICESS ADDED--------------------------------->
function addPRice() {
    "use strict";
    var selected,
        sizePrice = 0,
        selectedChe = $("cheeseOpt").value,
        cheesePrice,
        selectedSau = $("SauceOpt").value,
        saucePrice,
        toppingEl,
        top = 0,
        price = 0.99,
        x;
    
    selected = $("size").value;
    if (selected === "Small,9.99") {
        sizePrice = 9.99;
    }
    if (selected === "Medium,12.99") {
        sizePrice = 12.99;
    }
    if (selected === "Large,14.99") {
        sizePrice = 14.99;
    }
    if (selected === "Medium,11.99") {
        sizePrice = 11.99;
    }
    if (selected === "Large,13.99") {
        sizePrice = 13.99;
    }
    if (selected === "Large,16.99") {
        sizePrice = 16.99;
    }
    if (selected === "Extra Large,19.99") {
        sizePrice = 19.99;
    }
    if (selected === "Small,10.99") {
        sizePrice = 10.99;
    }
    total += sizePrice;

    
    if (selectedChe === "Light") {
        cheesePrice = 0;
    }
    if (selectedChe === "Normal") {
        cheesePrice = 0;
    }
    if (selectedChe === "Extra") {
        cheesePrice = 2.99;
    }
    if (selectedChe === "Double") {
        cheesePrice = 3.99;
    }
    total += cheesePrice;

    if (selectedSau === "Regular Tomatoe Sauce") {
        saucePrice = 0;
    }
    if (selectedSau === "Hearty Tomatoe Sauce") {
        saucePrice = 0.99;
    }
    if (selectedSau === "BBQ") {
        saucePrice = 1.99;
    }
    total += saucePrice;
    
    
    toppingEl = $("toppings").querySelectorAll('input[name="toppings"]:checked');
    for (i = 0; i < toppingEl.length; i += 1) {
        x = toppingEl.length;
        top = x * price;
    }
    return total + top;
}

///----------------WRITTING THE ORDER ON THE TOTAL BOX-------------->

function writeOrder() {
    "use strict";
    var dough = window.document.getElementsByName("Dough"),
        topps = window.document.getElementsByName("toppings");
    $("cheeseOpt").disabled = true;
    $("SauceOpt").disabled = true;
    
    for (i = 0; i < topps.length; i += 1) {
        topps[i].disabled = true;
    }
    $("goToPay").disabled = true;
    
    //---------------Name of the person to deliver-----
    $("name").addEventListener("change", function () {
        var insert = " For " + $("name").value + "!";
        $("list").textContent = insert;
    });
    //--------------pizza dough and size---------------
    $("size").addEventListener("click", function () {
        var named, dType, j;
        for (i = 0; i < dough.length; i += 1) {
            if (dough[i].checked) {
                dType = dough[i].value;
                $("cheeseOpt").disabled = false;
                $("SauceOpt").disabled = false;
                for (j = 0; j < topps.length; j += 1) {
                    topps[j].disabled = false;
                }
                $("goToPay").disabled = false;
            }
        }
        named = dType + " pizza, " + $("size").value;
        $("urDough").textContent = named;
        
    });
    //-------------cheese selection---------------------
    $("urCheese").textContent = $("cheeseOpt").value + " cheese";
    $("cheeseOpt").addEventListener("click", function () {
        $("urCheese").textContent = $("cheeseOpt").value + " cheese";
    });
    //------------Sauce selection------------------------
    $("urSauce").textContent = $("SauceOpt").value + " sauce";
    $("SauceOpt").addEventListener("click", function () {
        $("urSauce").textContent = $("SauceOpt").value + " sauce";
    });
    //------------Selection of toppings------------------
    $("toppings").addEventListener("change", function () {
        var checked = [],
            toppingEl = $("toppings").querySelectorAll('input[type="checkbox"]:checked'),
            top = 0,
            price = 0.99,
            j,
            x,
            y,
            write,
            checkedList;
        
        for (i = 0; i < toppingEl.length; i += 1) {
            x = toppingEl.length;
            top = x * price;
            y = toppingEl[i].value;
            checked.push(y);
            for (j = 0; j < checked.length; j += 1) {
                checkedList = checked.join(", ");
            }
        }
        write = "Your choice of Toppings: <br>" + checkedList + " " + top;
        $("urToppings").innerHTML = write;
    });
}


//----------------------SHOW PAYMENT INFO BUTTON---------------------->
function showPayment() {
    "use strict";
    $("billingInfo").setAttribute("class", "hide");
    
    $("goToPay").addEventListener("click", function () {
        totallity = "Total to pay: " + addPRice();
        if (window.confirm("Please confirm your order \n" + totallity)) {
            $("billingInfo").removeAttribute("class");
            $("billingInfo").setAttribute("class", "show");
            $("orderDeets").disabled = true;
            $("p3").innerHTML = totallity;
            window.location.hash = "billingInfo";
        }
        
    });
}




//-----------------------SAME AS BILLING CHECKBOX---------------------->
function setBilling() {
    "use strict";
    $("sameAsShip").addEventListener("click", function () {
        if ($("sameAsShip").checked === true) {
            $('billName').value = $('name').value;
            $('billStreetAd').value = $('streetAd').value;
            $('billNumber').value = $('number').value;
            $('billCity').value = $('city').value;
            $('billState').value = $('state').value;
            $('billZipCode').value = $('zipCode').value;
        } else {
            $('billName').value = " ";
            $('billStreetAd').value = " ";
            $('billNumber').value = " ";
            $('billCity').value = " ";
            $('billState').value = " ";
            $('billZipCode').value = " ";
        }
    });
}

//--------------------VALIDATE pAYMENT INFO-------------------------------->
function validatePayInfo() {
    "use strict";
    var nameRx = /^[A-Za-z\s]+$/,
        addressRegEx = /^[a-zA-Z0-9\s,.'\-]{3,}$/;
//        numRegExp = /^[0-9]+$/,
    $("billName").addEventListener("blur", function () {
        if (nameRx.test($("billName").value) === true) {
            $("p2").innerText = " ";
            return true;
        } else {
            $("p2").innerText = "Please enter a correct name";
            $("billName").focus();
            return false;
        }
    });
    $("billStreetAd").addEventListener("blur", function () {
        if (addressRegEx.test($("billStreetAd").value) === true) {
            $("p2").innerText = " ";
            return true;
        } else {
            $("p2").innerText = "Please write address ";
            $("billStreetAd").focus();
            return false;
        }
    });
    $("billCity").addEventListener("blur", function () {
        if (nameRx.test($("billCity").value) === true) {
            $("p2").innerText = " ";
            return true;
        } else {
            $("p2").innerText = "Please enter a City";
            $("billCity").focus();
            return false;
        }
    });
   
    $("billZipCode").addEventListener("blur", function () {
        var z = $("billZipCode").value;
        if (z.length > 5 || z.length < 5) {
            $("p2").innerText = "* Please make sure you write a correct zip number";
            $("billZipCode").focus();
            return false;
        } else {
            $("p2").innerText = " ";
            return true;
        }
    });

    $("billCVC").addEventListener("blur", function () {
        if (/^[0-9]{3,4}$/.test($("billCVC")) === true) {
            $("p2").innerText = "CVC is not valid";
            $("billZipCode").focus();
            return false;
        } else {
            $("p2").innerText = " ";
            return true;
        }
    });
    $("year").addEventListener("click", function () {
        var today = new Date(),
            month = today.getMonth(),
            year = today.getYear(),
            monthInput = $("month").value,
            yearInput = $("year").value;
        /*if (year === yearInput && monthInput < month) {$("p2").innerHTML = 'Please select a valid date';window.console.log(year + " " + yearInput + " " + month + " " + monthInput);
            return false;
        } else {
            $("p2").innerHTML = " ";
            return true;
        0}*/
        window.console.log(month);
    });
}

//----------------------LUHN FORMULA------------------------------------->
function luhnCheck() {
    "use strict";
    var userNumInput = document.getElementById("ccNumber"),
        ccNum = userNumInput.value,
        ccNumSplit = ccNum.split(""),
        sum = 0,
        singleNums = [],
        doubleNums = [],
        finalArry,
        validCard = false,
        j;
  
    if ((!/\d{15,16}(~\W[a-zA-Z])*$/g.test(ccNum)) || (ccNum.length > 16)) {
        return false;
    }

    if (ccNum.length === 15) {  //american express 
        for (i = ccNumSplit.length - 1; i >= 0; i -= 1) {
            if (i % 2 === 0) {
                singleNums.push(ccNumSplit[i]);
            } else {
                doubleNums.push((ccNumSplit[i] * 2).toString());
            }
        }
    } else if (ccNum.length === 16) {
        for (i = ccNumSplit.length - 1; i >= 0; i -= 1) {
            if (i % 2 !== 0) {
                singleNums.push(ccNumSplit[i]);
            } else {
                doubleNums.push((ccNumSplit[i] * 2).toString());
            }
        }
    }
  //joining makes an array to a string and I split them up again
  //so that every number is a single digit and convert back to array
  
    doubleNums = doubleNums.join("").split("");
    finalArry = doubleNums.concat(singleNums);
  
    for (j = 0; j < finalArry.length; j += 1) {
        sum += parseInt(finalArry[j], 10);
    }
  
    if (sum % 10 === 0) {
        validCard = true;
    }
    return validCard;
}

function showPayButton() {
    "use strict";
    var inputs = $("billingInfo").querySelectorAll('input'), empty = [];
    $("finish").disabled = true;
    empty = [inputs[1], inputs[2], inputs[4], inputs[5], inputs[6], inputs[7]];
    $("deliveryInfo").addEventListener("change", function () {
        for (i = 0; i < empty.length; i += 1) {
            if (empty[i].value === " ") {
                $("finish").disabled = true;
            } else {
                $("finish").disabled = false;
            }
        }
    });
}



function main() {
    "use strict";
    populateAddressType();
    populateState();
    Order.dough();
    Order.cheese($("cheeseOpt"), 2);
    Order.sauce($("SauceOpt"), 1);
    showDeets();
    showPayment();
    populateBillState();
    writeOrder();
    setBilling();
    showButton();
    showPayButton();
    validatePayInfo();
    $("billName").addEventListener("blur", Valid.name);
    $("billStreetAd").addEventListener("blur", Valid.streetAd);
    $("billCity").addEventListener("blur", Valid.cityCheck);
    $("billZipCode").addEventListener("blur", Valid.zipCheck);
    
    $("finish").addEventListener("click", function (event) {
    
        if (luhnCheck() === true) {
            window.console.log("success!");
        } else {
            event.preventDefault();
            window.alert("There is something wrong with the card");
        }
    });
    
    
}

window.addEventListener("load", main);












//---------------STILL THINKING ABOUT USING THIS CODE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//





//------For Writting the Pizza order on the final price/window--------------------------------------------------------------------------------//
/*function writeOrder() {
    "use strict";
    var displayTotal = $("totalDisplay"), price = 0;
    displayTotal.innerHTML = "<h4> This is what the Doctor Ordered</h4> <br>";
        
    $('size').addEventListener("click", function () {
        price = (Price.doughPrice() + Price.cheesePrice() + Price.saucePrice());
        displayTotal.append();
    });
}*/


//---THIS FOR THE SELECTION OF PIZZA SIZE AND CAPTURE OF IT'S VALUE---------------------------------------------------------------------------//

/*for (i = 0; i < $('size').length; i += 1) {
                $('size')[i].onclick = function () {
                    window.console.log($('size').value);
                };
} <=====THIS PIECE OF CODE INSIDE THE SELECTION LOOP CREATED A CRAZY BLACK HOLE AND CRASHED CROME, OTHER WHISE DIDN'T DO MUCH.*/
            


// ---THIS FOR DISPLAYING THE ORDER ON TOTALDISPLAY DIV---------------------------------------------------------------------------------------//

/*
function writeOrder() {
    "use strict";
    var total = $("totalDisplay"), h4Title;
    total.innerHTML = "<h4> This is what the Doctor Ordered</h4>";
    $('size').onclick = function () {
        total.append($('size').value);
    };
    
}
*/


//-------------THIS FOR CALCULATING THE TOTAL OF THE ORDER------------------------------------------------------------------------------------//

 /*  this.total = function () {
        var pay = this.dough() + this.cheese() + this.sauce() + this.toppings();
        window.console.log(pay);
    };*/


//------MAYBE FOR ADDING UP THE TOPPINGS-----------------------------------------------------------------------------------------------------//

/*toppings[i].onclick = function () {
                if (this.checked === true) {
                    top = top + price;
                }
            };
		}
		window.console.log(top);*/
//            

//------------------>window.console.log(DoughPrices.handTossed[1][1] + DoughPrices.gluttenFree[0][1]);
        //<-----------to add value to final box





///---------FIGURE OUT THE PRICE VALUE FOR EACH TOPPING AND HOW TO ADD EACH TIME ONE IS CHECKED/ SUBSTRACT IF IT IS UNCHECKED.---------------------------------------------------------------------------------------//

    /*this.toppings = function () {
        var toppings = window.document.getElementsByName('toppings'), top = 0, price = 0.99;
        for (i = 0; i < toppings.length; i += 1) {
                top += price;
                window.console.log(top);
                return price;
            
        }
    };*/
    
    

//--------------ANOTHER ATTEMPT AT GIVING THE OPTIONS A PRICE DOUGH--------------------------------------------------------------------------//

    /*  for (i = 0; i < size.length; i += 1) {
            if (size.checked) {
                cost = 9.99;
            } else if (size.checked) {
                cost = 12.99;
            } else if (size.checked) {
                cost = 14.99;
            } else if (size.checked) {
                cost = 11.99;
            } else if (size.checked) {
                cost = 13.99;
            } else if (size.checked) {
                cost = 16.99;
            }
            window.console.log(cost);
        }*/
    //};

//-------------------THIS ONE WAS FOR CAPTURING THE DOUGH PRICES------------------------------------------------------------------------------//
/*//}
            //window.console.log(doughEl);
            x = doughEl.length;
            top = x * price;
            window.console.log(top);*/


///TRY ADDEVENTLISTENER ("CHANGE", FUNCTION) FOR CAPTURING VALUE/PRICE


///
   /* window.console.log(Price.doughPrice() + Price.cheesePrice() + Price.saucePrice());
//    Price.total();*/


// CALCULATE TOTALS
/* this.finalTotal = function () {
        
            
            }
        var addTotal = this.doughPrice() + this.cheesePrice() + this.saucePrice();
        
        window.console.log(this.doughPrice() + this.cheesePrice());
        return addTotal;
    };*/

