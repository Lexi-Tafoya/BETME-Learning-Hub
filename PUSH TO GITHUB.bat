@echo off
setlocal
REM ===========================================================================
REM  PUSH TO GITHUB
REM  Master Electronics ^| INTERNAL  ^|  TMR Learning Experience
REM
REM  Double-click this file. It clears two stale git lock files, shows you what
REM  is about to go up, pushes to main, and confirms the result.
REM
REM  Why the lock files: the commits were made from an environment that could
REM  not delete files inside .git, so git left HEAD.lock and index.lock behind.
REM  They are empty and safe to remove - no git process is running. Windows can
REM  delete them, which is all this script does first.
REM ===========================================================================

cd /d "%~dp0"

echo.
echo ============================================================
echo   TMR Learning Experience  -  push to GitHub
echo ============================================================
echo.

REM --- 1. clear the stale locks -------------------------------------------
if exist ".git\index.lock" (
  del /f /q ".git\index.lock"
  echo   Cleared .git\index.lock
)
if exist ".git\HEAD.lock" (
  del /f /q ".git\HEAD.lock"
  echo   Cleared .git\HEAD.lock
)
for %%F in (".git\refs\heads\main.lock" ".git\config.lock") do (
  if exist %%F del /f /q %%F
)
echo   Locks clear.
echo.

REM --- 2. show what is going up -------------------------------------------
echo ------------------------------------------------------------
echo   Commits about to be pushed
echo ------------------------------------------------------------
git log --oneline origin/main..HEAD
echo.

echo ------------------------------------------------------------
echo   Working tree status
echo ------------------------------------------------------------
git status --short
echo   (no files listed above means the tree is clean)
echo.

REM --- 3. push ------------------------------------------------------------
echo ------------------------------------------------------------
echo   Pushing to origin/main
echo ------------------------------------------------------------
git push origin main
if errorlevel 1 goto failed
echo.

REM --- 4. confirm ---------------------------------------------------------
echo ------------------------------------------------------------
echo   Confirming
echo ------------------------------------------------------------
git fetch origin >nul 2>&1
echo.
echo   Local  main is at:
git rev-parse HEAD
echo   Remote main is at:
git rev-parse origin/main
echo.
git status --short
echo   (no files listed above means the working tree is clean)
echo.
echo ============================================================
echo   PUSHED.
echo.
echo   Next: open the Render dashboard. Auto-Deploy On Commit
echo   should already be building. Wait for it to report Live,
echo   then check the health endpoint:
echo         https://^<your-service^>.onrender.com/healthz
echo ============================================================
echo.
pause
exit /b 0

:failed
echo.
echo ============================================================
echo   PUSH DID NOT COMPLETE
echo ============================================================
echo.
echo   The two most common reasons:
echo.
echo   1. GitHub asked for credentials and the prompt was
echo      cancelled. Run it again and sign in as Lexi-Tafoya.
echo.
echo   2. Someone else pushed to main in the meantime. In that
echo      case run these two commands in this folder:
echo.
echo         git pull --rebase origin main
echo         git push origin main
echo.
echo   Nothing has been lost either way - both commits are safe
echo   in your local repository.
echo.
pause
exit /b 1
