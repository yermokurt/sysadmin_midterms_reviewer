import React, { useState } from 'react';
import {
    Terminal,
    ChevronRight,
    RotateCcw,
    CheckCircle,
    XCircle,
    BarChart3,
    Search,
    Code2,
    ArrowLeft
} from 'lucide-react';

const technicalQuestions = [
    // --- SECTION 1: LINUX CLI & SYSTEM MANAGEMENT (Questions 1-50) ---
    {
        id: 1,
        category: "Linux CLI",
        question: "Which command and flag are used to remove a directory and its entire contents recursively without being prompted for confirmation?",
        options: ["rm -d", "rm -rf", "del /s", "mkdir -p"],
        answer: 1,
        explanation: `The -r flag stands for recursive and -f stands for force, which bypasses confirmation prompts.`
    },
    {
        id: 2,
        category: "Linux CLI",
        question: "You need to display the last 50 lines of '/var/log/syslog' and keep the output updating in real-time as new logs arrive. Which command is correct?",
        options: ["tail -n 50 -f /var/log/syslog", "head -n 50 /var/log/syslog", "cat /var/log/syslog | less", "grep -f 50 /var/log/syslog"],
        answer: 0,
        explanation: `-n 50 sets the line count, and -f (follow) monitors the file for updates.`
    },
    {
        id: 3,
        category: "Linux CLI",
        question: "Which permission string corresponds to the numeric mode 'chmod 755'?",
        options: ["rwx------", "rwxr-xr-x", "rwxrwxrwx", "rw-r--r--"],
        answer: 1,
        explanation: `7 (rwx), 5 (r-x), 5 (r-x).`
    },
    {
        id: 4,
        category: "Linux CLI",
        question: "Which command shows the current user's username and the directory they are currently in?",
        options: ["whoami && pwd", "hostname -f", "id -u", "ls -l"],
        answer: 0,
        explanation: `whoami returns the current user, and pwd (print working directory) returns the path.`
    },
    {
        id: 5,
        category: "Linux CLI",
        question: "To change the owner of 'file.txt' to 'admin' and the group to 'staff', which command is used?",
        options: ["chmod admin:staff file.txt", "chown admin:staff file.txt", "chgrp admin file.txt", "usermod -G staff admin"],
        answer: 1,
        explanation: `chown (change owner) handles both user and group using the user:group syntax.`
    },
    {
        id: 6,
        category: "Linux CLI",
        question: "Which 'systemctl' command ensures that a service (e.g., apache2) starts automatically when the server boots up?",
        options: ["systemctl start apache2", "systemctl enable apache2", "systemctl status apache2", "systemctl restart apache2"],
        answer: 1,
        explanation: `Enable creates the symbolic links necessary for the service to start at boot.`
    },
    {
        id: 7,
        category: "Linux CLI",
        question: "You want to find all running processes that belong to the user 'www-data'. Which pipe is most effective?",
        options: ["ps aux | grep www-data", "top -u www-data", "ls -l /proc | grep www-data", "Both A and B are valid"],
        answer: 3,
        explanation: `ps aux piped to grep filters for the string, while top -u is a built-in filter for users.`
    },
    {
        id: 8,
        category: "Linux CLI",
        question: "Which utility is used to monitor disk usage in a human-readable format (e.g., GB, MB)?",
        options: ["free -h", "df -h", "lsblk", "top"],
        answer: 1,
        explanation: `df (disk free) with the -h (human) flag shows filesystem usage.`
    },
    {
        id: 9,
        category: "Linux CLI",
        question: "Which 'apt' command is used to update the local package index but NOT upgrade the actual packages?",
        options: ["sudo apt upgrade", "sudo apt install", "sudo apt update", "sudo apt full-upgrade"],
        answer: 2,
        explanation: `update only refreshes the list of available versions from the repositories.`
    },
    {
        id: 10,
        category: "Linux CLI",
        question: "What does the command 'ls -la' display?",
        options: ["Only directories", "All files including hidden ones with metadata", "Only large files", "Only symbolic links"],
        answer: 1,
        explanation: `-l is long format (metadata) and -a is all (hidden files starting with a dot).`
    },
    {
        id: 11,
        category: "Linux CLI",
        question: "Which command would you use to create a nested directory structure 'project/src/lib' in one go?",
        options: ["mkdir project/src/lib", "mkdir -p project/src/lib", "mkdir -r project/src/lib", "touch project/src/lib"],
        answer: 1,
        explanation: `-p creates parent directories as needed.`
    },
    {
        id: 12,
        category: "Linux CLI",
        question: "What is the result of 'mv data.txt backup.txt' if backup.txt already exists?",
        options: ["An error is thrown", "data.txt is moved inside backup.txt", "backup.txt is overwritten by data.txt", "The operation is ignored"],
        answer: 2,
        explanation: `By default, mv overwrites the target file if it exists.`
    },
    {
        id: 13,
        category: "Linux CLI",
        question: "Which command shows only the lines in 'access.log' that contain the word 'Error', ignoring case?",
        options: ["grep -i 'Error' access.log", "grep -v 'Error' access.log", "cat access.log | grep -n Error", "tail access.log 'Error'"],
        answer: 0,
        explanation: `-i stands for ignore-case.`
    },
    {
        id: 14,
        category: "Linux CLI",
        question: "Which command is used to securely copy a file 'key.txt' from a local machine to a remote server at '10.0.0.5'?",
        options: ["cp key.txt 10.0.0.5:/tmp", "scp key.txt user@10.0.0.5:/tmp", "ssh key.txt 10.0.0.5", "ftp key.txt 10.0.0.5"],
        answer: 1,
        explanation: `scp (secure copy) uses SSH to transfer files between hosts.`
    },
    {
        id: 15,
        category: "Linux CLI",
        question: "Which file contains the configuration for the SSH daemon on an Ubuntu server?",
        options: ["/etc/ssh/ssh_config", "/etc/ssh/sshd_config", "/etc/bashrc", "/var/log/auth.log"],
        answer: 1,
        explanation: `sshd_config controls the 'daemon' (server-side) settings.`
    },
    {
        id: 16,
        category: "Linux CLI",
        question: "In Ubuntu, how do you add a user 'bob' to the 'sudo' group?",
        options: ["sudo useradd bob", "sudo usermod -aG sudo bob", "sudo chmod +x bob", "sudo chown bob sudo"],
        answer: 1,
        explanation: `-aG appends the user to the specified group without removing them from others.`
    },
    {
        id: 17,
        category: "Linux CLI",
        question: "What is the purpose of the 'cat' command?",
        options: ["To delete files", "To concatenate and display file content", "To search for files", "To create directories"],
        answer: 1,
        explanation: `Short for concatenate, it is most often used to print file contents to the terminal.`
    },
    {
        id: 18,
        category: "Linux CLI",
        question: "Which command restarts the BIND9 service after a configuration change?",
        options: ["systemctl enable bind9", "systemctl reload bind9", "systemctl restart bind9", "Both B and C are valid"],
        answer: 3,
        explanation: `Restart stops/starts the process; reload only re-reads configuration files without dropping the process.`
    },
    {
        id: 19,
        category: "Linux CLI",
        question: "Which tool provides an interactive, real-time view of CPU and memory usage, often called a more visual version of 'top'?",
        options: ["ps", "df", "htop", "uptime"],
        answer: 2,
        explanation: `htop is a popular interactive process viewer.`
    },
    {
        id: 20,
        category: "Linux CLI",
        question: "To display the first 10 lines of a file, which command is used?",
        options: ["head", "tail", "less", "cat"],
        answer: 0,
        explanation: `head outputs the beginning of a file.`
    },
    {
        id: 21,
        category: "Linux CLI",
        question: "What does the command 'ss -tuln' show?",
        options: ["All files in the system", "Active TCP/UDP listening ports", "The user's password", "The server's uptime"],
        answer: 1,
        explanation: `-t (TCP), -u (UDP), -l (Listening), -n (Numeric). Shows what the server is listening for.`
    },
    {
        id: 22,
        category: "Linux CLI",
        question: "Which command prints the full path of the current directory?",
        options: ["path", "pwd", "cd", "ls"],
        answer: 1,
        explanation: `Print Working Directory (pwd).`
    },
    {
        id: 23,
        category: "Linux CLI",
        question: "To search for the word 'Failed' in all files within the '/var/log' directory recursively, which command is best?",
        options: ["grep 'Failed' /var/log", "grep -r 'Failed' /var/log", "find /var/log 'Failed'", "cat /var/log | grep 'Failed'"],
        answer: 1,
        explanation: `-r enables recursive searching through all subdirectories.`
    },
    {
        id: 24,
        category: "Linux CLI",
        question: "Which command shows the current system date and time?",
        options: ["clock", "time", "date", "uptime"],
        answer: 2,
        explanation: `date prints the system time.`
    },
    {
        id: 25,
        category: "Linux CLI",
        question: "Which command is used to see the kernel version of a Linux system?",
        options: ["lsb_release -a", "uname -a", "hostnamectl", "All of the above"],
        answer: 3,
        explanation: `All these commands provide varying levels of system and kernel information.`
    },
    {
        id: 26,
        category: "Linux CLI",
        question: "What is the default terminal-based text editor often used in Ubuntu for its simplicity?",
        options: ["Vim", "Nano", "Notepad", "Emacs"],
        answer: 1,
        explanation: `Nano is the default easy-to-use editor for beginners in Ubuntu.`
    },
    {
        id: 27,
        category: "Linux CLI",
        question: "How do you display memory usage (RAM) in human-readable format?",
        options: ["df -h", "free -h", "mem -h", "top"],
        answer: 1,
        explanation: `free displays the amount of free and used system memory.`
    },
    {
        id: 28,
        category: "Linux CLI",
        question: "Which command would you use to permanently delete a file named 'secrets.txt'?",
        options: ["mv secrets.txt /tmp", "rm secrets.txt", "rmdir secrets.txt", "erase secrets.txt"],
        answer: 1,
        explanation: `rm (remove) deletes the file.`
    },
    {
        id: 29,
        category: "Linux CLI",
        question: "What does the command 'touch file.txt' do if file.txt already exists?",
        options: ["It deletes the file", "It opens the file in an editor", "It updates the file's access/modification timestamp", "It does nothing"],
        answer: 2,
        explanation: `If it exists, touch only updates the timestamp; if not, it creates an empty file.`
    },
    {
        id: 30,
        category: "Linux CLI",
        question: "Which 'grep' flag shows the line number where a match was found?",
        options: ["-l", "-n", "-c", "-v"],
        answer: 1,
        explanation: `-n prefixes each line of output with the 1-based line number within its input file.`
    },
    {
        id: 31,
        category: "Linux CLI",
        question: "Which command allows you to change your current user to another user, like 'su - bob'?",
        options: ["sudo", "su", "chuser", "whoami"],
        answer: 1,
        explanation: `su (substitute user) allows you to log in as another user.`
    },
    {
        id: 32,
        category: "Linux CLI",
        question: "To remove an empty directory named 'old_data', which command is safest?",
        options: ["rm -rf old_data", "rmdir old_data", "del old_data", "mkdir -x old_data"],
        answer: 1,
        explanation: `rmdir only works if the directory is empty, preventing accidental data loss.`
    },
    {
        id: 33,
        category: "Linux CLI",
        question: "Which command shows the hostname of the server?",
        options: ["name", "hostname", "whoami", "ip addr"],
        answer: 1,
        explanation: `hostname prints the system name.`
    },
    {
        id: 34,
        category: "Linux CLI",
        question: "How do you search for a specific process (e.g., 'nginx') in the 'top' interface?",
        options: ["Press 's'", "Press 'u'", "Press 'o'", "Type '/nginx' and Enter"],
        answer: 3,
        explanation: `Just like in 'less', '/' starts a search in many terminal applications.`
    },
    {
        id: 35,
        category: "Linux CLI",
        question: "What is the purpose of 'sed'?",
        options: ["Searching for files", "Stream Editor for filtering and transforming text", "Managing system services", "Disk partitioning"],
        answer: 1,
        explanation: `sed is a powerful tool for 'find and replace' in text streams.`
    },
    {
        id: 36,
        category: "Linux CLI",
        question: "Which command shows the IP addresses assigned to all network interfaces?",
        options: ["ifconfig", "ip addr", "netstat -i", "Both A and B"],
        answer: 3,
        explanation: `ip addr is the modern standard, while ifconfig is legacy (from net-tools).`
    },
    {
        id: 37,
        category: "Linux CLI",
        question: "What does the command 'ls -S' do?",
        options: ["Sorts files by size", "Shows hidden files", "Sorts files by date", "Searches for files"],
        answer: 0,
        explanation: `-S sorts the file list by size, largest first.`
    },
    {
        id: 38,
        category: "Linux CLI",
        question: "Which command is used to read manual pages for other commands?",
        options: ["help", "info", "man", "guide"],
        answer: 2,
        explanation: `man (manual) provides documentation for CLI utilities.`
    },
    {
        id: 39,
        category: "Linux CLI",
        question: "How do you view the total uptime of a server?",
        options: ["date", "uptime", "time", "who"],
        answer: 1,
        explanation: `uptime shows how long the system has been running since the last reboot.`
    },
    {
        id: 40,
        category: "Linux CLI",
        question: "Which command would you use to check the status of the 'ufw' firewall?",
        options: ["ufw status", "sudo ufw status", "systemctl status ufw", "Both B and C"],
        answer: 3,
        explanation: `You can check the app status via sudo ufw, and the system service status via systemctl.`
    },
    {
        id: 41,
        category: "Linux CLI",
        question: "What is the purpose of the 'awk' command?",
        options: ["Renaming files", "Pattern scanning and processing language for columns of data", "Editing binary files", "Backing up directories"],
        answer: 1,
        explanation: `awk is excellent for extracting specific columns from text output.`
    },
    {
        id: 42,
        category: "Linux CLI",
        question: "Which command is used to safely reboot a Linux server?",
        options: ["sudo poweroff", "sudo reboot", "sudo shutdown -r now", "Both B and C"],
        answer: 3,
        explanation: `Both 'reboot' and 'shutdown -r' trigger a system restart.`
    },
    {
        id: 43,
        category: "Linux CLI",
        question: "Which command allows you to view the content of a file one page at a time with the ability to scroll back up?",
        options: ["more", "less", "cat", "tail"],
        answer: 1,
        explanation: `less is superior to 'more' as it allows backward navigation and is faster on large files.`
    },
    {
        id: 44,
        category: "Linux CLI",
        question: "In Ubuntu, how do you install a package named 'git'?",
        options: ["sudo apt update git", "sudo apt install git", "sudo apt upgrade git", "sudo get git"],
        answer: 1,
        explanation: `install is the flag to download and setup new software.`
    },
    {
        id: 45,
        category: "Linux CLI",
        question: "What is the 'pipe' symbol used for in Linux (|)?",
        options: ["To delete text", "To send the output of one command as input to another", "To create an or condition", "To hide output"],
        answer: 1,
        explanation: `Piping allows for complex command chains.`
    },
    {
        id: 46,
        category: "Linux CLI",
        question: "Which command shows who is currently logged into the server?",
        options: ["who", "w", "whoami", "All of the above"],
        answer: 3,
        explanation: `who/w shows all users; whoami shows your current user.`
    },
    {
        id: 47,
        category: "Linux CLI",
        question: "What does 'grep -v' do?",
        options: ["Inverts the match (shows lines that do NOT contain the pattern)", "Shows version info", "Validates the file", "Visualizes the match"],
        answer: 0,
        explanation: `-v stands for invert match.`
    },
    {
        id: 48,
        category: "Linux CLI",
        question: "Which 'systemctl' command shows whether a service is active or has errors?",
        options: ["systemctl enable", "systemctl status", "systemctl log", "systemctl info"],
        answer: 1,
        explanation: `Status provides the current operational state and recent logs for a service.`
    },
    {
        id: 49,
        category: "Linux CLI",
        question: "Which command displays the contents of the root directory?",
        options: ["ls ~", "ls /", "ls ..", "ls ."],
        answer: 1,
        explanation: `The symbol '/' represents the root directory, while '~' is the user home directory.`
    },
    {
        id: 50,
        category: "Linux CLI",
        question: "How do you force-quit a process if you know its PID (e.g., 1234)?",
        options: ["stop 1234", "end 1234", "kill -9 1234", "exit 1234"],
        answer: 2,
        explanation: `-9 (SIGKILL) forces the process to terminate immediately.`
    },

    // --- SECTION 2: DNS & BIND9 (Questions 51-150) - CODE FOCUSED ---
    {
        id: 51,
        category: "BIND9 Syntax",
        question: "In BIND9, what is the mandatory character used to terminate almost every statement line within 'named.conf' files?",
        options: [";", ".", ":", ","],
        answer: 0,
        explanation: `Failing to include a semicolon at the end of a line in named.conf is the #1 cause of BIND configuration errors.`
    },
    {
        id: 52,
        category: "BIND9 Configuration",
        question: "Which block in 'named.conf.options' is used to define DNS servers that your BIND server will query if it doesn't have an answer locally?",
        options: ["forwarders { ... };", "recursive-servers { ... };", "upstream-dns { ... };", "lookup-points { ... };"],
        answer: 0,
        explanation: `The 'forwarders' block contains the IP addresses of external DNS resolvers like Google (8.8.8.8).`
    },
    {
        id: 53,
        category: "Zone File Syntax",
        question: "What is the purpose of the '$ORIGIN' directive in a BIND9 zone file?",
        options: ["It defines the primary master server", "It sets the base domain name used to qualify relative (unqualified) names in the file", "It sets the IP address of the server", "It resets the serial number"],
        answer: 1,
        explanation: `If $ORIGIN is example.com., a record like 'www' automatically becomes 'www.example.com.'`
    },
    {
        id: 54,
        category: "SOA Record Logic",
        question: "A zone file serial number is traditionally formatted as 'YYYYMMDDNN'. What does 'NN' represent?",
        options: ["Network Number", "The revision count for that specific day", "Name Node", "Next Notification"],
        answer: 1,
        explanation: `It is a 2-digit counter for how many times the zone was edited on a single day.`
    },
    {
        id: 55,
        category: "BIND9 Syntax",
        question: "Which directive in a zone file sets the default cache time for all records that don't have an explicit TTL?",
        options: ["$TTL", "$CACHE", "$TIMEOUT", "$EXPIRE"],
        answer: 0,
        explanation: `$TTL (Time To Live) must be defined at the top of the zone file, usually in seconds.`
    },
    {
        id: 56,
        category: "BIND9 Configuration",
        question: "In 'named.conf.local', what does the 'type master;' statement indicate?",
        options: ["The server is the primary source of truth for the zone", "The server is a read-only copy", "The server is a hidden master", "The server is the root hints provider"],
        answer: 0,
        explanation: `'type master;' means this server holds the original, editable version of the zone database.`
    },
    {
        id: 57,
        category: "CLI Troubleshooting",
        question: "Which command would you use to verify if your 'named.conf.options' file has syntax errors?",
        options: ["named-checkzone", "named-checkconf", "bind-syntax", "dig -z"],
        answer: 1,
        explanation: `named-checkconf parses the main configuration files and reports errors if semicolons or brackets are missing.`
    },
    {
        id: 58,
        category: "Reverse DNS Logic",
        question: "If your network is 192.168.10.0/24, what is the correct zone name in 'named.conf.local' for the reverse lookup zone?",
        options: ["192.168.10.in-addr.arpa", "10.168.192.in-addr.arpa", "192.168.10.reverse", "arpa.10.168.192"],
        answer: 1,
        explanation: `Reverse DNS zones reverse the first three octets of the IP and append 'in-addr.arpa'.`
    },
    {
        id: 59,
        category: "Zone File Syntax",
        question: "Inside a zone file, what record type is used to map an IP address (e.g., 192.168.1.5) to a name (e.g., host.example.com)?",
        options: ["A", "CNAME", "PTR", "MX"],
        answer: 2,
        explanation: `PTR (Pointer) records are exclusively used in Reverse Lookup zones.`
    },
    {
        id: 60,
        category: "CLI Troubleshooting",
        question: "To check the specific zone file 'db.example.com' for the domain 'example.com', which command is correct?",
        options: ["named-checkconf db.example.com", "named-checkzone example.com /etc/bind/db.example.com", "dig -f db.example.com", "ls -l /etc/bind/"],
        answer: 1,
        explanation: `named-checkzone requires the domain name followed by the path to the physical file.`
    },
    {
        id: 61,
        category: "BIND9 Configuration",
        question: "What does the directive 'allow-query { 192.168.1.0/24; };' achieve in BIND9 options?",
        options: ["Only devices on the 192.168.1.0/24 network can ask this server for names", "The server will only resolve names for the 192.168.1.0/24 network", "The server will block the 192.168.1.0/24 network", "It enables recursion for everyone"],
        answer: 0,
        explanation: `It is a security ACL (Access Control List) that restricts who can query the DNS server.`
    },
    {
        id: 62,
        category: "SOA Record Parameters",
        question: "In an SOA record, the 'Refresh' value determines what?",
        options: ["How often the master reboots", "How often a secondary server checks the master's serial number for changes", "How often the cache is cleared", "The speed of the network"],
        answer: 1,
        explanation: `Refresh interval (e.g., 3600s) tells slave servers when to poll the master to see if they need to update.`
    },
    {
        id: 63,
        category: "Dig Command Mastery",
        question: "Which 'dig' flag or argument ensures you get a 'short' output containing only the IP address of the target?",
        options: ["+short", "-ip", "+clean", "--no-comment"],
        answer: 0,
        explanation: `dig +short example.com will return '93.184.216.34' without the headers or metadata.`
    },
    {
        id: 64,
        category: "Record Syntax",
        question: "What is the correct syntax for a CNAME record that points 'ftp' to 'www' in the same zone?",
        options: ["ftp IN CNAME www", "www IN CNAME ftp", "ftp IN A www", "www IN A 192.168.1.1"],
        answer: 0,
        explanation: `The alias comes first, then CNAME, then the target canonical name.`
    },
    {
        id: 65,
        category: "BIND9 Configuration",
        question: "In BIND9, what is the default user account that usually owns the files in '/etc/bind'?",
        options: ["root", "dns", "bind", "named"],
        answer: 2,
        explanation: `For security, BIND9 runs under the 'bind' user account in Ubuntu.`
    },
    {
        id: 66,
        category: "Zone File Syntax",
        question: "What does a trailing dot '.' at the end of a hostname (e.g., google.com.) mean in a zone file?",
        options: ["It signifies the record is invisible", "It means the name is Fully Qualified (FQDN) and should NOT have the $ORIGIN appended", "It is an error", "It signifies an IPv6 address"],
        answer: 1,
        explanation: `Without the trailing dot, BIND will append the domain name (origin) to the end of the entry.`
    },
    {
        id: 67,
        category: "SOA Record Parameters",
        question: "If a secondary server fails to 'Refresh' its zone data from the master, it waits for the 'Retry' interval. If it fails for the 'Expire' duration, what happens?",
        options: ["It keeps serving stale data forever", "It promotes itself to master", "It stops answering queries for that zone entirely", "It deletes the zone file"],
        answer: 2,
        explanation: `The 'Expire' value is the point where the data is considered too old to trust.`
    },
    {
        id: 68,
        category: "Dig Command Mastery",
        question: "To perform a reverse lookup with 'dig', which flag is used?",
        options: ["-r", "-x", "-rev", "+reverse"],
        answer: 1,
        explanation: `dig -x 192.168.1.10 automatically performs the lookup in the in-addr.arpa zone.`
    },
    {
        id: 69,
        category: "Record Type Technicals",
        question: "What record type allows a domain to specify its mail servers and their priorities?",
        options: ["A", "NS", "MX", "CNAME"],
        answer: 2,
        explanation: `MX (Mail Exchanger) records must point to a hostname (A record), not an IP address directly.`
    },
    {
        id: 70,
        category: "BIND9 configuration",
        question: "Where is the BIND9 service logging information usually found in a system using systemd?",
        options: ["/var/log/bind.log", "journalctl -u named", "/var/log/syslog", "Both B and C are valid"],
        answer: 3,
        explanation: `BIND logs to syslog by default, and journalctl is the standard systemd log viewer.`
    },
    {
        id: 71,
        category: "Zone File Syntax",
        question: "In a zone file, the '@' symbol is a shorthand for what?",
        options: ["The Administrator", "The current origin (domain name)", "A wildcard for all IPs", "The primary DNS IP"],
        answer: 1,
        explanation: `In example.com zone, '@ IN SOA' is the same as 'example.com. IN SOA'.`
    },
    {
        id: 72,
        category: "Record Type Technicals",
        question: "Which record type is used for site verification (e.g., Google/Microsoft) or security policies like SPF?",
        options: ["TXT", "SOA", "PTR", "MX"],
        answer: 0,
        explanation: `TXT records hold arbitrary text strings used for validation or security settings.`
    },
    {
        id: 73,
        category: "Dig Command Mastery",
        question: "What is the command to query the 'NS' (Name Server) records of 'google.com' using the server at '8.8.8.8'?",
        options: ["dig @8.8.8.8 google.com NS", "dig google.com -ns 8.8.8.8", "nslookup google.com 8.8.8.8", "Both A and C are valid"],
        answer: 3,
        explanation: `Both dig and nslookup can target specific servers and record types.`
    },
    {
        id: 74,
        category: "BIND9 Configuration",
        question: "If 'recursion no;' is set in 'named.conf.options', what will happen when a client asks the server for a domain it doesn't own (e.g., google.com)?",
        options: ["The server will crash", "The server will refuse to perform the lookup for the client", "The server will forward the request anyway", "The server will resolve it but slowly"],
        answer: 1,
        explanation: `Disabling recursion prevents the server from acting as a resolver for external names.`
    },
    {
        id: 75,
        category: "Zone File Syntax",
        question: "Which directive in a zone file defines the 'Negative Cache TTL' (how long to cache the fact that a name DOES NOT exist)?",
        options: ["Minimum (the last field in SOA)", "Refresh", "Retry", "$DEFAULT_NEGATIVE"],
        answer: 0,
        explanation: `Modern BIND uses the last value in the SOA record as the NXDOMAIN (Negative) TTL.`
    },
    {
        id: 76,
        category: "Technical Definitions",
        question: "What is 'Zone Walking'?",
        options: ["Moving a zone file to a new server", "A method of enumerating all records in a zone using sequential queries", "Manually editing a zone file", "A type of load balancing"],
        answer: 1,
        explanation: `It is an information-gathering attack where an attacker maps the entire contents of a DNS zone.`
    },
    {
        id: 77,
        category: "BIND9 configuration",
        question: "What does 'allow-transfer { none; };' do for a zone?",
        options: ["It prevents other servers (slaves) from copying the zone database", "It disables all DNS queries", "It blocks the network", "It makes the zone read-only"],
        answer: 0,
        explanation: `It is a security best practice to restrict zone transfers to only authorized slave servers.`
    },
    {
        id: 78,
        category: "DNS Ports",
        question: "Which port and protocol are primarily used for standard DNS queries between clients and servers?",
        options: ["53 / TCP", "53 / UDP", "443 / HTTPS", "80 / TCP"],
        answer: 1,
        explanation: `Standard queries use UDP for speed. TCP is used for large zone transfers or if the packet exceeds 512 bytes.`
    },
    {
        id: 79,
        category: "Zone File Syntax",
        question: "In an AAAA record, the address must be in what format?",
        options: ["IPv4 (Dotted decimal)", "IPv6 (Hexadecimal colon-separated)", "Binary", "MAC Address"],
        answer: 1,
        explanation: `AAAA records are the IPv6 equivalent of A records.`
    },
    {
        id: 80,
        category: "CLI Troubleshooting",
        question: "Which command restarts the BIND service on Ubuntu 24.04?",
        options: ["sudo systemctl restart bind9", "sudo service named restart", "sudo /etc/init.d/bind restart", "sudo systemctl restart dns"],
        answer: 0,
        explanation: `Ubuntu uses the 'bind9' service name for its BIND implementation.`
    },
    {
        id: 81,
        category: "Record Type Technicals",
        question: "What is the purpose of an 'SRV' record?",
        options: ["To store the server serial number", "To locate specific services (like AD Domain Controllers or SIP servers) and their ports", "To map static IPs", "To resolve subdomains"],
        answer: 1,
        explanation: `SRV records provide the port and priority for specific network services.`
    },
    {
        id: 82,
        category: "DNS Theory",
        question: "What is an 'Iterative Query'?",
        options: ["A query where the resolver must get the final answer", "A query where the DNS server either returns the answer or provides a referral to another server", "A query that repeats twice", "A way to check if a server is online"],
        answer: 1,
        explanation: `Root servers and TLD servers typically only perform iterative lookups.`
    },
    {
        id: 83,
        category: "DNS Theory",
        question: "Denoted by a dot '.', where do these 13 global IP addresses reside in the DNS hierarchy?",
        options: ["TLD Servers", "Root Servers", "ISP Resolvers", "Authoritative Masters"],
        answer: 1,
        explanation: `The root servers are the starting point for all recursive DNS lookups.`
    },
    {
        id: 84,
        category: "Windows DNS CMD",
        question: "Which PowerShell command is used to add a new DNS A record to a Windows DNS Server?",
        options: ["Add-DnsServerResourceRecordA", "New-DnsRecord", "Add-A-Record", "Set-DnsHost"],
        answer: 0,
        explanation: `PowerShell DNS modules use the 'Add-DnsServerResourceRecord' prefix followed by the record type.`
    },
    {
        id: 85,
        category: "Zone Transfer Technicals",
        question: "What is an 'AXFR' request?",
        options: ["A full zone transfer request", "An incremental zone transfer", "A simple A record query", "A security handshake"],
        answer: 0,
        explanation: `AXFR copies the entire zone database from master to slave.`
    },
    {
        id: 86,
        category: "Record Priority",
        question: "In an MX record, if Server A has priority 10 and Server B has priority 20, which server will receive mail if both are online?",
        options: ["Server A", "Server B", "Both equally", "Neither"],
        answer: 0,
        explanation: `In DNS priority values, lower numbers are tried first.`
    },
    {
        id: 87,
        category: "Windows DNS Logic",
        question: "In Windows DNS, what is the 'Aging' and 'Scavenging' feature used for?",
        options: ["Updating the server software", "Automatically deleting stale or old dynamically registered records", "Measuring server temperature", "Encrypting the database"],
        answer: 1,
        explanation: `It prevents the DNS database from becoming cluttered with records of devices that no longer exist on the network.`
    },
    {
        id: 88,
        category: "BIND9 Permissions",
        question: "If BIND fails to start with 'Permission Denied' on a zone file, what is the likely cause on a system with AppArmor enabled?",
        options: ["Wrong password", "The file is in a directory not allowed by the AppArmor profile", "The network is down", "The file is too large"],
        answer: 1,
        explanation: `AppArmor strictly controls which paths BIND is allowed to read from and write to.`
    },
    {
        id: 90,
        category: "Record Syntax",
        question: "Which character is used to indicate a comment in a BIND zone file (db.*)?",
        options: ["#", "//", ";", "--"],
        answer: 2,
        explanation: `While named.conf uses # or //, zone files use the semicolon for comments.`
    },
    {
        id: 91,
        category: "DNS Troubleshooting",
        question: "If 'dig' returns a status of 'NXDOMAIN', what does it mean?",
        options: ["The server is offline", "The domain name does not exist", "The server is too busy", "The network is congested"],
        answer: 1,
        explanation: `Non-Existent Domain (NXDOMAIN) means the query was valid, but the name has no record.`
    },
    {
        id: 92,
        category: "DNS Ports Technical",
        question: "Under what specific condition does DNS switch from UDP to TCP for a query?",
        options: ["When the response exceeds 512 bytes", "Always", "When using IPv6", "Only for mail servers"],
        answer: 0,
        explanation: `TCP is used if the response is too large to fit in a single UDP packet or for zone transfers.`
    },
    {
        id: 93,
        category: "Record Technicals",
        question: "What record type provides a human-readable alias that MUST point to an A record, never an IP directly?",
        options: ["CNAME", "PTR", "NS", "SOA"],
        answer: 0,
        explanation: `A CNAME points to another hostname, which must then be resolved to an IP.`
    },
    {
        id: 94,
        category: "Windows DNS Logic",
        question: "What is 'Conditional Forwarding' in Windows DNS?",
        options: ["Forwarding all traffic to Google", "Forwarding queries for a specific domain name to a specific DNS server", "Blocking all traffic", "Forwarding traffic only on weekends"],
        answer: 1,
        explanation: `It is often used in business partnerships to resolve names in another company's network over a VPN.`
    },
    {
        id: 95,
        category: "BIND9 Syntax",
        question: "What does 'recursion yes;' in 'named.conf.options' allow?",
        options: ["The server to resolve local names only", "The server to act as a resolver for its clients to find external websites", "The server to repeat commands", "The server to bypass the firewall"],
        answer: 1,
        explanation: `Without recursion, the server will only answer for zones it is authoritative for.`
    },
    {
        id: 96,
        category: "BIND9 Configuration",
        question: "Which 'named.conf' file is used to store the IPs of the global Root Hints servers?",
        options: ["named.conf.local", "named.conf.default-zones", "named.conf.options", "named.conf"],
        answer: 1,
        explanation: `default-zones typically contains the block that points to the 'db.root' file.`
    },
    {
        id: 97,
        category: "Zone File Technicals",
        question: "Inside a zone file, if the 'Class' field is omitted (e.g., 'www A 192...'), what does it default to?",
        options: ["IN", "CH", "HS", "CS"],
        answer: 0,
        explanation: `IN (Internet) is the default and most widely used class for DNS.`
    },
    {
        id: 98,
        category: "CLI Mastery",
        question: "How do you view the DNS cache on a Windows machine?",
        options: ["ipconfig /viewdns", "ipconfig /displaydns", "nslookup -cache", "netstat -dns"],
        answer: 1,
        explanation: `This command shows all DNS records currently stored in the local resolver cache.`
    },
    {
        id: 99,
        category: "Record Logic",
        question: "What is 'DNS Round Robin'?",
        options: ["A security attack", "Providing multiple A records for one name to distribute traffic across several servers", "A circle of DNS servers", "A recursive loop"],
        answer: 1,
        explanation: `It is a simple load-balancing technique where the server rotates the order of IPs returned.`
    },
    {
        id: 100,
        category: "BIND9 Troubleshooting",
        question: "If you change a record and restart BIND, but clients still see the old result, what is the most likely cause?",
        options: ["BIND didn't restart", "The TTL (Time To Live) hasn't expired yet on the client or ISP side", "The server is out of space", "The internet is down"],
        answer: 1,
        explanation: `Caching is the primary reason DNS changes are not visible immediately.`
    },
    {
        id: 101,
        category: "BIND9 Advanced Syntax",
        question: "Which file is the 'glue' that includes named.conf.options, named.conf.local, and named.conf.default-zones?",
        options: ["/etc/bind/named.conf", "/etc/bind/named.conf.all", "/etc/bind/bind.conf", "/etc/bind/master.conf"],
        answer: 0,
        explanation: `The primary named.conf file uses 'include' statements to load the sub-configurations.`
    },
    {
        id: 102,
        category: "BIND9 Advanced Syntax",
        question: "What is the correct syntax to include a custom file named 'myzones.conf' inside named.conf?",
        options: ["load 'myzones.conf';", "include '/etc/bind/myzones.conf';", "add myzones.conf;", "import myzones.conf;"],
        answer: 1,
        explanation: `Include statements allow for modular configuration management.`
    },
    {
        id: 103,
        category: "SOA Parameters",
        question: "In the SOA record, the 'Minimum' field (the 7th value) is primarily used for what in modern DNS?",
        options: ["The smallest allowed TTL", "The negative caching TTL", "The minimum number of name servers", "The minimum serial number"],
        answer: 1,
        explanation: `It specifies how long a resolver should cache a 'Name Not Found' (NXDOMAIN) response.`
    },
    {
        id: 104,
        category: "Record Interpretation",
        question: "Interpret this record: 'www  3600  IN  A  1.2.3.4'. How long is this record valid in a cache?",
        options: ["3600 seconds (1 hour)", "3600 minutes", "3600 hours", "Permanently"],
        answer: 0,
        explanation: `The value between the hostname and class is the explicit TTL for that specific record.`
    },
    {
        id: 105,
        category: "Record Interpretation",
        question: "If a zone file contains '@  IN  NS  ns1.example.com.' and there is no A record for 'ns1', what will happen?",
        options: ["The zone will fail to load", "DNS resolution for the domain will eventually fail because the name server cannot be found", "It will work fine", "The server will assign a random IP"],
        answer: 1,
        explanation: `This is a 'Glue Record' issue. Name servers mentioned in NS records must have matching A records.`
    },
    {
        id: 106,
        category: "BIND9 Advanced Syntax",
        question: "Which 'options' directive prevents your DNS server from being used in a DNS Amplification attack by unauthorized IPs?",
        options: ["allow-recursion { 127.0.0.1; 192.168.1.0/24; };", "block-external yes;", "stealth-mode active;", "deny-all;"],
        answer: 0,
        explanation: `Restricting recursion ensures only your trusted clients can use the server as a resolver.`
    },
    {
        id: 107,
        category: "DNS Troubleshooting",
        question: "Using 'dig', how do you check for the 'SOA' record of a domain specifically?",
        options: ["dig example.com SOA", "dig -t SOA example.com", "dig soa example.com", "Both A and B are valid"],
        answer: 3,
        explanation: `Dig accepts the record type as a positional argument or with the -t flag.`
    },
    {
        id: 108,
        category: "DNS Troubleshooting",
        question: "You want to see the path a DNS query takes from root servers down to the authoritative server. Which dig flag do you use?",
        options: ["+trace", "+path", "+follow", "+verbose"],
        answer: 0,
        explanation: `+trace mimics the behavior of a recursive resolver, showing every step of the hierarchy.`
    },
    {
        id: 109,
        category: "BIND9 Configuration",
        question: "What is the result of missing a closing brace '}' in 'named.conf.options'?",
        options: ["BIND ignores the rest of the file", "BIND fails to start entirely", "BIND fixes it automatically", "BIND logs a warning but works"],
        answer: 1,
        explanation: `Brace mismatches are fatal syntax errors in BIND.`
    },
    {
        id: 110,
        category: "Windows PowerShell DNS",
        question: "Which cmdlet shows the current DNS cache on a Windows Server via PowerShell?",
        options: ["Get-DnsClientCache", "Show-DnsCache", "Get-Cache -DNS", "Export-DnsCache"],
        answer: 0,
        explanation: `Get-DnsClientCache is the PowerShell equivalent of 'ipconfig /displaydns'.`
    },
    {
        id: 111,
        category: "BIND9 Troubleshooting",
        question: "What does the command 'rndc reload' do?",
        options: ["Reboots the server", "Tells the BIND daemon to re-read configuration and zone files without stopping the service", "Clears the DNS cache", "Installs updates"],
        answer: 1,
        explanation: `rndc is the Remote Name Daemon Control utility for managing BIND.`
    },
    {
        id: 112,
        category: "BIND9 configuration",
        question: "Which file is used to define 'ACLs' (Access Control Lists) to group IP addresses in BIND?",
        options: ["It is usually done inside named.conf.options or a dedicated included file", "acl.conf", "ips.txt", "firewall.conf"],
        answer: 0,
        explanation: `ACLs are custom-defined blocks within the configuration files.`
    },
    {
        id: 113,
        category: "Zone File Syntax",
        question: "What is a 'Wildcard' record in a zone file?",
        options: ["A record that matches any subdomain (e.g., *.example.com)", "A record that changes daily", "A record with no name", "A record for the root"],
        answer: 0,
        explanation: `Wildcards allow you to point all non-defined subdomains to a single IP address.`
    },
    {
        id: 114,
        category: "Advanced Records",
        question: "What is a 'Glue Record' technically?",
        options: ["An A record provided by a parent zone for a name server in a child zone to prevent circular dependency", "A record that 'glues' two zones", "A backup record", "An encrypted record"],
        answer: 0,
        explanation: `If ns1.example.com is the name server for example.com, the .com registry needs a 'glue' A record to find ns1.`
    },
    {
        id: 115,
        category: "Zone File Syntax",
        question: "In a BIND zone file, what happens if the 'Name' field is left blank in a row?",
        options: ["The record is ignored", "It inherits the name from the previous record", "It defaults to the root domain", "It causes an error"],
        answer: 1,
        explanation: `Empty name fields are a shorthand to apply multiple records (like A and MX) to the same hostname.`
    },
    {
        id: 116,
        category: "DNS Theory",
        question: "What is 'Split-Horizon' DNS?",
        options: ["Providing different DNS answers to internal vs external users for the same domain", "Splitting a zone file in half", "Using two DNS servers", "DNS for the horizon"],
        answer: 0,
        explanation: `This allows internal servers to have private IPs while public users see the public IP or nothing at all.`
    },
    {
        id: 117,
        category: "Windows PowerShell DNS",
        question: "Which PowerShell cmdlet is used to check the health of a specific DNS zone?",
        options: ["Test-DnsServerZone", "Get-DnsServerZone", "Check-Zone", "Verify-DnsData"],
        answer: 1,
        explanation: `Get-DnsServerZone returns the status and configuration of a zone.`
    },
    {
        id: 118,
        category: "BIND9 Configuration",
        question: "In 'named.conf.options', what does 'dnssec-validation auto;' enable?",
        options: ["Automatic encryption of queries", "Automatic validation of DNSSEC signatures for security", "Automatic updates", "Automatic firewall rules"],
        answer: 1,
        explanation: `DNSSEC ensures that the DNS data received has not been tampered with.`
    },
    {
        id: 119,
        category: "Record Technicals",
        question: "What is the 'Class' field in 'www  IN  A  1.2.3.4'?",
        options: ["IN", "A", "www", "1.2.3.4"],
        answer: 0,
        explanation: `IN stands for Internet, which is the class for almost all modern DNS records.`
    },
    {
        id: 120,
        category: "CLI Mastery",
        question: "Which command shows the BIND version currently running?",
        options: ["named -v", "bind -v", "dig -v", "rndc version"],
        answer: 0,
        explanation: `named -v (or /usr/sbin/named -v) reports the software version.`
    },
    {
        id: 121,
        category: "Record Interpretation",
        question: "In the zone '1.168.192.in-addr.arpa', what does the record '55  IN  PTR  srv.lab.' resolve?",
        options: ["Maps 192.168.1.55 to srv.lab", "Maps srv.lab to 192.168.1.55", "Nothing", "Maps 55 to srv.lab"],
        answer: 0,
        explanation: `The '55' is relative to the origin '1.168.192.in-addr.arpa', resulting in 192.168.1.55.`
    },
    {
        id: 122,
        category: "Zone File Syntax",
        question: "What is the maximum value for a 32-bit Serial number in a zone file?",
        options: ["4,294,967,295", "99,999,999", "Unlimited", "65,535"],
        answer: 0,
        explanation: `Serial numbers are 32-bit unsigned integers.`
    },
    {
        id: 123,
        category: "DNS Theory",
        question: "What is a 'Stealth Master'?",
        options: [
            "A master server not listed in the NS records of the zone",
            "A master server that is invisible to the firewall",
            "A slave server acting as a master",
            "A server with no IP"
        ],
        answer: 0,
        explanation: `A stealth master provides data to slave servers but is not directly accessible to public clients.`
    },
    {
        id: 124,
        category: "BIND9 configuration",
        question: "What happens if you have two 'zone' blocks for the same domain in named.conf.local?",
        options: ["BIND uses both", "BIND fails to load due to duplicate zone definition", "BIND uses the first one", "BIND merges them"],
        answer: 1,
        explanation: `Duplicate zones are a fatal configuration error.`
    },
    {
        id: 125,
        category: "CLI Mastery",
        question: "Which 'dig' command targets the root servers directly to find the TLD servers for '.ph'?",
        options: ["dig . ph", "dig @a.root-servers.net ph NS", "dig root ph", "dig trace ph"],
        answer: 1,
        explanation: `You can query the root servers (@a... to @m...) to manually perform the iterative steps.`
    },
    {
        id: 126,
        category: "Record Technicals",
        question: "What is the 'Preference' field in 'example.com.  IN  MX  10  mail.example.com.'?",
        options: ["MX", "10", "mail", "IN"],
        answer: 1,
        explanation: `10 is the preference (priority) value.`
    },
    {
        id: 127,
        category: "DNS Ports Technical",
        question: "Which port is used for RNDC (Remote Name Daemon Control) management of BIND?",
        options: ["53", "22", "953", "443"],
        answer: 2,
        explanation: `Port 953 is the default for RNDC control traffic.`
    },
    {
        id: 128,
        category: "Advanced Records",
        question: "What is an 'ALIAS' or 'ANAME' record (non-standard but common in cloud)?",
        options: [
            "A record that acts like a CNAME but returns an A record result at the root of a domain",
            "A type of MX record",
            "A reverse lookup",
            "A script"
        ],
        answer: 0,
        explanation: `Standard CNAMEs cannot exist at the zone root (apex); ALIAS records solve this.`
    },
    {
        id: 129,
        category: "Zone File Syntax",
        question: "What is the result of 'www  IN  CNAME  www.google.com' (Missing trailing dot)?",
        options: ["Resolves to www.google.com", "Resolves to www.google.com.example.com", "Fails", "Crashes BIND"],
        answer: 1,
        explanation: `BIND appends the origin if the dot is missing, creating a broken link.`
    },
    {
        id: 130,
        category: "BIND9 Configuration",
        question: "What does 'listen-on-v6 { any; };' enable?",
        options: ["IPv6 support for BIND queries", "IPv4 support", "Logging", "Security"],
        answer: 0,
        explanation: `This tells BIND to listen for DNS traffic on IPv6 addresses.`
    },
    {
        id: 131,
        category: "CLI Mastery",
        question: "To query ONLY the answer section with dig, which flag do you add?",
        options: ["+noall +answer", "+short", "+minimal", "Both A and B are common"],
        answer: 3,
        explanation: `+noall +answer clears headers and comments, showing just the record.`
    },
    {
        id: 132,
        category: "Windows PowerShell DNS",
        question: "Which cmdlet removes a DNS record on Windows Server?",
        options: ["Remove-DnsServerResourceRecord", "Delete-DnsRecord", "Clear-DnsEntry", "Remove-Host"],
        answer: 0,
        explanation: `Resource records are managed using the Remove-DnsServerResourceRecord cmdlet.`
    },
    {
        id: 133,
        category: "DNS Theory",
        question: "What is 'Lame Delegation'?",
        options: [
            "When a parent zone points to a name server that is not actually authoritative for the child zone",
            "A slow DNS server",
            "A broken network cable",
            "A record with no IP"
        ],
        answer: 0,
        explanation: `It is a common configuration error that breaks resolution for a domain.`
    },
    {
        id: 134,
        category: "BIND9 Configuration",
        question: "In named.conf, how do you specify a different port for BIND to listen on?",
        options: ["port 5353;", "listen-on port 5353 { any; };", "set port 5353;", "bind-port 5353;"],
        answer: 1,
        explanation: `The 'port' keyword inside the listen-on block changes the listener port.`
    },
    {
        id: 135,
        category: "Zone File Syntax",
        question: "What is the first field in an SOA record?",
        options: ["The Primary Master Server (MNAME)", "The Serial Number", "The Administrator Email", "The TTL"],
        answer: 0,
        explanation: `The MNAME field comes first, identifying the primary master for the zone.`
    },
    {
        id: 136,
        category: "Record Interpretation",
        question: "What record type is used to map a domain to a mail server IP?",
        options: ["None. MX records MUST point to hostnames (A/AAAA), never IPs.", "MX", "A", "MX-IP"],
        answer: 0,
        explanation: `This is a trick question. MX records point to names, which then need A records.`
    },
    {
        id: 137,
        category: "CLI Mastery",
        question: "What does the command 'host google.com' do?",
        options: ["Checks if google is online", "Performs a quick DNS lookup for A, AAAA, and MX records", "Opens a website", "Restarts DNS"],
        answer: 1,
        explanation: `'host' is a simpler alternative to 'dig' for quick lookups.`
    },
    {
        id: 138,
        category: "BIND9 Troubleshooting",
        question: "If 'named-checkconf' returns NO output, what does it mean?",
        options: ["No configuration files found", "The configuration syntax is valid", "It failed to run", "Access denied"],
        answer: 1,
        explanation: `No output means success. Errors only appear if there is a problem.`
    },
    {
        id: 139,
        category: "DNS Theory",
        question: "What is a 'Forward lookup' vs 'Reverse lookup'?",
        options: [
            "Name to IP vs IP to Name",
            "IP to Name vs Name to IP",
            "Internal vs External",
            "Master vs Slave"
        ],
        answer: 0,
        explanation: `Forward resolve names to IPs; Reverse resolve IPs back to names.`
    },
    {
        id: 140,
        category: "BIND9 configuration",
        question: "How do you log DNS queries in BIND9?",
        options: [
            "Enable 'querylog yes;' in the logging block",
            "It happens automatically",
            "Check /var/log/auth.log",
            "Not possible"
        ],
        answer: 0,
        explanation: `The logging block in named.conf controls query logging for auditing.`
    },
    {
        id: 141,
        category: "Record Interpretation",
        question: "What is '127.0.0.1' usually mapped to in a default DNS setup?",
        options: ["localhost", "root", "master", "dns"],
        answer: 0,
        explanation: `localhost is the standard name for the loopback interface.`
    },
    {
        id: 142,
        category: "Windows PowerShell DNS",
        question: "Which cmdlet is used to flush the DNS server cache on a Windows Server?",
        options: ["Clear-DnsServerCache", "Flush-DnsCache", "Reset-DnsCache", "Remove-DnsData"],
        answer: 0,
        explanation: `Clear-DnsServerCache wipes the server's recursive lookup cache.`
    },
    {
        id: 143,
        category: "Zone File Syntax",
        question: "Which character marks the beginning of a record name in a zone file?",
        options: ["The first non-whitespace character on a line", "$", "@", "None of the above"],
        answer: 0,
        explanation: `If a line starts with a name, that's the record name. If it starts with space, it's the previous name.`
    },
    {
        id: 144,
        category: "DNS Theory",
        question: "What is the 'DNS Root Zone' signed with?",
        options: ["DNSSEC Key Signing Keys", "SSL Certificates", "Passwords", "SSH Keys"],
        answer: 0,
        explanation: `The root is signed to ensure the integrity of the entire global DNS tree.`
    },
    {
        id: 145,
        category: "BIND9 Configuration",
        question: "In BIND, what is a 'View'?",
        options: [
            "A way to partition the server into different contexts based on the source IP",
            "A type of log",
            "A graphical interface",
            "A backup file"
        ],
        answer: 0,
        explanation: `Views allow for Split-Horizon DNS within a single BIND instance.`
    },
    {
        id: 146,
        category: "CLI Mastery",
        question: "Which dig command checks if a zone transfer is allowed from server 1.2.3.4 for domain example.com?",
        options: ["dig axfr example.com @1.2.3.4", "dig transfer example.com", "dig -z example.com", "dig get-all example.com"],
        answer: 0,
        explanation: `AXFR initiates a zone transfer request.`
    },
    {
        id: 147,
        category: "Windows PowerShell DNS",
        question: "Which cmdlet creates a new primary DNS zone on Windows Server?",
        options: ["Add-DnsServerPrimaryZone", "New-DnsZone", "Create-Zone", "Add-Zone"],
        answer: 0,
        explanation: `The 'Add-DnsServerPrimaryZone' cmdlet is used to initialize new zones.`
    },
    {
        id: 148,
        category: "DNS Theory",
        question: "What is 'Anycast' in DNS?",
        options: [
            "Broadcasting to everyone",
            "Multiple servers sharing the same IP address, with traffic routed to the topologically nearest one",
            "Using any port",
            "Random IP selection"
        ],
        answer: 1,
        explanation: `Anycast is used by root servers and CDNs for high availability and low latency.`
    },
    {
        id: 149,
        category: "BIND9 Syntax",
        question: "How do you close a 'zone' block in named.conf.local?",
        options: ["};", "end zone;", "]", "/zone"],
        answer: 0,
        explanation: `Every block in BIND configuration must end with a closing brace and a semicolon. '};'`
    },
    {
        id: 150,
        category: "Final Technical Question",
        question: "In a 'named.conf.local' zone block, what does 'file \"/etc/bind/db.example\";' define?",
        options: ["The password file", "The path to the physical file containing the DNS records", "The log file", "The backup path"],
        answer: 1,
        explanation: `The 'file' statement points BIND to the actual zone database on the disk.`
    }
];

