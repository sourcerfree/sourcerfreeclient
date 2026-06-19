@echo off
setlocal

title SourcerFree Debug

cd /d "%~dp0"

echo ==================================
echo       SourcerFree Client
echo ==================================
echo.

echo [1/6] Instalando....

where python >nul 2>&1

if %errorlevel% neq 0 (
    echo Python nao encontrado.
    echo Baixando...

    curl -L -o python-installer.exe https://www.python.org/ftp/python/3.13.5/python-3.13.5-amd64.exe

    if not exist python-installer.exe (
        echo ERRO: Nao conseguiu baixar Python.
        pause
        exit /b 1
    )

    echo Instalando Python...

    python-installer.exe ^
    /quiet ^
    InstallAllUsers=1 ^
    PrependPath=1 ^
    Include_pip=1

    del python-installer.exe

    echo.
    echo Python instalado.
    echo Feche e abra esse arquivo novamente.
    pause
    exit /b
)

echo Python OK:
python --version


echo.
echo [2/6] Criando ambiente virtual...

if not exist venv (
    python -m venv venv

    if %errorlevel% neq 0 (
        echo ERRO criando venv.
        pause
        exit /b 1
    )
)

echo Venv OK


echo.
echo [3/6] Ativando ambiente...

call venv\Scripts\activate.bat


echo.
echo [4/6] Atualizando pip...

python -m pip install --upgrade pip


echo.
echo [5/6] Instalando dependencias...

if exist requirements.txt (
    pip install -r requirements.txt
) else (
    echo ERRO: requirements.txt nao existe.
    pause
    exit /b 1
)


echo.
echo [6/6] Rodando programa...
echo.

python teste.py > log.txt 2>&1


echo.
echo ==================================
echo Programa terminou.
echo Verifique o arquivo log.txt
echo ==================================

pause
