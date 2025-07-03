# E-commerce Petshop

[👉 Probar la aplicación online](https://petshop-ecommerce.vercel.app/)

![image](https://github.com/user-attachments/assets/bdb50e7c-1228-4038-8180-aca6f5a797d0)

## Descripción

Este proyecto es un e-commerce especializado en productos para mascotas, que ofrece una experiencia de compra intuitiva y funcional. Permite a los usuarios navegar, filtrar productos, registrarse, iniciar sesión y gestionar sus pedidos. Además, cuenta con un panel de administración para crear, editar productos y gestionar pedidos.

El diseño está inspirado en [Joy of Pet - Behance](https://www.behance.net/gallery/188708373/Joy-Of-Pet?tracking_source=search_projects|ecommerce+web+design+pets&l=67), adaptado para una experiencia moderna y responsiva.

## Tecnologías usadas

### Frontend

- React 19.1.0 con Vite como bundler  
- Tailwind CSS para estilos  
- React Router Dom 7.6.0  
- React Hook Form (formularios de autenticación)  
- Axios (consumo de API)  
- React Icons (iconos)  
- React Spinners (loading)  
- Sweetalert2 (alertas)  
- Yup (validaciones de formularios)

### Backend

- Node.js con Express 5.1.0  
- Sequelize ORM 6.37.7 (conector MySQL2)  
- MySQL como base de datos (Railway)  
- Cloudinary 2.7.0 (gestión de imágenes)  
- Multer 2.0.1 (upload de imágenes)  
- JSON Web Tokens (jsonwebtoken 9.0.2) para autenticación basada en tokens  
- Bcrypt 6.0.0 para hash de contraseñas  
- Nodemailer 7.0.3 para envío de emails  
- cookie-parser 1.4.7 para manejo de cookies  
- cors 2.8.5 para manejo de políticas CORS  
- dotenv 16.5.0 para variables de entorno  
- express-validator 7.2.1 para validación de datos entrantes  
- slugify 1.6.6 para generación de URLs amigables  
- uuid 11.1.0 para generación de IDs únicas  
- mysql2 3.14.1 driver para conexión MySQL

### Arquitectura del Backend

El backend está diseñado con una **arquitectura modular y escalable**, siguiendo el patrón:

> **Controller → Service → Repository**

Esto permite mantener una clara separación de responsabilidades en el código:

- **Controller**: Gestiona las rutas HTTP, recibe las solicitudes y responde a los clientes.
- **Service**: Contiene la lógica de negocio y orquesta las operaciones.
- **Repository**: Se encarga de la comunicación con la base de datos, usando Sequelize ORM para MySQL.

Cada módulo está organizado de forma independiente para facilitar el mantenimiento y la escalabilidad. Por ejemplo:

- Módulo **Users**: rutas, controladores, servicios y repositorios para usuarios.
- Módulo **Products**: rutas, controladores, servicios y repositorios para productos.
- Módulo **Orders**: rutas, controladores, servicios y repositorios para pedidos.

---

### Seguridad y autenticación

- Todas las rutas del backend están **protegidas mediante autenticación basada en JSON Web Tokens (JWT)**, asegurando que solo usuarios autenticados puedan acceder a recursos sensibles.
- Se implementa un sistema de **roles** (usuarios y administradores), que restringe el acceso a funcionalidades según permisos, garantizando seguridad y control.

## Despliegue

- **Frontend:** desplegado en [Vercel](https://vercel.com).  
- **Backend:** alojado en [Render](https://render.com).  
- **Base de datos:** gestionada con **MySQL** mediante [Railway](https://railway.app).
- **Imágenes de productos:** almacenadas y optimizadas en [Cloudinary](https://cloudinary.com) para un rendimiento eficiente.

## Funcionalidades principales

- Registro e inicio de sesión de usuarios con validación.  
- Gestión de roles: usuarios normales y administradores con permisos diferenciados.  
- Navegación y búsqueda de productos con filtros.  
- Visualización detallada de productos.  
- Gestión de carrito y pedidos.  
- Panel de administración para crear, editar productos y ver pedidos.  
- Subida y gestión de imágenes con Cloudinary.  
- Envío de emails para confirmaciones y restablecimiento de contraseña.  
- Página de favoritos (en desarrollo).  
- Formulario de contacto presente en UI pero actualmente no funcional (en desarrollo).

## Usuario de prueba para testeo

Para facilitar la prueba, podés usar este usuario:  

- Email: `julian@gmail.com`  
- Password: `123456`  

Este usuario tiene productos en su carrito para probar carga y gestión.

## Estructura de la base de datos

![image](https://github.com/user-attachments/assets/ed883957-e133-49f5-89f9-75caaedb37f3)

## Diseño responsive

El sitio está completamente adaptado para dispositivos móviles, ofreciendo una experiencia fluida tanto en smartphones como en tablets.  
Se aplicaron **buenas prácticas de diseño responsive con Tailwind CSS**, garantizando que todos los componentes —como la navegación, los productos, el carrito, y el panel de administración— se ajusten correctamente al tamaño de pantalla.

A continuación se muestran algunas capturas desde vista mobile:

![image](https://github.com/user-attachments/assets/30855ce1-5ac3-404a-8794-7bc094662453)
![image](https://github.com/user-attachments/assets/8a33cf24-8d02-4ae3-9236-b9c447a8f238)


## Capturas adicionales

- Página de tienda con filtros  
![image](https://github.com/user-attachments/assets/092344de-611d-4098-bf68-ba169bb1c12c)

- Página de producto individual  
![image](https://github.com/user-attachments/assets/e58c839c-ed92-4d4b-ac91-be485ccb7fa8)
![image](https://github.com/user-attachments/assets/81cba520-97b3-4449-93af-4f3a5b29fe42)

- Carrito de compras  
El carrito permite a los usuarios agregar productos, modificar cantidades y revisar el subtotal antes de finalizar la compra.  
Incluye visualización de cada ítem con imagen, nombre, variante, cantidad y precio, y resumen total.  
La compra está simulada: al finalizar, el pedido cambia de estado “carrito” a estado “confirmado”.  
![image](https://github.com/user-attachments/assets/ffc1f516-f2b2-4fb6-ae0a-d7c15e613c14)

- Mis pedidos  
Los usuarios pueden consultar el historial de sus compras confirmadas, visualizando detalles como productos, cantidades, precios y estados.  
Además, pueden dejar una calificación **una sola vez por producto** para ayudar a otros usuarios en su elección.

![image](https://github.com/user-attachments/assets/3465dec2-1259-4fc5-80b7-13ef1ec38b5f)


- Login / Registro  
![image](https://github.com/user-attachments/assets/f97db6a3-79cb-475b-8719-7fcc8caf81e4)
![image](https://github.com/user-attachments/assets/3e0deb4f-d407-427b-998e-1fc859c822bf)


- Panel de administración  
![image](https://github.com/user-attachments/assets/b40d37a7-ac36-40ce-8b61-7f03b48c47d7)
Formulario para creación de productos nuevos:  
![image](https://github.com/user-attachments/assets/bd037dcc-540a-4316-a933-96c7621ca65a)
![image](https://github.com/user-attachments/assets/223138b0-f452-429d-bfca-af0538f3fbca)
Formulario para edición y actualización de productos existentes:  
![image](https://github.com/user-attachments/assets/19a212c5-03c7-4afe-98bd-35c50d171d61)
![image](https://github.com/user-attachments/assets/9df606b2-dc4f-4ce9-840e-8e6787aa1966)

