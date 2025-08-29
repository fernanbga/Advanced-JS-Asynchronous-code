// RESUELVE TUS EJERCICIOS AQUI

//Utiliza la API (https://dog.ceo/dog-api/) para 
// resolver estos ejercicios.

// - [ ] 1.- Declara una funcion **getAllBreeds** 
// que devuelva un array de strings con todas las razas 
// de perro.

async function getAllBreeds() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await response.json();
  const breeds = [];
  for (let breed in data.message) {
    breeds.push(breed);
  }
  return breeds;
}

// getAllBreeds().then(breeds => console.log(breeds));

// 2.- Declara una función **getRandomDog** que obtenga 
// una imagen random de una raza.

async function getRandomDog() {
    const response  = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await response.json();
        return data.message;
};

// getRandomDog()
// .then(imgUrl => console.log(imgUrl));

//3 3.- Declara una función **getAllImagesByBreed** que 
// obtenga todas las imágenes de la raza komondor.

async function getAllImagesByBreed() {
    const response = await fetch('https://dog.ceo/api/breed/komondor/images')
    const data = await response.json();
        return data.message;
};

getAllImagesByBreed()
.then(imgUrl => console.log(imgUrl))
.catch(error => console.error('Error obteniendo perrito uwu:', error));

// 4.- Declara una funcion **getAllImagesByBreed2(breed)** 
// que devuelva las imágenes de la raza pasada por el argumento

async function getAllImagesByBreed2(breed) {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const data = await response.json();
        return data.message;
};
// getAllImagesByBreed2('husky')
// .then(imgUrl => console.log(imgUrl))
// .catch(error => console.error('Error obteniendo perrito uwu:', error));

// 5.- Declarara una función **getGitHubUserProfile(username)** 
// que obtenga el perfil de usuario de github a partir de su nombre 
// de usuario. (https://api.github.com/users/{username}).

async function getGitHubUserProfile(username) {
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json();
        return data;
};

// getGitHubUserProfile('fernanbga')
//     .then(imgUrl => console.log(imgUrl))
//     .catch(error => console.error('Error obteniendo tu perfil:', error));

// 6.- Declara una función **printGithubUserProfile(username)** 
// que reciba como argumento el nombre de un usuario (username), 
// retorne {img, name} y pinte la foto y el nombre en el DOM.

async function printGithubUserProfile(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        const img = data.avatar_url;
        const name = data.name;

        //crea en el dom
        const container = document.createElement('div');
        const imageElement = document.createElement('img');
        const nameElement = document.createElement('h2');

        imageElement.src = img;
        imageElement.alt = `${name}'s avatar`;

        nameElement.textContent = name;

        container.appendChild(imageElement);
        container.appendChild(nameElement);
        document.body.appendChild(container);

        return { img, name };
    } catch (error) {
        console.error('Error obteniendo el perfil de GitHub:', error);
    }
};

// printGithubUserProfile('fernanbga')
//     .then(imgUrl => console.log(imgUrl))
//     .catch(error => console.error('Error obteniendo tu perfil:', error));

// 7. Crea una función **getAndPrintGitHubUserProfile(username)**
//  que contenga una petición a la API para obtener información de 
// ese usuario y devuelva un string que represente una tarjeta HTML 
// como en el ejemplo, la estructura debe ser exactamente la misma:

// html
// <section>
//     <img src="url de imagen" alt="imagen de usuario">
//     <h1>Nombre de usuario</h1>
//     <p>Public repos: (número de repos)</p>
// </section>

function getAndPrintGitHubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
     .then(res=> res.json())
     .then(user => {
         let container = `<section>
                     <img src="${user.avatar_url}" alt="${user.name}">
                     <h1>${user.name || `${username}`}</h1>
                     <p>Public repos: ${user.public_repos}</p>
                     </section>`;
         document.body.innerHTML += container;
         return container
      });
 }


//getAndPrintGitHubUserProfile('fernanbga');


// 8.- Manipulación del DOM: Crea un input de tipo texto, y 
// un botón buscar. El usuario escribirá en el input el nombre 
// de usuario de GitHub que quiera buscar. Después llamaremos a
// la función **getAndPrintGitHubUserProfile(username)** que 
// se ejecute cuando se pulse el botón buscar.(Esto no se testea).
//Para que no explote
document.addEventListener('DOMContentLoaded', () => {
    // Crear elementos
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Usuario de GitHub';

    const button = document.createElement('button');
    button.textContent = 'Buscar';

    // Agregar al DOM
    document.body.appendChild(input);
    document.body.appendChild(button);

    // Evento click
    button.addEventListener('click', () => {
        const username = input.value.trim();
        if (username) {
            getAndPrintGitHubUserProfile(username);
        }
    });
});

// - [ ] 9.- Dada una lista de usuarios de github guardada en una array,crea una funcion **fetchGithubUsers(userNames)** que utilice 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario. \
// Objetivo: Usar Promise.all()\
// Recordatorio: Una llamada a fetch() devuelve un objeto promesa.\
// Pregunta. ¿cuántas promesas tendremos?

// Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

// Pasos:

// - Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
// - Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
// - Cuando Promise.all() haya terminado:
// Consigue que se imprima por consola la url del repositorio de cada usuario.
// Consigue que se imprima por consola el nombre de cada usuario.

async function fetchGithubUsers(userNames) {
    // Array de promesas de fetch para cada usuario
    const promises = userNames.map(name =>
        fetch(`https://api.github.com/users/${name}`).then(res => res.json())
    );

    // Espera a que todas las promesas se resuelvan
    const users = await Promise.all(promises);

    // Imprime la url del repositorio y el nombre
    users.forEach(user => {
        console.log('Repos URL:', user.repos_url);
        console.log('Nombre:', user.name);
    });
}

const userNames = ['fernanbga'];
fetchGithubUsers(userNames);