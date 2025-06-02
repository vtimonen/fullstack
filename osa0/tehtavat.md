## Tehtävä 0.4

sequenceDiagram
    participant browser
    participant server
    
    Note right of browser: Käyttäjä kirjoittaa syötteen ja painaa 'Save'

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ content: "syöte", date: "2.6.2025"}]
    deactivate server
    
    Note right of browser: Selain suorittaa event handlerin ja renderöi syötteen listaan

    
## Tehtävä 0.5

sequenceDiagram
    participant browser
    participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: Selain alkaa suorittamaan JS koodia joka hakee JSON datan palvelimelta

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content": "Pokemon!","date": "2025-06-02T09:08:23.650Z"}, ...]
    deactivate server

    Note right of browser: Selain suorittaa event handlerin joka renderöi datat
    

## Tehtävä 0.6

sequenceDiagram
    participant browser
    participant server
    

    Note right of browser: Käyttäjä kirjoittaa syötteen ja painaa 'Save'

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ content: "Uusi syöte", date: "2.6.2025}, ]
    deactivate server

    Note right of browser: Selain suorittaa JS koodia ja pyytää syötetyn datan palvelimelta
