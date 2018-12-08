var url = require('url');

exports.generatePaginationHttpHeaders = function (res, result) {
    // result.docs
    // result.total
    // result.limit - 10
    // result.offset - 20
    res.header('X-Total-Count', result.total);


};

exports.createPaging = function (req, res, next) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    req.paging = {};
    //{ field: 'asc', test: -1 }
    // ["score, asc","id"]
    query["size"] && (req.paging["limit"] = Number(query["size"]));
    query["page"] && (req.paging["page"] = Number(query["page"])+1);
    query["sort"] && (req.paging["sort"] = query["sort"]);
    next();
};

/*public static <T> HttpHeaders generatePaginationHttpHeaders(Page<T> page, String baseUrl) {

    HttpHeaders headers = new HttpHeaders();
    headers.add("X-Total-Count", Long.toString(page.getTotalElements()));
    String link = "";
    if ((page.getNumber() + 1) < page.getTotalPages()) {
        link = "<" + generateUri(baseUrl, page.getNumber() + 1, page.getSize()) + ">; rel=\"next\",";
    }
    // prev link
    if ((page.getNumber()) > 0) {
        link += "<" + generateUri(baseUrl, page.getNumber() - 1, page.getSize()) + ">; rel=\"prev\",";
    }
    // last and first link
    int lastPage = 0;
    if (page.getTotalPages() > 0) {
        lastPage = page.getTotalPages() - 1;
    }
    link += "<" + generateUri(baseUrl, lastPage, page.getSize()) + ">; rel=\"last\",";
    link += "<" + generateUri(baseUrl, 0, page.getSize()) + ">; rel=\"first\"";
    headers.add(HttpHeaders.LINK, link);
    return headers;
}
*/