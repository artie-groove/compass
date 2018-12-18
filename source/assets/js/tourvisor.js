(function ()
{
    if (!(window.TV && window.TV.Core))
    {
        if (!window.TVCoreLoad)
        {
            window.TVAssets = {
                country: 'country.9ed61a3d6a2283957feb.js',
                geo: 'geo.0787719c530edcbf4103.js',
                mobile: 'mobile.a55ee3d5ff35221f6b5e.js',
                searchform: 'searchform.d7fece770a7ccdda2727.js',
                stours: 'stours.ae9423dfa0657279125c.js',
                calendar: 'calendar.ca4798080bd710fd2daf.js',
                minprice: 'minprice.c44a05ee45d41f16eec7.js',
                slider: 'slider.aa6d718903039fd277e3.js',
                hot: 'hot.d9a4c1bf9be2da931842.js',
                core: 'core.76a4d194f3eadac8e209.js'
            };

            var tourvisorfindGET = function (name, search)
            {
                var result = false,
                    tmp = [];
                search = search !== undefined ? search : location.search;

                search
                    .substr(1)
                    .split('&')
                    .forEach(function (item)
                    {
                        tmp = item.split('=');
                        if (tmp[0] === name) result = decodeURIComponent(tmp[1]);
                    });
                return result;
            };

            window.TVCoreLoad = true;

            var js = document.createElement('script'),
                head = document.head || document.getElementsByTagName('head')[0],
                root = "//tourvisor.ru/module/newform/modules/";

            if (tourvisorfindGET('tvtest') == 'ok') {
                root = root.replace('modules', 'modules-test');

                for(var k in window.TVAssets) {
                    window.TVAssets[k] = window.TVAssets[k].replace(/\.([\S]){20}/, '.min');
                }
            }

            js.setAttribute('type', 'text/javascript');
            js.setAttribute('charset', 'utf-8');
            js.setAttribute('src', root + window.TVAssets.core);
            head.insertBefore(js, head.firstChild);

            if (js.onload === null)
            {
                js.onload = function ()
                {
                    TV.loadModules();
                };
            }
            else
            {
                js.onreadystatechange = function ()
                {
                    if (this.readyState == 'complete')
                    {
                        TV.loadModules();
                    }
                };
            }
        }
    }
    else
    {
        TV.loadModules();
    }
})();
