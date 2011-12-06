<?php
 		/* conexo com banco de dados */
		include("../../../conexao_db/conexaoTecnologia.php");
		/* insiro sesso para poder acessar as pginas */ 
		include("../../../login/protege_pagina.php");
		/* biblioteca */
		include("../../../Biblioteca/biblioteca.php");
		// para poder utilizar a biblioteca de data
		$data = new DataHora;

		// GUARDO O QUE VEM DO $_POST EM UMA VARIVEL 
		$usuCad  = $_POST['usuarioCadastro'];
		$dtIni   = $data->formataDataUSA($_POST['data_inicio']);
		$dtFim   = $data->formataDataUSA($_POST['data_final']);
		$oriOne  = $_POST['origem1'];
		$oriTwo  = $_POST['origem2'];
		$tipoDoc = $_POST['tipo_documento'];
		$recPor  = $_POST['recebidoPor'];
		$dtRec   = $data->formataDataUSA($_POST['dataRecebimento']);
		$radio   = $_POST['rd_tramite'];
		// retiro os espaos no inicio e final e transformo em maiscula
		$assunto = trim(strtoupper($_POST['assunto']));
		$nome    = trim(strtoupper($_POST['nome']));
		
		// SETO AS VARIVEIS AUXILIARES
		$usuCad_aux = "A.usuarioCadastro";
		$dtIni_aux  = "'2009-01-01'";
		$dtFim_aux  = "'2010-12-31'";
		$oriOne_aux = "A.origem1";
		$oriTwo_aux = "A.origem2";
		$tipoDoc_aux= "A.tipo_documento";
		$recPor_aux = "A.recebidoPor";
		$dtRec_aux  = "AND A.dataRecebimento BETWEEN '2009-01-01' AND '2010-12-31'";
		$assunto_aux= "'%'";
		$nome_aux   = "'%'";

		// VERIFICO SE A VARIVEL FOI SETADA, CASO NEGATIVO UTILIZO A VARIVEL AUX
		(!isset($usuCad) || $usuCad != "") ? $usuCad = 'AND A.usuarioCadastro = '.$usuCad : $usuCad = 'AND A.usuarioCadastro = '.$usuCad_aux;		
		(!isset($oriOne) || $oriOne != "") ? $oriOne = 'AND A.origem1 = '.$oriOne : $oriOne = 'AND A.origem1 = '.$oriOne_aux;
		(!isset($oriTwo) || $oriTwo != "") ? $oriTwo = 'AND A.origem2 = '.$oriTwo : $oriTwo = 'AND A.origem2 = '.$oriTwo_aux;
		(!isset($tipoDoc) || $tipoDoc != "") ? $tipoDoc = 'AND A.tipo_documento = '.$tipoDoc : $tipoDoc = 'AND A.tipo_documento = '.$tipoDoc_aux;
		(!isset($recPor) || $recPor != "") ? $recPor = 'AND A.recebidoPor = '.$recPor : $recPor = 'AND A.recebidoPor = '.$recPor_aux;
		
		(!isset($dtIni) || $dtIni != "" && $dtIni != "--") ? $dtIni = '"'.$dtIni.'"' : $dtIni = $dtIni_aux;
		(!isset($dtFim) || $dtFim != "" && $dtFim != "--") ? $dtFim = '"'.$dtFim.'"' : $dtFim = $dtFim_aux;
		(!isset($dtRec) || $dtRec != "" && $dtRec != "--") ? $dtRec = 'AND A.dataRecebimento = '.'"'.$dtRec.'"' : $dtRec = $dtRec_aux;
		(!isset($nome) || $nome != "") ? $nome = 'AND A.nome  LIKE "%'.$nome.'%"' : $nome = 'AND A.nome LIKE '.$nome_aux;
		(!isset($assunto) || $assunto != "") ? $assunto = 'AND A.assunto LIKE "%'.$assunto.'%"' : $assunto = 'AND A.assunto LIKE '.$assunto_aux;
		
		// RDIOS "1 - Com Trmite"   "2 - Sem Trmite"  "3 - Todos"
		if (isset($radio)){
			switch ($radio){
				case 1:
					$tramite = 	"EXISTS (SELECT num_documento FROM tramite_externo  WHERE num_documento = A.codDocumento
								 union
								 SELECT num_documentoo FROM tramite_interno WHERE num_documentoo = A.codDocumento)
								 AND";
					$titulo = "RELATRIO DE DOCUMENTOS COM TRMITE";
				break;				
				case 2:
					$tramite = 	"NOT EXISTS (SELECT num_documento FROM tramite_externo WHERE num_documento = A.codDocumento
								 union
								 SELECT num_documentoo FROM tramite_interno WHERE num_documentoo = A.codDocumento)
								 AND";
					$titulo = "RELATRIO DE DOCUMENTOS SEM TRMITE";
				break;				
				case 3:
					$tramite = 	" ";
					$titulo = "RELATRIO GERAL DOS DOCUMENTOS";
				break;
			}
		}			
		
		/* SQL */
		$sql = "SELECT				
						A.codDocumento as codDoc,
						A.usuarioCadastro as A_codCad,
						A.dataCadastro as A_dtCad,
						A.origem1 as A_oriOne,
						A.origem2 as A_oriTwo,
						A.assunto as A_ass,
						A.nome as A_nome,
						A.recebidoPor as A_recPor,
						A.dataRecebimento as A_dtRec,
						B.nomeUsuario as B_nomeUser,
						C.sigla_origem1 as C_siglaOriOne,
						C.sigla_origem1 as C_siglaOriOne,
						D.sigla_origem2 as D_siglaOriTwo,
						E.nome_tipo as E_nTipo,
						F.nome as F_nome_rec_por
					FROM documento A
						INNER JOIN usuarios B ON B.codUsuario = A.usuarioCadastro
						INNER JOIN origem1 C ON C.cod_origem1 = A.origem1
						INNER JOIN origem2 D ON D.cod_origem2 = A.origem2
						INNER JOIN tipo_documento E ON E.cod_tipo = A.tipo_documento
						INNER JOIN recebido_por F ON F.cod_rec_por = A.recebidoPor					
					 WHERE
					 	$tramite
						A.dataCadastro BETWEEN $dtIni AND $dtFim	
						$assunto
						$nome
						$dtRec								
						$usuCad
						$oriOne
						$oriTwo
						$tipoDoc
						$recPor						
					GROUP BY codDoc
					ORDER BY B_nomeUser";

		//echo($sql);exit;
		/* BANCO DE DADOS */		
		mysql_select_db($database_tecnologia, $tecnologia);
		$query = mysql_query($sql, $tecnologia) or die('Clique em Voltar, e tente novamente!');
		$num = mysql_num_rows($query);
			
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>..:: <?=$titulo;?> - Sistema Administrativo ::..</title>
    <!-- icon do SIG -->
    <link rel="shortcut icon" href="../../../imagens/sgd_icon.ico">
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <link href="../../../estilo/estiloFicha.css" rel="stylesheet" type="text/css" />
    <link href="../../../estilo/estiloFicha_print.css" rel="stylesheet" type="text/css"  media="print"/>
    <script  type="text/javascript" language="javascript">
    <!--
    //funcao que imprime a ficha
    function imprime() {
        javascript:window.print();
    }
    //-->
    </script>
