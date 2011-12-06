<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br" dir="ltr">
<head>
	<title>PHP e JQuery</title>
	<!-- Inclui o Jquery -->
	<script src="jscripts/jquery.js" type="text/javascript"></script>
	<script src="jscripts/cep.js" type="text/javascript"></script>

	<!-- Inclui o CSS para dar um ar de graça -->
	<link href="style.css" type="text/css" rel="stylesheet" />
</head>
<body>
	<form name="f" id="f" onSubmit="return false" >
<table width="610" border="0" class="btop" cellspacing="1" cellpadding="1">
  <tr>
    <td width="161" class="r">Cep  </td>
    <td width="158"><input name="cep" type="text" id="cep" /></td>
    <td width="77" class="r"><button id="btn" class="btn" onclick="return getEndereco()">Consultar</button></td>
    <td width="168">&nbsp;</td>
    <td width="177">&nbsp;</td>
  </tr>
  <tr>
    <td class="r">Endere&ccedil;o</td>
    <td><input type="text" name="endereco" id="endereco" /></td>
    <td class="r">N&uacute;mero</td>
    <td><input type="text" id="num" name="num" size="10" /></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td class="r">Bairro</td>
    <td class="small">
      <input type="text" id="bairro" name="bairro" />
    </td>
    <td class="r">Cidade</td>
    <td><input type="text" name="cidade" id="cidade" /></td>
    <td><span class='forleft'>UF</span><input type="text" name="estado" id="estado" size="2" /></td>
  </tr>
  <tr>
    <td class="r">&nbsp;</td>
    <td>&nbsp;</td>
    <td class="r">&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
	</form>
	<div id="d"></div>	
</body>
</html>
