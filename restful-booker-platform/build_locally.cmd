@echo off

echo ####### RESTFUL-BOOKER-PLATFORM #######
echo ####                               ####
echo ####       PRE FLIGHT CHECKS       ####
echo ####                               ####
echo #######################################
echo:

where java >nul 2>nul
if %errorlevel%==1 (
    @echo The Java Runtime Environment is missing. To learn how to install it please visit:
    @echo https://automationintesting.com/setup/settingupjava
    @echo:
    @echo Press CTRL+C to quit
    exit /b 1
)

where javac >nul 2>nul
if %errorlevel%==1 (
    @echo The Java Development Kit is missing. To learn how to install it please visit:
    @echo https://automationintesting.com/setup/settingupjava
    @echo:
    @echo Press CTRL+C to quit
    exit /b 1
)

where mvn >nul 2>nul
if %errorlevel%==1 (
    @echo Maven is missing. To learn how to install it please visit:
    @echo https://automationintesting.com/setup/settingupmaven
    @echo:
    @echo Press CTRL+C to quit
    exit /b 1
)

if "%JAVA_HOME%"=="" (
    @echo JAVA_HOME is not set. To learn how to set it please visit:
    @echo https://automationintesting.com/setup/settingupmaven
    @echo:
    @echo Press CTRL+C to quit
    exit /b 1
)

where node >nul 2>nul
if %errorlevel%==1 (
    @echo Node is missing. To learn how to install it please visit:
    @echo https://automationintesting.com/setup/settingupnode
    @echo:
    @echo Press CTRL+C to quit
    exit /b 1
)

where npm >nul 2>nul
if %errorlevel%==1 (
    @echo Npm is missing. To learn how to install it please visit:
    @echo https://automationintesting.com/setup/settingupmaven
    @echo:
    @echo Press CTRL+C to quit
    exit /b 1
)

echo:
echo ####### RESTFUL-BOOKER-PLATFORM #######
echo ####                               ####
echo ####       BUILDING PROJECT        ####
echo ####                               ####
echo #######################################
echo:

set cmdFileDirectory=%~dp0

cd %cmdFileDirectory%
call mvn clean install
if %errorlevel% neq 0 exit /b %errorlevel%

CALL run_locally.cmd true
