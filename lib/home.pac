function FindProxyForURL(url, host) {
    var myIP = myIpAddress();

    // 당신 PC가 GS Caltex 고객사 내부에 있을 때만 작동
    if (myIP === "203.245.73.228") {

        var ip = dnsResolve(host);

        // 1. 내부망은 무조건 DIRECT
        if (ip && (
            ip.indexOf("203.245.") === 0 ||     // GS Caltex 공인/사내 대역
            ip.indexOf("172.16.") === 0 ||      // ← 여기 추가
            ip.indexOf("172.17.") === 0 ||
            ip.indexOf("172.18.") === 0 ||
            ip.indexOf("172.19.") === 0 ||
            ip.indexOf("172.20.") === 0 ||
            ip.indexOf("172.21.") === 0 ||
            ip.indexOf("172.22.") === 0 ||
            ip.indexOf("172.23.") === 0 ||
            ip.indexOf("172.24.") === 0 ||
            ip.indexOf("172.25.") === 0 ||
            ip.indexOf("172.26.") === 0 ||
            ip.indexOf("172.27.") === 0 ||
            ip.indexOf("172.28.") === 0 ||
            ip.indexOf("172.29.") === 0 ||
            ip.indexOf("172.30.") === 0 ||
            ip.indexOf("172.31.") === 0)) {
            return "DIRECT";
        }

        // 2. MS/오피스 도메인도 무조건 DIRECT
        if (shExpMatch(host, "*microsoft.com") ||
            shExpMatch(host, "*office.com") ||
            shExpMatch(host, "*sharepoint.com") ||
            shExpMatch(host, "*outlook.com") ||
            shExpMatch(host, "*onedrive.com") ||
            shExpMatch(host, "*msteams.com") ||
            shExpMatch(host, "*live.com")) {
            return "DIRECT";
        }

        // 3. 나머지는 모두 집 터널
        return "SOCKS5 127.0.0.1:11000";
    }

    // 고객사 아니면 그냥 DIRECT
    return "DIRECT";
}
