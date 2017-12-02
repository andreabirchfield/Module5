function MenuChoice(selection)
{
    document.getElementById("custlist").style.visibility = "hidden";
    document.getElementById("custhist").style.visibility = "hidden";
    document.getElementById("updatestore").style.visibility = "hidden";
    document.getElementById("addcustomer").style.visibility = "hidden";
    document.getElementById("deletecustomer").style.visibility = "hidden";
    document.getElementById("aboutsect").style.visibility = "hidden";
    document.getElementById("findme").style.visibility = "hidden";
    document.getElementById("stname").value = "";
    
    switch(selection)
    {
        case "cslist":
                document.getElementById("custlist").style.visibility = "visible";
                document.getElementById("CustHistory").innerHTML = "";
        CustList();
        break;
        
        case "cshist":
                document.getElementById("custhist").style.visibility = "visible";
        break;
    
        case "update":
                document.getElementById("updatestore").style.visibility = "visible";
        break;
    
        case "addcust":
                document.getElementById("addcustomer").style.visibility = "visible";
         break;
        
        case "deletecust" :
            document.getElementById("deletecustomer").style.visibility = "visible";
        break;
    
        case "about":
        
            document.getElementById("aboutsect").style.visibility = "visible";
        break;
        
        case "location" :
            document.getElementById("findme").style.visibility = "visible";
            break;
        
        case "None":
        break;
    default:
        alert("Please select a different menu option");
    }
}


function CustList()
{
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    xmlhttp.onreadystatechange = function ()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status==200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);  
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
}


function GenerateOutput(result)
{
    var display = "<table class = 'tablecenter'><tr><th>Delete Customer</th><th> Customer ID </th><th> Customer Name</th><th> City</th></tr>";
    var count = 0;
    var companyname = "";
    var customerid = "";
    var city = "";
    
    for (count = 0; count < result.GetAllCustomersResult.length; count ++)
    {
        customerid = result.GetAllCustomersResult[count].CustomerID;
        companyname = '<a href = "javascript:Orders('+"'"+customerid+"');"+'">';
        companyname += result.GetAllCustomersResult[count].CompanyName;
        companyname += '</a>';
        city = result.GetAllCustomersResult[count].City;
        
        var deletecustomers = document.createElement("deletebutton");
    
    deletecustomers = '<button onclick="DeleteCust(' + "'" + customerid + "');" + '"> Delete Customer </button>';
                      
    display += "<tr><td>" + (deletecustomers) + "</td><td>" + (customerid) + "</td><td>" + (companyname) + "</td><td>" + (city) +
   "</td></tr>";
}
display += "</table>";

document.getElementById("custlist").innerHTML = display;

}
  

  MenuChoice("cshist");
  display += "</table>";
  document.getElementById("sec2").innerHTML = display;



function Orders(customerid)

{
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    
    url += customerid;
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4 && xmlhttp.status ==200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    };
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function GenerateOutput(result)
    {
        var display = "<table class= 'tablecenter' > <tr><th> Product Name</th><th> Total</th></tr>";
        
        var count = 0;
        for ( count = 0; count<result.length; count ++)
        
        {
            display += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
           
        }
        display +="</table>";
     
      document.getElementById('stname').value = "";     
      document.getElementById("sec2").innerHTML = display;
       
        MenuChoice("cshist");
    }
  
}

function Orders1()

{
    customerid=document.getElementById("stname").value;
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    
    url += customerid;
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4 && xmlhttp.status ==200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    };
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function GenerateOutput(result)
    {
        var display = "<table class= 'tablecenter' > <tr><th> Product Name</th><th> Total</th></tr>";
        
        var count = 0;
        for ( count = 0; count<result.length; count ++)
        
        {
            display += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";

        }
        display +="</table>";
     
      document.getElementById("sec2").innerHTML = display;
      
        MenuChoice("cshist");
    }
 
  
}
function Orders(customerid)
    {
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += customerid;
    
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
            
        }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
    
    function GenerateOutput(result)
    {
        var display = "<table class = 'tablecenter'> <tr><th>Update Information</th><th> Order ID </th><th> Shipping Address </th><th> Shipping City</th><th> Shipping Name </th><th>Shipping Post Code</th></tr>";
        var count = 0;
        
        
        for (count = 0; count<result.GetOrdersForCustomerResult.length; count++)
        {
            var orders = result.GetOrdersForCustomerResult[count].OrderID;
            var updateinformation =  '<button onclick="CustInfo(' + "'" + orders + "');" + '">Update Order Information</button>';
            display += "<tr><td>" + (updateinformation) + "</td><td>"  + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName+ "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode +
"</td></tr>";
}
  MenuChoice("cshist");
  display += "</table>";
  document.getElementById("sec2").innerHTML = display;
    }
    }
