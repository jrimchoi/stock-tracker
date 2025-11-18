function FindProxyRequest(host, url) {
    
    // 내부망 IP 대역은 프록시 안 태우고 직접 연결
    if (isInNet(host, "203.254.0.0", "255.255.0.0") ||
        isInNet(host, "192.168.0.0", "255.255.0.0") ||
        isInNet(host, "10.0.0.0", "255.0.0.0") ||
        isInNet(host, "172.16.0.0", "255.240.0.0") ||
        shExpMatch(host, "*.local") ||
        shExpMatch(host, "localhost") ||
        host == "127.0.0.1") {
        return "DIRECT";
    }

    // 나머지는 모두 당신 집 프록시로
    return "PROXY jrimchoi.iptime.org:2808";
}
