(function() {
    var _id="1a0b604504da62bccf8beaee9e7a1a65";
    while(document.getElementById("timer"+_id))_id=_id+"0";
    document.write("<div id='timer"+_id+"' style='min-width:227px;height:44px;'></div>");
    var _t=document.createElement("script");
    _t.src="/html/js/timers.min.js";
    var _f=function(_k) {
        var l=new MegaTimer(_id, {
            "view":[1, 1, 1, 1], "type": {
                "currentType":"1", "params": {
                    "usertime": true, "tz": "3", "utc": 1479168012000
                }
            }
            , "design": {
                "type":"circle", "params": {
                    "width":"2", "radius":"19", "line":"solid", "line-color":"#4b84c3", "background":"solid", "background-color":"#cccccc", "direction":"direct", "number-font-family": {
                        "family": "Open Sans", "link": "<link href='https://fonts.googleapis.com/css?family=Open+Sans&subset=latin,cyrillic' rel='stylesheet' type='text/css'>"
                    }
                    , "number-font-size":"18", "number-font-color":"#1d75b7", "separator-margin":"6", "separator-on":true, "separator-text":":", "text-on":false, "text-font-family": {
                        "family": "Open Sans", "link": "<link href='https://fonts.googleapis.com/css?family=Open+Sans&subset=latin,cyrillic' rel='stylesheet' type='text/css'>"
                    }
                    , "text-font-size":"12", "text-font-color":"#4b84c3"
                }
            }
            , "designId":7, "theme":"white", "width":227, "height":44
        }
        );
        if(_k!=null)l.run();
    }
    ;
    _t.onload=_f;
    _t.onreadystatechange=function() {
        if(_t.readyState=="loaded")_f(1);
    }
    ;
    var _h=document.head||document.getElementsByTagName("head")[0];
    _h.appendChild(_t);
}

).call(this);