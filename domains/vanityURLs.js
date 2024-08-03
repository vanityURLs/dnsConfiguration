D('vanityurls.link', REG_NONE, DnsProvider(cloudFlare),
    MX('@', 32, 'route1.mx.cloudflare.net.'),
    MX('@', 82, 'route2.mx.cloudflare.net.'), 
    MX('@', 23, 'route3.mx.cloudflare.net.'), 
    TXT('@','v=spf1 include:_spf.mx.cloudflare.net ~all'),
    TXT('*._domainkey', "v=DKIM1; p="), // absence of a selector / public key (e.g. as a result of deleting the entire DKIM resource record) is semantically equal to a resource record with an empty public key
    TXT('_dmarc', "v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s;"),
    TXT('_github-pages-challenge-vanityURLs','190fe223ffbdc9a230854700615524')
);

D('v8s.link', REG_NONE, DnsProvider(cloudFlare),
    MX('@', 0, '.'), // RFC 7505
    TXT('@','v=spf1 -all'),
    TXT('*._domainkey', "v=DKIM1; p="), // absence of a selector / public key (e.g. as a result of deleting the entire DKIM resource record) is semantically equal to a resource record with an empty public key
    TXT('_dmarc', "v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s;"),
    TXT('_github-pages-challenge-vanityURLs','c5061048e2ccff690543a0ec9c67cf')
);

