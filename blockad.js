/*
Hualongxiang block ad

[rewrite_local]
^https?://qfapi.hualongxiang.com/v5_0/home/index url script-response-body https://gist.githubusercontent.com/sunwenjun/46daca46d294816d83148984f7970d0f/raw/a5b23c91179f18d92efc10fce23c51ebdc83489a/blockad.js
[mitm]
hostname = *.hualongxiang.com
 */

const path1 = "/home/index";

const url = $request.url;
let body = $response.body;

if (
    url.indexOf(path1) != -1
) {
    let obj = JSON.parse(body);
    if (obj.data.feed) obj.data.feed = filter_timeline_feeds(obj.data.feed);
    body = JSON.stringify(obj);
} 

$done({ body });

function filter_timeline_feeds(feeds) {
    if (feeds && feeds.length > 0) {
        let i = feeds.length;
        while (i--) {
            let element = feeds[i];
            if (element.type != 113) {
                feeds.splice(i, 1);
            }
            let advert_id = element.advert_id;
            if (advert_id && advert_id != 0) {
                feeds.splice(i, 1);
            }
        }
    }
    return feeds;
}
