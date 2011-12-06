<?php /* insiro sess�o para poder acessar as p�ginas */ 
		include("login/protege_pagina.php");
		/* conex�o com banco de dados */
		include("conexao_db/conexaoTecnologia.php");

        // ID USU�RIO LOGADO
		$id_login = $_SESSION['codUsuario'];
       
        // select para edi��o
        mysql_select_db($database_tecnologia, $tecnologia);
        // Transformo o recurso em um array
        $sql = sprintf("SELECT data_cadastro FROM usuarios WHERE codUsuario ='".$id_login."'");
        $query = mysql_query($sql, $tecnologia) or die('Clique em Voltar, e tente novamente!');
        $linha = mysql_fetch_array($query);

        $data_cadastro = $linha[0];
        $time_cadastro = strtotime($data_cadastro);

        $dia_expiracao = strtotime('+30 days', $time_cadastro);
        $dia_hoje      = strtotime(date("Y").'-'.date("m").'-'.date("d"));
		//$dia_hoje      = strtotime(date("Y").'-'.date("m").'-'.'31');

        if(($dia_expiracao >= $time_cadastro) && ($dia_hoje >= $dia_expiracao)) {
                sleep(0);                       // tempo para redirecionar
			header("Location: alterar_senha/formAltSenhaExp.php?action=pwd_exp"); // local para onde estou redirecionando
        }else{
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>..:: Seja Bem Vindo - Sistema Administrativo ::..</title>
    <meta http-equiv="Content-Language" content="pt-br" />
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <!-- icon do SIG -->
    <link rel="shortcut icon" href="imagens/sgd_icon.ico">
    <!--estiloMenu � utilizado nessa tela-->
</head>
<body onLoad="vertical();horizontal();">
<div id="container">
	<?php include('menu/menu.php'); ?>
	<br />
	<br />
    <table id="bemVindo" align="center">
        <tr>
            <th id="title" class="row">
                Versao 1.1
            </th>
        </tr>
        <tr>
            <td class="row">
                Seja Bem Vindo.
            </td>
        </tr>
        <tr>
        	<td class="row">Duvidas ligue:</td>
        </tr>
    </table>   
</div><!-- DIV container -->
</body>
</html>
<?php } // fecha else do alterar senha ?>