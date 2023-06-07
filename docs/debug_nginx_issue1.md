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
- Install latest version of NGINX
- Setup hosting config on the `etc/nginx/site-enabled`
  - create the new file named `default` and copy/paste the content from `etc/nginx/site-available`

### Result
>Once the Nginx reverse proxy configuration is debugged and properly adjusted, the expected result would be:

- **WebSocket Handshake**: The browser client, when accessed through HTTPS, will send an HTTPS GET request to the specified socket.io endpoint.

- **Protocol Switch**: After receiving a 200 response, the server will respond with an HTTP 101 "Switching Protocols" message, indicating a successful protocol change from HTTPS to WS/WSS.

- **Secure WebSocket Connection**: The browser client will establish a secure WebSocket connection through the Nginx reverse proxy to the backend Python application running on the server's IP address and port.

- **Functioning Communication**: The WebSocket service will be able to exchange messages between the browser client and the backend Python application over the secure WebSocket connection.

- **Successful Deployment**: The WebSocket service will work correctly after deployment to the server, with SSL enabled.
Browser Console Output: The browser console will show the expected HTTPS GET request to socket.io and the subsequent protocol switch, indicating that the WebSocket connection is working properly.

>By achieving these expected results, you will have resolved the Nginx configuration issue and successfully established a functioning WebSocket service with a secure connection through SSL.