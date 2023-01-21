var fs = require("fs");

exports.getClientData = function(pathname) {
    if (pathname == "getimages") {
        var imageList = fs.readdirSync("images/");
        return imageList.toString();
    }

    return "";
}

http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname.substring(1);
    console.log("Request for " + pathname + " received.");
    var ext = pathname.substring(pathname.indexOf(".") + 1);

    if (ext == pathname) {
        response.end(client.getClientData(pathname));
    }
    else {
        fs.readFile(pathname, function(err, data) {
            var contentType = content.getFileTypeObject(ext);
            console.log("File type is " + contentType.type + "/" + contentType.extension);
        })

        if (err) {
            console.log(err);
            response.writeHead(404, {"Content-Type": contentType.type + "/" + contentType.extension});
        }
        else {
            response.writeHead(404, {"Content-Type": contentType.type + "/" + contentType.extension});

            if (contentType.type != "text") {
                response.write(data, "binary");
            }
            else {
                response.write(data.toString());
            }
        }
        response.end();
    }
})