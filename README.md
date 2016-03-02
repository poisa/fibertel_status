# fibertel_status
Lee la pagina con el status del modem de Fibertel (Argentina), extrae los datos y los evalua. Muestra en la consola los resultados.

# Como usar
Este programa requiere que [NodeJS](https://nodejs.org) esté instalado. 

Clonar el repositorio:

```$git clone git@github.com:poisa/fibertel_status.git```

Ejecutar:

```
$node fibertel_status
(36,8 dB). El valor MER esta dentro de un rango aceptable.
(50,7 dBmV). El valor Tx esta dentro de un rango aceptable.
(-3,5 dBmV). El valor Rx esta dentro de un rango aceptable.
```

# De donde salen los resultados
El programa intenta acceder a http://181.30.128.34/asp/nivelesPrima.asp y si se puede, parsea el HTML y usa esos valores. Si esa página no se puede acceder o cambia de formato entonces este programa no va a funcionar.
