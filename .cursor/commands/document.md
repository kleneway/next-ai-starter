# document

For every file that has been created or edited, check the top-of-file documentation. If it exists, update it so it reflects the current state of the file. If it doesn’t exist, create a new header. Always use the comment syntax appropriate to the file type.

The purpose of this header is to give future AI agents just enough context to work effectively. Focus on what matters: why the file exists, its key behaviors, important inputs/outputs, and any external dependencies or side effects. Include constraints, invariants, or performance assumptions only if they are non-obvious. Add a short “Recent Changes” section with the date and a one-line summary of the latest edits. Only keep the three most recent changes, remove older ones.

Keep the documentation concise. Source files should usually have no more than 6–12 lines, smaller utility or test files may only need 1–2 lines. Do not restate obvious details like the filename, language, or trivial imports. Use clear, present-tense sentences or short bullet points, and always remove stale or redundant information rather than leaving it behind.

The goal is a lightweight header that orients future agents quickly without bloating their context window. Every file should have one, and every edit should trigger a quick review to keep it accurate and useful.

Optionally, if the user specifies a folder or other specific instructions after this command, apply the same process recursively within that path.

# Start of Optional Details:
