import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, XCircle, RotateCcw, Award, BookOpen, Network, ShieldCheck } from 'lucide-react';

const quizData = [
  // --- NETWORKING FUNDAMENTALS & SUBNETTING ---
  {
    id: 1,
    category: "Networking Fundamentals",
    question: "You are setting up a small office network. You decide to use the subnet mask 255.255.254.0. Which CIDR notation represents this mask?",
    options: ["/22", "/23", "/24", "/25"],
    answer: 1,
    explanation: "255.255.254.0 corresponds to /23. It provides 512 total IPs (510 usable)."
  },
  {
    id: 2,
    category: "Networking Fundamentals",
    question: "True or False: The entire 127.0.0.0/8 block is reserved for loopback. This means an address like 127.50.10.5 is technically a valid loopback address that will never reach the public internet.",
    options: ["True", "False"],
    answer: 0,
    explanation: "Correct! While 127.0.0.1 is the most common, the entire 127.0.0.0/8 range (over 16 million addresses) is reserved for internal loopback testing."
  },
  {
    id: 3,
    category: "Networking Fundamentals",
    question: "A network has the CIDR /26. How many 'Usable' hosts can this network support?",
    options: ["64", "62", "30", "126"],
    answer: 1,
    explanation: "A /26 has 6 host bits (32-26=6). 2^6 = 64 total IPs. We subtract 2 (Network and Broadcast IDs), leaving 62 usable hosts."
  },
  {
    id: 4,
    category: "Networking Fundamentals",
    question: "Which IP class is represented by the range 128-191 and uses the default mask 255.255.0.0?",
    options: ["Class A", "Class B", "Class C", "Class D"],
    answer: 1,
    explanation: "Class B covers 128.0.0.0 to 191.255.255.255."
  },
  {
    id: 5,
    category: "Networking Fundamentals",
    question: "In Ubuntu 24.04, where is the primary network configuration file located?",
    options: ["/etc/network/interfaces", "/etc/netplan/*.yaml", "/etc/sysconfig/network", "/etc/bind/named.conf"],
    answer: 1,
    explanation: "Modern Ubuntu uses Netplan, with configurations stored as YAML files in /etc/netplan/."
  },

  // --- DNS (DOMAIN NAME SYSTEM) ---
  {
    id: 6,
    category: "DNS & BIND9",
    question: "What is the primary purpose of a CNAME record?",
    options: ["To map a hostname to an IPv4 address", "To map an IP address to a hostname", "To create an alias that points one domain name to another", "To specify the mail server for the domain"],
    answer: 2,
    explanation: "CNAME (Canonical Name) is an alias. For example, pointing 'www' to the root domain 'example.com'."
  },
  {
    id: 7,
    category: "DNS & BIND9",
    question: "You need to perform a 'Reverse Lookup' to find the hostname of a specific IP. Which DNS record type are you looking for?",
    options: ["A Record", "PTR Record", "MX Record", "SOA Record"],
    answer: 1,
    explanation: "PTR (Pointer) records are used in Reverse Lookup Zones to map IPs back to hostnames."
  },
  {
    id: 8,
    category: "DNS & BIND9",
    question: "In a BIND9 zone file, what does the '@' symbol represent?",
    options: ["The Administrator's email address", "The current origin/root of the zone", "A wildcard for all subdomains", "The primary Name Server"],
    answer: 1,
    explanation: "The '@' symbol is a shorthand that represents the zone's origin (e.g., example.com)."
  },
  {
    id: 9,
    category: "DNS & BIND9",
    question: "Which BIND9 configuration file is used to define the specific forward and reverse zones the server is authoritative for?",
    options: ["named.conf.options", "named.conf.local", "named.conf.default-zones", "db.local"],
    answer: 1,
    explanation: "named.conf.local is where you define your custom 'zone' blocks."
  },
  {
    id: 10,
    category: "DNS & BIND9",
    question: "What does the 'SOA' record stand for and what is its role?",
    options: ["Service of Authentication; handles login", "Start of Authority; contains core zone info like serial numbers", "Standard Operating Address; the primary IP", "System Output Area; logs DNS errors"],
    answer: 1,
    explanation: "Start of Authority (SOA) contains essential metadata about the zone, including the serial number used for zone transfers."
  },

  // --- DHCP (DYNAMIC HOST CONFIGURATION PROTOCOL) ---
  {
    id: 11,
    category: "DHCP",
    question: "What are the four steps of the DHCP process, in the correct order?",
    options: ["Discover, Offer, Request, Acknowledge", "Detection, Option, Request, Access", "Direct, Open, Read, Apply", "Deliver, Order, Release, Accept"],
    answer: 0,
    explanation: "The DORA process: Discover (Client), Offer (Server), Request (Client), Acknowledge (Server)."
  },
  {
    id: 12,
    category: "DHCP",
    question: "On an Ubuntu DHCP server (isc-dhcp-server), what is a 'Reservation' called in the configuration file?",
    options: ["Static-Binding", "Reserved-IP", "Fixed-Address", "Permanent-Lease"],
    answer: 2,
    explanation: "A reservation is defined using a 'host' block with a 'fixed-address' directive."
  },
  {
    id: 13,
    category: "DHCP",
    question: "You want to check which IP addresses your Ubuntu DHCP server has currently handed out. Which file do you inspect?",
    options: ["/etc/dhcp/dhcpd.conf", "/var/lib/dhcp/dhcpd.leases", "/var/log/syslog", "/etc/default/isc-dhcp-server"],
    answer: 1,
    explanation: "The dhcpd.leases file maintains the current database of assigned IP addresses."
  },
  {
    id: 14,
    category: "DHCP",
    question: "In Windows Server DHCP, what is the 'Lease Duration' default setting?",
    options: ["24 hours", "7 days", "8 days", "30 days"],
    answer: 2,
    explanation: "The default lease duration for Windows Server DHCP scopes is 8 days."
  },
  {
    id: 15,
    category: "DHCP",
    question: "What unique identifier is required to create a DHCP Reservation for a specific device?",
    options: ["Computer Name", "MAC Address", "UUID", "Operating System Version"],
    answer: 1,
    explanation: "The Physical (MAC) address is used to bind a specific IP to a specific piece of hardware."
  },

  // --- SAMBA & FILE SHARING ---
  {
    id: 16,
    category: "File Sharing",
    question: "Samba allows Linux to share files using which protocol primarily used by Windows?",
    options: ["FTP", "NFS", "SMB/CIFS", "SSH"],
    answer: 2,
    explanation: "Samba implements the Server Message Block (SMB) protocol, also known as CIFS."
  },
  {
    id: 17,
    category: "File Sharing",
    question: "In Windows Server, what is the difference between Share Permissions and NTFS Permissions?",
    options: ["There is no difference.", "Share permissions only apply over the network; NTFS permissions apply both locally and over the network.", "NTFS only applies to Linux clients.", "Share permissions are more secure than NTFS."],
    answer: 1,
    explanation: "Share permissions are the 'gatekeeper' for network access, but NTFS (Security tab) provides the actual file-level protection."
  },
  {
    id: 18,
    category: "File Sharing",
    question: "You want to verify your Samba configuration file (smb.conf) for syntax errors. Which command do you use?",
    options: ["samba-check", "testparm", "smbstatus", "lsblk"],
    answer: 1,
    explanation: "'testparm' is the built-in utility to check the integrity of the smb.conf file."
  },
  {
    id: 19,
    category: "File Sharing",
    question: "In Windows, what feature hides files and folders from users who do not have permissions to access them?",
    options: ["Stealth Mode", "Access-Based Enumeration (ABE)", "BitLocker", "Shadow Copies"],
    answer: 1,
    explanation: "Access-Based Enumeration ensures users only see what they are allowed to touch."
  },
  {
    id: 20,
    category: "File Sharing",
    question: "True or False: To allow guest access in Samba, you must set 'guest ok = yes' in the share definition.",
    options: ["True", "False"],
    answer: 0,
    explanation: "Correct. Setting 'guest ok = yes' allows users to connect without a password."
  },

  // --- TRICKY / MIXED ---
  {
    id: 21,
    category: "Mixed Mastery",
    question: "Which command would you use to find the MAC address of a Linux machine?",
    options: ["ip addr show", "ifconfig", "ip link show", "All of the above"],
    answer: 3,
    explanation: "All these commands can display the 'link/ether' or HWaddr (MAC address)."
  },
  {
    id: 22,
    category: "Mixed Mastery",
    question: "When configuring a DNS Forwarder in BIND9, where do you usually place the configuration?",
    options: ["named.conf.local", "named.conf.options", "db.root", "resolv.conf"],
    answer: 1,
    explanation: "Forwarders are global settings placed in the options block of named.conf.options."
  },
  {
    id: 23,
    category: "Mixed Mastery",
    question: "Which port does DNS typically use?",
    options: ["22", "53", "80", "445"],
    answer: 1,
    explanation: "Port 53 is the standard port for DNS (UDP for queries, TCP for zone transfers)."
  },
  {
    id: 24,
    category: "Mixed Mastery",
    question: "What happens if a DHCP server detects an IP conflict when offering an address?",
    options: ["It ignores it and assigns the IP anyway.", "It sends a DHCPDECLINE or marks the IP as 'Bad_Address'.", "It crashes the service.", "It restarts the client."],
    answer: 1,
    explanation: "If a conflict is detected, the server usually marks that IP as unusable until the conflict is resolved."
  },
  {
    id: 25,
    category: "Mixed Mastery",
    question: "In a /30 subnet, how many usable IP addresses are available for host devices?",
    options: ["4", "2", "1", "0"],
    answer: 1,
    explanation: "2^2 = 4 total IPs. 4 - 2 = 2 usable. These are often used for point-to-point links between two routers."
  },
  {
    id: 26,
    category: "Mixed Mastery",
    question: "What command in Windows PowerShell would you use to rename a computer and reboot it immediately?",
    options: ["Set-ComputerName -Name 'New' -Reboot", "Rename-Computer -NewName 'New' -Restart", "netdom renamecomputer", "hostname 'New'"],
    answer: 1,
    explanation: "Rename-Computer with the -Restart flag is the PowerShell standard."
  },
  {
    id: 27,
    category: "Mixed Mastery",
    question: "Which Linux command allows you to view the last 10 lines of a file, commonly used for monitoring logs?",
    options: ["head", "cat", "tail", "less"],
    answer: 2,
    explanation: "tail shows the end of a file. 'tail -f' follows it in real-time."
  },
  {
    id: 28,
    category: "Mixed Mastery",
    question: "True or False: An AAAA record is used to map a hostname to an IPv6 address.",
    options: ["True", "False"],
    answer: 0,
    explanation: "Correct. A is for IPv4, AAAA is for IPv6."
  },
  {
    id: 29,
    category: "Mixed Mastery",
    question: "In the context of the 'DORA' process, which message is sent by the server to confirm the client can use the IP?",
    options: ["Offer", "Request", "Acknowledge", "Discovery"],
    answer: 2,
    explanation: "Acknowledge (DHCPACK) is the final confirmation step."
  },
  {
    id: 30,
    category: "Mixed Mastery",
    question: "What is the primary disadvantage of a Microkernel architecture (like Windows)?",
    options: ["Unstable", "Insecure", "Slower performance due to IPC (Inter-Process Communication)", "Requires less memory"],
    answer: 2,
    explanation: "Microkernels are very stable but slower because components must pass messages across memory boundaries."
  },
  {
    id: 31,
    category: "Security & Remote Access",
    question: "What is the most secure way to authenticate via SSH?",
    options: ["Strong password", "Root login", "SSH Key Authentication", "PIN code"],
    answer: 2,
    explanation: "SSH keys are cryptographic and immune to brute-force password guessing."
  },
  {
    id: 32,
    category: "Security & Remote Access",
    question: "Which Ubuntu utility is used to manage the firewall easily?",
    options: ["iptables", "firewalld", "UFW (Uncomplicated Firewall)", "Defender"],
    answer: 2,
    explanation: "UFW is the standard user-friendly wrapper for iptables in Ubuntu."
  },
  {
    id: 33,
    category: "Security & Remote Access",
    question: "What is the command to check the status of UFW?",
    options: ["ufw check", "sudo ufw status", "ufw list", "service ufw status"],
    answer: 1,
    explanation: "sudo ufw status shows if the firewall is active and which rules are applied."
  },
  {
    id: 34,
    category: "Security & Remote Access",
    question: "To prevent 'noise' from automated bots, what is a recommended (though not foolproof) SSH hardening step?",
    options: ["Disable SSH", "Change the default port (e.g., from 22 to 2222)", "Use a longer username", "Restart the server daily"],
    answer: 1,
    explanation: "Changing the port reduces 'noise' from bots that only scan port 22."
  },
  {
    id: 35,
    category: "Security & Remote Access",
    question: "Which tool automatically bans IP addresses that show malicious signs, such as too many failed login attempts?",
    options: ["UFW", "Fail2Ban", "ClamAV", "Lynis"],
    answer: 1,
    explanation: "Fail2Ban monitors logs and dynamically updates firewall rules to block attackers."
  },
  {
    id: 36,
    category: "Security & Remote Access",
    question: "In Windows Firewall, which rule type controls traffic going OUT from your computer?",
    options: ["Inbound Rules", "Outbound Rules", "Connection Security Rules", "Monitoring"],
    answer: 1,
    explanation: "Outbound rules control what your computer is allowed to send out to the network."
  },
  {
    id: 37,
    category: "Security & Remote Access",
    question: "True or False: You should always enable the firewall before ensuring you have allowed your SSH port, just to be safe.",
    options: ["True", "False"],
    answer: 1,
    explanation: "False! If you enable the firewall without allowing SSH first, you will be locked out of your remote server."
  },
  {
    id: 38,
    category: "Security & Remote Access",
    question: "Which tool is a security auditing tool for Linux systems?",
    options: ["ClamAV", "Lynis", "Logwatch", "Webmin"],
    answer: 1,
    explanation: "Lynis performs an extensive health check and security audit of Linux systems."
  },
  {
    id: 39,
    category: "Security & Remote Access",
    question: "What is the default port for Webmin?",
    options: ["80", "443", "10000", "8080"],
    answer: 2,
    explanation: "Webmin typically listens on port 10000."
  },
  {
    id: 40,
    category: "Security & Remote Access",
    question: "In Windows Defender Firewall, what component adds protection using authentication and encryption (IPsec)?",
    options: ["Inbound Rules", "Outbound Rules", "Connection Security Rules", "Monitoring"],
    answer: 2,
    explanation: "Connection Security Rules enforce IPsec for secure communications."
  },
  {
    id: 41,
    category: "Networking Fundamentals",
    question: "What does the 'Binary' system used by computers consist of?",
    options: ["Numbers 0-9", "Letters A-F", "0s and 1s", "Dots and Dashes"],
    answer: 2,
    explanation: "Binary is base-2, representing electrical states as 0 (off) or 1 (on)."
  },
  {
    id: 42,
    category: "Networking Fundamentals",
    question: "Convert the CIDR /24 to a decimal Subnet Mask.",
    options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
    answer: 2,
    explanation: "/24 means the first 24 bits are 1s, which is three octets of 255."
  },
  {
    id: 43,
    category: "Networking Fundamentals",
    question: "Why is IP address 127.0.0.1 special?",
    options: ["It is the first IP ever created.", "It refers to the local machine (localhost).", "It is the IP of Google's DNS.", "It is the broadcast address."],
    answer: 1,
    explanation: "127.0.0.1 is the standard loopback address."
  },
  {
    id: 44,
    category: "DNS & BIND9",
    question: "What is the command to check a specific BIND9 zone file for errors?",
    options: ["named-checkconf", "named-checkzone", "bind-verify", "check-dns"],
    answer: 1,
    explanation: "named-checkzone checks a specific zone file, while named-checkconf checks the main config."
  },
  {
    id: 45,
    category: "DNS & BIND9",
    question: "In DNS, what does 'Recursion' mean?",
    options: ["The server crashes repeatedly.", "The server queries other DNS servers on behalf of the client.", "The server only looks at its own records.", "The server sends an error back immediately."],
    answer: 1,
    explanation: "Recursion allows a resolver to hunt down an answer from root to TLD to authoritative servers."
  },
  {
    id: 46,
    category: "DHCP",
    question: "In the DORA process, which message is a broadcast sent by the client looking for a server?",
    options: ["Offer", "Request", "Acknowledge", "Discover"],
    answer: 3,
    explanation: "The client sends a DHCPDISCOVER broadcast to find any available DHCP server."
  },
  {
    id: 47,
    category: "DHCP",
    question: "True or False: A DHCP Scope is the range of IP addresses a server is allowed to assign.",
    options: ["True", "False"],
    answer: 0,
    explanation: "Correct. You define the pool of addresses within a 'Scope'."
  },
  {
    id: 48,
    category: "File Sharing",
    question: "Which Samba service is responsible for name resolution (making the server appear in Network places)?",
    options: ["smbd", "nmbd", "sambad", "winbind"],
    answer: 1,
    explanation: "nmbd handles NetBIOS name resolution and service announcements."
  },
  {
    id: 49,
    category: "File Sharing",
    question: "What is the default Windows command to access a network share via IP?",
    options: ["//192.168.1.10/share", "\\\\192.168.1.10\\share", "ftp://192.168.1.10", "connect 192.168.1.10"],
    answer: 1,
    explanation: "Windows uses backslashes (\\\\) for UNC paths."
  },
  {
    id: 50,
    category: "Final Mastery",
    question: "What is the 'SuperUser Do' command in Linux that allows a user to execute commands with root privileges?",
    options: ["runas", "sudo", "root", "admin"],
    answer: 1,
    explanation: "Sudo (SuperUser Do) is the standard way to elevate privileges temporarily."
  }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerOptionClick = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    const nextQ = currentQuestion + 1;
    if (nextQ < quizData.length) {
      setCurrentQuestion(nextQ);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizStarted(false);
  };

  const getProgressWidth = () => {
    return `${((currentQuestion + 1) / quizData.length) * 100}%`;
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="text-blue-600 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Midterm Reviewer</h1>
          <p className="text-slate-600 mb-8">50 Tricky Questions to Master Module 2 & Foundations</p>
          <div className="space-y-4 mb-8 text-left">
            <div className="flex items-center gap-3 text-slate-700">
              <Network className="w-5 h-5 text-blue-500" />
              <span>Networking & Subnetting</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <span>Security & Firewalling</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-purple-500" />
              <span>DNS, DHCP & Samba</span>
            </div>
          </div>
          <button
            onClick={() => setQuizStarted(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95"
          >
            Start Mastery Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 md:p-8">
      {showScore ? (
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center animate-in fade-in duration-500">
          <Award className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
          <p className="text-xl text-slate-500 mb-8">You mastered Module 2!</p>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <div className="text-6xl font-black text-blue-600 mb-2">{score} / {quizData.length}</div>
            <div className="text-slate-600 font-medium">Your Accuracy: {Math.round((score / quizData.length) * 100)}%</div>
          </div>

          <p className="text-slate-600 italic mb-10 px-4">
            {score === quizData.length ? "Perfect Score! You are officially a SysAdmin Pro." :
              score > 40 ? "Excellent work! You have a strong grasp of the material." :
                score > 30 ? "Good job! A little more review and you'll be perfect." :
                  "Keep studying! System Administration takes practice."}
          </p>

          <button
            onClick={restartQuiz}
            className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
          >
            <RotateCcw className="w-5 h-5" /> Try Again
          </button>
        </div>
      ) : (
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full mb-2 inline-block">
                {quizData[currentQuestion].category}
              </span>
              <h1 className="text-2xl font-bold text-slate-800">Question {currentQuestion + 1} of {quizData.length}</h1>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-slate-500">Score: <span className="text-blue-600 font-bold">{score}</span></span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300 ease-out"
              style={{ width: getProgressWidth() }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8 leading-relaxed">
              {quizData[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  disabled={isAnswered}
                  onClick={() => handleAnswerOptionClick(index)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group
                    ${!isAnswered ? 'border-slate-100 hover:border-blue-400 hover:bg-blue-50' :
                      index === quizData[currentQuestion].answer ? 'border-green-500 bg-green-50' :
                        selectedOption === index ? 'border-red-500 bg-red-50' : 'border-slate-100 opacity-60'}
                  `}
                >
                  <span className={`text-lg font-medium ${isAnswered && index === quizData[currentQuestion].answer ? 'text-green-700' : 'text-slate-700'}`}>
                    {option}
                  </span>
                  {isAnswered && index === quizData[currentQuestion].answer && (
                    <CheckCircle2 className="text-green-500 w-6 h-6 flex-shrink-0" />
                  )}
                  {isAnswered && selectedOption === index && index !== quizData[currentQuestion].answer && (
                    <XCircle className="text-red-500 w-6 h-6 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {isAnswered && (
              <div className="mt-8 animate-in slide-in-from-bottom-4 duration-300">
                <div className="bg-slate-50 rounded-2xl p-6 border-l-4 border-blue-500 mb-6">
                  <p className="text-slate-700 leading-relaxed italic">
                    <span className="font-bold text-blue-600 block mb-1">Knowledge Check:</span>
                    {quizData[currentQuestion].explanation}
                  </p>
                </div>
                <button
                  onClick={nextQuestion}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                >
                  {currentQuestion + 1 === quizData.length ? 'Finish Quiz' : 'Next Question'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}