function ajax(url)
{
req = null;
if (window.XMLHttpRequest)
{
req = new XMLHttpRequest();
req.onreadystatechange = processReqChange;
req.open("GET",url,true);
req.send(null);
}
else if (window.ActiveXObject)
{
req = new ActiveXObject("Microsoft.XMLHTTP");
if (req)
{
req.onreadystatechange = processReqChange;
req.open("GET",url,true);
req.send();
}
}
}

function processReqChange()
{
if (req.readyState == 4)
{
if (req.status ==200)
{
document.getElementById('pagina').innerHTML = req.responseText;
}
else
{
alert("Houve um problema ao obter os dados:n" + req.statusText);
}
}
}