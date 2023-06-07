### Situation 
- **Purpose**: The focus of the task is to debug the Nginx configuration without the need for additional installations or extensive code modifications.
- **WebSocket Handshake**: WebSocket connections begin with an HTTP or HTTPS handshake. When the page is loaded via HTTP, both WS (WebSocket) and WSS (WebSocket secure) can be used. However, when the page is accessed through HTTPS, only WSS can be used due to browser security restrictions.
- **Expected Behavior**: When everything is functioning properly, the browser console should show an HTTPS GET request to socket.io. After receiving a 200 response, the server should send an HTTP 101 "Switching Protocols" message, indicating a successful protocol change from HTTPS to WS/WSS.
- **Dependencies**: Nginx, aiohttp, and socket.io are already installed and available. No additional installations or extensive coding are expected.
- **Current Issue**: The problem lies with the Nginx reverse proxy configuration. The goal is to establish a setup where the browser client connects to Nginx, which then proxies the request to the backend Python application running on the server's IP address and port. However, the current configuration does not achieve this desired setup.
- **Provided Recordings**: Screen recordings are available demonstrating a working version locally (with SSL disabled) and after deployment to the server (with SSL enabled). The issue occurs specifically when attempting to go through the Nginx reverse proxy configuration.
>To resolve the problem, the focus should be on identifying and fixing the bug in the Nginx reverse proxy configuration to enable the desired setup of the WebSocket connection flow.

### Task 
>Based on the provided situation, we can split the task into the following steps:

- **Debug Nginx Reverse Proxy Configuration**:
Review the current Nginx configuration and identify the specific bug causing the issue.
Make necessary adjustments to the Nginx configuration to enable the desired WebSocket connection flow.
Test the modified Nginx configuration to ensure it works as expected.


- **Verify WebSocket Handshake**:
Test the WebSocket handshake locally by running the backend Python application and the browser client.
Verify that the browser console shows an HTTPS GET request to socket.io and an HTTP 101 "Switching Protocols" response from the server.
Confirm that the handshake works as intended and the protocols switch from HTTPS to WS/WSS.


- **Test SSL-enabled Deployment**:
Deploy the WebSocket service and Nginx configuration to the server with SSL enabled.
Verify that the browser client can establish a secure WebSocket connection through the Nginx reverse proxy.
Ensure that the expected HTTPS GET request to socket.io and the subsequent protocol switch occur successfully.

- **Document the Solution**:
Document the steps taken to debug and resolve the Nginx configuration issue.
Include any modifications made to the Nginx configuration file.
Provide clear instructions on how to reproduce and test the WebSocket service to ensure its proper functioning.
By splitting the task into these steps, you can systematically address the issue with the Nginx reverse proxy configuration, verify the WebSocket handshake, test the SSL-enabled deployment, and document the solution for future reference. 
 
### Action 
- Remove all old configurations on the server related to the NGINX
    ```bash
    # Remove all config and resources related to nginx
    root: sudo apt purge nginx

    # Remove dependencies related to old configurations   
    root: sudo apt autoremove

    # Check current used ports
    root: sudo lsof -i -P -n | grep LISTEN

    # Check PIDs for 80, 443 to disable the app services.
    root: lsof -i :80
    COMMAND   PID USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
    tcp       771 root   3u  IPv4   19373      0t0  TCP *:80 (LISTEN)

    root: lsof -i :443
    COMMAND   PID USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
    tcp       773 root   3u  IPv4   19373      0t0  TCP *:443 (LISTEN)
    ```
- Kill the current service and disable the app service
    ```bash
    root: kill 773 # kiill the process that is using 443 port
    ```
- Once confrim we are fresh to install the Nginx, then we can start the configurations for new one.
    ```bash
    # Update the dependencies
    root: sudo apt update

    # Upgrad the dependencies
    root: sudo apt upgrade

    # Install nginx again
    root: sudo apt install nginx

    # Check status of nginx service
    root: sudo systemctl status nginx

    # If its not working properly, reboot the system or restart the nginx service.
    # Reboot
    root: sudo reboot

    # Restart service
    root: sudo systemctl restart nginx
    ```
- Setup hosting config on the `etc/nginx/sites-enabled` and create the new file named `default` and copy/paste the content from `etc/nginx/sites-available/default`
    ```
    # Author: Zameer Ansari
    # You should look at the following URL's in order to grasp a solid understanding
    # of Nginx configuration files in order to fully unleash the power of Nginx.
    # http://wiki.nginx.org/Pitfalls
    # http://wiki.nginx.org/QuickStart
    # http://wiki.nginx.org/Configuration
    #
    # Generally, you will want to move this file somewhere, and start with a clean
    # file but keep this around for reference. Or just disable in sites-enabled.
    #
    # Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
    ##

    # Default server configuration
    #
    server {
            listen 80 default_server;
            listen [::]:80 default_server;

            # SSL configuration
            #
            # listen 443 ssl default_server;
            # listen [::]:443 ssl default_server;
            #
            # Note: You should disable gzip for SSL traffic.
            # See: https://bugs.debian.org/773332
            #
            # Read up on ssl_ciphers to ensure a secure configuration.
            # See: https://bugs.debian.org/765782
            #
            # Self signed certs generated by the ssl-cert package
            # Don't use them in a production server!
            #
            # include snippets/snakeoil.conf;

            root /var/www/html;

            # Add index.php to the list if you are using PHP
            index index.html index.htm index.nginx-debian.html;

            server_name _;

            location / {
                    # First attempt to serve request as file, then
                    # as directory, then fall back to displaying a 404.
                    try_files $uri $uri/ =404;
                # proxy_pass http://localhost:8080;
                # proxy_http_version 1.1;
                # proxy_set_header Upgrade $http_upgrade;
                # proxy_set_header Connection 'upgrade';
                # proxy_set_header Host $host;
                # proxy_cache_bypass $http_upgrade;
            }

            # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
            #
            #location ~ \.php$ {
            #       include snippets/fastcgi-php.conf;
            #
            #       # With php7.0-cgi alone:
            #       fastcgi_pass 127.0.0.1:9000;
            #       # With php7.0-fpm:
            #       fastcgi_pass unix:/run/php/php7.0-fpm.sock;
            #}

            # deny access to .htaccess files, if Apache's document root
            # concurs with nginx's one
            #
            #location ~ /\.ht {
            #       deny all;
            #}
    }


    # Virtual Host configuration for example.com
    #
    # You can move that to a different file under sites-available/ and symlink that
    # to sites-enabled/ to enable it.
    #
    #server {
    #       listen 80;
    #       listen [::]:80;
    #
    #       server_name example.com;
    #
    #       root /var/www/example.com;
    #       index index.html;
    #
    #       location / {
    #               try_files $uri $uri/ =404;
    #       }
    #}
    ```
