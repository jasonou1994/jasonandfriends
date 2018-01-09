
var expandItemProducts = new Array();
function loadExpandItemProducts(){
    $.get("expandItemProducts.txt", function(data, status){
        var pages = data.split("###");
        for (i = 1; i< pages.length; i++)
        {
          //alert(location.pathname.split("/").slice(-1));
          if (pages[i].split("\n")[1]==location.pathname.split("/").slice(-1)){
            

            var priceList = pages[i].split("\n");
         

            for (j = 2; j < priceList.length; j++){
              expandItemProducts.push(new ItemProduct(priceList[j]));
            }
          }
        }
    });
}

class ItemProduct{ 
    constructor(productLine){
        var productLineSplit = productLine.split(";");
        this._productId = productLineSplit[0];
        
        this._printProducts = new Array();
        this._tshirtProducts = new Array();
        
        for (var i = 1; i <productLineSplit.length; i++){
            var product = productLineSplit[i];
            
            for (var j = 0; j < product.split(":")[1].split(",").length; j++){
                var size = product.split(":")[1].split(",")[j];
                this._printProducts.push(size);
            }  
        }
    }
    
    getId(){
        return this._productId;
    }
    
    getPrintProducts(){
        return this._printProducts;
    }
    
    toString(){
        return "id: " + this._productId+ "; print sizes: " + this._printProducts.toString();+ "; tshirt sizes: "+this._tshirtProducts.toString();
    }
}

function expandImage(item) {

  var split = item.href.split("/thumbnails");
  document.getElementById('expandFullSize').src=split[0]+split[1];
    
  var split1 = item.href.split("/thumbnails/");
  var split2= split1[1].split(".jpg")[0];

  document.getElementById('expandDescription').innerHTML=document.getElementById(split2+'Description').innerHTML;
  document.getElementById('expandCameraInfo').innerHTML=document.getElementById(split2+'CameraInfo').innerHTML;
  document.getElementById('expandPhotoTitle').innerHTML=document.getElementById(split2+'Name').innerHTML;
  document.getElementById('expandContainer').style.display='inherit';
    
  createExpandProducts(item, split2);
  
}

function createExpandProducts(_Object_Photo, photoId){
    //$("#expandPrints").text(photoId);
    
    var selectPhoto;
    
    for (var i = 0; i < expandItemProducts.length; i++) {
        if(photoId==expandItemProducts[i].getId()){
            selectPhoto = expandItemProducts[i];
        }
    }
    if (selectPhoto.getPrintProducts().length==0){
        $('#expandPrints').css("display",'none');
        $('#expandCameraInfo').css("border-radius",'0 0 10px 10px');
    }
    else{
        $('#expandPrints').css("display",'inherit');
        $('#expandCameraInfo').css("border-radius",'inherit');
    }
    
    
    $('#expandPrintsSelector').remove();
    
    var sel = $('<select>');
    sel.attr("id","expandPrintsSelector");
    sel.change(function(){
        updateTempPrintProduct();
    });
    //$('#expandPrintsAttribute').append(sel);
    
    sel.insertAfter('#expandPrintsAttribute');
    
    for (var i = 0; i < selectPhoto.getPrintProducts().length;i++){
        
        var optionText = selectPhoto.getPrintProducts()[i].split("=")[0];
        var optionValue = selectPhoto.getPrintProducts()[i].split("=")[1];
        
        sel.append($('<option>').attr('value',optionValue).text(optionText));
    }
    
    //var title = document.getElementById(photoId+'Name').innerHTML + ' Print';
    
     $('#expandPrintsAddToCart').data("photoId",photoId);
   
    
    updateTempPrintProduct();
    
}

function updateTempPrintProduct(){
    $('#expandPrintsPrice').text($("#expandPrintsSelector option:selected" ).attr("value"));
    
    var price = $("#expandPrintsSelector option:selected" ).attr("value");
    var attribute = $("#expandPrintsSelector option:selected" ).text();
    var photoId = $('#expandPrintsAddToCart').data("photoId");
    var title = document.getElementById(photoId+'Name').innerHTML + ' Print';
    var thumbnail = "./images/index/thumbnails/" + photoId+".jpg";
    var quantity = $("#expandPrintsQuantity option:selected" ).attr("value");
    $('#expandPrintsAddToCart').attr("onclick","updateCart('"+title+"','"+photoId+"','index','print','"+attribute+"',"+quantity+",'"+thumbnail+"',"+price+"); closeCart(); document.getElementById('expandContainer').style.display='none';");
}

function toggleProductExpand(productAlternativeViewer, productExpandedInfo, productAddToCart){
    var open = document.getElementById(productAddToCart).style.height;
    if(open==0 || open == '0px')
    {
      document.getElementById(productAlternativeViewer).style.height='75px';
      document.getElementById(productExpandedInfo).style.maxHeight='175px';
      document.getElementById(productAddToCart).style.height='25px';
    }
    else
    {
      document.getElementById(productAlternativeViewer).style.height='0px';
      document.getElementById(productExpandedInfo).style.maxHeight='0px';
      document.getElementById(productAddToCart).style.height='0px';
    }
}
function toggleAddToCardActivation(productAddToCartId,productName,productPhoto,productFolder,
  productType, productFormSizeName, productFormQuantityId,thumbnail,price){    
  var sizes = document.getElementsByName(productFormSizeName);
  var size;
  for(var i = 0; i < sizes.length; i++) {
    
     if(sizes[i].checked)
         size = sizes[i].value;
  }
  var selector = document.getElementById(productFormQuantityId);

  var quantity = selector.options[selector.selectedIndex].value;

  if (size!==undefined && quantity != "")
  {
    document.getElementById(productAddToCartId).style.backgroundColor='#DAA520';
    document.getElementById(productAddToCartId).style.color='#383838';
    document.getElementById(productAddToCartId).onclick=function(){
      document.getElementById('shoppingCartBlack').onclick="";
      document.getElementById('shoppingCartBlack').style.opacity=".5";
      document.getElementById('shoppingCartWhite').onclick="";
      document.getElementById('shoppingCartWhite').style.opacity=".5";
      document.getElementById('shoppingCartText').innerHTML="...";
      document.getElementById('cartActualCounter').innerHTML="...";
      updateCart(productName,productPhoto,productFolder,productType,size,quantity,thumbnail,price); 
    };
  }
}

