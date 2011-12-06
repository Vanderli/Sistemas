<? @include_once("includes/cabecalho/_meta-css-js.php"); ?>


<!-- Extensao do Menu acessibildiade (tela inteira) -->
<div id="extensao_acessibilidade"></div>

<!-- *********************** In�cio CONTAINER *********************** -->

<div id="container">

    
    <!-- *********************** CABE�ALHO *********************** -->
    <div id="logo">
    	<? @include_once("includes/cabecalho/_logo.php"); ?>
    </div>
    <!-- Fim LOGO -->
        
    <!-- In�cio Barra de MENU ACESSIBILIDADE (centro horizontal) -->
    <div id="menu_acessibilidade">
    	<? @include("includes/cabecalho/_acessibilidade.php"); ?>
    </div>
    <!-- *********************** CABE�ALHO *********************** -->
    <!-- mensagem caso o javaScript esteja desabilitado-->
    <? @include_once("paginas_erro/nao_javascript.php"); ?> 
    
  <!-- IN�CIO DO SUB CONTAINER -->  
  <div id="sub_container">
    
    <!-- *********************** ESQUERDA *********************** -->
    <div id="menu_navegacao">
    	<? @include_once("includes/esquerda/_esquerda.php"); ?>      
    </div>
    <!-- *********************** Fim ESQUERDA *********************** -->
    
    
    <!-- ***********************  CENTRO *********************** -->
    <div id="conteudo">    
        <!-- In�cio Menu CEG -->
        <div id="conteudo_ceg">
        	<? @include_once("includes/centro/_conteudo_ceg.php"); ?> 
        </div>
        <!-- Fim Menu CEG -->      
      
        <!-- Muda conte�do central -->
        	<? @include_once("home/visualiza-home.php"); ?> 
        <!-- Fim Muda conte�do central -->  
        

        <div id="conteudo_menu">
        	<? @include_once("includes/centro/_menu_inferior.php"); ?> 
        </div>
              
    </div>
    <!-- *********************** Fim CENTRO *********************** -->
    
    <!-- ***********************  DIREITA *********************** -->
    <div id="menu_interativo">    
    	<? @include_once("includes/direita/_direita.php"); ?>     
    </div>
    <!-- Fim MENU INTERATIVO -->
    
  </div>


    <div id="copyright">
    	<? @include_once("includes/rodape/_rodape.php"); ?>
    </div>




</div>

<div id="extensao_copyright"></div>

</body>

</html>
