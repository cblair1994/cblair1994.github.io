/*
	CIS166AA: Book Blog
	Author: Chelsea Blair
	Date:2/5/2017
*/

/*Function for getting the sum total of the books*/
function calcTotal() {
         var itemTotal = 0;
         var item1 = document.getElementById("item1");
         var item2 = document.getElementById("item2");
         var item3 = document.getElementById("item3");
         var item4 = document.getElementById("item4");
         var item5 = document.getElementById("item5");
         (item1.checked) ? (itemTotal += 15) : (itemTotal += 0);
         (item2.checked) ? (itemTotal += 7.19) : (itemTotal += 0);
         (item3.checked) ? (itemTotal += 6.99) : (itemTotal += 0);
         (item4.checked) ? (itemTotal += 7.99) : (itemTotal += 0);
         (item5.checked) ? (itemTotal += 8.99) : (itemTotal += 0);
         var salesTaxRate = 0.07;
         var orderTotal = itemTotal + (itemTotal * salesTaxRate);
		 var bookTotal = orderTotal.toFixed(2);
         alert("Your order total is $" + bookTotal);
}