<?php
define ('ADM_MAIL', 'contato@thiagobelem.net');

error_reporting (E_ALL);

function myErrorHandler ($errno, $errstr, $errfile, $errline) {
$limite = 4;
$fcontents = file ($errfile);
$linhas = '';
while (list ($line_num, $line) = each ($fcontents)) {
        $line_num++;
        if (($line_num >= ($errline - $limite)) AND ($line_num <= ($errline + $limite))) {
                //$line = str_replace(' ',' ', $line);
                //$line = str_replace(' ',' ', $line);
                $linhas.= "<span style=\"color: gray\">".str_pad($line_num, 3, "0", STR_PAD_LEFT).": </span>";
                if ($line_num == $errline)
                        $linhas.='<span style="color: red; text-weight: bold">'.highlight_string($line, TRUE).'<BR></span>';
                else
                        $linhas.= highlight_string($line, TRUE).'<BR>';
        }
}
$errfile = str_replace($_SERVER['DOCUMENT_ROOT'],'..',str_replace("\\", '/', $errfile));
echo "<CENTER><div style='border: 1px dashed red; background: #FEFBE0; padding: 10px 20px 10px 20px; width: 600px; margin: 30px auto; text-align: left'>Linha <b>{$errline}</b> do arquivo <b>{$errfile}</b><div style='margin: 10px 20px; border: 1px dashed black; background: white; color: black; padding: 5px 10px; font-size: 11px'><div style='border: 1px dashed red; background: #FBD2D2; color: black; padding: 2px 10px; font-size: 11px; margin-bottom: 5px'>{$errstr}</div>{$linhas}</div><center>Por favor, entre em contato com o administrador através do e-mail:<BR><a href=\"mailto:".ADM_MAIL."\">".ADM_MAIL."</a></center></div></CENTER>\n";
exit(0);
}

$old_error_handler = set_error_handler("myErrorHandler");
?>