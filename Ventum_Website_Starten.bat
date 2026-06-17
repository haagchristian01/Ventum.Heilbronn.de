@echo off
chcp 65001 >nul
title Ventum IT GmbH

set "HTML_FILE=%~dp0index.html"

start msedge "%HTML_FILE%"
