// JavaScript do Menu para poder carregar ele 
function vertical() {

   var navItems = document.getElementById("nav").getElementsByTagName("li");
    
   for (var i=0; i< navItems.length; i++) {
      if(navItems[i].className == "submenu") {
         navItems[i].onmouseover=function() {this.getElementsByTagName('ul')[0].style.display="block";this.style.backgroundColor = "#f9f9f9";}
         navItems[i].onmouseout=function() {this.getElementsByTagName('ul')[0].style.display="none";this.style.backgroundColor = "#FFFFFF";}
      }
   }

}

function horizontal() {

   var navItems = document.getElementById("barra").getElementsByTagName("li");
    
   for (var i=0; i< navItems.length; i++) {
      if((navItems[i].className == "menuvertical") || (navItems[i].className == "submenu"))
      {
         if(navItems[i].getElementsByTagName('ul')[0] != null)
         {
            navItems[i].onmouseover=function() {this.getElementsByTagName('ul')[0].style.display="block";this.style.backgroundColor = "#000";}
            navItems[i].onmouseout=function() {this.getElementsByTagName('ul')[0].style.display="none";this.style.backgroundColor = "#000";}
         }
      }
   }

}