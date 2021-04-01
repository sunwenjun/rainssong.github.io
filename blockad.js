/*
xx block ad

[rewrite_local]
^https?://qfapi.xx.com/v5_0/home/index url script-response-body https://gist.githubusercontent.com//46daca46d294816d83148984f7970d0f/raw//blockad.js
[mitm]
hostname = *.xx.com
 */

const path1 = "/home/index";

const url = $request.url;
let body = $response.body;

if (
    url.indexOf(path1) != -1
) {
    let obj = JSON.parse(body);
    if (obj.data.feed) obj.data.feed = filter_timeline_feeds(obj.data.feed);
    if (obj.data.head.data.items) obj.data.head.data.items = filter_timeline_head(obj.data.head.data.items);
    body = JSON.stringify(obj);
} 

$done({ body });


function filter_timeline_head(heads) {
    if (heads && heads.length > 0) {
        let i = heads.length;
        while (i--) {
            let element = heads[i];
            if (element.advert_show && element.data.advert_show > 0) {
                heads.splice(i, 1);
                continue;
            }
        }
    }
    return heads;
}

function filter_timeline_feeds(feeds) {
    if (feeds && feeds.length > 0) {
        let i = feeds.length;
        while (i--) {
            let element = feeds[i];
            if (element.type != 113) {
                feeds.splice(i, 1);
                continue;
            }
            if (element.data && element.data.advert_id > 0) {
                feeds.splice(i, 1);
                continue;
            }
        }
    }
    return feeds;
}
