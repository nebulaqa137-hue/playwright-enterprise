# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\signup.spec.ts >> Registro de empresas — Necsus @regression >> Registro Nacional — Persona Física @smoke @signup
- Location: tests\ui\signup.spec.ts:19:7

# Error details

```
Error: browserType.launch: Target page, context or browser has been closed
Browser logs:

<launching> C:\Users\ern3s\AppData\Local\ms-playwright\webkit-2272\Playwright.exe --inspector-pipe --disable-accelerated-compositing --no-startup-window
<launched> pid=27968
Call log:
  - <launching> C:\Users\ern3s\AppData\Local\ms-playwright\webkit-2272\Playwright.exe --inspector-pipe --disable-accelerated-compositing --no-startup-window
  - <launched> pid=27968
  - [pid=27968] <gracefully close start>
  - [pid=27968] <kill>
  - [pid=27968] <will force kill>
  - [pid=27968] taskkill stderr: ERROR: no se encontr� el proceso "27968".
  - [pid=27968] <process did exit: exitCode=3236495362, signal=null>
  - [pid=27968] starting temporary directories cleanup
  - [pid=27968] finished temporary directories cleanup
  - [pid=27968] <gracefully close end>

```