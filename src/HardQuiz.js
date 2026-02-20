import React, { useState, useEffect } from 'react';
import {
    ShieldAlert,
    Globe,
    Settings,
    RefreshCcw,
    Trophy,
    ChevronRight,
    Database,
    Search,
    Server,
    ArrowLeft
} from 'lucide-react';

const dnsQuizData = [
    // --- BIND9 CONFIGURATION & SYNTAX ---
    {
        id: 1,
        category: "BIND9 Syntax",
        question: "In the BIND9 'named.conf.local' file, you define a reverse zone for the network 172.16.50.0/24. What is the correct zone string format?",
        options: [
            "zone \"172.16.50.in-addr.arpa\"",
            "zone \"50.16.172.in-addr.arpa\"",
            "zone \"0.50.16.172.rev\"",
            "zone \"172.16.50.reverse\""
        ],
        answer: 1,
        explanation: "Reverse zones must have their network octets reversed and end with '.in-addr.arpa'. For 172.16.50.x, it becomes 50.16.172.in-addr.arpa."
    },
    {
        id: 2,
        category: "BIND9 Syntax",
        question: "You've updated a zone file but forgot to increment the 'Serial' number in the SOA record. What is the primary consequence in a Master/Slave (Secondary) setup?",
        options: [
            "The Master server will crash upon service restart.",
            "Slave servers will not pull the updated zone data because they think the data hasn't changed.",
            "DNSSEC signatures will immediately expire.",
            "The TTL for all records in the zone will be reset to 0."
        ],
        answer: 1,
        explanation: "Slave servers compare their local serial number with the Master's. If the Master's serial isn't higher, the Slave assumes its data is current and won't initiate a zone transfer."
    },
    {
        id: 3,
        category: "BIND9 Syntax",
        question: "Within a BIND9 zone file, which directive is used to set the default time-to-live for all subsequent records that do not have an explicit TTL defined?",
        options: ["$ORIGIN", "$DEFAULT_TTL", "$TTL", "$TIME"],
        answer: 2,
        explanation: "The $TTL directive (e.g., $TTL 1D) sets the global default for the entire file."
    },
    {
        id: 4,
        category: "Records",
        question: "An MX record with a priority of 10 and another with a priority of 20 exist for the same domain. Which server will an external Mail Transfer Agent (MTA) attempt to deliver to first?",
        options: [
            "The server with priority 20 (Higher is better)",
            "The server with priority 10 (Lower is better)",
            "It will load balance randomly between both",
            "It depends on the alphabetical order of the hostnames"
        ],
        answer: 1,
        explanation: "In DNS MX records, a lower preference value indicates a higher priority."
    },
    {
        id: 5,
        category: "BIND9 Configuration",
        question: "You want to hide the BIND version for security purposes. In which file and block should the 'version \"Not disclosed\";' directive be placed?",
        options: [
            "named.conf.local inside a zone block",
            "named.conf.options inside the options block",
            "db.local inside the SOA record",
            "/etc/default/bind9 as an environment variable"
        ],
        answer: 1,
        explanation: "Global security behaviors like hiding versions or defining forwarders belong in the 'options' block of 'named.conf.options'."
    },
    {
        id: 6,
        category: "Theory",
        question: "A client's resolver sends a query to its ISP's DNS server. The ISP server does not know the answer, so it queries the Root, then the TLD, and finally the Authoritative server to get the answer for the client. What type of query did the CLIENT initiate?",
        options: ["Iterative Query", "Recursive Query", "Reverse Query", "Inverse Query"],
        answer: 1,
        explanation: "The client asks for a final answer (Recursive). The ISP server then performs multiple Iterative queries to find that answer."
    },
    {
        id: 7,
        category: "Windows DNS",
        question: "On Windows Server 2016, you create a zone and choose 'Do not allow dynamic updates'. What is the administrative impact of this choice?",
        options: [
            "Clients will be unable to resolve any names in this zone.",
            "The server will not allow DHCP to automatically register or update A records for clients.",
            "The server will stop forwarding queries to external DNS servers.",
            "The zone will be deleted after 24 hours of inactivity."
        ],
        answer: 1,
        explanation: "Disabling dynamic updates forces administrators to manually create every A and PTR record; devices cannot register themselves."
    },
    {
        id: 8,
        category: "Records",
        question: "What is the specific purpose of a 'Glue Record'?",
        options: [
            "To prevent CNAME loops",
            "To provide the IP address of a Name Server when that Name Server is a subdomain of the zone it is managing",
            "To bind an IPv4 address and an IPv6 address to the same hostname",
            "To encrypt zone transfers between Master and Slave"
        ],
        answer: 1,
        explanation: "Glue records are 'A' records for name servers (e.g., ns1.example.com) that reside within the same domain (example.com) to prevent a circular dependency during resolution."
    },
    {
        id: 9,
        category: "BIND9 Troubleshooting",
        question: "Which command-line tool is used specifically to verify the syntax of the main BIND configuration files (not the zone files)?",
        options: ["named-checkzone", "named-checkconf", "bind-syntax-check", "dig -z"],
        answer: 1,
        explanation: "named-checkconf is used for config files; named-checkzone is for zone/database files."
    },
    {
        id: 10,
        category: "Theory",
        question: "In the SOA record, what does the 'Refresh' interval define?",
        options: [
            "How often the Master pushes updates to Slaves.",
            "How often a Slave server checks the Master's serial number for updates.",
            "How long a client caches a successful query.",
            "The time a browser waits before refreshing a webpage if DNS fails."
        ],
        answer: 1,
        explanation: "Refresh is used by secondary (slave) servers to determine when to poll the primary (master) for changes."
    },
    {
        id: 11,
        category: "Records",
        question: "Which record type is used to verify domain ownership for third-party services like Google Workspace or for setting up SPF/DKIM security policies?",
        options: ["CNAME", "PTR", "TXT", "SOA"],
        answer: 2,
        explanation: "TXT records are used to hold arbitrary text, often utilized for security and ownership verification."
    },
    {
        id: 12,
        category: "BIND9 Configuration",
        question: "By default, BIND9 listens for queries on which port and protocol?",
        options: ["Port 53 / TCP only", "Port 53 / UDP and TCP", "Port 80 / UDP", "Port 443 / TCP"],
        answer: 1,
        explanation: "DNS uses UDP 53 for standard queries and TCP 53 for large responses and zone transfers."
    },
    {
        id: 13,
        category: "Advanced Records",
        question: "What is the difference between an A record and a CNAME record in terms of 'additional lookups'?",
        options: [
            "A records require an extra lookup for the IP.",
            "CNAME records require the resolver to perform a second lookup to find the IP of the alias target.",
            "There is no difference in performance.",
            "A records are only for IPv6."
        ],
        answer: 1,
        explanation: "A CNAME just points to another name; the resolver must then perform a separate lookup for that target's A record."
    },
    {
        id: 14,
        category: "Theory",
        question: "If the 'Expire' timer in an SOA record is reached and a Slave server still cannot contact the Master, what happens to the Slave's zone data?",
        options: [
            "It is kept forever but marked as 'stale'.",
            "The Slave server deletes the zone file and stops answering queries for that zone.",
            "The Slave promotes itself to Master.",
            "The Slave server reverts to the previous version of the serial."
        ],
        answer: 1,
        explanation: "Once 'Expire' is reached, the Slave considers its data invalid and stops serving that zone until it can sync with the Master."
    },
    {
        id: 15,
        category: "Tools",
        question: "Using the 'dig' command, how do you specifically request the Name Server (NS) records for a domain from a specific server (e.g., 8.8.8.8)?",
        options: [
            "dig ns google.com @8.8.8.8",
            "dig @8.8.8.8 google.com NS",
            "dig -t NS @8.8.8.8 google.com",
            "Both B and C are valid"
        ],
        answer: 3,
        explanation: "In 'dig', the target server starts with @, and the type (NS) can be specified as a positional argument or with the -t flag."
    },
    {
        id: 16,
        category: "BIND9 Syntax",
        question: "In a BIND zone file, if you see a line 'www  IN  A  192.168.1.5', and the $ORIGIN is 'example.com.', what is the fully qualified domain name (FQDN) of that record?",
        options: ["www", "www.example.com.", "www.example.com", "example.com.www"],
        answer: 1,
        explanation: "Records without a trailing dot are appended with the $ORIGIN. The trailing dot indicates a complete FQDN."
    },
    {
        id: 17,
        category: "Security",
        question: "Which directive in 'named.conf.options' prevents your DNS server from being used in 'DNS Amplification' attacks by restricting who can ask for recursive answers?",
        options: ["allow-query", "allow-recursion", "recursion-limit", "deny-external"],
        answer: 1,
        explanation: "allow-recursion { <trusted_networks>; }; ensures only your users can use the server to resolve external domains."
    },
    {
        id: 18,
        category: "Windows DNS",
        question: "What is a 'Stub Zone' on Windows Server?",
        options: [
            "A zone containing only a copy of the SOA, NS, and A records for the name servers of a specific zone.",
            "A read-only copy of the entire database.",
            "A zone used only for IPv6 records.",
            "A zone that only exists in RAM and is deleted on reboot."
        ],
        answer: 0,
        explanation: "Stub zones help a parent server keep track of the name servers for a delegated child zone without storing all records."
    },
    {
        id: 19,
        category: "Reverse Lookup",
        question: "What is the correct PTR record for a host with IP 10.0.0.55 in the zone 0.0.10.in-addr.arpa?",
        options: [
            "10.0.0.55  IN  PTR  host.domain.com.",
            "55  IN  PTR  host.domain.com.",
            "55.0.0.10  IN  PTR  host.domain.com.",
            "PTR  55.0.0.10  host.domain.com."
        ],
        answer: 1,
        explanation: "Inside the specific zone file for 10.0.0.x (0.0.10.in-addr.arpa), you only need the last octet (55) as the record name."
    },
    {
        id: 20,
        category: "BIND9 Configuration",
        question: "Which permission must be applied to /etc/bind/db.* files so the 'bind' service can read them?",
        options: ["777", "600", "644 (owned by bind)", "400"],
        answer: 2,
        explanation: "644 (Read/Write for owner, Read for group/others) with owner 'bind' is the standard secure practice."
    },
    {
        id: 21,
        category: "BIND9 Syntax",
        question: "What does the directive 'recursion yes;' in named.conf.options technically allow?",
        options: [
            "The server to resolve local records only.",
            "The server to query other DNS servers on behalf of its clients.",
            "The server to allow other DNS servers to query its local records.",
            "The server to automatically restart if it crashes."
        ],
        answer: 1,
        explanation: "Recursion allows the server to act as a resolver, hunting down answers it doesn't already have in its cache or local zones."
    },
    {
        id: 22,
        category: "BIND9 Configuration",
        question: "When configuring forwarders in BIND9, what is the best practice for the 'forward only' directive?",
        options: [
            "Use it to ensure BIND never tries to resolve names on its own if forwarders fail.",
            "Use it to speed up resolution by 50%.",
            "It is mandatory for all BIND installations.",
            "It is used to disable IPv6."
        ],
        answer: 0,
        explanation: "'forward only' forces the server to rely solely on forwarders. If they fail, the query fails."
    },
    {
        id: 23,
        category: "Theory",
        question: "In the DNS hierarchy, which servers manage domains like .com, .org, and .net?",
        options: ["Root Nameservers", "TLD Nameservers", "Authoritative Nameservers", "Recursive Resolvers"],
        answer: 1,
        explanation: "Top-Level Domain (TLD) nameservers are responsible for managing the registry of second-level domains within a specific TLD."
    },
    {
        id: 24,
        category: "Theory",
        question: "Denoted by a dot '.', these 13 servers are the entry point for all DNS resolution. What are they?",
        options: ["Google Public DNS", "Root Nameservers", "Tier 1 ISPs", "Cloudflare Edge Nodes"],
        answer: 1,
        explanation: "The root nameservers are the top of the DNS hierarchy and know where to find the TLD servers."
    },
    {
        id: 25,
        category: "Windows DNS",
        question: "On Windows Server, which zone type allows DNS data to be replicated along with Active Directory data?",
        options: ["Primary Zone", "Secondary Zone", "Active Directory-Integrated Zone", "GlobalNames Zone"],
        answer: 2,
        explanation: "AD-integrated zones use AD replication, providing multi-master updates and enhanced security (ACLs)."
    },
    {
        id: 26,
        category: "Windows DNS",
        question: "What is the primary tool used to manage DNS on a Windows Server Core installation without a GUI?",
        options: ["DNS Manager", "dnscmd or PowerShell", "Sconfig", "Device Manager"],
        answer: 1,
        explanation: "dnscmd is the legacy CLI tool, while PowerShell's DnsServer module is the modern choice for Server Core."
    },
    {
        id: 27,
        category: "Records",
        question: "Which field in the SOA record is used to determine how long a Slave server should wait after a failed Refresh attempt before trying again?",
        options: ["Refresh", "Retry", "Expire", "Minimum"],
        answer: 1,
        explanation: "The Retry interval is specifically for handling connection failures between Slave and Master."
    },
    {
        id: 28,
        category: "Theory",
        question: "What is 'Negative Caching' in DNS?",
        options: [
            "Caching the IP of a malicious website.",
            "Caching the fact that a specific domain or record does NOT exist.",
            "When a DNS cache is cleared manually.",
            "A way to prevent DNS spoofing."
        ],
        answer: 1,
        explanation: "Negative caching prevents a resolver from repeatedly asking for a non-existent domain, using the 'Minimum' TTL in the SOA record."
    },
    {
        id: 29,
        category: "BIND9 Syntax",
        question: "In a BIND zone file, what is the default unit of time for values like TTL if no letter (like M, H, D, W) is specified?",
        options: ["Minutes", "Hours", "Seconds", "Days"],
        answer: 2,
        explanation: "BIND defaults to seconds if units are not explicitly provided."
    },
    {
        id: 30,
        category: "Records",
        question: "Which record type is used to locate specific services like Domain Controllers or Minecraft servers in a network?",
        options: ["A", "SRV", "NS", "SOA"],
        answer: 1,
        explanation: "SRV (Service) records define the hostname, port, priority, and weight for specific services."
    },
    {
        id: 31,
        category: "Theory",
        question: "Which protocol does BIND use for zone transfers between a Master and a Slave server?",
        options: ["UDP 53", "TCP 53", "HTTP 80", "HTTPS 443"],
        answer: 1,
        explanation: "Zone transfers (AXFR/IXFR) require the reliability of TCP to ensure the entire database is copied correctly."
    },
    {
        id: 32,
        category: "Security",
        question: "What is 'Split-Horizon' or 'Split-View' DNS?",
        options: [
            "Providing different DNS answers to internal users versus external users.",
            "A DNS server that handles both IPv4 and IPv6.",
            "When two DNS servers share the same IP.",
            "A method of DNS load balancing."
        ],
        answer: 0,
        explanation: "Split-horizon DNS allows an organization to keep internal server names private while still serving public records to the internet."
    },
    {
        id: 33,
        category: "Windows DNS",
        question: "To perform an authoritative restore of an AD-integrated DNS zone, which mode must you boot the server into?",
        options: ["Safe Mode", "Directory Services Restore Mode (DSRM)", "Debugging Mode", "Server Core Mode"],
        answer: 1,
        explanation: "DSRM is used for performing maintenance and restores on Active Directory and its integrated services."
    },
    {
        id: 34,
        category: "Tools",
        question: "You want to find the 'Authoritative' answer for a domain. Which 'dig' flag or command ensures you skip any cached results from your local resolver?",
        options: ["dig +short", "dig +trace", "dig +nocache", "dig -x"],
        answer: 1,
        explanation: "dig +trace starts from the root and follows the hierarchy until it reaches the authoritative server, ignoring local cache."
    },
    {
        id: 35,
        category: "BIND9 Configuration",
        question: "In BIND9, what does 'allow-transfer { 192.168.1.20; };' inside a zone block achieve?",
        options: [
            "It allows the IP 192.168.1.20 to query the zone.",
            "It allows only the IP 192.168.1.20 (the Slave) to request a copy of the entire zone database.",
            "It allows the server to forward queries to 192.168.1.20.",
            "It sets the IP of the Master server."
        ],
        answer: 1,
        explanation: "Security best practice: Zone transfers should be restricted to known Slave servers to prevent 'Zone Walking' by attackers."
    },
    {
        id: 36,
        category: "Theory",
        question: "What is an 'Iterative Query'?",
        options: [
            "A query where the DNS server either returns the answer or provides a referral to another DNS server.",
            "A query where the server must return a final answer or an error.",
            "A query that repeats until the server crashes.",
            "A query used only for reverse lookups."
        ],
        answer: 0,
        explanation: "In an iterative query, the server being queried doesn't go hunting for the answer; it just gives its best hint (referral)."
    },
    {
        id: 37,
        category: "Records",
        question: "You have an A record for 'mail.example.com'. Your MX record points to 'mail.example.com'. Is it valid to point an MX record to a CNAME instead of an A record?",
        options: [
            "Yes, it is common practice.",
            "No, RFC standards state MX records should point directly to an A/AAAA record, not a CNAME.",
            "Only on Windows DNS.",
            "Only on BIND9."
        ],
        answer: 1,
        explanation: "Pointing an MX record to a CNAME causes additional lookups and can break some legacy mail systems; it is against best practices/RFCs."
    },
    {
        id: 38,
        category: "Troubleshooting",
        question: "Your BIND9 server won't start. You check the logs and see 'loading from master file db.example.com failed: unexpected end of input'. What is the most likely cause?",
        options: [
            "The zone file is missing a closing semicolon or a closing bracket in the SOA/named.conf.",
            "The server has run out of disk space.",
            "The serial number is too high.",
            "The server is in 'read-only' mode."
        ],
        answer: 0,
        explanation: "Syntax errors in configuration or zone files are the leading cause of service start failures."
    },
    {
        id: 39,
        category: "Windows DNS",
        question: "What is the function of the 'GlobalNames' zone in Windows Server?",
        options: [
            "To provide resolution for WINS-style single-label names across a forest without using WINS.",
            "To store all worldwide domain names.",
            "To replace the Root hints.",
            "To provide resolution for IPv6 addresses only."
        ],
        answer: 0,
        explanation: "GlobalNames zone allows resolution of single-label names (like 'PROD-DB') in enterprise environments without relying on the older WINS protocol."
    },
    {
        id: 40,
        category: "Advanced Records",
        question: "What does the 'Minimum' value in the SOA record typically represent in modern DNS implementations?",
        options: [
            "The minimum TTL for all records in the zone.",
            "The TTL for 'Negative Caching' (NXDOMAIN responses).",
            "The minimum number of name servers required.",
            "The minimum version of BIND allowed."
        ],
        answer: 1,
        explanation: "Modern BIND uses the last field of the SOA to determine how long a resolver should cache a 'name not found' (NXDOMAIN) answer."
    },
    {
        id: 41,
        category: "Theory",
        question: "Which DNS component is responsible for initiating a query and is typically part of an operating system's network stack?",
        options: ["Recursive Server", "Stub Resolver", "Authoritative Server", "Forwarder"],
        answer: 1,
        explanation: "The stub resolver is the minimal DNS client on a computer that sends queries to a recursive server."
    },
    {
        id: 42,
        category: "BIND9 Syntax",
        question: "In BIND, what does the keyword 'any' in an ACL (Access Control List) represent?",
        options: [
            "Only localhost.",
            "Any IP address from any source.",
            "Only IPs in the local subnet.",
            "Only the Master and Slave servers."
        ],
        answer: 1,
        explanation: "'any' is a wildcard that matches every source/destination IP address."
    },
    {
        id: 43,
        category: "Security",
        question: "What is 'DNS Poisoning' or 'DNS Spoofing'?",
        options: [
            "Flooding a DNS server with traffic.",
            "Inserting fake records into a DNS server's cache to redirect users to malicious sites.",
            "Deleting a zone file remotely.",
            "Changing the server's hostname."
        ],
        answer: 1,
        explanation: "Spoofing involves tricking a resolver into accepting a fake answer, which it then caches and serves to other users."
    },
    {
        id: 44,
        category: "Security",
        question: "Which technology adds digital signatures to DNS records to ensure authenticity and integrity?",
        options: ["HTTPS", "DNSSEC", "SSL/TLS", "IPsec"],
        answer: 1,
        explanation: "DNSSEC (DNS Security Extensions) uses public-key cryptography to sign DNS records, preventing spoofing."
    },
    {
        id: 45,
        category: "Windows DNS",
        question: "In Windows DNS, what happens during 'Scavenging'?",
        options: [
            "The server looks for virus infections.",
            "Stale or old dynamically updated records are automatically deleted to keep the database clean.",
            "The server compacts the database to save space.",
            "The server backups the zone data to the cloud."
        ],
        answer: 1,
        explanation: "Scavenging prevents the DNS database from becoming cluttered with records of devices that are no longer on the network."
    },
    {
        id: 46,
        category: "Theory",
        question: "What is a 'Forwarder' in DNS architecture?",
        options: [
            "A DNS server that handles queries for names it cannot resolve itself by sending them to a specific designated server.",
            "An A record that points to another server.",
            "A script that reboots the server.",
            "A way to skip Root hints."
        ],
        answer: 0,
        explanation: "Forwarders are used to direct external traffic to a specific server (like an ISP's) instead of going through the full root-to-authoritative process."
    },
    {
        id: 47,
        category: "Tools",
        question: "Which nslookup command allows you to change the type of record being queried to MX?",
        options: ["type=mx", "set type=mx", "mx-mode", "show mx"],
        answer: 1,
        explanation: "In the interactive nslookup tool, 'set type=X' changes the query filter."
    },
    {
        id: 48,
        category: "BIND9 Troubleshooting",
        question: "If BIND reports 'permission denied' when trying to read 'named.conf', but the file permissions are correct (644), what is another common security feature in Ubuntu that might be blocking access?",
        options: ["UFW", "AppArmor", "Fail2Ban", "Windows Defender"],
        answer: 1,
        explanation: "AppArmor is a Mandatory Access Control system in Ubuntu that restricts which files specific services can touch, even if file permissions allow it."
    },
    {
        id: 49,
        category: "Theory",
        question: "What is the 'Bailiwick' of a DNS server?",
        options: [
            "The specific domain and subdomains for which the server is authoritative.",
            "The physical location of the server.",
            "The total amount of RAM used by BIND.",
            "The speed of the network connection."
        ],
        answer: 0,
        explanation: "The bailiwick defines the scope of authority for a DNS server."
    },
    {
        id: 50,
        category: "Records",
        question: "In a BIND zone file, what does the 'IN' stand for in 'www IN A 1.2.3.4'?",
        options: ["Internal", "Internet", "Input", "Index"],
        answer: 1,
        explanation: "IN stands for 'Internet', which is the most common class of DNS data (others like CH or HS are rare legacy systems)."
    },
    {
        id: 51,
        category: "BIND9 Syntax",
        question: "Which of the following is a valid BIND9 Serial number format that represents October 25, 2023, version 1?",
        options: ["10-25-2023-01", "2023102501", "2510202301", "0120231025"],
        answer: 1,
        explanation: "The standard YYYYMMDDNN format is used to make serial numbers human-readable and always increasing."
    },
    {
        id: 52,
        category: "Theory",
        question: "When a DNS server responds with 'NXDOMAIN', what is it telling the client?",
        options: [
            "The server is busy.",
            "The domain name requested does not exist.",
            "Access is denied.",
            "The record exists but is empty."
        ],
        answer: 1,
        explanation: "Non-Existent Domain (NXDOMAIN) is the official response for a name that cannot be resolved."
    },
    {
        id: 53,
        category: "Windows DNS",
        question: "What is the 'Aging' property in Windows DNS?",
        options: [
            "The hardware age of the server.",
            "The time interval that must pass before a record is eligible for scavenging.",
            "How long the DNS service has been running.",
            "The frequency of server updates."
        ],
        answer: 1,
        explanation: "Aging works with Scavenging to track when records were last refreshed."
    },
    {
        id: 54,
        category: "Tools",
        question: "You suspect your BIND9 server is slow. Which command shows real-time resource usage of the 'named' process?",
        options: ["lsblk", "top or htop", "df -h", "ip a"],
        answer: 1,
        explanation: "top and htop monitor CPU and memory usage of running processes."
    },
    {
        id: 55,
        category: "Security",
        question: "What is the danger of leaving 'allow-query { any; };' on a server with an 'internal' zone?",
        options: [
            "It causes the server to consume too much power.",
            "Anyone on the internet can see your private hostnames and IP addresses.",
            "It disables IPv6.",
            "It crashes BIND if too many people query it."
        ],
        answer: 1,
        explanation: "Internal infrastructure details should always be restricted to trusted networks using ACLs."
    },
    {
        id: 56,
        category: "Records",
        question: "What happens if a domain has multiple MX records with the EXACT same priority number?",
        options: [
            "The server will only use the first one.",
            "The server will load-balance traffic between both servers.",
            "The DNS query will fail.",
            "The servers will conflict and crash."
        ],
        answer: 1,
        explanation: "Equal priority values in MX records results in randomized load-sharing between those mail servers."
    },
    {
        id: 57,
        category: "Theory",
        question: "What is a 'TTL' (Time To Live)?",
        options: [
            "The battery life of the server.",
            "How long a DNS record can be kept in a cache before a new query is required.",
            "The time it takes to reboot BIND.",
            "The distance a packet travels."
        ],
        answer: 1,
        explanation: "TTL tells resolvers how long they can trust the information before they must ask for an update."
    },
    {
        id: 58,
        category: "BIND9 Syntax",
        question: "In named.conf, which character is used to start a single-line comment?",
        options: ["#", "//", "Both # and // are valid", ";"],
        answer: 2,
        explanation: "BIND's named.conf supports multiple comment styles: #, //, and /* ... */."
    },
    {
        id: 59,
        category: "Records",
        question: "Which of these is NOT a valid DNS record type?",
        options: ["A", "MX", "DHCP", "NS"],
        answer: 2,
        explanation: "DHCP is a network protocol, not a DNS record type."
    },
    {
        id: 60,
        category: "Theory",
        question: "What is 'DNS Round Robin'?",
        options: [
            "When multiple A records exist for a single name, and the DNS server rotates the order of the IPs in the response.",
            "When a server queries itself repeatedly.",
            "A security protocol.",
            "A way to delete old records."
        ],
        answer: 0,
        explanation: "Round Robin is a simple way to distribute web traffic across multiple servers."
    },
    {
        id: 61,
        category: "BIND9 Troubleshooting",
        question: "Which log file in Ubuntu usually contains BIND9 error messages?",
        options: ["/var/log/auth.log", "/var/log/syslog", "/var/log/apache2/error.log", "/etc/bind/errors.txt"],
        answer: 1,
        explanation: "On systemd-based Linux systems, general service logs (including BIND) are found in syslog or via journalctl."
    },
    {
        id: 62,
        category: "Windows DNS",
        question: "In Windows DNS, what is the 'Root Hints' file used for?",
        options: [
            "To store the IPs of the 13 global root nameservers.",
            "To store the administrator's password.",
            "To suggest better domain names.",
            "To store local hostnames."
        ],
        answer: 0,
        explanation: "Root hints allow the server to find the top of the DNS hierarchy if no forwarders are configured."
    },
    {
        id: 63,
        category: "Theory",
        question: "What is an 'Authoritative' answer?",
        options: [
            "An answer that comes directly from the server that owns the zone file.",
            "An answer that comes from a cache.",
            "An answer that is encrypted.",
            "An answer from Google DNS."
        ],
        answer: 0,
        explanation: "Authoritative answers are the 'official' truth for a domain, as opposed to cached (non-authoritative) guesses."
    },
    {
        id: 64,
        category: "Records",
        question: "If you change an A record's IP address, but clients still see the old IP, what is the most likely cause?",
        options: [
            "The server is broken.",
            "The record's TTL hasn't expired yet in the clients' or ISP's cache.",
            "The client's computer needs a reboot.",
            "The internet is down."
        ],
        answer: 1,
        explanation: "DNS propagation delay is almost always caused by caching based on the TTL value."
    },
    {
        id: 65,
        category: "BIND9 Configuration",
        question: "In BIND9, what is an 'ACL'?",
        options: [
            "Access Control List; used to define groups of IP addresses for security rules.",
            "Automatic Configuration List.",
            "All-purpose Command Line.",
            "An alternative to DNSSEC."
        ],
        answer: 0,
        explanation: "ACLs allow you to name groups of IPs (like 'trusted') to simplify named.conf rules."
    },
    {
        id: 66,
        category: "Reverse Lookup",
        question: "Why do Mail Servers often perform a reverse lookup on incoming connections?",
        options: [
            "To see the user's name.",
            "To verify that the sender's IP address has a matching hostname, which is a common spam-prevention check.",
            "To speed up email delivery.",
            "To encrypt the email."
        ],
        answer: 1,
        explanation: "Many spam filters reject emails from IPs that don't have a valid reverse (PTR) record."
    },
    {
        id: 67,
        category: "Security",
        question: "What is 'DNS Hijacking'?",
        options: [
            "Stealing a physical DNS server.",
            "Malware on a client computer that changes the DNS settings to point to a rogue server.",
            "When a DNS server is too fast.",
            "Using DNS for free Wi-Fi."
        ],
        answer: 1,
        explanation: "Hijacking redirects a user's entire DNS flow at the source (the local machine or router)."
    },
    {
        id: 68,
        category: "Tools",
        question: "What is the Windows equivalent of the 'dig' command?",
        options: ["dig.exe", "nslookup", "ipconfig /all", "hostname"],
        answer: 1,
        explanation: "While 'dig' can be installed on Windows, 'nslookup' is the built-in standard tool."
    },
    {
        id: 69,
        category: "BIND9 Syntax",
        question: "Every BIND zone file must start with which record?",
        options: ["A", "NS", "SOA", "MX"],
        answer: 2,
        explanation: "The Start of Authority (SOA) is mandatory and contains the zone's metadata."
    },
    {
        id: 70,
        category: "Theory",
        question: "What is the 'DNS Cache'?",
        options: [
            "A storage area in memory where a DNS server or client keeps previous query results to speed up future requests.",
            "A backup of the zone file.",
            "A hidden folder on the hard drive.",
            "A type of DNS record."
        ],
        answer: 0,
        explanation: "Caching is what makes DNS efficient by avoiding redundant lookups across the internet."
    },
    {
        id: 71,
        category: "Windows DNS",
        question: "Which service in Windows is responsible for client-side DNS caching and resolution?",
        options: ["DNS Server", "DNS Client", "DHCP Client", "WinRM"],
        answer: 1,
        explanation: "The DNS Client service handles the local cache (viewable with 'ipconfig /displaydns')."
    },
    {
        id: 72,
        category: "BIND9 Configuration",
        question: "In named.conf.options, what does 'listen-on port 53 { any; };' do?",
        options: [
            "Restricts DNS to only work on the local machine.",
            "Allows the server to accept DNS queries on all available network interfaces.",
            "Turns off the DNS service.",
            "Sets the password for the DNS service."
        ],
        answer: 1,
        explanation: "This tells BIND to open its 'ears' on all network cards."
    },
    {
        id: 73,
        category: "Records",
        question: "Can multiple A records exist for the same hostname?",
        options: ["Yes", "No", "Only on Linux", "Only on Windows"],
        answer: 0,
        explanation: "Yes, this is how basic load balancing (Round Robin) is achieved."
    },
    {
        id: 74,
        category: "Theory",
        question: "What is the maximum length of a domain name (including the dots)?",
        options: ["63 characters", "128 characters", "253 characters", "Unlimited"],
        answer: 2,
        explanation: "RFCs limit a full domain name to 253 characters, with each label (between dots) limited to 63."
    },
    {
        id: 75,
        category: "Advanced Records",
        question: "What does the 'Weight' field in an SRV record do?",
        options: [
            "Determines which server is physically heavier.",
            "A load-balancing mechanism for servers with the same priority; higher weights get more traffic.",
            "Determines the speed of the server.",
            "The size of the DNS record in bytes."
        ],
        answer: 1,
        explanation: "Weight allows proportional load balancing among servers of the same priority level."
    },
    {
        id: 76,
        category: "BIND9 Configuration",
        question: "What happens if you have an error in named.conf and try to restart BIND9?",
        options: [
            "The server will start but ignore the error.",
            "The service will fail to start (Active: failed).",
            "The server will delete the configuration file.",
            "The server will fix the error automatically."
        ],
        answer: 1,
        explanation: "BIND is very strict about syntax; any error in the config files prevents the service from loading."
    },
    {
        id: 77,
        category: "Theory",
        question: "What is 'DNS Propagation'?",
        options: [
            "The speed of a DNS server.",
            "The time it takes for DNS changes to spread across the internet as caches expire.",
            "A type of DNS attack.",
            "Installing DNS on multiple servers."
        ],
        answer: 1,
        explanation: "Propagation isn't a single event but the process of global caches updating based on TTLs."
    },
    {
        id: 78,
        category: "Security",
        question: "Why should you disable recursion on a public-facing Authoritative-only DNS server?",
        options: [
            "To save memory.",
            "To prevent the server from being used in DNS Amplification DDoS attacks.",
            "To make the server faster.",
            "To follow Windows standards."
        ],
        answer: 1,
        explanation: "Open resolvers are a security risk because they can be used to flood victims with unwanted traffic."
    },
    {
        id: 79,
        category: "Tools",
        question: "Which command clears the DNS cache on a Windows client?",
        options: ["ipconfig /renew", "ipconfig /flushdns", "nslookup /clear", "net stop dns"],
        answer: 1,
        explanation: "'flushdns' forces the OS to wipe its local cache and ask the server for fresh records."
    },
    {
        id: 80,
        category: "BIND9 Syntax",
        question: "In a BIND zone file, what does the semicolon ';' signify?",
        options: [
            "The end of a command.",
            "The start of a comment.",
            "A separator between IP addresses.",
            "A wildcard character."
        ],
        answer: 1,
        explanation: "Unlike named.conf where it ends a line, in a zone file (db.*), it starts a comment."
    },
    {
        id: 81,
        category: "Records",
        question: "An MX record must always point to...",
        options: [
            "An IP address.",
            "A hostname that has its own A or AAAA record.",
            "A CNAME record.",
            "An email address."
        ],
        answer: 1,
        explanation: "MX records point to names, not IPs. Those names must then be resolved to IPs via A/AAAA records."
    },
    {
        id: 82,
        category: "Windows DNS",
        question: "What is 'Conditional Forwarding'?",
        options: [
            "Forwarding queries only on certain days.",
            "Forwarding queries for a specific domain name to a specific DNS server.",
            "Forwarding queries only if the server is fast.",
            "A type of virus protection."
        ],
        answer: 1,
        explanation: "Conditional forwarders are useful for resolving names in a partner company's network over a VPN."
    },
    {
        id: 83,
        category: "Theory",
        question: "What is the 'Fully Qualified Domain Name' (FQDN) for a host named 'web' in the 'example.com' domain?",
        options: ["web", "web.example.com.", "example.com.web", "www.web.com"],
        answer: 1,
        explanation: "The FQDN includes the host, the domain, and the trailing dot (root)."
    },
    {
        id: 84,
        category: "Security",
        question: "How does Fail2Ban protect a DNS server?",
        options: [
            "By encrypting the zone files.",
            "By monitoring logs for malicious patterns and temporarily banning the offending IPs in the firewall.",
            "By deleting old records.",
            "By blocking all UDP traffic."
        ],
        answer: 1,
        explanation: "Fail2Ban is a proactive defense tool that works with the firewall."
    },
    {
        id: 85,
        category: "Records",
        question: "What is the purpose of an 'NS' record?",
        options: [
            "To identify which servers are authoritative for the domain.",
            "To store the server's serial number.",
            "To map a name to an IP.",
            "To provide the admin's email."
        ],
        answer: 0,
        explanation: "NS (Name Server) records delegate a zone to specific servers."
    },
    {
        id: 86,
        category: "Theory",
        question: "What is the 'Primary' DNS server?",
        options: [
            "The server where the master copy of the zone file is kept and edited.",
            "The fastest server.",
            "The server used for backup.",
            "The server that handles email."
        ],
        answer: 0,
        explanation: "The Primary (Master) is the source of truth for the zone."
    },
    {
        id: 87,
        category: "BIND9 Troubleshooting",
        question: "What is the 'named-checkconf -z' command used for?",
        options: [
            "To check the syntax of the main config AND attempt to load all zone files.",
            "To delete all zone files.",
            "To zip the configuration files.",
            "To check the BIND version."
        ],
        answer: 0,
        explanation: "The -z flag helps verify that both your config and your data files are readable/valid."
    },
    {
        id: 88,
        category: "Theory",
        question: "Which port does DNS use for communication?",
        options: ["22", "53", "80", "443"],
        answer: 1,
        explanation: "DNS is synonymous with Port 53."
    },
    {
        id: 89,
        category: "Records",
        question: "A 'PTR' record is also known as a...",
        options: ["Pointer record", "Primary record", "Priority record", "Private record"],
        answer: 0,
        explanation: "PTR is shorthand for Pointer."
    },
    {
        id: 90,
        category: "Windows DNS",
        question: "What is 'Zone Delegation'?",
        options: [
            "Deleting a zone.",
            "Assigning responsibility for a subdomain to a different set of DNS servers.",
            "Changing the zone's name.",
            "Moving the zone to a different drive."
        ],
        answer: 1,
        explanation: "Delegation is how subdomains (like 'engineering.example.com') are managed separately."
    },
    {
        id: 91,
        category: "BIND9 Syntax",
        question: "In a BIND zone file, what does '$ORIGIN' do?",
        options: [
            "Sets the default domain name to be appended to any unqualified hostnames in the file.",
            "Sets the server's country of origin.",
            "Determines the source IP of the server.",
            "Starts a new zone file."
        ],
        answer: 0,
        explanation: "$ORIGIN saves time by letting you write 'www' instead of 'www.example.com.' throughout the file."
    },
    {
        id: 92,
        category: "Security",
        question: "Why is BIND9 usually run as the 'bind' user instead of 'root'?",
        options: [
            "To save energy.",
            "To follow the 'Principle of Least Privilege'; if BIND is hacked, the attacker doesn't get full root access.",
            "Because 'bind' is a faster user.",
            "Because root is not allowed to use the network."
        ],
        answer: 1,
        explanation: "Running services as non-privileged users is a core security fundamental."
    },
    {
        id: 93,
        category: "Tools",
        question: "What does 'ipconfig /displaydns' do on Windows?",
        options: [
            "Shows your IP address.",
            "Shows all records currently stored in your local computer's DNS cache.",
            "Tests the connection to the DNS server.",
            "Changes your DNS settings."
        ],
        answer: 1,
        explanation: "This allows you to see what your computer 'knows' without asking the server again."
    },
    {
        id: 94,
        category: "Theory",
        question: "What is 'DNS Load Balancing'?",
        options: [
            "Distributing network requests across multiple servers using DNS records.",
            "Buying a bigger DNS server.",
            "Turning off DNS at night.",
            "Using two different DNS protocols."
        ],
        answer: 0,
        explanation: "Techniques like Round Robin or SRV weights distribute the workload."
    },
    {
        id: 95,
        category: "Records",
        question: "In the SOA, what happens if the 'Retry' value is higher than the 'Refresh' value?",
        options: [
            "The server will crash.",
            "It is illogical; retry should always be shorter than refresh to ensure fast recovery.",
            "It makes the server more stable.",
            "It has no effect."
        ],
        answer: 1,
        explanation: "If a refresh fails, you want to 'retry' soon, not wait longer than the initial refresh cycle."
    },
    {
        id: 96,
        category: "Windows DNS",
        question: "In Windows DNS Manager, what does a 'Red X' on a server icon usually mean?",
        options: [
            "The server is fast.",
            "The DNS service is stopped or the server is unreachable.",
            "The zone is full.",
            "The server is in 'read-only' mode."
        ],
        answer: 1,
        explanation: "Visual indicators in Server Manager help identify service outages quickly."
    },
    {
        id: 97,
        category: "BIND9 Syntax",
        question: "What is the correct way to end a BIND9 configuration line in named.conf?",
        options: ["With a comma ,", "With a semicolon ;", "With a period .", "With a colon :"],
        answer: 1,
        explanation: "Missing semicolons in named.conf are the most common source of 'syntax errors'."
    },
    {
        id: 98,
        category: "Theory",
        question: "DNS is considered a 'Distributed Database'. What does this mean?",
        options: [
            "One server stores everything.",
            "The data is spread across millions of servers worldwide, each responsible for their own piece.",
            "The data is only on the client computers.",
            "The database is only for the local network."
        ],
        answer: 1,
        explanation: "The decentralized nature of DNS is what makes it scalable and resilient."
    },
    {
        id: 99,
        category: "Security",
        question: "What is an 'Open Resolver'?",
        options: [
            "A DNS server that accepts recursive queries from any IP address on the internet.",
            "A server that is currently being repaired.",
            "A server that doesn't have a password.",
            "A type of open-source software."
        ],
        answer: 0,
        explanation: "Open resolvers are frequently abused for DDoS attacks and should be avoided in production."
    },
    {
        id: 100,
        category: "Final Mastery",
        question: "Which of the following describes the 'D' in BIND?",
        options: ["Database", "Domain", "Dynamic", "Distribution"],
        answer: 1,
        explanation: "BIND stands for Berkeley Internet Name Domain."
    }
];

