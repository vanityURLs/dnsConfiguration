D('vanityurls.link', REG_NONE, DnsProvider(cloudFlare),
    MX('@', 0, '.'), // RFC 7505
    TXT('@','v=spf1 -all'),
    TXT('*._domainkey', "v=DKIM1; p="), // absence of a selector / public key (e.g. as a result of deleting the entire DKIM resource record) is semantically equal to a resource record with an empty public key
    TXT('_dmarc', "v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s;"),
    TXT('_github-pages-challenge-vanityURLs','190fe223ffbdc9a230854700615524')
);

D('v8s.link', REG_NONE, DnsProvider(cloudFlare),
    MX('@', 0, '.'), // RFC 7505
    TXT('@','v=spf1 -all'),
    TXT('*._domainkey', "v=DKIM1; p="), // absence of a selector / public key (e.g. as a result of deleting the entire DKIM resource record) is semantically equal to a resource record with an empty public key
    TXT('_dmarc', "v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s;"),
    TXT('_github-pages-challenge-v8s','190fe223ffbdc9a230854700615524')
);
