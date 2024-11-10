import axios from 'axios'
import { toast } from "react-toastify";

const URL = 'http://localhost:3001/distributorsApp'
//Логин
export async function Login(tg_user_id) {
    try {
        const response = await axios.post(`${URL}/auth/login?tg_user_id=${tg_user_id}`);
        return response.data
    } catch (error) {
        console.error(error);
        toast(`Ошибка логина: ${error.message}`, { type: "error" });
        return null
    }
}

export async function EditeUser(data) {
    try {
        console.log(data)
        const response = await axios.put(`${URL}/users/edite`, {

            id: data.id,
            full_name: data.full_name,
            birth_date: data.birth_date,
            address: data.address,
            phone: data.phone
        }
        );
        return response.data
    } catch (error) {
        console.error(error);
        toast(`Ошибка логина: ${error.message}`, { type: "error" });
        return null
    }
}

export async function GetExecutorTasks(tg_user_id, completed) {
    try {
        const response = await axios.get(`${URL}/tasks/get/executor?tg_user_id=${tg_user_id}&completed=${completed}`
        );
        return response.data
    } catch (error) {
        console.error(error);
        toast(`Ошибка логина: ${error.message}`, { type: "error" });
        return null
    }
}
// tasks/get/executor?tg_user_id=6935066908&completed=false


export const handleUpload = async (tgUserId, typeAddId, taskId, uploadedFiles) => {
    console.log(taskId)
    const formData = new FormData();
    uploadedFiles.forEach((fileObj) => {
        formData.append("images", fileObj.file); // `fileObj.file` - файл, загруженный из состояния
    });

    try {
        const response = await axios.post(`${URL}/images/upload?tg_user_id=${tgUserId}&type_add_id=${typeAddId}&task_id=${taskId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data.message);
    } catch (error) {
        console.error("Error uploading images:", error);
    }
};