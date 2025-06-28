# Animation-Spoofer


1. **Open Visual Studio Code**
   Launch **VS Code** on your machine.

2. **Create a New Project Folder**
   Choose or create a folder where you want to store your project.

3. **Open Terminal in VS Code**

   * Go to `Terminal` → `New Terminal`
   * Or press <kbd>Ctrl</kbd> + <kbd>\`</kbd> (backtick) to open the terminal

4. **Initialize a New Node.js Project**
   Run the following command:

   ```bash
   npm init -y
   ```

   This creates a `package.json` file with default settings.

5. **Install the Required Dependencies**
   Run this command in the terminal:

   ```bash
   npm install body-parser colorama express fs noblox.js node-fetch@2 path readline regedit url
   ```

---

### 📦 Installed Dependencies

Your `package.json` will look like this (under `"dependencies"`):

```json
"dependencies": {
  "body-parser": "^1.19.0",
  "colorama": "^0.0.0",
  "express": "^4.17.1",
  "fs": "^0.0.1-security",
  "noblox.js": "^6.0.2",
  "node-fetch": "^2.6.1",
  "path": "^0.12.7",
  "readline": "^1.3.0",
  "regedit": "^4.0.0",
  "url": "^0.11.4"
}
```

> ✅ **Note:** Some of these (like `fs`, `path`, `url`) are built-in Node.js modules and typically **don’t require installation**, but `npm` versions exist for compatibility or polyfills.
