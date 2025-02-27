# Proyecto API REST - Visits

Este proyecto es una API REST que lleva un contador de visitas y almacena su valor en una base de datos PostgreSQL. La aplicación se ha desplegado en Kubernetes utilizando un pipeline CI/CD con Tekton para construir y desplegar la imagen Docker de la API.

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalados y configurados los siguientes componentes:

- **Docker**: Para construir y ejecutar contenedores Docker.
  - [Guía de instalación de Docker](https://docs.docker.com/get-docker/)
  
- **Kubernetes**: Para gestionar el clúster de contenedores.
  - [Guía de instalación de Kubernetes](https://kubernetes.io/docs/setup/)
  
- **Tekton**: Para configurar y ejecutar el pipeline de integración continua (CI/CD).
  - [Guía de instalación de Tekton](https://tekton.dev/docs/getting-started/)

- **Minikube** (opcional): Si no tienes un clúster de Kubernetes, puedes usar Minikube para crear un clúster local.
  - [Guía de instalación de Minikube](https://minikube.sigs.k8s.io/docs/)

## Cómo ejecutar el proyecto localmente

### 1. Clonar el repositorio

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/Crygt/Prueba-CI_CD.git
cd Prueba-CI_CD
2. Configuración de la base de datos
Asegúrate de que la base de datos PostgreSQL esté corriendo y configurada correctamente. Puedes usar el pod de PostgreSQL en Kubernetes o configurar una instancia local.

Si usas Kubernetes, asegúrate de que el servicio de PostgreSQL esté en funcionamiento:

bash
Copy
kubectl get svc postgres-service
3. Construir la imagen Docker de la API
Construye la imagen Docker de la API localmente. Ejecuta el siguiente comando en el directorio donde se encuentra tu Dockerfile:

bash
Copy
docker build -t crygt/visits-api:latest .
4. Ejecutar la API localmente
Si prefieres ejecutar la API localmente, usa el siguiente comando:

bash
Copy
docker run -p 3001:3001 --env-file .env crygt/visits-api:latest
Esto ejecutará el contenedor de la API en el puerto 3001. Puedes probar la API accediendo a http://localhost:3001/visits.

Cómo interactuar con la API
Endpoint: /visits
Método: GET

Este endpoint devuelve el número de visitas almacenadas en la base de datos.

Ejemplo de respuesta:

json
Copy
{
  "visits": 4,
  "mode": "develop"
}
Actualizar el contador de visitas
Cada vez que accedes al endpoint /visits, el contador de visitas se incrementa en 1.

Método: POST (opcional si quieres que se incremente manualmente)

Este método no está habilitado por defecto, pero puede ser añadido a la API si se necesita.

Despliegue en Kubernetes
1. Crear los recursos en Kubernetes
Aplica los manifiestos de Kubernetes para crear los recursos necesarios (deployments, services, etc.) en tu clúster de Kubernetes:

bash
Copy
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
Esto creará los pods, servicios y otros recursos necesarios para desplegar la API, la base de datos y la configuración.

2. Exponer el servicio de la API
Asegúrate de que el servicio esté correctamente expuesto para que puedas acceder a la API desde fuera del clúster:

bash
Copy
kubectl get svc visits-api-service
Si todo está correctamente configurado, podrás acceder a la API utilizando la IP pública del servicio o, si estás utilizando Minikube, puedes hacer un port-forwarding a tu máquina local:

bash
Copy
kubectl port-forward svc/visits-api-service 3001:3001
Ahora podrás acceder a la API en http://localhost:3001/visits.

3. Despliegue con Tekton
El pipeline de Tekton está configurado para construir la imagen Docker de la API, publicarla en un registro y desplegarla en Kubernetes. Para ejecutar el pipeline, aplica el siguiente manifiesto:

bash
Copy
kubectl apply -f tekton-pipeline.yaml
kubectl apply -f tekton-pipelinerun.yaml
Esto ejecutará el pipeline que:

Construirá la imagen Docker de la API.
La publicará en un registro (en este caso, un registro local o uno público, como DockerHub).
Desplegará la API en el clúster de Kubernetes.
Puedes verificar el estado de los pipelines y las ejecuciones con los siguientes comandos:

bash
Copy
kubectl get pipelineruns
Si todo va bien, la aplicación estará desplegada y lista para usar.

Contribuciones
Si deseas contribuir al proyecto, por favor sigue estos pasos:

Haz un fork del repositorio.
Crea una rama con tu cambio (git checkout -b feature-nueva-caracteristica).
Realiza el commit de tus cambios (git commit -am 'Agregado nueva característica').
Empuja tus cambios a tu fork (git push origin feature-nueva-caracteristica).
Crea un pull request.
Licencia
Este proyecto está bajo la licencia MIT.

