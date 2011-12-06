<?
	if($_POST){

		$para = $_POST["para"];
		$mensagem = $_POST["mensagem"];
		$assunto = $_POST["assunto"];

		if (mail($para,$assunto,$mensagem)){
			echo "mensagem Enviada Com Sucesso";
		
		} else {
			echo "erro no envio da mensagem";
		}

	}

?>

<form name="form1" method="post" action="">
    <table width="775" border="0" cellspacing="0">
        <tr>
            <td>Para</td>
            <td><input name="para" type="text" id="para" size="43"></td>
            <td> </td>
            <td> </td>
        </tr>
        <tr>
            <td width="97">assunto</td>
            <td width="305"><input name="assunto" type="text" id="assunto" size="43"></td>
            <td width="180"> </td>
            <td width="185"> </td>
        </tr>
        <tr>
            <td>Mensagem</td>
            <td><textarea name="mensagem" cols="40" rows="10" id="mensagem"></textarea></td>
            <td> </td>
            <td> </td>
        </tr>
        <tr>
            <td> </td>
            <td><input type="submit" name="Submit" value="enviar e-mail"></td>
            <td> </td>
            <td> </td>
        </tr>
    </table>
</form>