# How to Build Web Sites with MCP Servers

Tämä dokumentti kuvaa, miten **uutisseuranta**-projektin GitHub Pages -sivusto ja Firebase-integraatio rakennettiin käyttäen AI-assistenttia ja MCP (Model Context Protocol) -serverä.

---

## 1. GitHub Pages -sivuston luominen MCP:llä

### Lähtökohta

Projektilla oli olemassa oleva repositorio [`jaakkokorhonen/uutisseuranta`](https://github.com/jaakkokorhonen/uutisseuranta). Tavoitteena oli luoda projektille GitHub Pages -sivu.

### Miten se tehdään

AI-assistentti käytti **GitHub MCP -serverä** luodakseen `index.html`-tiedoston suoraan repositorioon ilman, että käyttäjän tarvitsi itse koskea koodiin tai Git-komentoihin.

**Prosessi:**

1. AI luki repositorion rakenteen `get_file_contents`-työkalulla
2. Rakensi täysin toimivan, suomenkielisen `index.html`-sivun
3. Pushasi tiedoston `create_or_update_file`-työkalulla suoraan `main`-haaraan

**Sivun käyttöönotto GitHubissa (manuaalinen askel):**

1. Mene repositorion **Settings → Pages**
2. Valitse Source: `Deploy from a branch`
3. Valitse haara: `main`, kansio: `/ (root)`
4. Klikkaa **Save**

---

## 2. Firebase Google Auth -integraatio

### Lähtökohta

Käyttäjä tarjosi Firebase-projektin konfiguraation. AI päivitti `index.html`-tiedoston Firebase Auth -integraatiolla käyttäen GitHub MCP -serverä.

**Firebase SDK ilman build-steppiä:**

```html
<script type="module">
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
  import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut }
    from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
</script>
```

**Firebase-konsolissa tarvittava manuaalinen askel:**

1. Mene [Firebase Console → Authentication → Settings → Authorized domains](https://console.firebase.google.com/)
2. Klikkaa **Add domain** ja lisää: `jaakkokorhonen.github.io`

---

## 3. Firebase MCP -serverin käyttöönotto

### Esivalmistelu

```bash
npx -y firebase-tools@latest login
```

### Claude Desktop

```json
{
  "mcpServers": {
    "firebase": {
      "command": "npx",
      "args": ["-y", "firebase-tools@latest", "experimental:mcp"]
    }
  }
}
```

### Cursor

Luo projektin juureen `.cursor/mcp.json` samalla sisällöllä.

---

## Yhteenveto: GitHub MCP -työkalut

| Työkalu | Käyttötarkoitus |
|---|---|
| `get_file_contents` | Lue tiedoston sisältö ja SHA |
| `create_or_update_file` | Luo tai päivitä tiedosto (SHA vaaditaan päivitykseen) |
| `push_files` | Pushaa useita tiedostoja kerralla |
| `create_pull_request` | Avaa pull request |
| `merge_pull_request` | Mergaa PR |

> **Vinkki:** `create_or_update_file` vaatii olemassa olevan tiedoston päivitykseen aina edellisen version SHA:n.
