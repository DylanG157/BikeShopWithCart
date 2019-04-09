//Main variable to record what the user has chosen
var helmetsChoice =[]

//This is used to create new orders
var helmet = function(name , price, count){
	this.name = name;
	this.price = price;
	this.count = count;
}

function productAdd(){
	//This gets the data from the button
	var helmetInfo = document.querySelector('button[type="submit"]'); //Gets the information from the order buttons ready to pull the data from it
	var helmetName = helmetInfo.getAttribute("data-value"); //Gets the products name that the user has selected
	var helmetPrice = parseInt(helmetInfo.getAttribute("data-value2"));//Gets the products price
	var count = 1; //place holder 
	var totalCost = totalCart();
	// this checks if there is already an item of the same name , if not it create one , if it does it adds one to the count 
	var arrayHelmets = helmetsChoice;
	for (var i in arrayHelmets){
		if(arrayHelmets[i].name === helmetName){  //Will looop throught the array and will check if there is already a product of that name in the cart
			arrayHelmets[i].count += count; //Will add one product per click of the order button
			console.log(saveCart()) //This will save the information to a local session 
			totalCostAlert();
			navCart() //Will update the number of items in the cart in the navBar display
			return;
		}
	}
	var helmetChoice = new helmet(helmetName, helmetPrice ,1);//Will create a new entry into the main array 
	helmetsChoice.push(helmetChoice);
	console.log(saveCart())
	navCart() //Will update the number of items in the cart in the navBar display
	totalCostAlert();
}

//This is used to clear the cart by resetting the main variable helmetsChoice
function clearCart(){
	helmetsChoice =[];
	console.log(saveCart())
	navCart();
}
//Used to create a list of our cart
function listCart(){
	var cartCopy = [];
	for (var i in helmetsChoice){
		var helmet = helmetsChoice[i];
		var helmetCopy = {};
		for (var p in helmet){
			helmetCopy[p] = helmet[p]
		}
		cartCopy.push(helmetCopy);
	}
	return cartCopy;
}

//Used to save the cart information to the local Storage 
function saveCart(){
	localStorage.setItem("helmetsChoice",JSON.stringify(helmetsChoice));
}


function removeItemFromCart(name){  //to remove one item
	for (var i in helmetsChoice){
		if (helmetsChoice[i].name === name){
			helmetsChoice[i].count --;
			if (helmetsChoice[i].count === 0){
				helmetsChoice.splice(i, 1);
			}
			break;
		}
	}
	saveCart() // To save
	displayCart()//To update the display
	navCart();//To update the nav cart (the number)
}

function removeItemFromCartAll(name){	//remove all of an item
	for (var i in helmetsChoice){
		if (helmetsChoice[i].name === name){
			helmetsChoice.splice(i, 1);
			break;
		}
	}
	saveCart()
	displayCart()
	navCart();
}


//Working out the total
function countCart(){
	var totalCount = 0;
	for (var i in helmetsChoice){
		totalCount += helmetsChoice[i].count;
	}
	return totalCount;
}

function totalCart(){
	var totalCost = 0;
	for (var i in helmetsChoice){
		totalCost += parseInt(helmetsChoice[i].price) * parseInt(helmetsChoice[i].count);
	}
	return totalCost;
}

function totalItems(){
	var totalCount = 0;
	for (var i in helmetsChoice){
		totalCount += helmetsChoice[i].count;
	}
	return totalCount;

}

//To load the Data from localStorage 
var helmetsChoice = JSON.parse(localStorage.getItem("helmetsChoice"))


//coupons
function coupon(){
	var couponList = ["2345AB"] //coupon code
	var arrayLength = couponList.length;
	var discountAmmount = 0;
	var couponCode = document.getElementById('couponInput').value;
	for (var i = 0; i < arrayLength; i++){  //to loop through the coupon list to see if the code exists 
		if (couponList[i] === couponCode && discountAmmount >= 0){
			discountAmmount += 20
		}else if (couponList[i] != couponCode) {
			break;
		}
	}	
	return discountAmmount;
}