</head>
<body onLoad="vertical();horizontal();">
		<?php if(!$num):?>
        	<!-- MENSAGEM CASO NO ENCONTRE DADO PESQUISADO --> 
        	<?php include('../../../menu/menu.php');?>
            <br />
            <div align="center">
                <table border="0" width="770px" class="borda-fina">
                    <tr>
                        <td align="center" style="padding:20px">
                            <p class="msg">No existem Dados similares a sua pesquisa!</p>
                        </td>
                    </tr>
                </table>
            </div>
        <?php else:?>
        <div align="center">
        	<!-- RELATRIO --> 
            <table border="0" width="770px" align="center" class="bordaTabela" id="form">
                <thead>
                    <tr>
                        <td colspan="9" align="center">
                            <img src="../../../imagens/brasao_impressao.jpg" width="770" height="130">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="9" align="center" class="titulo"><?=strtoupper($titulo);?></td>
                    </tr>
                    <tr>
                        <th class="negrito" id="bordaTabela">Usurio</td>
                        <th class="negrito" id="bordaTabela">Data Cad.</td>
                        <th class="negrito" id="bordaTabela">Sec./rgo</td>
                        <th class="negrito" id="bordaTabela">Depto/rgo</td>
                        <th class="negrito" id="bordaTabela">Tipo Doc.</td>
                        <th class="negrito" id="bordaTabela">Assunto</td>
                        <th class="negrito" id="bordaTabela">Cadastrado por</td>
                        <th class="negrito" id="bordaTabela">Rec. por</td>
                        <th class="negrito" id="bordaTabela">Data Rec.</td>
                    </tr>
                </thead>          
            <?php $color = 0; ?>
            <?php while($row = mysql_fetch_assoc($query)): ?>
            	<!-- CORPO --> 
                <tbody>
                    <tr class="<?php echo ($color % 2 == 1) ? "cinza" : ""; ?>">
                    
                        <td class="bordaTabela" width="130px"><?=$row['B_nomeUser'];?></td>
                        <td class="bordaTabela" width="45px"><?=$data->formataDataBR($row['A_dtCad']);?></td>
                        <td class="bordaTabela" width="85px"><?=$row['C_siglaOriOne'];?></td>
                        <td class="bordaTabela" width="85px"><?=$row['D_siglaOriTwo'];?></td>
                        <td class="bordaTabela" width="100px"><?=$row['E_nTipo'];?></td>
                        <td class="bordaTabela" width="120px"><?=$row['A_ass'];?></td>
                        <td class="bordaTabela" width="105px"><?=$row['A_nome'];?></td>
                        <td class="bordaTabela" width="85px"><?=$row['F_nome_rec_por'];?></td>
                        <td class="bordaTabela"  width="45px"><?=$data->formataDataBR($row['A_dtRec']);?></td>
                        
                    </tr>
                </tbody>
            <?php $color++; ?>
            <?php endwhile; ?>
                <!-- RODAP - BOTES DE IMPRESSO --> 
                <tfoot>                
                    <tr>
                        <td colspan="10" class="list_btn" align="center">
                            <input type="button" onClick="javascript:history.go(-1);" name="Voltar" value="Voltar" class="botao">
                            <input type="button" name="imprimir" value="Imprimir" class="botao" onClick="imprime()">     
                        </td>
                    </tr>
                </tfoot>
            </table>
        <?php endif;?>
    </div>
</body>
</html>