function FindProxyForURL(url, host) {
    var myIP = myIpAddress();
    var targetIP = dnsResolve(host);

    // 1. 고객사(203.254.x.x) 내부에 있을 때
    if (myIP.indexOf("203.245.") === 0) {
        // 고객사 내부망(203.245.0.0/16, 172.16.0.0/12 등)은 무조건 DIRECT
        if (isInNet(targetIP, "203.245.0.0", "255.255.0.0") ||
            isInNet(targetIP, "172.16.0.0", "255.240.0.0") ||
            isInNet(targetIP, "10.0.0.0", "255.0.0.0") ||
            isInNet(targetIP, "192.168.0.0", "255.255.0.0")) {
            return "DIRECT";
        }
    }

    // 2. 회사 내부에 있을 때 (203.235.x.x 등 당신 회사 대역 추가)
    if (myIP.indexOf("203.245.") === 0 || 
        myIP.indexOf("10.") === 0 || 
        myIP.indexOf("192.168.") === 0) {
        // 동일하게 사내 모든 망은 DIRECT
        if (isInNet(targetIP, "203.245.0.0", "255.255.0.0") ||
            isInNet(targetIP, "10.0.0.0", "255.0.0.0") ||
            isInNet(targetIP, "192.168.0.0", "255.255.0.0") ||
            isInNet(targetIP, "172.16.0.0", "255.240.0.0")) {
            return "DIRECT";
        }
    }

    // 3. MS 오피스/윈도우 업데이트 등은 무조건 DIRECT
    if (shExpMatch(host, "*microsoft.com") ||
        shExpMatch(host, "*microsoftonline.com") ||
        shExpMatch(host, "*windows.net") ||
        shExpMatch(host, "*office.com") ||
        shExpMatch(host, "*office365.com") ||
        shExpMatch(host, "*live.com") ||
        shExpMatch(host, "*sharepoint.com") ||
        shExpMatch(host, "*outlook.com") ||
        shExpMatch(host, "*onedrive.com") ||
        shExpMatch(host, "*msteams.com")) {
        return "DIRECT";
    }

    // 4. 그 외 모든 트래픽 → 집 SOCKS5 터널
    return "SOCKS5 127.0.0.1:11000";
    // 또는 return "SOCKS 127.0.0.1:11000"; 도 됨
}
