import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore("taskSTore", {
    state: () => ({
        tasks: []
    }),
    actions: {
        headers() {
            return {
                headers: {
                    "Content-Type": "application/json",
                },
            };
        },
        async list() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/task/list`, this.headers());

                if (response.status === 200) {
                    this.tasks = response.data.tasks;
                }
            }
            catch (e) {
                console.log("Hubo un error: " + e);
            }
        },
        async create(formData) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/task/create`, formData, this.headers());

                if (response.status === 201) {
                    alert(response.data.message);
                    this.list();
                }
            }
            catch (e) {
                console.log("Hubo un error: " + e);
            }
        },
        async edit(formData, id) {
            try {
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/task/edit/${id}`, formData, this.headers());

                if (response.status === 200) {
                    alert(response.data.message);
                    this.list();
                }
            }
            catch (e) {
                console.log("Hubo un error: " + e);
            }
        },
        async revert(id) {
            try {
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/task/revert/${id}`, this.headers());

                if (response.status === 200) {
                    alert(response.data.message);
                    this.list();
                }
            }
            catch (e) {
                console.log("Hubo un error: " + e);
            }
        },
        async finished(id) {
            try {
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/task/finished/${id}`, this.headers());

                if (response.status === 200) {
                    alert(response.data.message);
                    this.list();
                }
            }
            catch (e) {
                console.log("Hubo un error: " + e);
            }
        },
        async delete(id) {
            try {
                if (confirm("Estas seguro de eliminarlo?")) {
                    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/task/delete/${id}`, this.headers());

                    if (response.status === 200) {
                        alert(response.data.message);
                        this.list();
                    }
                }
            }
            catch (e) {
                console.log("Hubo un error: " + e);
            }
        }
    }
});