function Orders2()

{
    customerid=document.getElementById("stname").value;
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/";
    
    url += customerid;
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4 && xmlhttp.status ==200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    };
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function GenerateOutput(result)
    {
        var display = "<table class = 'tablecenter'> <tr><th> Update Info </th><th>Order ID </th><th> Shipping Address </th><th> Shipping City</th><th> Shipping Name </th><th>Shipping Post Code</th></tr>";
        var count = 0;
        var orderID = result[count].OrderID;
        var shipaddress = result[count].ShipAddress;
        var shipcity = result[count].ShipCity;
        var shipname = result[count].ShipName;
        var shipzip = result[count].ShipPostcode;

        
        for (count = 0; count<result.length; count++)
        {
          
            display += '<tr><td><button onclick = "CustInfo('+"'" + orderID + "')" + '"> Update </button></td><td>' + (orderID) + "</td><td>" + (shipaddress) + "</td><td>" + (shipcity) + "</td><td>" + (shipname) + "</td><td>" + (shipzip) +
"</td></tr>";
}
  display += "</table>";
  document.getElementById("sec2").innerHTML = display;
    }
    }


function CustInfo(orderid)
{
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/";
    url += orderid;
    
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status== 200){
            var output = JSON.parse(xmlhttp.responseText);
            
            document.getElementById("orderID").value = output[0].OrderID;
            document.getElementById("shipadd").value = output[0].ShipAddress;
            document.getElementById("shipcity").value = output[0].ShipCity;
            document.getElementById("shipname").value = output[0].ShipName;
            document.getElementById("shippost").value = output[0].ShipPostcode;
            MenuChoice("update");
        }
    };
xmlhttp.open("GET", url,true);
xmlhttp.send();
}

 
function StoreUpdate()

{   
    var Storeid = document.getElementById("orderID").value;
    var shpadd  = document.getElementById("shipadd").value;
    var shpcity = document.getElementById("shipcity").value;
    var shpname = document.getElementById("shipname").value;
    var shppost = document.getElementById("shippost").value;
    
    var parameters = '{"OrderID":"' + Storeid+ '","ShipAddress":"' + shpadd + '","ShipCity":"' + shpcity + '","ShipName":"' + shpname + '","ShipPostcode":"' + shppost + '"}';
  
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/UpdateOrderAddress";
 
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var result = JSON.parse(xmlhttp.responseText);
           OperationResult(result);
            goBack("update");
        }
        
    };
    
    xmlhttp.open ("POST", url, true);
    xmlhttp.setRequestHeader ("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(parameters);
    
}

function OperationResult(success,exception)
{
    switch(success)
    {
        case 1:
            alert ("The Operation Was Successful");
            break;
        case 0:
            alert ("The Operation Was Not Successful:\ " + exception);
            break;
        case -2:
            alert ("The Operation Was Not Successful because the data string supplied could not be deserialized into the service object!");
            break;
        case -3:
            alert ("The Operation Was Not Successful because a record with the supplied Order ID couldn't be found!");
            break;
        default: 
            alert ("The Operation Code returned can not be Identified!"); 
    }
}

function CreateCust()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    var custoid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    var customercity = document.getElementById("custcity").value;
    
    var newcust = '{"CustomerID":"' + custoid + '","CompanyName":"' + customername + '","City":"' + customercity + '"}';
    
objRequest.onreadystatechange = function()
  {
    if (objRequest.readyState == 4 && objRequest.status ==200)
    {
        var result = JSON.parse(objRequest.responseText);
        GenerateResult(result);
        goBack("cslist");
    }
  };
  
    objRequest.open ("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send (newcust);
    }

    function GenerateResult(output)
    { 
    
        
        if (output.WasSuccessful == 1)
        {
            document.getElementById("result").innerHTML = "The Customer Was Added Successfully!";
          
        }
        else
        {
            document.getElementById("result").innerHTML = "The Customer Was Not Added Successful!" + "<br>" + output.Exception;
        }
    
    }

   
   
