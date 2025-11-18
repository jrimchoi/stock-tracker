function FindProxyRequest(host, url) {
    var myIP = myIpAddress();
    var targetIP = dnsResolve(host);

    // 현재 PC가 203.254 대역이면 → 고객사라고 판단
    if (myIP.indexOf("203.254.") === 0) {
        // 고객사 내부 모든 망은 무조건 DIRECT
        if (isInNet(targetIP, "203.254.0.0", "255.255.0.0") ||
            isInNet(targetIP, "172.16.0.0", "255.240.0.0") ||
            isInNet(targetIP, "10.0.0.0", "255.0.0.0") ||
            isInNet(targetIP, "192.168.0.0", "255.255.0.0")) {
            return "DIRECT";
        }
    }

    // 그 외는 집 프록시
    return "PROXY jrimchoi.iptime.org:2808";
}