export default function CodeFocusedQuiz({ onBack }) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAns, setSelectedAns] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizState, setQuizState] = useState('start');

    const handleStart = () => {
        setQuizState('quiz');
        setCurrentIdx(0);
        setScore(0);
    };

    const handleAnswer = (idx) => {
        if (isAnswered) return;
        setSelectedAns(idx);
        setIsAnswered(true);
        if (idx === technicalQuestions[currentIdx].answer) {
            setScore(s => s + 1);
        }
    };

    const nextQuestion = () => {
        setIsAnswered(false);
        setSelectedAns(null);
        if (currentIdx + 1 < technicalQuestions.length) {
            setCurrentIdx(c => c + 1);
        } else {
            setQuizState('end');
        }
    };

    const progress = ((currentIdx + 1) / technicalQuestions.length) * 100;

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 min-h-screen flex flex-col w-full">
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Menu
                </button>

                {quizState === 'start' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                        <div className="flex gap-4">
                            <div className="p-4 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 mb-4 h-fit">
                                <Terminal className="w-16 h-16 text-emerald-400" />
                            </div>
                            <div className="p-4 bg-blue-500/10 rounded-3xl border border-blue-500/20 mb-4 h-fit">
                                <Code2 className="w-16 h-16 text-blue-400" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-5xl font-black tracking-tight text-white">Technical 150</h1>
                            <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                                150 Deep-dive questions on Linux CLI and a massive DNS & BIND9 Syntax Mastery section.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left w-full max-w-2xl">
                            <div className="p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl flex items-center gap-3">
                                <Terminal className="w-5 h-5 text-emerald-400" />
                                <span className="text-sm font-medium">50 Linux CLI Syntax</span>
                            </div>
                            <div className="p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl flex items-center gap-3">
                                <Code2 className="w-5 h-5 text-blue-400" />
                                <span className="text-sm font-medium">100 DNS / BIND9 Code Focused</span>
                            </div>
                        </div>
                        <button
                            onClick={handleStart}
                            className="w-full md:w-auto px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-900/20 active:scale-95 flex items-center gap-3 h-fit mt-8"
                        >
                            INITIALIZE ASSESSMENT <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {quizState === 'quiz' && (
                    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="flex justify-between items-end mb-8">
                            <div className="space-y-2">
                                <div className="inline-flex px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">
                                    {technicalQuestions[currentIdx].category}
                                </div>
                                <h2 className="text-3xl font-bold text-white">Question {currentIdx + 1} of {technicalQuestions.length}</h2>
                            </div>
                            <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/50 text-sm font-bold">
                                Score: <span className="text-emerald-400">{score}</span>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="w-full bg-slate-800 h-2 rounded-full mb-12 overflow-hidden border border-slate-700/30">
                            <div
                                className="bg-gradient-to-r from-emerald-600 to-blue-500 h-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                            <div className="flex gap-4 mb-8">
                                <Search className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                                <h3 className="text-xl md:text-2xl font-bold text-slate-100 leading-relaxed italic">
                                    "{technicalQuestions[currentIdx].question}"
                                </h3>
                            </div>

                            <div className="space-y-4 relative z-10">
                                {technicalQuestions[currentIdx].options.map((option, index) => (
                                    <button
                                        key={index}
                                        disabled={isAnswered}
                                        onClick={() => handleAnswer(index)}
                                        className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group
                                            ${!isAnswered ? 'border-slate-700/50 bg-slate-800/40 hover:border-emerald-500/50 hover:bg-emerald-500/5' :
                                                index === technicalQuestions[currentIdx].answer ? 'border-emerald-500 bg-emerald-500/10 text-emerald-100' :
                                                    selectedAns === index ? 'border-rose-500/50 bg-rose-500/10 text-rose-100 opacity-60' : 'border-slate-700/30 opacity-40'}
                                        `}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-slate-500 font-bold">{String.fromCharCode(65 + index)})</span>
                                            <span className="text-lg font-medium">{option}</span>
                                        </div>
                                        {isAnswered && index === technicalQuestions[currentIdx].answer && (
                                            <CheckCircle className="text-emerald-400 w-6 h-6 flex-shrink-0" />
                                        )}
                                        {isAnswered && selectedAns === index && index !== technicalQuestions[currentIdx].answer && (
                                            <XCircle className="text-rose-400 w-6 h-6 flex-shrink-0" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {isAnswered && (
                                <div className="mt-10 animate-in slide-in-from-bottom-4 duration-500">
                                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 mb-8">
                                        <p className="text-slate-300 leading-relaxed text-sm">
                                            <span className="font-black text-emerald-400 uppercase tracking-tighter block mb-2 text-xs">Technical Explanation</span>
                                            {technicalQuestions[currentIdx].explanation}
                                        </p>
                                    </div>
                                    <button
                                        onClick={nextQuestion}
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-900/20 active:scale-[0.98]"
                                    >
                                        {currentIdx + 1 === technicalQuestions.length ? 'Finalize Assessment' : 'Next Question!!!'}
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {quizState === 'end' && (
                    <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                        <div className="max-w-2xl w-full bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-12 text-center shadow-2xl">
                            <div className="w-24 h-24 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                <BarChart3 className="w-12 h-12 text-emerald-400" />
                            </div>
                            <h2 className="text-4xl font-black text-white mb-2">Technical Report</h2>
                            <p className="text-slate-400 text-lg mb-8">Results compiled successfully</p>

                            <div className="bg-slate-900/50 rounded-3xl p-8 mb-10 border border-slate-700/30">
                                <div className="text-7xl font-black text-emerald-400 mb-2">{score} / {technicalQuestions.length}</div>
                                <div className="text-slate-400 font-bold tracking-widest uppercase text-sm">Accuracy Rate: {Math.round((score / technicalQuestions.length) * 100)}%</div>
                            </div>

                            <p className="text-slate-300 mb-10 leading-relaxed italic px-4">
                                {score >= technicalQuestions.length * 0.9 ? "Senior DNS Architect. Your command of the technical stack is exceptional." :
                                    score >= technicalQuestions.length * 0.75 ? "Technical Administrator. You are ready for the production environment." :
                                        "Keep practicing. Review the BIND syntax and CLI flags to improve accuracy."}
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={handleStart}
                                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-5 h-5" /> REBOOT_ASSESSMENT
                                </button>
                                <button
                                    onClick={onBack}
                                    className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
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
