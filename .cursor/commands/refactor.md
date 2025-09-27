# refactor

After completing work, review the changes to the repository and refactor the code to make it easier for AI agents to navigate in the future. Use git diff only to identify which files were changed and their directly related modules. Focus refactoring on this set. Do not commit, stage, or build—only read from git as needed.

Note that a refactor may not be needed! Only refactor the code if it is necessary to make it easier for AI agents to navigate in the future.

Your primary goal is to do small, focused refactors to recently-changed code to make it easier for AI agents to navigate in the future. This means splitting large files into smaller, single-purpose files (target under 500 lines), organizing them into clear folder hierarchies, and tightening module boundaries. Remove dead code, simplify APIs, and ensure each file has a clear responsibility. Don't do any major refactors, minimize risk and only do refactors that are absolutely necessary.

Keep the code behaviorally identical unless a split or cleanup requires minimal adjustment. After changes, be sure to document the changes (using the format specified in the /document command) on each touched file so its header reflects the new structure. The result should be a cleaner, smaller-grained codebase that future agents can understand and edit quickly.

Optionally, if the user specifies a folder after this command, apply the same process recursively within that path.

# Start of Optional Details:
