<script setup>
import { ref, onMounted } from 'vue';
import { useTaskStore } from '@/stores/tasks.js';

const tab = ref('firts');
const loader = ref(true);

const taskStore = useTaskStore();

const id = ref(0);
const formData = ref({
    title: '',
    description: ''
});

const sendData = async () => {
    formData.value.title.length < 6 ? alert('El titulo debe tener mas de 6 caracteres') : '';
    formData.value.description.length < 6 ? alert('La descripción debe tener mas de 6 caracteres') : '';

    if (
        formData.value.title.length > 5 &&
        formData.value.description.length > 5 &&
        id.value === 0
    ) {
        await taskStore.create(formData.value);

        formData.value = {
            title: '',
            description: ''
        };

        tab.value = 'firts';
    }
    else {
        await taskStore.edit(formData.value, id.value);

        formData.value = {
            title: '',
            description: ''
        };

        id.value = 0;

        tab.value = 'firts';
    }
}

const edit = (row) => {
    id.value = row.id;

    formData.value = {
        title: row.title,
        description: row.description
    }

    tab.value = 'second';
}

onMounted(async () => {
    await taskStore.list();
    loader.value = false;
});
</script>

<template>
    <ul class="max-w-4xl mx-auto flex my-2 px-5">
        <li @click="tab = 'firts'" :class="tab === 'firts' ? 'bg-slate-100' : 'hover:bg-slate-50'"
            class="px-3 ease-out duration-200 py-1.5 cursor-pointer text-sm">Tareas
        </li>
        <li @click="tab = 'second'" :class="tab === 'second' ? 'bg-slate-100' : 'hover:bg-slate-50'"
            class="px-3 ease-out duration-200 py-1.5 cursor-pointer text-sm">Crear
            Tarea</li>
    </ul>
    <div v-if="tab === 'firts'" class="flex justify-center flex-wrap gap-5 mt-5">
        <div v-if="loader">Cargando...</div>
        <div v-if="!loader" class="border p-3 w-[300px]">
            <h1 class="border-b pb-2 mb-3">Tareas pendientes</h1>
            <ul class="text-sm space-y-3">
                <li class="bg-slate-50 p-3" v-for="(row, index) in taskStore.tasks.filter(t => t.state === false)">
                    {{ index + 1 }}- Titulo: {{ row.title }} <br>
                    <p>
                        {{ row.description }}
                    </p>

                    <button @click="edit(row)"
                        class="bg-orange-400 me-2 mt-3 text-slate-50 px-3 py-1.5 text-sm font-medium">Editar</button>
                    <button @click="taskStore.finished(row.id)"
                        class="bg-slate-900 mt-3 text-slate-50 me-2 px-3 py-1.5 text-sm font-medium">Terminar</button>
                    <button @click="taskStore.delete(row.id)"
                        class="bg-red-500 mt-3 text-slate-50 px-3 py-1.5 text-sm font-medium">Eliminar</button>
                </li>
            </ul>
        </div>
        <div v-if="!loader" class="border p-3 w-[300px]">
            <h1 class="border-b pb-2 mb-3">Tareas terminadas</h1>
            <ul class="text-sm space-y-3">
                <li class="bg-slate-50 p-3" v-for="(row, index) in taskStore.tasks.filter(t => t.state === true)">
                    {{ index + 1 }}- Titulo: {{ row.title }} <br>
                    <p>
                        {{ row.description }}
                    </p>

                    <button @click="taskStore.revert(row.id)"
                        class="bg-slate-900 mt-3 text-slate-50 px-3 py-1.5 text-sm font-medium">Cancelar</button>
                </li>
            </ul>
        </div>
    </div>
    <div v-else class="flex justify-center gap-5 mt-5">
        <form class="max-w-[350px] w-full">
            <div class="w-full mb-3">
                <label for="" class="block">Titulo</label>
                <input type="text" v-model="formData.title"
                    class="bg-slate-100 outline-none text-sm w-full px-3 py-1.5">
            </div>
            <div class="w-full mb-3">
                <label for="" class="block">Descripción</label>
                <textarea name="" id="" v-model="formData.description"
                    class="bg-slate-100 outline-none text-sm w-full px-3 py-1.5"></textarea>
            </div>
            <button @click.prevent="sendData()"
                class="bg-slate-900 text-slate-50 px-3 py-1.5 text-sm font-medium">Guardar</button>
        </form>
    </div>
</template>

<style scoped></style>