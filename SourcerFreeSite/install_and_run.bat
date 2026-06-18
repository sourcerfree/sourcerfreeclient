@echo off
setlocal EnableDelayedExpansion

title SourcerFree

cd /d "%~dp0"

echo ==================================
echo      SourcerFree Client
echo ==================================

:: Verifica Python
python --version >nul 2>&1

if %errorlevel% neq 0 (

    echo Python nao encontrado.
    echo Baixando Python...

    curl -L -o python-installer.exe ^
    https://www.python.org/ftp/python/3.13.5/python-3.13.5-amd64.exe

    if not exist python-installer.exe (
        echo Falha ao baixar Python.
        pause
        exit /b 1
    )

    echo Instalando Python...

    python-installer.exe ^
    /quiet ^
    InstallAllUsers=1 ^
    PrependPath=1 ^
    Include_pip=1 ^
    Include_launcher=1

    del python-installer.exe

    echo Python instalado.
    
    :: Atualiza PATH nessa sessao
    set "PATH=%PATH%;C:\Program Files\Python313;C:\Program Files\Python313\Scripts"

)

echo.
echo Criando ambiente virtual...

if not exist venv (
    python -m venv venv
)

echo Ativando ambiente...

call venv\Scripts\activate


echo Atualizando...

python -m pip install --upgrade pip


echo Instalando dependencias...

if exist requirements.txt (
    pip install -r requirements.txt
) else (
    echo requirements.txt nao encontrado!
    pause
    exit /b 1
)


echo.
echo Iniciando programa...

python teste.py


echo.
echo Programa finalizado.
pause