// Helper to shuffle questions for a different experience each time
const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

export default function HardQuiz({ onBack }) {
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAns, setSelectedAns] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizState, setQuizState] = useState('start'); // 'start', 'quiz', 'end'

    useEffect(() => {
        setQuestions(shuffleArray(dnsQuizData));
    }, []);

    const handleStart = () => {
        setQuizState('quiz');
        setCurrentIdx(0);
        setScore(0);
    };

    const handleAnswer = (idx) => {
        if (isAnswered) return;
        setSelectedAns(idx);
        setIsAnswered(true);
        if (idx === questions[currentIdx].answer) {
            setScore(s => s + 1);
        }
    };

    const nextQuestion = () => {
        setIsAnswered(false);
        setSelectedAns(null);
        if (currentIdx + 1 < questions.length) {
            setCurrentIdx(c => c + 1);
        } else {
            setQuizState('end');
        }
    };

    const progress = questions.length > 0 ? ((currentIdx + 1) / questions.length) * 100 : 0;

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30">
            {/* Background patterns */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 min-h-screen flex flex-col">
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Menu
                </button>
                {quizState === 'start' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                        <div className="p-4 bg-blue-500/10 rounded-3xl border border-blue-500/20 mb-4">
                            <Globe className="w-20 h-20 text-blue-400 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-black tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                                Advanced DNS Mastery
                            </h1>
                            <p className="text-slate-400 text-xl max-w-lg mx-auto leading-relaxed">
                                A high-difficulty technical assessment of BIND9, Windows DNS, and global resolution hierarchy.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                            {[
                                { icon: <Settings className="w-5 h-5" />, text: "BIND9 Syntax" },
                                { icon: <Database className="w-5 h-5" />, text: "Record Logic" },
                                { icon: <Search className="w-5 h-5" />, text: "Hierarchy" }
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex items-center gap-3">
                                    <span className="text-blue-400">{item.icon}</span>
                                    <span className="text-sm font-semibold">{item.text}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleStart}
                            className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-blue-500/20 transition-all active:scale-95 group"
                        >
                            Initialize Assessment (100 Questions)
                            <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}

                {quizState === 'quiz' && questions.length > 0 && (
                    <div className="flex-1 flex flex-col">
                        {/* Progress Header */}
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <span className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-1 block">
                                    {questions[currentIdx].category}
                                </span>
                                <h2 className="text-slate-500 font-medium">Question {currentIdx + 1} of {questions.length}</h2>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-white">{score}</span>
                                <span className="text-slate-500 ml-1">Points</span>
                            </div>
                        </div>

                        <div className="w-full h-1.5 bg-slate-800 rounded-full mb-12 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Question Card */}
                        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 md:p-12 rounded-[2rem] shadow-2xl flex-1 flex flex-col animate-in slide-in-from-bottom-8 duration-500">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-tight">
                                {questions[currentIdx].question}
                            </h3>

                            <div className="grid grid-cols-1 gap-4 mb-8">
                                {questions[currentIdx].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        disabled={isAnswered}
                                        onClick={() => handleAnswer(i)}
                                        className={`
                      relative group text-left p-6 rounded-2xl border-2 transition-all duration-200
                      ${!isAnswered ? 'border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/5' :
                                                i === questions[currentIdx].answer ? 'border-green-500/50 bg-green-500/10' :
                                                    selectedAns === i ? 'border-red-500/50 bg-red-500/10' : 'border-slate-800 opacity-40'}
                    `}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`
                        w-8 h-8 rounded-lg border-2 flex items-center justify-center text-sm font-bold transition-colors
                        ${!isAnswered ? 'border-slate-700 group-hover:border-blue-400 text-slate-500' :
                                                    i === questions[currentIdx].answer ? 'border-green-500 bg-green-500 text-white' :
                                                        selectedAns === i ? 'border-red-500 bg-red-500 text-white' : 'border-slate-700 text-slate-600'}
                      `}>
                                                {String.fromCharCode(65 + i)}
                                            </div>
                                            <span className={`text-lg font-medium transition-colors ${isAnswered && i === questions[currentIdx].answer ? 'text-green-400' : 'text-slate-300'}`}>
                                                {opt}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {isAnswered && (
                                <div className="mt-auto animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 mb-8 flex gap-4">
                                        <ShieldAlert className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                                        <p className="text-slate-400 leading-relaxed italic">
                                            <strong className="text-blue-300 not-italic mr-2">Technical Insight:</strong>
                                            {questions[currentIdx].explanation}
                                        </p>
                                    </div>
                                    <button
                                        onClick={nextQuestion}
                                        className="w-full py-5 bg-white text-slate-900 font-bold rounded-2xl text-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        {currentIdx + 1 === questions.length ? "Finalize Report" : "Commit & Continue"}
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {quizState === 'end' && (
                    <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in fade-in duration-700">
                        <div className="relative mb-12">
                            <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-20" />
                            <div className="relative bg-slate-800 border border-slate-700 p-8 rounded-[3rem] text-center shadow-2xl">
                                <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]" />
                                <h2 className="text-4xl font-black text-white mb-2">Technical Report</h2>
                                <p className="text-slate-400 mb-8 uppercase tracking-widest font-mono text-sm font-bold">Evaluation Complete</p>

                                <div className="flex gap-8 justify-center mb-8">
                                    <div className="text-center">
                                        <div className="text-5xl font-black text-white">{score}</div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter mt-1">Score</div>
                                    </div>
                                    <div className="w-px bg-slate-700" />
                                    <div className="text-center">
                                        <div className="text-5xl font-black text-blue-400">{Math.round((score / questions.length) * 100)}%</div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter mt-1">Accuracy</div>
                                    </div>
                                </div>

                                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 text-left mb-8">
                                    <p className="text-slate-300 leading-relaxed">
                                        {score >= questions.length * 0.9 ?
                                            "Level: Senior DNS Architect. You have an exceptional command over BIND9 behaviors and complex record interactions." :
                                            score >= questions.length * 0.7 ?
                                                "Level: Network Administrator. Strong performance. You understand the core protocols and BIND9 configurations well." :
                                                "Level: Junior Associate. The DNS hierarchy is complex; focus on mastering SOA parameters and reverse zone syntax."
                                        }
                                    </p>
                                </div>

                                <button
                                    onClick={handleStart}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <RefreshCcw className="w-5 h-5" /> Re-Initialize
                                </button>
                                <button
                                    onClick={onBack}
                                    className="w-full mt-4 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    Back to Menu
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}