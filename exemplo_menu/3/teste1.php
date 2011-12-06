<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>
<style>
/* menu horizontal-vertical by micox */
 .menu-hv * { margin: 0; padding: 0;}
 .menu-hv a { display: block; }
 .menu-hv li { list-style: none; float: left; height: 1%; }
 .menu-hv li ul { position: absolute; visibility: hidden;}
 .menu-hv li ul li { float: none; white-space: nowrap; display: inline; /* o inline é pro IE */}
 .menu-hv li ul li ul { position: absolute; left: 100%; top: 0; }
 .menu-hv li:hover ul, .menu-hv li.over ul { visibility: visible;}
 .menu-hv li:hover ul ul, .menu-hv li.over ul ul { visibility: hidden;}
 .menu-hv ul ul li:hover ul, .menu-hv ul ul li.over ul { visibility: visible;}
 /* visual */
 .menu-hv { padding:0 0 0 32px; margin:0; list-style:none; height:35px; background:#fff url(button1.gif); position:relative; border:1px solid #000; border-width:0 1px; border-bottom:1px solid #444;}
             .menu-hv a { display:block; height:35px; text-align:center; font-size:12px; font-family: "Trebuchet MS", Arial; font-weight: bold;  text-decoration: none; color: #ccc; padding: 0 10px; line-height: 35px; cursor:pointer;}
			 .menu-hv li a:hover {color:#fff; background:#000 url(button2.gif);}
             .menu-hv ul li ul {  background-color: #000; border: 1px solid #000; }
 	 
</style>
<body>

<div class="menu-hv">
   <ul>
     <li><a href="#">Cadastrar</a></li>
     <li><a href="#">Consulta</a></li>
     <li><a href="#">Tramites</a>
       <ul>
         <li><a href="#">Destino Externo</a>
         <li><a href="#">Destino Interno</a>
       </ul>
     </li>
     <li><a href="#">Listagem</a></li>
     <li><a href="#">Relatório</a></li>
     <li><a href="#">Configuração</a></li>
     
     
     <li><a href="#">Sair</a></li>
   </ul>
 </div>
</body>
</html>