- Update configurations
    * Add new server with SSL Certification to end of file.
        ```
        server {
            listen 443 ssl default_server;
            listen [::]:443 ssl default_server;
        
            server_name execfunc.com www.execfunc.com;

            ssl    on;
            ssl_certificate    /etc/nginx/ssl/www.execfunc.pem; (or bundle.crt)
            ssl_certificate_key    /etc/nginx/ssl/www.execfunc.key;
        
            root /var/www/ef/build;
            index index.html;
        
            location / {
                    rewrite @rules;
            }

                # Adjustment rules
            location @rules {
                    try_files $uri $uri/ /index.html;
            }
        }
        ```
    * Update the http server config for the redirection from http to https
        ```
        server {
            listen 80 default_server;

            server_name _;

            return 301 https://$host$request_uri;
        }
        ```
    * Restart nginx service and verify
        ```bash
        root: sudo systemctl restart nginx

        root: service nginx status
        ```
- Add SSL into python code.
    ```python
    import ssl
    ...
    HOST = '0.0.0.0'
    ...
    ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    ssl_context.load_cert_chain('/etc/nginx/ssl/execfunc.com.crt', '/etc/nginx/ssl/execfunc.com.key')
    ...
    ```
- Enable ufw and allow ports/NGINX
    ```bash
    # Enable ufw
    sudo ufw enable

    # Add openssh (22)
    sudo ufw allow OpenSSH

    # Add Nginx
    sudo ufw allow "Nginx Full"

    # Add HTTP/HTTS
    sudo ufw allow 80
    sudo ufw allow 443

    # Add Backend ports
    sudo ufw allow 4010
    sudo ufw allow 4050

    # Verify status
    sudo ufw status
    ```
- Setup PM2
    ```
    # Install pm2 with npm
    npm install pm2@latest -g

    # /var/www/ef/agant
    pm2 start pyServer.py --interpreter python3

    pm2 start pytServer2.py --interpreter python3
    ```

- Generating a Startup Script
    ```bash
    pm2 startup

    # disable
    pm2 unstartup
    ```

### Result
>Once the Nginx reverse proxy configuration is debugged and properly adjusted, the expected result would be:

- **WebSocket Handshake**: The browser client, when accessed through HTTPS, will send an HTTPS GET request to the specified socket.io endpoint.

- **Protocol Switch**: After receiving a 200 response, the server will respond with an HTTP 101 "Switching Protocols" message, indicating a successful protocol change from HTTPS to WS/WSS.

- **Secure WebSocket Connection**: The browser client will establish a secure WebSocket connection through the Nginx reverse proxy to the backend Python application running on the server's IP address and port.

- **Functioning Communication**: The WebSocket service will be able to exchange messages between the browser client and the backend Python application over the secure WebSocket connection.

- **Successful Deployment**: The WebSocket service will work correctly after deployment to the server, with SSL enabled.
Browser Console Output: The browser console will show the expected HTTPS GET request to socket.io and the subsequent protocol switch, indicating that the WebSocket connection is working properly.

>By achieving these expected results, you will have resolved the Nginx configuration issue and successfully established a functioning WebSocket service with a secure connection through SSL.

### Trivia
- In this guidance, the backend service is not related to nginx.
- The current websocket runs on a python aiohttp server, so it also has no relation to nginx.
- The aforementioned nginx configuration follows a standard structure for hosting the SPA (single page application).
- There are no configurations for the CI/CD between Github and ubuntu server
- The hosting path for the frontend has been updated from /var/www/ef/ to /var/www/ef/build.
- In the frontend code, the Websocket connection URL has changed from https://execfunc.com:4010/backend to https://execfunc.com:4010.

### References
- [default nginx configuration file](https://gist.github.com/xameeramir/a5cb675fb6a6a64098365e89a239541d)
- [How to check if port is in use on Linux or Unix](https://www.cyberciti.biz/faq/unix-linux-check-if-port-is-in-use-command/)
- [Request Redirect for Nginx in SPAs](https://techformist.com/request-redirect-nginx-spa/)
- [Redirect HTTP to HTTPS in Nginx](https://serversforhackers.com/c/redirect-http-to-https-nginx)
- [Basic UFW (Uncomplicated Firewall) commands](https://serverspace.io/support/help/osnovnye-komandy-ufw/#:~:text=To%20enable%20a%20firewall%20application,%22sudo%20ufw%20app%20list%22.)
- [PM2 Process Management Quick Start](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Automate Your Python Script with Process Manager 2 (PM2)](https://towardsdatascience.com/automate-your-python-script-with-pm2-463238ea0b65)
- [STARTUP SCRIPT](https://pm2.keymetrics.io/docs/usage/startup/)