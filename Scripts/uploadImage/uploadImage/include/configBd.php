<?php

/******

*

* Créditos: hcar - Hamilcar Antônio Vieira da Silva - hcar_1@yahoo.com.br

*

* configuração da base de dados

*

* ******/

$db['host'] = "localhost"; 
$db['database'] = "nome da base de dados";
$db['username'] = "login da base de dados";
$db['password'] = "senha da base de dados";
$db['con'] = @mysql_pconnect($db['host'], $db['username'], $db['password']) or trigger_error(mysql_error(),E_USER_ERROR);

?>

