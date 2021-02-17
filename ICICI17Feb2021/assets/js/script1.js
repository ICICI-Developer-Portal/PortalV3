// $(document).ready(function(){
//   hash = window.location.hash;
//   console.log(hash);
// });

$(document).ready(function(){
  if(window.location.hash != "") {
      $(window.location.hash).click();
      $(window.location.hash).addClass("active show");
      $(window.location.hash).siblings().removeClass("active show");
      var mainTab =  $(window.location.hash).attr('href');
      console.log(mainTab);
      $(mainTab).addClass("show active");
      $(mainTab).siblings().removeClass("active show");
  }
});

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
showTabApplication(currentTab);
showTabDev(currentTab);
showTabEnv(currentTab);
console.log(currentTab);
// var currentTabApplication  = 0;
function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  // if (n == 0) {
  //   document.getElementById("prevBtn").style.display = "none";
  // } else {
  //   document.getElementById("prevBtn").style.display = "inline";
  // }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
    document.getElementById("nextBtn").style.padding = "10px 30px";
  } else if (n == 1) {
    document.getElementById("nextBtn").innerHTML = "Verify";
    document.getElementById("nextBtn").disabled = true;
  }
  else {
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("nextBtn").disabled = false;
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}
function showTabApplication(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tabApplication");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  // if (n == 0) {
  //   document.getElementById("prevBtn").style.display = "none";
  // } else {
  //   document.getElementById("prevBtn").style.display = "inline";
  // }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
    document.getElementById("nextBtn").style.padding = "10px 30px";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}
function showTabDev(n){
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tabdevAccount");
    x[n].style.display = "block";
}
function showTabEnv(n){
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tabEnvironment");
  x[n].style.display = "block";
}
function showProdTabEnv(n){
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tabProdEnvironment");
  x[n].style.display = "block";
}
function nextPrevApplication(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tabApplication");
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  console.log(currentTab);
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("addAnApplicationForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTabApplication(currentTab);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}
function openCurrentTab(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    
    // Exit the function if any field in the current tab is invalid:
    // if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
	 
      document.getElementById("regForm").submit();
	   console.log(x.length);
		alert(n);
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}
function openCurrentTabApplication(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tabApplication");
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTabApplication(currentTab);
}
function openCurrentTabDev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tabdevAccount");
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTabEnv(currentTab);
}
function openCurrentTabEnv(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tabEnvironment");
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("environmentForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTabEnv(currentTab);
}
function openProdCurrentTabEnv(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tabProdEnvironment");
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = n;
 
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("prodEnvironmentForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showProdTabEnv(currentTab);
}
function nextPrevProd(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("prodRequestForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTabProd(currentTab);
}
function showTabProd(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  // if (n == 0) {
  //   document.getElementById("prevBtn").style.display = "none";
  // } else {
  //   document.getElementById("prevBtn").style.display = "inline";
  // }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Confirm Request";
  } else {
    document.getElementById("nextBtn").innerHTML = "Continue";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}
function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}
function openTab(tab) { /* code to display tab content on click of external links */
  $(".tab-pane").siblings().removeClass("in show active");
  $(tab).addClass("in show active");
  $(".nav-tabs li a").removeClass("show active");
  $('html, body').animate({ scrollTop: 0 }, 'fast');
}
$(document).ready(function () { 
  x = 1;
  y = 1;
  $("#addMore").click(function () { /* add and remove content dynamically */
    $("#addMoreWebSites").append('<div id="addMoreWebSitesChild' + x++ + '" class="col-md-8 marginAutoHr text-center">' + '<div class="input-group mb-3">' + '<div class="input-group-prepend">' + '<span class="input-group-text" id="basic-addon1">www.</span>'+'</div>'+'<input class="inputWithLabel" type="text" placeholder="Your website name" required="">'+'<i class="fa fa-exclamation-circle warningIcon"></i>'+'</div>'+'<img src="images/Group 472.svg" class="btnRemove">'+'</img>'+'</div>');
  });
  // delegating event here
  $('body').on('click', '.btnRemove', function () {
    $(this).parent('div.marginAutoHr').remove()
  });
});
$(function () { /* apply style to the top nav bar when the user scroll down*/
  $(document).scroll(function () {
      var $nav = $(".menuBar");
      var $navtryItFree = $("#tryItFree .navbar-brand");
      var $navthankYou = $("#thankYou .navbar-brand");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
      $navtryItFree.toggleClass('scrolled', $(this).scrollTop() > $navtryItFree.height());
      $navthankYou.toggleClass('scrolled', $(this).scrollTop() > $navthankYou.height());
  });
});
function verifyOTP(){
  document.getElementById("enterOTPSection").style.display = "flex";
  document.getElementById("nextBtn").disabled = false;
  document.getElementsByClassName("changeMobileNumber")[0].style.display = "block";
  document.getElementsByClassName("sendOTPBtn")[0].style.display = "none";
  document.getElementById("mobileNumber").disabled=true;
}
function changeNumber(){
  document.getElementById("mobileNumber").disabled=false;
  document.getElementById("enterOTPSection").style.display = "none";
  document.getElementsByClassName("changeMobileNumber")[0].style.display = "none";
  document.getElementsByClassName("sendOTPBtn")[0].style.display = "block";
}
function openProdDropdown() {
  document.getElementsByClassName("dropdown-content")[0].style.display = "block";
}
function addIPAddress(){
  var inputValue = document.getElementById("whitelistIpInput").value;
  var ipDiv = document.getElementById("whitelistIPItemContainer");
  y = 1;
  console.log(ipDiv);
  console.log(inputValue);
  if(inputValue !== ""){
    ipDiv.append('<div id="addMoreWebSitesChild' + y++ + '" class="col-md-8 marginAutoHr text-center">' + '</div>');
  }
}
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#profileImage')
              .attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
  }
}
function createDevAccount(){
  document.getElementById("requestDevAccount").style.display="block";
  document.getElementById("noApplications").style.display="none";
}
function openApiApplictionTable(){
  document.getElementById("apiApplicationTable").style.display="block";
  document.getElementById("requestDevAccount").style.display="none";
}