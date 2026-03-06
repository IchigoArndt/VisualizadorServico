# 🖥️ Visualizador de Serviço IIS

> **Seus Application Pools nunca mais vão passar despercebidos.**  
> Uma interface moderna para ver, entender e comandar o IIS direto do navegador.

---

## 🎯 O que é isso?

Este projeto é um **monitor de Application Pools do IIS** em tempo (quase) real: você vê quantos pools existem, quem está rodando, quem está parado, e ainda pode **iniciar**, **parar** e **reciclar** cada um com um clique. Tudo isso com uma interface limpa, tema escuro e zero necessidade de abrir o gerenciador do IIS.

Em resumo: **IIS no navegador, do jeito que você sempre quis.**

---

## 🏗️ Arquitetura em 2 atos

O repositório tem **duas pastas** que trabalham juntas:

```
VisualizadorServico/
├── VisualizadorServico_client/   ← Angular 20 + PrimeNG (a tela que você vê)
└── VisualizadorServico_server/  ← .NET 9 API (o cérebro que fala com o IIS)
```

### 🎨 Client (`VisualizadorServico_client`)

- **Angular 20** + **PrimeNG** (tabelas, cards, botões, tooltips que não quebram).
- **Modo escuro** com toggle no header e preferência salva no `localStorage`.
- Uma tela principal: lista de pools, totais (em execução / parados), filtro, paginação e ações (Iniciar, Parar, Reciclar).

### ⚙️ Server (`VisualizadorServico_server`)

- **.NET 9** com ASP.NET Core.
- **IISPoolMonitorApi**: API REST em `api/v1/IIS` (GET dos pools, POST para Start/Stop/Recycle).
- **ServiceMonitor.Aplication**: serviço que usa `Microsoft.Web.Administration` para conversar com o IIS de verdade.
- **ServiceMonitor.Domain**: modelos e enums (ex.: `ApplicationPoolInfo`, status dos pools).
- **CORS** liberado para desenvolvimento; **OpenAPI + Scalar** para documentação da API.

O backend precisa rodar **no Windows** (onde o IIS está) e, em dev, normalmente na porta **https://localhost:7108**.

---

## 🚀 Como rodar

### 1. Backend (API)

```bash
cd VisualizadorServico_server/IISPoolMonitorApi
dotnet run
```

Use o perfil **https** se quiser `https://localhost:7108`.

### 2. Frontend (Angular)

```bash
cd VisualizadorServico_client
npm install
npm start
```

Abra **http://localhost:4200**. O proxy encaminha as chamadas `/api` para a API, então não precisa configurar CORS para o front em dev.

---

## 📡 Endpoints da API (resumo)

| Método | Rota | O que faz |
|--------|------|-----------|
| GET | `/api/v1/IIS/GetAllAplication` | Lista todos os Application Pools |
| POST | `/api/v1/IIS/StartPool/{poolName}` | Inicia o pool |
| POST | `/api/v1/IIS/StopPool/{poolName}` | Para o pool |
| POST | `/api/v1/IIS/RecyclePool/{poolName}` | Recicla o pool |

A documentação interativa (OpenAPI/Scalar) fica disponível quando a API está no ar (rota configurada no `Program.cs`).

---

## 🛠️ Stack rápida

| Camada | Tecnologias |
|--------|-------------|
| Frontend | Angular 20, PrimeNG 20, RxJS, Signals |
| Backend | .NET 9, ASP.NET Core, Microsoft.Web.Administration |
| Integração | HTTP client + proxy (dev), JSON camelCase/PascalCase conforme o backend |

---

## 📁 Estrutura do server (solução)

- **Apresentation**  
  - **IISPoolMonitorApi** – projeto da API (Controllers, `Program.cs`).
- **Aplication**  
  - **ServiceMonitor.Aplication** – interface `IServiceMonitor` e implementação que usa `ServerManager` do IIS.
- **Domain**  
  - **ServiceMonitor.Domain** – entidades e enums (ex.: `ApplicationPoolInfo`, `StatusEnum`).

---

## ✨ Funcionalidades que já estão aí

- Listagem de todos os Application Pools com nome, status, runtime, pipeline, auto start e workers.
- Cards de resumo: total de pools, em execução e parados.
- Filtro global e paginação na tabela.
- Botão “Atualizar” para recarregar os dados da API.
- Modo escuro com toggle e persistência.
- Tooltips sem quebra de linha (incluindo ações e botão de tema).
- Botões de ação já estão funcionando.
- Comunicação com o backend via service Angular e proxy em desenvolvimento.

---

## 🎬 Próximos passos possíveis

- Tratamento de erros (toast ou mensagem na tela quando a API falhar).
- Variáveis de ambiente / `environment` para URL da API em produção (hoje o client usa URL relativa e proxy em dev).

---

**Resumindo:** duas pastas, um objetivo: deixar o IIS visível e controlável de forma simples e moderna. 🚀
