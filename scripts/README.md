# Scripts LdeLuipy

Carpeta para scripts de mantenimiento del sitio (build, validación, deploy).

## CNAME

El dominio personalizado de GitHub Pages es **doc.ldeluipy.es**. El archivo `CNAME` en la raíz debe contener exactamente esa línea para que el despliegue funcione.

## Validación rápida

Comprobar que `CNAME` existe y es correcto:

```bash
test "$(cat CNAME)" = "doc.ldeluipy.es" && echo "CNAME OK" || echo "Revisar CNAME"
```