function DeleteCust(customerid){ 
       var deletion;
       var deleteCustomer = confirm ("Are You Sure You Want To Delete This Customer"); 
     if (deleteCustomer){
       if (customerid === "null")
       { 
            
            document.getElementById("Deletecustomer").value = customerid;  
            deletion = customerid;
 
        }
       else{
        deletion = document.getElementById("Deletecustomer").value; 
 
   deletecusts(deletion);
     }
   }
}

function deletecusts(deletion)
   {
      var deleteObjRequest = new XMLHttpRequest();
      var deleteurl = "https://student.business.uab.edu/jsonwebservice/service1.svc/DeleteCustomer/";
      deleteurl += deletion;
      
      deleteObjRequest.onreadystatechange = function()
      {        
         if (deleteObjRequest.readyState == 4 && deleteObjRequest.status == 200)
         
       {
         
              var customerdelete = JSON.parse(deleteObjRequest.responseText);
               DeleteOperationResult(customerdelete);
               goBack("cslist");
       }
      }; 
            deleteObjRequest.open("GET",deleteurl, true);
            deleteObjRequest.send();
      
   }
   
   
   function DeleteOperationResult(output)
   {
      if (output.DeleteCustomerResult.WasSuccessful == 1)
   
        {
    
        document.getElementById("result2").innerHTML = "The Customer Has Been Successfully Deleted!";
         }
    else
    {
        document.getElementById("result2").innerHTML = "We're Sorry, But the Customer Was Not Deleted Successfully!" + "<br>" + output.Exception;
     }
   document.getElementById("result2").innerHTML = display;
   
   }
   
   
   var Latitude = undefined;
   var Longitude = undefined;
 
// Get geo coordinates
 
function getMapLocation() {
 
    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
}
 
// Success callback for get geo coordinates
 
var onMapSuccess = function (position) {
 
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
 
    getMap(Latitude, Longitude);
 
}
 
// Get map by using coordinates
 
function getMap(latitude, longitude) {
 
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);
 
 
    var latLong = new google.maps.LatLng(latitude, longitude);
 
    var marker = new google.maps.Marker({
        position: latLong
    });
 
    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
}
 
 
function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
 
// Watch your changing position
 
function watchMapPosition() {
 
    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}

   function Location()
   {
    var geo = navigator.geolocation;
    
    if(geo)
    {
        geo.getCurrentPosition(showPosition);
        
    }
    else
    {
        alert ("Geolocation Is NOT Supported!");
    }
   }
   
   function showPosition(position)
   {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    document.getElementById("latitude").innerHTML = latitude;
    document.getElementById("longitude").innerHTML = longitude;
    
    showPosition1(position);
   }
   
   function handle_geolocation_query(position)
{
    console.log("hiiiii");
    console.log(position);
    var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," +
                    position.coords.longitude + "&zoom=14&size=300x400&markers=color:blue|label:S|" +
                    position.coords.latitude + ',' + position.coords.longitude;

    jQuery("#map").remove();
    jQuery(document.body).append(
        jQuery(document.createElement("img")).attr("src", image_url).attr('id','map')
    );
}

function showPosition1(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";

    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}
   
   
   
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  navigator.splashscreen.show();
}


  function goBack() {
    
      document.getElementById("custlist").style.visibility = "visible";
      document.getElementById("custhist").style.visibility = "hidden";
      document.getElementById("updatestore").style.visibility = "hidden";
      document.getElementById("addcustomer").style.visibility = "hidden";
      document.getElementById("aboutsect").style.visibility = "hidden";
      document.getElementById("deletecustomer").style.visibility = "hidden";
}
 function addcustomer(){
    
      document.getElementById("custlist").style.visibility = "hidden";
      document.getElementById("custhist").style.visibility = "hidden";
      document.getElementById("updatestore").style.visibility = "hidden";
      document.getElementById("addcustomer").style.visibility = "visible";
      document.getElementById("aboutsect").style.visibility = "hidden";
      document.getElementById("deletecustomer").style.visibility = "hidden";
 }
