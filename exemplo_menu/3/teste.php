<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="pt-br" xml:lang="pt-br">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Menu horizontal e vertical</title>

<script type="text/javascript">
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

</script>

<style type="text/css">


ul.menubar
{
   margin: 0px; padding: 0px; background-color: #FFFFFF; /* IE6 Bug */  
}

ul.menubar .menuvertical
{
   margin: 0px; padding: 0px; list-style: none; background-color: #000; float:left;
}

ul.menubar ul.menu
{
   display: none; position: absolute; margin: 0px;
}

ul.menubar a
{
   display: block; text-decoration: none; color: #fff; height:35px; text-align:center; font-size:12px; font-family: "Trebuchet MS", Arial; 
   font-weight: bold; padding: 0 10px; line-height: 35px; cursor:pointer; border: 1px solid #fff;
}

ul.menubar a:hover { color: #fff; background-color:#666666; }

ul.menu,
ul.menu ul
{
   margin: 0; padding: 0; border-bottom: 1px solid #ccc; width: 150px; /* Width of Menu Items */
   background-color: #000; /* IE6 Bug */
}

ul.menu li
{
   position: relative; list-style: none; border: 0px;
}  

ul.menu li a
{
   display: block; text-decoration: none; color: #fff; height:35px; text-align:left; font-size:12px; font-family: "Trebuchet MS", Arial; 
   font-weight: bold; padding: 0 10px; line-height: 35px; cursor:pointer;
}

/* Fix IE. Hide from IE Mac \*/
* html ul.menu li { float: left; height: 1%; }
* html ul.menu li a { height: 1%; }
/* End */

ul.menu ul
{
   position: absolute; display: none; left: 150px; /* Set 1px less than menu width */ top: 0px;
}

ul.menu li.submenu ul { display: none; } /* Hide sub-menus initially */

ul.menu li.submenu { background: #000 url(arrow.gif) right center no-repeat; }

ul.menu li a:hover { color: #fff; }

</style>
</head>
<body onload="vertical();horizontal();">
<ul id="barra" class="menubar">

  <li class="menuvertical"><a href="#">Documentos</a>
     <ul id="nav" class="menu">
       <li><a href="#">Cadastrar</a></li>
      
        <li><a href="#">Consultar</a></li>
      </ul>
   </li>
   
   <li class="menuvertical"><a href="#">Tramites</a>
      <ul id="nav" class="menu">
        <li class="submenu"><a href="#">Tramite Externo</a>
          <ul>
            <li><a href="#">Cadastrar</a></li>
            <li><a href="#">Consultar</a></li>
          </ul>
        </li>
      
        <li class="submenu"><a href="#">Tramite Interno</a>
          <ul>
            <li><a href="#">Cadastrar</a></li>
            <li><a href="#">Consultar</a></li>
          </ul>
        </li>
      </ul>
   </li>
   
   <li class="menuvertical"><a href="#">Listagens</a>
	  <ul id="nav" class="menu">
       <li><a href="#">Documentos</a></li>
      
        <li><a href="#">Tramites</a></li>
      </ul>
   </li>

   <li class="menuvertical"><a href="#">Relatórios</a>
     <ul id="nav" class="menu">
        <li><a href="#">Diário</a></li>
      
        <li><a href="#">Semanal</a></li>
        
        <li><a href="#">Mensal</a></li>
        
        <li><a href="#">Anual</a></li>
      </ul>
   </li>
   
   <li class="menuvertical"><a href="#">Ferramentas</a>
      <ul id="nav" class="menu">
        <li class="submenu"><a href="#">Tramite Externo</a>
          <ul>
            <li><a href="#">Cadastrar</a></li>
            <li><a href="#">Consultar</a></li>
          </ul>
        </li>
      
        <li class="submenu"><a href="#">Tramite Interno</a>
          <ul>
            <li><a href="#">Cadastrar</a></li>
            <li><a href="#">Consultar</a></li>
          </ul>
        </li>
        
        <li class="submenu"><a href="#">Origem</a>
          <ul>
            <li><a href="#">Cadastrar</a></li>
            <li><a href="#">Consultar</a></li>
          </ul>
        </li>
        
        <li class="submenu"><a href="#">Tipo de Documento</a>
          <ul>
            <li><a href="#">Cadastrar</a></li>
            <li><a href="#">Consultar</a></li>
          </ul>
        </li>
        
        <li class="submenu"><a href="#">Login e Senha</a>
          <ul>
            <li><a href="#">Cadastrar</a></li>
            <li><a href="#">Consultar</a></li>
          </ul>
        </li>
      </ul>
   </li>

   <li class="menuvertical"><a href="#">Ajuda</a></li>

   <li class="menuvertical"><a href="#">Sair</a></li>
</ul>
    
</body>
</html>