function toggleCart(){

  document.getElementById('background-overlay').style.opacity='.75';
  document.getElementById('background-overlay').style.zIndex='200';

  document.getElementById('cartContainer').style.opacity=1; 
  document.getElementById('cartContainer').style.height='87px';

  document.getElementById('cartHeaderTitle').innerHTML="Cart";
  document.getElementById('cartMessageLoading').style.display='inherit';

  getCartContents();
}

function closeCart()
{
  document.getElementById('cartContainer').style.opacity=0;
  document.getElementById('cartContainer').style.height=0;

  document.getElementById('background-overlay').style.opacity='.00';
  document.getElementById('background-overlay').style.zIndex='0';

  document.getElementById('cartMessageEmpty').style.display='none';
  document.getElementById('cartContentsContainer').innerHTML="";
  document.getElementById('checkOutProgressBar').style.display="none";
  document.getElementById('cartDeliveryBillingConfirmation').style.display="none";
  document.getElementById('cartDeliveryBillingConfirmation').innerHTML="";
  document.getElementById('cartPaymentConfirmation').style.display="none";
  document.getElementById('cartCreditCardForm').style.display="none";
  document.getElementById('cartCheckOutContainer').style.display="none";

  document.getElementById('checkOutBackButton').onclick="";
  document.getElementById('checkOutBackButton').style.display='none';

  document.getElementById('cartCheckOut').onclick=function(){checkOutDelivery();};
  document.getElementById('cartCheckOut').style.width='120px';
  document.getElementById('cartCheckOut').style.display='inherit';
  document.getElementById('cartCheckOut').innerHTML='Check Out';
}

function getLikes(photoName, likeDisplayId){
   var ajaxRequest;  // The variable that makes Ajax possible!
   
   try {
      // Opera 8.0+, Firefox, Safari
      ajaxRequest = new XMLHttpRequest();
   }catch (e) {
      // Internet Explorer Browsers
      try {
         ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
   }
   
   ajaxRequest.onreadystatechange = function(){
      if(ajaxRequest.readyState == 4){
         var ajaxDisplay = document.getElementById(likeDisplayId);
         ajaxDisplay.innerHTML = ajaxRequest.responseText;
      }
   }
   
   var queryString = "?photo=" + photoName ;

   ajaxRequest.open("GET", "getLikes.php" + queryString, true);
   ajaxRequest.send(null); 
}

  function updateLikes(photoName, likeDisplayId){

    document.getElementById(likeDisplayId).innerHTML = "...";

      var ajaxRequest;  // The variable that makes Ajax possible!
     
     try {
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
     }catch (e) {
        // Internet Explorer Browsers
        try {
           ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
           try{
              ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
           }catch (e){
              // Something went wrong
              alert("Your browser broke!");
              return false;
           }
        }
     }
     
     // Now get the value from user and pass it to
     // server script.
     
     var queryString = "?photo=" + photoName ;

     ajaxRequest.open("GET", "updateLikes.php" + queryString, true);
     ajaxRequest.send(null); 

     getLikes(photoName,likeDisplayId);
  }

  function getCommentCount(photoName, commentDisplayId){
     var ajaxRequest;  // The variable that makes Ajax possible!
     
     try {
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
     }catch (e) {
        // Internet Explorer Browsers
        try {
           ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
           try{
              ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
           }catch (e){
              // Something went wrong
              alert("Your browser broke!");
              return false;
           }
        }
     }
     
     ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
           var ajaxDisplay = document.getElementById(commentDisplayId);
           ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
     }
     
     var queryString = "?photo=" + photoName ;

     ajaxRequest.open("GET", "getCommentCount.php" + queryString, true);
     ajaxRequest.send(null);

  }
  function getCommentContents(photoName, commentDisplayId){
     var ajaxRequest;  // The variable that makes Ajax possible!
     
     try {
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
     }catch (e) {
        // Internet Explorer Browsers
        try {
           ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
           try{
              ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
           }catch (e){
              // Something went wrong
              alert("Your browser broke!");
              return false;
           }
        }
     }
     
     ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
           var ajaxDisplay = document.getElementById(commentDisplayId);

           var rows = ajaxRequest.responseText.split("CLEARCLEAR");
           var a = rows.length;

           var html = "";
           for (count = 0; count<rows.length-1; count++)
           {
            var items = rows[count].split(",");
            
            html+="<div class='comment'>";
            html+="<div style='height: 26px;'>";
            html+="<div class='commentName'>" + items[0] + "</div>";
            html+="<div class='commentDate'>" + items[1] + "</div>";
            html+="</div>";
            html+="<div class='commentText'>" + items[2] + "</div>";
            html+="</div>";
            
           }
           var height;
           if(a-1==0)
           {
            height="90px";
           }
           else if(a-1==1)
           {
            height="148px";
           }
           else
           {
            height="206px";
           }

           ajaxDisplay.innerHTML = html;

           document.getElementById(photoName.concat("CommentBox")).style.height=height;

           var newCommentAlert = "<div class=style='display: inline; float:left;'> Add Comment: <br></div>";
           newCommentAlert+= "<form >";
           newCommentAlert+="<input class='commentInputName' id=" + photoName + "InputName placeholder = 'Name:'  type = 'text' tabindex=1 />" ;
           newCommentAlert+="<input type = 'button' class='commentSubmit' onclick = " + "\"updateComments('" + photoName+"',document.getElementById('" + photoName+ "InputName').value,document.getElementById('" + photoName + "InputComment').value,'"+ photoName+ "CommentLoader');\"" + "value = 'Submit' tabindex=3  />";
           newCommentAlert+="<input class='commentInputContent' id=" + photoName + "InputComment  placeholder='Comment:' type = 'text' tabindex=2/>";
           newCommentAlert+="</form>";

           document.getElementById(photoName.concat('CommentHeader')).style.height="74px";

           document.getElementById(photoName.concat('CommentAlert')).innerHTML=newCommentAlert;
           document.getElementById(photoName.concat('CommentImage')).src="./cross.png";

           getCommentCount(photoName,photoName.concat('CommentCount'));
        }
     }
     
     // Now get the value from user and pass it to
     // server script.
     
     var queryString = "?photo=" + photoName ;

     ajaxRequest.open("GET", "getCommentContents.php" + queryString, true);
     ajaxRequest.send(null); 

  }

  function updateComments(photoName, name, content, commentDisplayId){
     var ajaxRequest;  // The variable that makes Ajax possible!
     
     try {
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
     }catch (e) {
        // Internet Explorer Browsers
        try {
           ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
           try{
              ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
           }catch (e){
              // Something went wrong
              alert("Your browser broke!");
              return false;
           }
        }
     }
     
     // Now get the value from user and pass it to
     // server script.
     
     var queryString = "?photo=" + photoName + "&content=" + content + "&name=" + name;

     ajaxRequest.open("GET", "updateComments.php" + queryString, true);
     ajaxRequest.send(null); 

    
     getCommentContents(photoName,commentDisplayId);
  }

  function getProductReviews(productName, reviewCounter){
    document.getElementById(reviewCounter).innerHTML="..."
     var ajaxRequest;  // The variable that makes Ajax possible!
     
     try {
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
     }catch (e) {
        // Internet Explorer Browsers
        try {
           ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
           try{
              ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
           }catch (e){
              // Something went wrong
              alert("Your browser broke!");
              return false;
           }
        }
     }
     ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
           var ajaxDisplay = document.getElementById(reviewCounter);
           ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
     }
    
     var queryString = "?productName=" + productName ;

     ajaxRequest.open("GET", "getProductReviewCount.php" + queryString, true);
     ajaxRequest.send(null); 
  }

  function setCookie() {
    //document.cookie="cartId=31999379";
    document.cookie ="cartId="+Math.floor(Math.random()*100000000)+";";
    document.cookie = "path=/;";

    var d = new Date();
    d.setTime(d.getTime() + (3*24*60*60*1000));
    var expires = "expires=" + d.toGMTString()+";";
    document.cookie = expires;
    

  }

  function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

  function checkCookie() {
      
      var cart=getCookie("cartId");
      if (cart == "") {
          
        setCookie();
      }
  }

  function getCartCount(textId){
     var ajaxRequest;  // The variable that makes Ajax possible!

     try {
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
     }catch (e) {
        // Internet Explorer Browsers
        try {
           ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
           try{
              ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
           }catch (e){
              // Something went wrong
              alert("Your browser broke!");
              return false;
           }
        }
     }
     
     ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
           var ajaxDisplay = document.getElementById(textId);
           ajaxDisplay.innerHTML = ajaxRequest.responseText;

           document.getElementById('shoppingCartBlack').onclick=function(){toggleCart()};
          document.getElementById('shoppingCartBlack').style.opacity="1";
          document.getElementById('shoppingCartWhite').onclick=function(){toggleCart()};
          document.getElementById('shoppingCartWhite').style.opacity="1";
        }
     }
     
     var queryString = "?cartId=" + getCookie('cartId') ;

     ajaxRequest.open("GET", "getCartCount.php" + queryString, true);
     ajaxRequest.send(null); 
  }  
  function updateCart(productName,photo,folder,type,attribute,quantity,thumbnail,price, callback){


     var ajaxRequest;  // The variable that makes Ajax possible!
     
     try {
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
     }catch (e) {
        // Internet Explorer Browsers
        try {
           ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
           try{
              ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
           }catch (e){
              // Something went wrong
              alert("Your browser broke!");
              return false;
           }
        }
     }

     ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
           getCartCount('shoppingCartText');
           getCartCount('cartActualCounter');

           if (callback!=null) {callback();}
           
        }
     }
     
     var queryString = "?cartId=" + getCookie('cartId') + "&productName=" 
     + productName + "&photo=" + photo + "&folder=" + folder + "&type=" + type 
     + "&attribute=" + attribute + "&quantity=" + quantity+ "&thumbnail=" 
     + thumbnail + "&price=" + price;

     ajaxRequest.open("GET", "updateCart.php" + queryString, true);
     ajaxRequest.send(null);

  }

