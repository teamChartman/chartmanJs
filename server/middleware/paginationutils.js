var url = require('url');
var buildUrl = require('build-url');


exports.generatePaginationHttpHeaders = function (req, res, result) {
    // result.docs
    // result.total
    // result.limit - 10
    // result.offset - 20
    // const reqUrl = url.parse(req.baseUrl).pathname;
    // console.log('the request is ', reqUrl);
    let baseUrl = (req.secure ? 'http://' : 'http://') + req.headers.host + url.parse(req.baseUrl).pathname;
    let total = result.total;
    let pageSize = req.paging["limit"];
    let totalPages = Math.ceil(result.total / pageSize);
    let pageNumber = req.paging["page"];
    let link = "";
    if ((pageNumber + 1) < totalPages) {
        link = "<" + generateUri(baseUrl, pageNumber + 1, pageSize) + ">; rel=\"next\",";
    }
    // prev link
    if ((pageNumber) > 0) {
        link += "<" + generateUri(baseUrl, pageNumber - 1, pageSize) + ">; rel=\"prev\",";
    }
    // last and first link
    let lastPage = 0;
    if (totalPages > 0) {
        lastPage = totalPages - 1;
    }
    link += "<" + generateUri(baseUrl, lastPage, pageSize) + ">; rel=\"last\",";
    link += "<" + generateUri(baseUrl, 0, pageSize) + ">; rel=\"first\"";
    res.header('Link', link);
    res.header('X-Total-Count', total);
    return res.headers;

    function generateUri(baseUrl, page, size) {
        return buildUrl(baseUrl, {
            queryParams: {
                page: page,
                size: size
            }
        });
    }

};

exports.createPaging = function (req, res, next) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    req.paging = {};
    query["size"] && (req.paging["limit"] = Number(query["size"]));
    query["page"] && (req.paging["page"] = Number(query["page"]) + 1);
    query["sort"] && (req.paging["sort"] = (function () {
        return (typeof (query["sort"]) === "string" ? [query["sort"]] : query["sort"]).map(element => {
            let sorting = element.split(",");
            if (sorting[1] == 'asc')
                return sorting[0];
            return '-' + sorting[0];
        }).join(' ');
    })());
    next();
};

/*public static <T> HttpHeaders generatePaginationHttpHeaders(Page<T> page, String baseUrl) {

    HttpHeaders headers = new HttpHeaders();
    headers.add("X-Total-Count", Long.toString(page.getTotalElements()));
    String link = "";
    if ((pageNumber + 1) < page.getTotalPages()) {
        link = "<" + generateUri(baseUrl, pageNumber + 1, pageSize) + ">; rel=\"next\",";
    }
    // prev link
    if ((pageNumber) > 0) {
        link += "<" + generateUri(baseUrl, pageNumber - 1, pageSize) + ">; rel=\"prev\",";
    }
    // last and first link
    int lastPage = 0;
    if (page.getTotalPages() > 0) {
        lastPage = page.getTotalPages() - 1;
    }
    link += "<" + generateUri(baseUrl, lastPage, pageSize) + ">; rel=\"last\",";
    link += "<" + generateUri(baseUrl, 0, pageSize) + ">; rel=\"first\"";
    headers.add(HttpHeaders.LINK, link);
    return headers;
}
*/