<?php

$CEP = $_GET['cep'];

$xml = <<<XML
<?xml version="1.0" encoding="utf-8" ?><s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'><s:Body><Query xmlns='urn:Microsoft.Search'><queryXml xsi:type='xsd:string'>&lt;QueryPacket xmlns=&#39;urn:Microsoft.Search.Query&#39; revision=&#39;1&#39; build=&#39;(11.0.6360)&#39; &gt;&lt;Query domain=&#39;{2698075D-E2F5-4254-87B2-7FC9E9AB0780}&#39;&gt;&lt;QueryId&gt;{319A129A-014F-4A1B-9AC5-DA2DBFC62B7A}&lt;/QueryId&gt;&lt;OriginatorId&gt;{F6FF7BE0-F39C-4ddc-A7D0-09A4C6C647A5}&lt;/OriginatorId&gt;&lt;SupportedFormats&gt;&lt;Format revision=&#39;1&#39;&gt;urn:Microsoft.Search.Response.Document:Document&lt;/Format&gt;&lt;Format revision=&#39;1&#39;&gt;urn:Microsoft.Search.Response.Content:Content&lt;/Format&gt;&lt;Format revision=&#39;1&#39;&gt;urn:Microsoft.Search.Response.Form:Form&lt;/Format&gt;&lt;/SupportedFormats&gt;&lt;Context&gt;&lt;QueryText type=&#39;STRING&#39; language=&#39;pt-br&#39; &gt;$CEP&lt;/QueryText&gt;&lt;LanguagePreference&gt;pt-br&lt;/LanguagePreference&gt;&lt;Requery&gt;&lt;/Requery&gt;&lt;/Context&gt;&lt;Range id=&#39;result&#39;&gt;&lt;/Range&gt;&lt;OfficeContext xmlns=&#39;urn:Microsoft.Search.Query.Office.Context&#39; revision=&#39;1&#39;&gt;&lt;UserPreferences&gt;&lt;ParentalControl&gt;false&lt;/ParentalControl&gt;&lt;/UserPreferences&gt;&lt;ServiceData&gt;&lt;/ServiceData&gt;&lt;ApplicationContext&gt;&lt;Name&gt;Microsoft Office Word&lt;/Name&gt;&lt;Version&gt;(11.0.6360)&lt;/Version&gt;&lt;SystemInformation&gt;&lt;SkuLanguage&gt;pt-br&lt;/SkuLanguage&gt;&lt;LanguagePack&gt;pt-br&lt;/LanguagePack&gt;&lt;InterfaceLanguage&gt;pt-br&lt;/InterfaceLanguage&gt;&lt;Location&gt;BR&lt;/Location&gt;&lt;/SystemInformation&gt;&lt;/ApplicationContext&gt;&lt;QueryLanguage&gt;pt-br&lt;/QueryLanguage&gt;&lt;KeyboardLanguage&gt;pt-br&lt;/KeyboardLanguage&gt;&lt;/OfficeContext&gt;&lt;Keywords xmlns=&#39;urn:Microsoft.Search.Query.Office.Keywords&#39; revision=&#39;1&#39;&gt;&lt;QueryText&gt;90610-270&lt;/QueryText&gt;&lt;Keyword&gt;&lt;AltWord&gt;90610&lt;/AltWord&gt;&lt;/Keyword&gt;&lt;Keyword&gt;&lt;Word&gt;90610&lt;/Word&gt;&lt;/Keyword&gt;&lt;Keyword&gt;&lt;AltWord&gt;270&lt;/AltWord&gt;&lt;/Keyword&gt;&lt;Keyword&gt;&lt;Word&gt;270&lt;/Word&gt;&lt;/Keyword&gt;&lt;/Keywords&gt;&lt;/Query&gt;&lt;/QueryPacket&gt;</queryXml></Query></s:Body></s:Envelope>
XML;

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'http://consultacep.correios.com.br/office2003/Query.asmx?WSDL');
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: text/xml; charset=utf-8',
                                           'SOAPAction: "urn:Microsoft.Search/Query"',
                                           'Host: consultacep.correios.com.br'));
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$xmlResponse = html_entity_decode(curl_exec($ch));

if (!preg_match('/\/><P>(?!<)([^<]+)<\/P>(?><P>(?!\d)([^<]+)<\/P><P>([^<]+)<\/P>)?/', $xmlResponse, $matches))
{

}
elseif (count($matches) == 2)
{
    list(, $cidade) = $matches;

    printf('<response><cidade>%s</cidade></response>', $cidade);
}
else
{
    list(, $rua, $bairro, $cidade) = $matches;

    $rua = utf8_decode($rua);
    $bairro = utf8_decode($bairro);
    $cidade = utf8_decode($cidade);

    $rua = $rua;
    $rua = trim($rua);
    $rua = explode("-", $rua);
    $rua = $rua[0];

    $cidade = $cidade;
	$cidade = trim($cidade);
	$cidade = explode("-", $cidade);
	$localidade = $cidade[0];

	$uf = trim($cidade[1]);

	header("Content-type: text/plain");
    echo urlencode($rua) . ":" . urlencode($bairro) . ":" . urlencode($localidade) . ":" . $uf . ";";

}

?>