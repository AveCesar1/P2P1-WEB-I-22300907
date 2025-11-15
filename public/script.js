async function enviarFormulario(accion) {
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value, 10);
    const curso = document.getElementById('curso').value;

    try {
        // No le muevas: apenas y jala
        if (accion === 'insertar') {
            const res = await fetch('/api/alumnos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, edad, curso })
            });
            const data = await res.json();
            alert(data.mensaje || 'Alumno insertado');
        } else if (accion === 'actualizar') {
            if (!id) return alert('ID requerido para actualizar');
            const res = await fetch(`/api/alumnos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, edad, curso })
            });
            const data = await res.json();
            alert(data.mensaje || 'Alumno actualizado');
        } else if (accion === 'borrar') {
            if (!id) return alert('ID requerido para borrar');
            const res = await fetch(`/api/alumnos/${id}`, { method: 'DELETE' });
            const data = await res.json();
            alert(data.mensaje || 'Alumno borrado');
        }

        await verAlumnos();

        // Limpiamos esta tontería
        document.getElementById('id').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('curso').value = '';
        document.getElementById('nombre').focus();
    } catch (err) {
        alert('Error: ' + err.message);
    }
}

async function verAlumnos() {
    try {
        const res = await fetch('/api/alumnos');
        const alumnos = await res.json();
        const cont = document.getElementById('lista');
        if (!Array.isArray(alumnos)) {
            cont.innerHTML = '<p>Error al obtener la lista de alumnos.</p>';
            return;
        }
        cont.innerHTML = '<h2>Lista de Alumnos</h2><ul>' + alumnos.map(a =>
            `<li>ID: ${a.id} - Nombre: ${a.nombre} - Edad: ${a.edad} - Curso: ${a.curso}</li>`
        ).join('') + '</ul>';
    } catch (err) {
        alert('Error al obtener alumnos: ' + err.message);
    }
}

window.addEventListener('DOMContentLoaded', verAlumnos);