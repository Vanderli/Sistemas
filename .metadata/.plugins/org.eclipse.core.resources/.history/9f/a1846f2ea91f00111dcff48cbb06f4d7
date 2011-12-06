<?
##################################### DATA NO SITE #####################################
function dia_extenso(){

    // pegando a data atual
    $dia    = date('d');
    $mes    = date('m');
    $ano    = date('Y');
    $semana = date('w');

    //formatando o mês para exibiç por extenso
    switch ($mes){
        case 1: $mes = "Janeiro";   break;
        case 2: $mes = "Fevereiro"; break;
        case 3: $mes = "Março";     break;
        case 4: $mes = "Abril";     break;
        case 5: $mes = "Maio";      break;
        case 6: $mes = "Junho";     break;
        case 7: $mes = "Julho";     break;
        case 8: $mes = "Agosto";    break;
        case 9: $mes = "Setembro";  break;
        case 10:$mes = "Outubro";   break;
        case 11:$mes = "Novembro";  break;
        case 12:$mes = "Dezembro";  break;
    }

    //formatando o dia da semana para exibição por extenso
    switch ($semana) {
        case 0: $semana = "Domingo"; break;
        case 1: $semana = "Segunda"; break;
        case 2: $semana = "Terça";   break;
        case 3: $semana = "Quarta";  break;
        case 4: $semana = "Quinta";  break;
        case 5: $semana = "Sexta";   break;
        case 6: $semana = "Sábado";  break;
    }
    // dia por extenso com dia da semana
    $dia_extenso = "$semana, $dia de $mes de $ano";

    return($dia_extenso);
}
?>
<div id="data_geral">
  <p><?=dia_extenso()?></p>
</div>
<div id="imprensa_oficial">
    <a href="<?=URL?>/governo/servicos/imprensa_oficial/imprensa_oficial.php" title="Imprensa Oficial">
      <img src="<?=URL?>/img/banners_menu_interativo/banner_imprensa.jpg" alt="Banner com logo da Imprensa Oficial" title="Imprensa Oficial" />
    </a>
</div>

<div id="agenda_eventos">
    <h2>AGENDA DE EVENTOS</h2>
    <a href="<?=URL?>/agenda/age_categoria/age_categoria.php" title="Agenda">
      <img src="<?=URL?>/img/banners_menu_interativo/agenda.jpg" alt="Agenda de Eventos" title="Agenda de Eventos" />
    </a>
</div>

<div id="servicos">
    <h2>OUTROS SERVIÇOS</h2>
    <div id="banner_transitorio">
		<? @include("banner_transitorio/banner_transitorio.php"); ?>
    </div>
</div>
<!--
<div id="tempo">
    <h2>CLIMA</h2>
    <a href="http://www.climatempo.com.br/previsao-do-tempo/cidade/458/itapecericadaserra-sp" target="_blank" title="Previsão do Tempo">
      <img src="<?URL?>/img/banners_menu_interativo/previsao_tempo.jpg" alt="Previsão do Tempo" title="Previsão do Tempo" />
    </a>
</div>
-->

<div id="localiza">
    <h2>LOCALIZAÇĂO</h2>
    <a href="http://migre.me/nkoO" target="_blank" title="Mapa de Localizaçăo">
      <img src="<?=URL?>/img/banners_menu_interativo/banner_mapa.jpg" alt="Banner com Mapa de Localização" title="Mapa de Localizaçăo" />
    </a>
</div>
