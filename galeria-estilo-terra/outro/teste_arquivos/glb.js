function MatchIdVideo(urlVideo){
    var re = new RegExp(".*[A-Z]{3}(\\d+)-.*");
    var f = re.exec(urlVideo);

    return (f) ? f[1] : "";
}
