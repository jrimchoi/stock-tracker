function FindProxyForURL(url, host) {
    var myIP = myIpAddress();

    // ★ 고객사(GS Caltex) 내부에 있을 때만 작동
    if (myIP.indexOf("203.245.73.") === 0) {

        // 1. 고객사 내부 모든 망은 무조건 DIRECT
        var resolved = dnsResolve(host);
        if (resolved && 
            (isInNet(resolved, "203.245.0.0", "255.255.0.0") ||   // 고객사 전체
             isInNet(resolved, "10.0.0.0", "255.0.0.0") ||        // 사설망
             isInNet(resolved, "172.16.0.0", "255.240.0.0") ||    // 사설망
             isInNet(resolved, "192.168.0.0", "255.255.0.0"))) { // 사설망
            return "DIRECT";
        }

        // 2. MS 관련 도메인도 무조건 DIRECT (업데이트/오피스 때문에 필수)
        if (shExpMatch(host, "*microsoft.com") ||
            shExpMatch(host, "*windowsupdate.com") ||
            shExpMatch(host, "*office.com") ||
            shExpMatch(host, "*office365.com") ||
            shExpMatch(host, "*live.com") ||
            shExpMatch(host, "*sharepoint.com") ||
            shExpMatch(host, "*outlook.com") ||
            shExpMatch(host, "*onedrive.com") ||
            shExpMatch(host, "*msteams.com")) {
            return "DIRECT";
        }

        // 3. 그 외 모든 트래픽 → 집으로 터널
        return "SOCKS5 127.0.0.1:11000";
    }

    // 고객사가 아니면 PAC 무시 (기본 인터넷 그대로)
    return "DIRECT";
}
