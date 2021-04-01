$(document).ready(function(){
  hash = window.location.hash;
  console.log(hash);
});
// $.noConflict();
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
function showTab(n) {
  var x = document.getElementsByClassName("tab");
  if(x.length > 0){
      x[n].style.display = "block";
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
    fixStepIndicator(n)
  }
  
}
function showTabApplication(n) {
  var x = document.getElementsByClassName("tabApplication");
  if(x.length > 0){
  x[n].style.display = "block";
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
    document.getElementById("nextBtn").style.padding = "10px 30px";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  fixStepIndicator(n)
}
}
function showTabDev(n){
    var x = document.getElementsByClassName("tabdevAccount");
    if(x.length > 0){ x[n].style.display = "block"; }
}
function showTabEnv(n){
  var x = document.getElementsByClassName("tabEnvironment");
  if(x.length > 0){ x[n].style.display = "block";}
}
function showProdTabEnv(n){
  var x = document.getElementsByClassName("tabProdEnvironment");
  if(x.length > 0){ x[n].style.display = "block"; }
}
function nextPrevApplication(n) {
  var x = document.getElementsByClassName("tabApplication");
  if(x.length > 0){
  x[currentTab].style.display = "none";
  console.log(currentTab);
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("addAnApplicationForm").submit();
    return false;
  }
  showTabApplication(currentTab);
  }
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if(x.length > 0){
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();
    return false;
  }
  showTab(currentTab);
  }
}
function openCurrentTab(n) {
    var x = document.getElementsByClassName("tab");
    console.log(x);
    if(x.length > 0){
    x[currentTab].style.display = "none";
    currentTab = n;
    if (currentTab >= x.length) {
      document.getElementById("regForm").submit();
      return false;
    }
    showTab(currentTab);
  }
}
function openCurrentTabApplication(n) {
  var x = document.getElementsByClassName("tabApplication");
  if(x.length > 0){
  x[currentTab].style.display = "none";
  currentTab = n;
  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();
    return false;
  }
  showTabApplication(currentTab);
}
}
function openCurrentTabDev(n) {
  var x = document.getElementsByClassName("tabdevAccount");
  if(x.length > 0){
  x[currentTab].style.display = "none";
  currentTab = n;
  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();
    return false;
  }
  showTabEnv(currentTab);
}
}
function openCurrentTabEnv(n) {
  var x = document.getElementsByClassName("tabEnvironment");
  if(x.length > 0){
  x[currentTab].style.display = "none";
  currentTab = n;
  if (currentTab >= x.length) {
    document.getElementById("environmentForm").submit();
    return false;
  }
  showTabEnv(currentTab);
  }
}
function openProdCurrentTabEnv(n) {
  var x = document.getElementsByClassName("tabProdEnvironment");
  x[0].style.display = "none";
  x[1].style.display = "none";
  x[2].style.display = "none";

  x[parseInt(n)].style.display = "block";
}
function nextPrevProd(n) {
  var x = document.getElementsByClassName("tab");
  if(x.length > 0){
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("prodRequestForm").submit();
    return false;
  }
  showTabProd(currentTab);
  }
}
function showTabProd(n) {
  var x = document.getElementsByClassName("tab");
  if(x.length > 0){
  x[n].style.display = "block";
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Confirm Request";
  } else {
    document.getElementById("nextBtn").innerHTML = "Continue";
  }
  fixStepIndicator(n)
}
}
function validateForm() {
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; 
}

function fixStepIndicator(n) {
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
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