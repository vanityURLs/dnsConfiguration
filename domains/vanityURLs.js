D('vanityurls.link', REG_NONE, DnsProvider(cloudFlare), DISABLE_IGNORE_SAFETY_CHECK,
//    Those records are managed by CloudFlare Email Routing
//    MX('@', 32, 'route1.mx.cloudflare.net.'),
//    MX('@', 82, 'route2.mx.cloudflare.net.'), 
//    MX('@', 23, 'route3.mx.cloudflare.net.'), 
//    TXT('@','v=spf1 include:_spf.mx.cloudflare.net ~all'),
    IGNORE_NAME("@"),
    TXT('*._domainkey', "v=DKIM1; p="), // absence of a selector / public key (e.g. as a result of deleting the entire DKIM resource record) is semantically equal to a resource record with an empty public key
    TXT('_dmarc', "v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s;"),
    TXT('_mta-sts', " v=STSv1; id=20220101000000Z;"),
    ALIAS('mta-sts','mta-sts-vanityurls-link.pages.dev.',  cfProxy),
    TXT('_github-pages-challenge-vanityURLs','190fe223ffbdc9a230854700615524'),

    AAAA("git", '2001:DB8::1', cfProxy),
    CF_TEMP_REDIRECT("git.vanityurls.link/*", "https://github.com/vanityURLs/$1"),
    AAAA("code", '2001:DB8::1', cfProxy),
    CF_TEMP_REDIRECT("code.vanityurls.link/*", "https://github.com/vanityURLs/website/$1"),
    AAAA("web", '2001:DB8::1', cfProxy),
    CF_TEMP_REDIRECT("web.vanityurls.link/*", "https://github.com/vanityURLs/website/$1")
    
);

D('v8s.link', REG_NONE, DnsProvider(cloudFlare), DISABLE_IGNORE_SAFETY_CHECK,
//    Those records are managed by CloudFlare Email Routing
//    MX('@', 13, 'route1.mx.cloudflare.net.'),
//    MX('@', 47, 'route2.mx.cloudflare.net.'), 
//    MX('@', 82, 'route3.mx.cloudflare.net.'), 
//    TXT('@','v=spf1 include:_spf.mx.cloudflare.net ~all'),
    IGNORE_NAME("@"),
    TXT('*._domainkey', "v=DKIM1; p="), // absence of a selector / public key (e.g. as a result of deleting the entire DKIM resource record) is semantically equal to a resource record with an empty public key
    TXT('_dmarc', "v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s;"),
    TXT('_mta-sts', " v=STSv1; id=20220101000000Z;"),
    ALIAS('mta-sts','mta-sts-v8s-link.pages.dev.',  cfProxy),
    TXT('_github-pages-challenge-vanityURLs','c5061048e2ccff690543a0ec9c67cf'),

    AAAA("git", '2001:DB8::1', cfProxy),
    CF_TEMP_REDIRECT("git.v8s.link/*", "https://github.com/vanityURLs/$1")
//     AAAA("code", '2001:DB8::1', cfProxy),
//     CF_TEMP_REDIRECT("code.v8s.link/*", "https://github.com/vanityURLs/website/$1"),
//     AAAA("web", '2001:DB8::1', cfProxy),
//     CF_TEMP_REDIRECT("web.v8s.link/*", "https://github.com/vanityURLs/website/$1")
);

//    Those records are managed by CloudFlare Email Routing