function getCartContents(){

   var ajaxRequest;  // The variable that makes Ajax possible!
   
   try {
      // Opera 8.0+, Firefox, Safari
      ajaxRequest = new XMLHttpRequest();
   }catch (e) {
      // Internet Explorer Browsers
      try {
         ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
   }

   var rowCount;
   var totalPrice = 0;

   ajaxRequest.onreadystatechange = function(){
      if(ajaxRequest.readyState == 4){
         
         var response = ajaxRequest.responseText;
         var rows = response.split("CLEARCLEAR");
         rowCount=rows.length-1;

         document.getElementById('cartContentsContainer').innerHTML="";

         for(var i =0; i<rows.length-1; i++)
         {
            var cartRow = rows[i];

            var cartRowItems = cartRow.split(", ");
            var itemName = cartRowItems[0];
            var itemAttribute = cartRowItems[1];
            var itemQuantity = cartRowItems[2];
            var itemThumbnail = cartRowItems[3];
            var itemPrice = cartRowItems[4];
            var itemSubtotal = itemQuantity * itemPrice;
            //totalPrice = totalPrice+ itemSubtotal;

            var cartItemContainer = document.createElement("div");
            cartItemContainer.className = 'cartItemContainer';
            cartItemContainer.rel = itemPrice;
            document.getElementById('cartContentsContainer').appendChild(cartItemContainer);

              var cartItemImageContainer = document.createElement("div");
              cartItemImageContainer.className = 'cartItemImageContainer';
              cartItemContainer.appendChild(cartItemImageContainer);

                var cartItemImage = document.createElement("img");
                cartItemImage.className="cartItemImage";
                cartItemImage.src=itemThumbnail;
                cartItemImageContainer.appendChild(cartItemImage);
              
              var cartItemName = document.createElement("div");
              cartItemName.className = 'cartItemName';
              cartItemName.innerHTML = itemName;
              cartItemContainer.appendChild(cartItemName);

              var cartItemSubtotal = document.createElement("div");
              cartItemSubtotal.className = 'cartItemSubtotal';
              cartItemSubtotal.innerHTML = "- $" + itemPrice;
              cartItemContainer.appendChild(cartItemSubtotal);

              var cartItemAttribute = document.createElement("div");
              cartItemAttribute.className='cartItemAttribute';
              cartItemAttribute.innerHTML=itemAttribute;
              cartItemContainer.appendChild(cartItemAttribute);

              var cartForm = document.createElement("form");
              cartForm.className = 'cartForm';
              cartItemContainer.appendChild(cartForm);

                var cartFormQuantityLabel = document.createElement('div');
                cartFormQuantityLabel.className = 'cartFormQuantityLabel';
                cartFormQuantityLabel.innerHTML = 'Quantity:';
                cartForm.appendChild(cartFormQuantityLabel);

                var cartFormQuantitySelect = document.createElement('select');
                cartFormQuantitySelect.className = 'cartFormQuantitySelect';
                cartFormQuantitySelect.id=itemName+itemAttribute;
                cartFormQuantitySelect.onchange = function(){
                  var localItemContainer = this.parentElement.parentElement;
                  var localItemName = this.parentElement.previousSibling.previousSibling.previousSibling.innerHTML;
                  var localItemAttribute = this.parentElement.previousSibling.innerHTML;
                  var localItemForm = this.parentElement;
                  var localNewValue = this.value;
                  var localQuantitySelector = this;

                  var quantityChangeRequest;  // The variable that makes Ajax possible!
 
                  try {
                      // Opera 8.0+, Firefox, Safari
                      quantityChangeRequest = new XMLHttpRequest();
                   }catch (e) {
                      // Internet Explorer Browsers
                      try {
                         quantityChangeRequest = new ActiveXObject("Msxml2.XMLHTTP");
                      }catch (e) {
                         try{
                            quantityChangeRequest = new ActiveXObject("Microsoft.XMLHTTP");
                         }catch (e){
                            // Something went wrong
                            alert("Your browser broke!");
                            return false;
                         }
                      }
                   }
                   
                   quantityChangeRequest.onreadystatechange = function(){
                      if(quantityChangeRequest.readyState == 4){
                        //remove spinning loading gif after quantity;
                        localItemForm.removeChild(cartQuantityLoadingGif);

                        //update final price...
                        var cartProducts = document.getElementById('cartContentsContainer').childNodes;
                        var updatedPrice = 0;
                        for (var z = 0; z < cartProducts.length; z++)
                        {
                          if(cartProducts[z].className='cartItemContainer')
                          {
                             updatedPrice = updatedPrice + cartProducts[z].rel*cartProducts[z].childNodes[4].childNodes[1].value;
                          } 
                        }
                        updatedPrice = "$"+updatedPrice.toFixed(2);
                        document.getElementById('cartCheckOutPrice').innerHTML=updatedPrice;

                      }
                   }

                  //add spinning gif after quantity
                  var cartQuantityLoadingGif = document.createElement('img');
                  cartQuantityLoadingGif.style.height = '22px';
                  cartQuantityLoadingGif.style.float = 'left';
                  cartQuantityLoadingGif.style.margin = '-3px 0 0 5px';
                  cartQuantityLoadingGif.src = './loader.gif';
                  localQuantitySelector.insertAdjacentElement("afterend", cartQuantityLoadingGif);

                   var queryString = "?cartId=" + getCookie('cartId') + "&productName=" + localItemName
                   + "&photo=null" + "&folder=null" + "&type=null" + "&attribute=" + localItemAttribute
                   +"&quantity=" + localNewValue + "&thumbnail=null" + "&price=" + itemPrice + "&modify=true";

                   quantityChangeRequest.open("GET", "updateCart.php" + queryString, true);
                   quantityChangeRequest.send(null); 

                };

                cartForm.appendChild(cartFormQuantitySelect);

                  //adding options to select form
                  for (var j = 1; j <31 ;j++)
                  {
                    var value = document.createElement('option');
                    value.value=j;
                    value.innerHTML=j;
                    cartFormQuantitySelect.appendChild(value);
                  }

                  //selecting the correct default value
                  for(var j =0; j<cartFormQuantitySelect.options.length; j++)
                  {
                    var option = cartFormQuantitySelect.options[j];
                    if (option.value==itemQuantity){
                      option.setAttribute('selected',true);
                    }
                  }

                var cartDelete = document.createElement('div');
                cartDelete.className = 'cartDelete';
                cartDelete.innerHTML = '&nbsp;Delete';
                cartDelete.onclick=function(){
                  //prepare ajax request, change delete button to spinning gif

                  var localItemContainer = this.parentElement.parentElement;
                  var localItemName = this.parentElement.previousSibling.previousSibling.previousSibling.innerHTML;
                  var localItemAttribute = this.parentElement.previousSibling.innerHTML;
                  var localItemForm = this.parentElement;

                  //remove the delete button
                  this.parentNode.removeChild(this);

                  //replace it with a spinning gif
                  var cartDeleteLoadingGif = document.createElement('img');
                  cartDeleteLoadingGif.style.height = '22px';
                  cartDeleteLoadingGif.style.float = 'right';
                  cartDeleteLoadingGif.style.margin = '-3px 0 0 0';
                  cartDeleteLoadingGif.src = './loader.gif';
                  localItemForm.appendChild(cartDeleteLoadingGif);

                   var deleteRequest;  // The variable that makes Ajax possible!
 
                   try {
                      // Opera 8.0+, Firefox, Safari
                      deleteRequest = new XMLHttpRequest();
                   }catch (e) {
                      // Internet Explorer Browsers
                      try {
                         deleteRequest = new ActiveXObject("Msxml2.XMLHTTP");
                      }catch (e) {
                         try{
                            deleteRequest = new ActiveXObject("Microsoft.XMLHTTP");
                         }catch (e){
                            // Something went wrong
                            alert("Your browser broke!");
                            return false;
                         }
                      }
                   }
                   
                   deleteRequest.onreadystatechange = function(){
                      
                      //readyState indicates sql server processed deletion query
                      if(deleteRequest.readyState == 4){

                        //refresh cart counts
                        getCartCount('shoppingCartText');
                        getCartCount('cartActualCounter'); 

                        //remove item from cart UI
                        localItemContainer.style.height='0px';
                        localItemContainer.parentNode.removeChild(localItemContainer);

                        //check if zero items are left...
                        rowCount=rowCount-1;
                        if (rowCount==0)
                        {
                          document.getElementById('cartMessageEmpty').style.display='inherit';
                          document.getElementById('cartContentsContainer').style.display='none';
                          document.getElementById('cartCheckOutContainer').style.display='none';
                          document.getElementById('cartContainer').style.height='auto';
                        }

                        //update final price...
                        var cartProducts = document.getElementById('cartContentsContainer').childNodes;
                        var updatedPrice = 0;
                        for (var z = 0; z < cartProducts.length; z++)
                        {
                          updatedPrice = updatedPrice + cartProducts[z].rel*cartProducts[z].childNodes[4].childNodes[1].value;
                        }
                        updatedPrice = "$"+updatedPrice.toFixed(2);
                        document.getElementById('cartCheckOutPrice').innerHTML=updatedPrice;
                      }
                   }

                   var queryString = "?cartId=" + getCookie('cartId') + "&productName=" + localItemName
                   + "&photo=null" + "&folder=null" + "&type=null" + "&attribute=" + localItemAttribute
                   +"&quantity=0" + "&thumbnail=null";

                   deleteRequest.open("GET", "updateCart.php" + queryString, true);
                   deleteRequest.send(null); 
                }

                cartForm.appendChild(cartDelete);
         }

         //update final price...
        var cartProducts = document.getElementById('cartContentsContainer').childNodes;
        var updatedPrice = 0;
        for (var z = 0; z < cartProducts.length; z++)
        {
          updatedPrice = updatedPrice + cartProducts[z].rel*cartProducts[z].childNodes[4].childNodes[1].value;
        }
        updatedPrice = "$"+updatedPrice.toFixed(2);
        document.getElementById('cartCheckOutPrice').innerHTML=updatedPrice;

        //defaults...
         document.getElementById('cartMessageLoading').style.display='none';
         document.getElementById('cartContentsContainer').style.maxHeight='inherit';
         document.getElementById('cartContentsContainer').style.display='inherit';

         switch(rowCount)
         {
          case 0:
            document.getElementById('cartMessageEmpty').style.display='inherit';
            document.getElementById('cartContentsContainer').style.display='none';
            document.getElementById('cartCheckOutContainer').style.display='none';
            document.getElementById('cartContainer').style.height='auto';
            break;
          case 1:
            document.getElementById('cartMessageEmpty').style.display='none';
            document.getElementById('cartContentsContainer').style.height='auto';
            document.getElementById('cartCheckOutContainer').style.display='inherit';
            document.getElementById('cartContainer').style.height='auto';
            break;
          case 2:
            document.getElementById('cartMessageEmpty').style.display='none';
            document.getElementById('cartContentsContainer').style.height='auto';
            document.getElementById('cartCheckOutContainer').style.display='inherit';
            document.getElementById('cartContainer').style.height='auto';
            break;
          default:
            document.getElementById('cartMessageEmpty').style.display='none';
            document.getElementById('cartContentsContainer').style.maxHeight='257px';
            //249 = 75*3 + 8*4. MARGINS DO NOT OVERLAP! thats padding.
            document.getElementById('cartContentsContainer').style.height='auto';
            document.getElementById('cartCheckOutContainer').style.display='inherit';
            document.getElementById('cartContainer').style.height='auto';
         }   
      }
   }
   
   var queryString = "?cartId=" + getCookie('cartId') ;

   ajaxRequest.open("GET", "getCartContents.php" + queryString, true);
   ajaxRequest.send(null); 
} 

//input variables to be used...
var name="";
var email="";
var phone="";
var street1="";
var street2="";
var zip="";
var city="";
var state="";

var nonce;
var cardBrand;
var lastFour;
var expMonth;
var expYear;
var zip;

var checkOutProgressBar;
var checkOutProgressBarDelivery;;
var checkOutProgressBarBilling;
var checkOutProgressBarConfirmation;

var cartContentsContainer;
var cartCreditCardForm;
var cartDeliveryBillingConfirmation;
var cartPaymentConfirmation;

var checkOutNextButton;
var checkOutBackButton;

var trimmedPrice;
var confirmationTitle;
var finalizeLoadingGif;

function checkOutDelivery(){

  //set progress bar variables
  checkOutProgressBar = document.getElementById('checkOutProgressBar');
  checkOutProgressBarDelivery = document.getElementById('checkOutProgressBarDelivery');
  checkOutProgressBarBilling = document.getElementById('checkOutProgressBarBilling');
  checkOutProgressBarConfirmation = document.getElementById('checkOutProgressBarConfirmation');
  //cart content containers...
  cartContentsContainer=document.getElementById('cartContentsContainer');
  cartDeliveryBillingConfirmation=document.getElementById('cartDeliveryBillingConfirmation');
  cartPaymentConfirmation=document.getElementById('cartPaymentConfirmation');
  //set button variables
  checkOutNextButton = document.getElementById('cartCheckOut');
  checkOutBackButton = document.getElementById('checkOutBackButton');

  //change heading
  document.getElementById('cartHeaderTitle').innerHTML="Check Out";

  //progress bar settings...
  checkOutProgressBar.style.display='inherit';

  checkOutProgressBarDelivery.style.backgroundColor = '#DAA520';
  checkOutProgressBarBilling.style.backgroundColor = '#F5F5F5';
  checkOutProgressBarConfirmation.style.backgroundColor = '#F5F5F5';

 //hide out item contents
  cartContentsContainer.style.display='none';
  cartDeliveryBillingConfirmation.style.display='inherit';

  //add new subheading
  var deliveryTitle = document.createElement("div");
  deliveryTitle.innerHTML='Shipping Address';
  deliveryTitle.className='checkOutGroupHeading';
  deliveryTitle.paddingBottom='4px';
  cartDeliveryBillingConfirmation.appendChild(deliveryTitle);

  //delivery elements
  var deliveryElements = document.createElement("div");
  deliveryElements.style.height='auto';
  cartDeliveryBillingConfirmation.appendChild(deliveryElements);

  var deliveryNameLabel = document.createElement('div');
  deliveryNameLabel.innerHTML="Full Name";
  deliveryNameLabel.className="checkOutTextInputLabel";
  deliveryElements.appendChild(deliveryNameLabel);
  var deliveryName = document.createElement("input");
  deliveryName.type='input';
  deliveryName.placeholder='Jason Ou';
  deliveryName.className='checkOutTextInput';
  deliveryName.value=name;
  deliveryElements.appendChild(deliveryName);

  var deliveryEmailLabel = document.createElement('div');
  deliveryEmailLabel.innerHTML="Email";
  deliveryEmailLabel.className="checkOutTextInputLabel";
  deliveryElements.appendChild(deliveryEmailLabel);
  var deliveryEmail = document.createElement("input");
  deliveryEmail.type='input';
  deliveryEmail.placeholder='jason@jasonandfriends.net';
  deliveryEmail.className='checkOutTextInput';
  deliveryEmail.value=email;
  deliveryElements.appendChild(deliveryEmail);

  var deliveryPhonelabel = document.createElement('div');
  deliveryPhonelabel.innerHTML="Phone";
  deliveryPhonelabel.className="checkOutTextInputLabel";
  deliveryElements.appendChild(deliveryPhonelabel);
  var deliveryPhone = document.createElement("input");
  deliveryPhone.type='input';
  deliveryPhone.placeholder='862-548-2670';
  deliveryPhone.className='checkOutTextInput';
  deliveryPhone.value=phone;
  deliveryElements.appendChild(deliveryPhone);

  var deliveryAddressOneLabel = document.createElement('div');
  deliveryAddressOneLabel.innerHTML="Address One";
  deliveryAddressOneLabel.className="checkOutTextInputLabel";
  deliveryElements.appendChild(deliveryAddressOneLabel);
  var deliveryAddressOne = document.createElement("input");
  deliveryAddressOne.type='input';
  deliveryAddressOne.placeholder='154 Stuyvesant Oval';
  deliveryAddressOne.className='checkOutTextInput';
  deliveryAddressOne.value=street1;
  deliveryElements.appendChild(deliveryAddressOne);

  var deliveryAddressTwoLabel = document.createElement('div');
  deliveryAddressTwoLabel.innerHTML="Address Two (Optional)";
  deliveryAddressTwoLabel.className="checkOutTextInputLabel";
  deliveryElements.appendChild(deliveryAddressTwoLabel);
  var deliveryAddressTwo = document.createElement("input");
  deliveryAddressTwo.type='input';
  deliveryAddressTwo.placeholder='12c';
  deliveryAddressTwo.className='checkOutTextInput';
  deliveryAddressTwo.value=street2;
  deliveryElements.appendChild(deliveryAddressTwo);

  var deliveryCityLabel = document.createElement('div');
  deliveryCityLabel.innerHTML="City";
  deliveryCityLabel.className="checkOutTextInputLabel";
  deliveryElements.appendChild(deliveryCityLabel);
  var deliveryCity = document.createElement("input");
  deliveryCity.type='input';
  deliveryCity.placeholder='Livingston';
  deliveryCity.className='checkOutTextInput';
  deliveryCity.value=city;
  deliveryElements.appendChild(deliveryCity);

  var deliveryZipLabel = document.createElement('div');
  deliveryZipLabel.innerHTML="Zip Code";
  deliveryZipLabel.className="checkOutTextInputLabel";
  deliveryZipLabel.style.width='49%';
  deliveryElements.appendChild(deliveryZipLabel);
  var deliveryStateLabel = document.createElement('div');
  deliveryStateLabel.innerHTML="State";
  deliveryStateLabel.className="checkOutTextInputLabel";
  deliveryStateLabel.style.width='49%';
  deliveryStateLabel.style.margin='0 0 0 1.9%';
  deliveryElements.appendChild(deliveryStateLabel);

  var deliveryZip = document.createElement("input");
  deliveryZip.type='input';
  deliveryZip.placeholder='07039';
  deliveryZip.style.width='49%';
  deliveryZip.maxLength = '5';
  deliveryZip.className='checkOutTextInput';
  deliveryZip.value=zip;
  deliveryElements.appendChild(deliveryZip);
  var deliveryState = document.createElement("input");
  deliveryState.type='input';
  deliveryState.placeholder='NJ';
  deliveryState.style.width='49%';
  deliveryState.style.margin='0 0 10px 1.9%';
  deliveryState.maxLength = '2';
  deliveryState.className='checkOutTextInput';
  deliveryState.value=state;
  deliveryElements.appendChild(deliveryState);

  //back button settings
  checkOutBackButton.style.display='inherit';
  checkOutBackButton.onclick=function(){
    checkOutNextButton.innerHTML= "Check Out";
    checkOutNextButton.style.width= "120px";
    checkOutNextButton.onclick= function(){checkOutDelivery()};
    cartContentsContainer.style.display='inherit';
    cartDeliveryBillingConfirmation.innerHTML="";
    checkOutProgressBar.style.display='none';
    checkOutBackButton.style.display='none';

    name = deliveryName.value;
    email = deliveryEmail.value;
    phone = deliveryPhone.value;
    street1 = deliveryAddressOne.value;
    street2 = deliveryAddressTwo.value;
    zip = deliveryZip.value;
    city = deliveryCity.value;
    state = deliveryState.value;
  };

   //forward button settigns
  checkOutNextButton.innerHTML='Next';
  checkOutNextButton.style.width='80px';
  checkOutNextButton.onclick= function(){
    name = deliveryName.value;
    email = deliveryEmail.value;
    phone = deliveryPhone.value;
    street1 = deliveryAddressOne.value;
    street2 = deliveryAddressTwo.value;
    zip = deliveryZip.value;
    city = deliveryCity.value;
    state = deliveryState.value;
    if (validation(deliveryElements.childNodes)){
      checkOutBilling();
    }
  };  
}
function checkOutBilling(){
  //assign ccform var;
  cartCreditCardForm = document.getElementById('cartCreditCardForm');
  //switch colors for progress bar...
  checkOutProgressBarDelivery.style.backgroundColor='#F5F5F5';
  checkOutProgressBarBilling.style.backgroundColor='#DAA520';
  checkOutProgressBarConfirmation.style.backgroundColor='#F5F5F5';

  //remove delivery display, show card form
  cartDeliveryBillingConfirmation.innerHTML="";
  cartCreditCardForm.style.display='inherit';
  
  var billingTitle = document.createElement("div");
  billingTitle.innerHTML='Payment Info';
  billingTitle.className='checkOutGroupHeading';
  cartDeliveryBillingConfirmation.appendChild(billingTitle);

  var processedBy = document.createElement("div");
  processedBy.style.width='100%';
  processedBy.style.marginBottom='10px';
  processedBy.style.height='60px';
  processedBy.style.float='left';
  cartDeliveryBillingConfirmation.appendChild(processedBy);

    var ccIcons = document.createElement('div');
    ccIcons.style.height='60px;'
    ccIcons.style.width='100px';
    ccIcons.style.float='left';
    processedBy.appendChild(ccIcons);

      var visa = document.createElement('img');
      visa.src='./icon/payment/visa.png';
      visa.style.height='30px';
      visa.style.width='50px';
      visa.style.float='left';
      visa.style.margin='0';
      ccIcons.appendChild(visa);

      var mastercard = document.createElement('img');
      mastercard.src='./icon/payment/mastercard.png';
      mastercard.style.height='30px';
      mastercard.style.width='50px';
      mastercard.style.float='left';
      mastercard.style.margin='0';
      ccIcons.appendChild(mastercard);

      var amex = document.createElement('img');
      amex.src='./icon/payment/amex.png';
      amex.style.height='30px';
      amex.style.width='50px';
      amex.style.float='left';
      amex.style.margin='0';
      ccIcons.appendChild(amex);

      var discover = document.createElement('img');
      discover.src='./icon/payment/discover.png';
      discover.style.height='30px';
      discover.style.width='50px';
      discover.style.float='left';
      discover.style.margin='0';
      ccIcons.appendChild(discover);

    var square = document.createElement('div');
    square.style.height='60px';
    square.style.width='59%';
    square.style.float='left';
    square.style.marginLeft='6px';
    processedBy.appendChild(square);

      var text = document.createElement('div');
      text.innerHTML='Processed securely by';
      text.style.fontFamily='Helvetica';
      text.style.width='100%';
      text.style.opacity='.63';
      text.style.height='16px';
      text.style.marginTop='1px';
      square.appendChild(text);

      var squarelogo = document.createElement('img');
      squarelogo.src='./icon/payment/square.png';
      squarelogo.style.width='70px';
      squarelogo.style.opacity='.7';
      squarelogo.style.height='19px';
      squarelogo.style.marginTop='4px';
      squarelogo.style.marginBottom='15px';
      square.appendChild(squarelogo);

  //update back button
  checkOutBackButton.onclick=function(){
    cartDeliveryBillingConfirmation.innerHTML='';
    cartCreditCardForm.style.display='none';
    checkOutDelivery();
  }

  //update next button
  checkOutNextButton.onclick= function(){
    requestCardNonce(event);
  };  
}
function checkOutConfirmation(nonceData, cardData){

  //switch colors for progress bar...
  checkOutProgressBarDelivery.style.backgroundColor='#F5F5F5';
  checkOutProgressBarBilling.style.backgroundColor='#F5F5F5';
  checkOutProgressBarConfirmation.style.backgroundColor='#DAA520';

  //put away the card form, reset billing
  cartDeliveryBillingConfirmation.innerHTML='';
  cartCreditCardForm.style.display='none';

  //set variables from carddata
  nonce=nonceData; 
  cardBrand=cardData['card_brand'];
  lastFour=cardData['last_4'];
  expMonth=cardData['exp_month'];
  expYear=cardData['exp_year'];
  zip=cardData['billing_postal_code'];

  //sub title products
  confirmationTitle = document.createElement("div");
  confirmationTitle.innerHTML='Products';
  confirmationTitle.className='checkOutGroupHeading';
  cartDeliveryBillingConfirmation.appendChild(confirmationTitle);
  //add back item display
  cartContentsContainer.style.display='inherit';

  //show payment confirmation
  document.getElementById('cartPaymentConfirmation').style.display='inherit';

  //populate shippingaddress
  document.getElementById('shippingAddressConfirmationBox').innerHTML=name+'<br>'
  +phone+"<br>"+email+'<br>'+street1+" "+street2+'<br>'+city+', '+state+' '+zip;

  //populate fake CC
  if(cardBrand.toLowerCase()=='visa'){
    document.getElementById('fakeCCType').src='./icon/payment/visa.png';
  }
  else if(cardBrand.toLowerCase()=='mastercard'){
    document.getElementById('fakeCCType').src='./icon/payment/mastercard.png';
  }
  if(cardBrand.toLowerCase()=='discover'){
    document.getElementById('fakeCCType').src='./icon/payment/discover.png';
  }
  if(cardBrand.toLowerCase()=='amex'){
    document.getElementById('fakeCCType').src='./icon/payment/amex.png';
  }

  document.getElementById('fakeCCNumber').innerHTML='•••• •••• •••• ' + lastFour;
  document.getElementById('fakeCCExpText').innerHTML=expMonth+'/'+expYear.toString().substring(2,expYear.length);
  document.getElementById('fakeCCZipText').innerHTML=zip;


  //update back button..
  checkOutBackButton.onclick=function(){
    document.getElementById('cartPaymentConfirmation').style.display='none';
    cartDeliveryBillingConfirmation.innerHTML='';
    cartContentsContainer.style.display='none';
    checkOutBilling();
    checkOutNextButton.style.display='inherit';
  }

  //update forward button

  document.getElementById("cartCheckOut").style.width='120px';
  document.getElementById("cartCheckOut").innerHTML='Purchase';
  document.getElementById("cartCheckOut").onclick= function(){

    //get final price
    trimmedPrice=document.getElementById('cartCheckOutPrice').innerHTML;
    trimmedPrice=trimmedPrice.substring(1,trimmedPrice.length-1);
    trimmedPrice=trimmedPrice*100;

    var combinedStreet = street1+ " " + street2+" "+city+ " "+state+ " " + zip;

    //replace next with a spinning gif
    finalizeLoadingGif = document.createElement('img');
    finalizeLoadingGif.style.height = '22px';
    finalizeLoadingGif.style.float = 'right';
    finalizeLoadingGif.style.margin = '4px 0 0 0';
    finalizeLoadingGif.src = './loader.gif';
    checkOutNextButton.insertAdjacentElement('beforebegin',finalizeLoadingGif);
    checkOutNextButton.style.display='none';
    checkOutBackButton.style.display='none';

    //uuid + process items to order
    var uuid = generateUUID();
    convertCartToOrders(name,phone,trimmedPrice,combinedStreet,cartContentsContainer,uuid,getCookie('cartId'),processPayment);
    };  
}

function processPayment(uuid)
{
  var ajaxRequest;  // The variable that makes Ajax possible!
   
   try {
      // Opera 8.0+, Firefox, Safari
      ajaxRequest = new XMLHttpRequest();
   }catch (e) {
      // Internet Explorer Browsers
      try {
         ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
   }
   
   ajaxRequest.onreadystatechange = function(){
      if(ajaxRequest.readyState == 4){
         finalizeLoadingGif.parentElement.removeChild(finalizeLoadingGif);
         checkOutNextButton.style.display='inherit';
         checkOutNextButton.style.width='120px';
         checkOutNextButton.innerHTML='Finish';
         checkOutNextButton.onclick=function(){closeCart();};

         cartContentsContainer.style.display='none';
         cartPaymentConfirmation.style.display='none';
         confirmationTitle.innerHTML='Order Complete!'

         var thanksText = document.createElement('div');
         thanksText.innerHTML='Thank you for your purchase!<br> Your order number is ' +uuid + 
         '.<br><br>A purchase confirmation has been sent to: ' + email+
         '<br><br>Please contact me at jason@jasonandfriends.net with any issues';

         confirmationTitle.insertAdjacentElement('afterend',thanksText);  

      }
   }
   var queryString = "?nonce=" + nonce + "&price=" + parseInt(trimmedPrice) ;

   ajaxRequest.open("GET", "processPayment.php" + queryString, true);
   ajaxRequest.send(null);
}

function removeFromCart(cartId)
{
  var ajaxRequest;  // The variable that makes Ajax possible!
   
   try {
      // Opera 8.0+, Firefox, Safari
      ajaxRequest = new XMLHttpRequest();
   }catch (e) {
      // Internet Explorer Browsers
      try {
         ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
   }
   
   ajaxRequest.onreadystatechange = function(){
      if(ajaxRequest.readyState == 4){  
        getCartCount('shoppingCartText');
        getCartCount('cartActualCounter');
      }
   }
   var queryString = "?cartid=" + cartId;

   ajaxRequest.open("GET", "removeCartItems.php" + queryString, true);
   ajaxRequest.send(null);
}

function validation(elements)
{ 
  var flag = true;
  for (var i = 0; i <elements.length; i ++)
  {
    if (elements[i].value=="" && elements[i].placeholder!= "12c")
    { 
      flag=false;
      elements[i].style.borderColor = 'red';
      elements[i].style.borderWidth = '.5px';
    }
    else{
      elements[i].style.borderColor = 'inherit';
      elements[i].style.borderWidth = '.5px';
      elements[i].style.borderRadius = 'inherit';
    }
  }
  return flag;
}

function generateUUID() {
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now();; //use high-precision timer if available
    }
    var uuid = 'xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

function convertCartToOrders(name,phone,price,address,cartContentsContainer,uuid,cartId,paymentCallback){
  var items = cartContentsContainer.childNodes;

  items.forEach(function(item){
    var productAddRequest;  // The variable that makes Ajax possible!
    try {
        // Opera 8.0+, Firefox, Safari
        productAddRequest = new XMLHttpRequest();
     }catch (e) {
        // Internet Explorer Browsers
        try {
           productAddRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
           try{
              productAddRequest = new ActiveXObject("Microsoft.XMLHTTP");
           }catch (e){
              // Something went wrong
              alert("Your browser broke!");
              return false;
           }
        }
    }
    var productName = item.childNodes[1].innerHTML;
    var productPrice = item.childNodes[2].innerHTML;
    var productAttribute = item.childNodes[3].innerHTML;
    var productQuantity = item.childNodes[4].childNodes[1].value;
     
    var productAddRequestString = '?productName=' + productName + '&productPrice=0'
      + '&productAttribute=' + productAttribute+ '&productQuantity='
       + productQuantity + '&uuid=' + uuid;

    productAddRequest.open("GET", "insertProduct.php" + productAddRequestString, true);
    productAddRequest.send(null);

    
  });

  var orderAddRequest;  // The variable that makes Ajax possible!
  try {
      // Opera 8.0+, Firefox, Safari
      orderAddRequest = new XMLHttpRequest();
   }catch (e) {
      // Internet Explorer Browsers
      try {
         orderAddRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            orderAddRequest = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
  }

  orderAddRequest.onreadystatechange = function(){
    if(orderAddRequest.readyState == 4){
      if (paymentCallback!=null) {
        paymentCallback(uuid);
        removeFromCart(cartId);
        generatePurchaseEmail(items,uuid);
      } 
    }
  }

  var orderAddRequestString = '?name=' + name + '&price=' + price + 
  '&email=' + email+ '&phone=' + phone + '&address='+address + '&uuid=' + uuid;

  orderAddRequest.open("GET", "insertOrder.php" + orderAddRequestString, true);
  orderAddRequest.send(null); 
}

function generatePurchaseEmail(items,uuid){
  //trimmed price is global
  var emailContents = "Hi " + name+',' +"<br><br>";
  emailContents=emailContents+"Thanks for placing your order on jasonandfriends.net! Your order number is " + uuid+'. You will receive a separate email within 5 business days with your shipping and tracking information.<br><br>';
  
  var currentdate = new Date(); 
  emailContents=emailContents+currentdate.toLocaleString()+'<br><br>';

  emailContents=emailContents+'Shipping Address:<br>'+
  name + '<br>' +
  email + '<br>' +
  phone + '<br>' +
  street1+' '+street2 + '<br>' +
  city +', ' + state+ ' ' + zip+  '<br>' + 'United States<br><br>';

  emailContents=emailContents+'Items: <br>';
  items.forEach(function(item){
    var productName = item.childNodes[1].innerHTML;
    var productPrice = item.childNodes[2].innerHTML;
    var productAttribute = item.childNodes[3].innerHTML;
    var productQuantity = item.childNodes[4].childNodes[1].value;
     
    emailContents+=productQuantity+'x '+productName+' '+productAttribute+'<br>';    
  });
  emailContents+="<br>";
  var length = trimmedPrice.toString().length;
  var prettyPrice = '$'+ parseInt(trimmedPrice).toString().substring(0,length-2)+'.'+trimmedPrice.toString().substring(length-2,length);

  emailContents+='Subtotal: '+prettyPrice+"<br>";
  emailContents+='Shipping: $0<br>';
  emailContents+='Total: ' + prettyPrice +"<br><br>";

  emailContents+='Please reach out to me at jason@jasonandfriends.net and mention your order number if you have any issues.<br><br>';
  emailContents+='Thanks for your business!<br>';
  emailContents+='Jason';  

  var subject = 'Jasonandfriends Order# '+uuid;

  var emailSendRequest;  // The variable that makes Ajax possible!
  try {
      // Opera 8.0+, Firefox, Safari
      emailSendRequest = new XMLHttpRequest();
   }catch (e) {
      // Internet Explorer Browsers
      try {
         emailSendRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            emailSendRequest = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
  }

  var emailSendRequestString = '?contents=' + emailContents+'&email='+email+'&name='+name+'&subject='+subject;

  emailSendRequest.open("GET", "sendEmail.php" + emailSendRequestString, true);
  emailSendRequest.send(null); 
}

