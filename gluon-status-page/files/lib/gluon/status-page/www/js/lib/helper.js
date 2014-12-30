"use strict";
define(function () {
  function get(url) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.onload = function() {
        if (req.status == 200) {
          resolve(req.response);
        }
        else {
          reject(Error(req.statusText));
        }
      };

      req.onerror = function() {
        reject(Error("Network Error"));
      };

      req.send();
    });
  }

  function getJSON(url) {
    return get(url).then(JSON.parse);
  }

  function buildUrl(ip, object, param) {
    var url = "http://[" + ip + "]/cgi-bin/" + object;
    if (param) url += "?" + param;

    return url;
  }

  function request(ip, object, param) {
    return getJSON(buildUrl(ip, object, param));
  }

  function dictGet(dict, key) {
    var k = key.shift();

    if (!(k in dict))
      return null;

    if (key.length == 0)
      return dict[k];

    return dictGet(dict[k], key);
  }

  return { buildUrl: buildUrl
         , request: request
         , getJSON: getJSON
         , dictGet: dictGet
         }
})
