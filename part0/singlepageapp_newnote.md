```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Event handler redraws notes and sends to server.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Status Code: 201
    deactivate server
```