//This code is used to display the information in the cart.html page
function displayCart(){
	var cartArray = listCart();
	var totalCostBeforeCoupon = totalCart();
	var couponValue = coupon();
	var totalCostAfterCoupon = totalCostBeforeCoupon - (totalCostBeforeCoupon * couponValue / 100)
	var totalCostVat = totalCostAfterCoupon + (totalCostAfterCoupon * 0.15); //This is used to include the Vat
	var output = "";
	for (var i in cartArray){
		output += "<tr><th>" + cartArray[i].name+ "</th><th>"+ cartArray[i].price+ "</th>"  + "<th>" + cartArray[i].count + "</th>" +"<th>"+  "<button class=\" btn btn-outline-primary\" onclick=removeItemFromCart(\""+ cartArray[i].name + "\")>Remove One Item</button>" + "</th>" + "<th>"+  "<button class=\"btn btn-outline-warning\" onclick=removeItemFromCartAll(\""+ cartArray[i].name + "\")>Remove All Of Item</button>" + "</th>"
	}
	document.getElementById("cartTable").innerHTML = output;
	document.getElementById("totalAmmount").innerHTML ="R" + totalCostAfterCoupon;	
	document.getElementById("vatAmmount").innerHTML ="R" + totalCostVat;	
}
//This is used everytime you have to alert the cost when an object is added to the cart
function totalCostAlert(){
	var totalCost = totalCart();
	var totalCostVat = totalCost + (totalCost * 0.15);
	alert("Your current total is R" +totalCostVat + " Including Vat");
}
//This is the code used to update the number next to the cart in the navbar
function navCart(){
	var totalCount = totalItems();
	document.getElementById("navCart").innerHTML = totalItems();
}

//To generate random string for the reference number
function makestring() {
  var string = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 15; i++)
    string += possible.charAt(Math.floor(Math.random() * possible.length));
  return string;
}
//This is to alert
function succesfull(){
	var total = totalCart();
	var totalFinal = total + (total * 0.15);
	var randomString = makestring();
	document.getElementById("collectionAmmount").innerHTML ="R" + totalFinal;
	document.getElementById("referenceNumber").innerHTML =randomString;
	alert("Your order went through successfully, Your total Cost is R" + totalFinal)
}

//to print the collection page
function printArea() {
   window.print();
}
//delivery recepit

var deliveryChoice = [];
//this is used to save the uses choice of delivery type
var deliveryPicked = function(name){
	this.name = name;
}
//Global variable to store the uses chose of delivery
var deliveryChoice1 = [];

function saveDeliveryChoice(){
	//This gets the data from the button
	var deliveryData = document.getElementById('deliveryOption').value;
	var deliveryChoice = new deliveryPicked(deliveryData);
	deliveryChoice1.push(deliveryChoice);
	navCart()
	console.log(saveChoice()) //Used to save the users choice
	window.location.href = "../pages/deliverypicked.html";

}
function saveChoice(){ //Used to save the users choice
	localStorage.setItem("deliveryChoice1",JSON.stringify(deliveryChoice1));
	console.log()
}
//Used to load the users delivery choice
var deliveryChoice2 = JSON.parse(localStorage.getItem("deliveryChoice1"))

// This code is to output the data to the dilveryPicked.html page 
function deliveryOutput(){
	var total = totalCart();
	var totalCost = total + (total * 0.15);
	var randomString = makestring();
	var deliveryCost = 0;
	var dataHolder =deliveryChoice2[0].name;

	if (dataHolder === "Bronze Package"){
		deliveryCost = 10;
	}else if (dataHolder === "Silver Package"){
		deliveryCost = 50;
	}else if (dataHolder === "Gold Package"){
		deliveryCost = 100;
	}
	var totalFinal = totalCost + deliveryCost;
	document.getElementById("deliveryHolder1").innerHTML = dataHolder;
	document.getElementById("deliveryCost").innerHTML =" R" + deliveryCost;
	document.getElementById("deliveryTotalCost").innerHTML =" R" + totalFinal;
	document.getElementById("deliveryReferenceNumber").innerHTML = randomString;

	alert("Your order went through succesfully, Your total cost plus delivery is R" + totalFinal + " with Delivery." )
}

//This is to create an alert when you enter in your address for delivery 
function addressInput(){
	var address = document.getElementById("addressInput").value;
	if (address === ""){
		alert("Please enter in your address");
	}else {
		alert("Your Purchase will be sent to " + address);
	}
}


// Google maps Location for Delivery Page 
function initMap() {
  // The location of Uluru
  var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}
