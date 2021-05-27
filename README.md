# Hemsida-Docs

<div style="text-align: center;">
    <img src="./api-server/src/mediafiles/Fysiksektionen_logo.svg" width="300" height="300" alt=""/>
</div>

Hej och välkommen till repot för dokumentationen av Fysiksektionens hemsida! Här försöker vi hålla allt som är relevant för dig som ska utveckla på hemsidan. Repot innehåller:

- API-dokumentation
- Server för grafiskt interface av API:t
- Övrig dokumentation som ska flyttas till front- respektive backend

## Om dokumentationen
### Dokumentation av API
Fysiksektionens hemsida är starkt uppdelad mellan [frontend](https://github.com/Fysiksektionen/Hemsida-Frontend) och [backend](https://github.com/Fysiksektionen/Hemsida-Backend).
För att dessa två delar ska kunna interagera har vi definierat ett API, som en gemensam överenskommelse. Detta API har och kommer fortsätta utvecklas tack vare idéer från både front- och backenden. 

För att kunna dokumentera API:t på ett smidigt sätt så använder vi oss av standarden [OpenAPI 3](https://www.openapis.org/). Detta innebär att dkoumentationen består av json-filerna som finns under [api-docs](./api-docs). Dessutom finns ett grafiskt interface baserat på [SwaggerUI](https://swagger.io/tools/swagger-ui/) i form av en enklare React-app. Med hjälp av denna enkla app går det att läsa API:t på ett enkelt sätt, och det grafiska fungerar också som en debugger för filerna genom att visa felmeddelanden när det finns syntax-fel.


### Installera grafiskt interface
1. För att installera React-appen, se till att du har `node` installerat. Om inte kan du finna nedladdningen här: [Download NodeJS](https://nodejs.org/en/). Vi rekommenderar node 16.2.0.

2. Navigera till [api-server](./api-server)-mappen och kör: `npm install`. Om du får varningar för paket vars versioner inte är kompatibla så bör du köra `npm install --force`, det är för att SwaggerUI har en något utdaterad React-komponent.

### Kör grafiska visaren
Kör `npm run start-all` från mappen [api-server](./api-server). När detta kommando har kört igång kör både React-servern och en liten server som levererar API-filerna. Därefter är det bara att använda menyn för att navigera API:t.
