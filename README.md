*Installation*

Deno ships as a single executable with no dependencies. You can install it using the installers below, or download a release binary from the releases page.

Shell (Mac, Linux):
```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

PowerShell (Windows):
```
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

Homebrew (Mac):
```
brew install deno
```

Chocolatey (Windows):
```
choco install deno
```

*Getting Started*

Try running a simple program:
```
deno run https://deno.land/std/examples/welcome.ts
```

*Run demo*

```
deno run --allow-net index.js
```

```
deno run --allow-net --allow-read --allow-write --allow-plugin --unstable server.ts
```